import { useCallback, useEffect, useMemo, useState } from 'react';
import { HTTPMethods } from '../../utils/functions';
import useAuth from "../useAuth";
import useUtils from '../useUtils';
import { useFetchContext } from './context';

export interface GenericRequestPayload {
    url?: string;
    endpoint?: string;
    onSuccess?: (respose: any) => void;
    onError?: (responseJSON: any, response: any) => void;
}

export interface RequestPayload extends GenericRequestPayload {
    method?: HTTPMethods;
    params?: any;
    formData?: any;
}

export interface FetchController<T extends {}> {
    firstTimeFetched: boolean;
    fetched: boolean;
    fetching: boolean;
    success: boolean;
    response: T | any;
}

export interface IUseFetchProps {
    abortOnUnmount?: boolean
}

export interface IUseFetchResponse<T extends {}> extends FetchController<T> {
    request: (params: RequestPayload) => void;
}

const useFetch: <T extends {}>(params?: IUseFetchProps) => IUseFetchResponse<T> = <T extends {}>(params = { abortOnUnmount: true }) => {
    const { abortOnUnmount } = params;
    const { iFetch } = useUtils();

    const { url: contextURL, onSuccess: contextOnSuccess, onError: contextOnError, onRequest } = useFetchContext();

    const { token } = useAuth()

    const [data, setData] = useState<FetchController<T>>({
        success: undefined,
        firstTimeFetched: false,
        fetched: false,
        fetching: false,
        response: {}
    });

    const abortController = useMemo(() => new AbortController(), []);

    const onSuccess = useCallback(({ onSuccess: payloadOnSuccess, response }) => {
        if (contextOnSuccess) contextOnSuccess(response)
        if (payloadOnSuccess) payloadOnSuccess(response)

        setData(oldData => ({
            ...oldData,
            success: true,
            response,
            fetching: false,
            fetched: true,
            firstTimeFetched: true
        }))
    }, [contextOnSuccess])

    const onError = useCallback(({ onError: payloadOnError, response, responseJSON }) => {
        setData(oldData => ({
            ...oldData,
            success: false,
            response: { ...(responseJSON || response) },
            fetching: false,
            fetched: true,
            firstTimeFetched: true
        }))

        if (contextOnError) contextOnError(responseJSON || response, response)
        if (payloadOnError) payloadOnError(responseJSON || response, response)
    }, [contextOnError])

    const request = useCallback((payload: RequestPayload = {}) => {
        const {
            url: _url,
            endpoint,
            method,
            onSuccess: payloadOnSuccess,
            onError: payloadOnError,
            formData,
            params
        } = payload;
        const url = _url || contextURL;

        if (onRequest) onRequest({ ...payload, url })

        setData(old => ({ ...old, fetching: true, fetched: false }))

        iFetch({
            url,
            endpoint,
            method,
            formData,
            params,
            onSuccess: (response) => onSuccess({
                onSuccess: payloadOnSuccess,
                response
            }),
            onError: (response, responseJSON) => {
                onError({
                    onError: payloadOnError,
                    response,
                    responseJSON
                })
            },
            token,
            signal: abortController.signal
        })
    }, [token, contextURL, onSuccess, onError, setData, onRequest, abortController.signal])


    useEffect(() => {
        return () => {
            if (abortOnUnmount)
                abortController.abort()
        }
    }, [abortController.abort, abortOnUnmount])

    return {
        request,
        ...data
    }
}

export default useFetch
