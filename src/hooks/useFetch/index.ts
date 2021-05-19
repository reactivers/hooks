import { useCallback, useEffect, useMemo, useState } from 'react';
import { ResponseContentType } from '../../utils/functions';
import useAuth from "../useAuth";
import useUtils from '../useUtils';
import { useFetchContext } from './context';

export interface GenericRequestPayload extends RequestInit {
    url?: string;
    endpoint?: string;
    onSuccess?: (respose: any) => void;
    onError?: (error: any) => void;
    responseContentType?: ResponseContentType,
}

export interface RequestPayload extends GenericRequestPayload {
    body?: any;
    bodyStringify?: boolean;
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
    request: (params: RequestPayload) => Promise<Response>;
}

const useFetch: <T extends {}>(params?: IUseFetchProps) => IUseFetchResponse<T> = <T extends {}>(params = { abortOnUnmount: true }) => {
    const { abortOnUnmount } = params;
    const { iFetch } = useUtils();

    const {
        url: contextURL,
        onSuccess: contextOnSuccess,
        onError: contextOnError,
        onRequest,
        isError,
        isSuccess,
        credentials,
        transformResponse,
        getAuthorizationHeader
    } = useFetchContext();

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
        if (transformResponse)
            response = transformResponse(response)

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
    }, [contextOnSuccess, transformResponse])

    const onError = useCallback(({ onError: payloadOnError, response }) => {
        if (transformResponse)
            response = transformResponse(response)

        if (contextOnError) contextOnError(response)
        if (payloadOnError) payloadOnError(response)

        setData(oldData => ({
            ...oldData,
            success: false,
            response,
            fetching: false,
            fetched: true,
            firstTimeFetched: true
        }))

    }, [contextOnError, transformResponse])

    const request = useCallback((payload: RequestPayload = {}) => {
        const {
            url: _url,
            endpoint,
            onSuccess: payloadOnSuccess,
            onError: payloadOnError,
            headers: payloadHeaders,
            credentials: _credentials,
            ...rest
        } = payload;
        const url = `${_url || contextURL}${endpoint}`;

        if (onRequest) onRequest({ ...payload, url })

        setData(old => ({ ...old, fetching: true, fetched: false }))

        const authorizationHeader = getAuthorizationHeader(token);
        const headers = {
            "Authorization": authorizationHeader,
            ...(payloadHeaders || {}),
        };

        if (!headers["Authorization"]) delete headers["Authorization"];

        return iFetch({
            ...rest,
            url,
            headers,
            credentials: _credentials || credentials,
            onSuccess: (response) => {
                if (!isSuccess || isSuccess(response)) {
                    onSuccess({
                        onSuccess: payloadOnSuccess,
                        response
                    })
                } else {
                    onError({
                        onError: payloadOnError,
                        response,
                    })
                }
            },
            onError: (response) => {
                if (!isError || isError(response)) {
                    onError({
                        onError: payloadOnError,
                        response,
                    })
                } else {
                    onSuccess({
                        onSuccess: payloadOnSuccess,
                        response
                    })
                }
            },
            signal: abortController.signal
        })
    }, [
        isError,
        isSuccess,
        credentials,
        getAuthorizationHeader,
        token,
        contextURL,
        onSuccess,
        onError,
        setData,
        onRequest,
        abortController.signal
    ])


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
