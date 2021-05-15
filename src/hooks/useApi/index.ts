import { useCallback, useEffect, useMemo, useState } from 'react';
import { HTTPMethods } from '../../utils/functions';
import useAuth from "../useAuth";
import useUtils from '../useUtils';
import { useApiContext } from './context';

interface GenericRequestPayload {
    url?: string;
    endpoint?: string;
    onSuccess?: (respose: any) => void;
    onError?: (responseJSON: any, response: any) => void;
}

interface GetRequestPayload extends GenericRequestPayload {
}

interface PostRequestPayload extends GenericRequestPayload {
    params?: any;
}

interface DeleteRequestPayload extends GenericRequestPayload {
    params?: any;
}

interface PutRequestPayload extends GenericRequestPayload {
    params?: any;
}

interface RequestPayload extends GenericRequestPayload {
    method?: HTTPMethods;
    params?: any;
    formData?: any;
}

interface ApiController<T extends {}> {
    firstTimeFetched: boolean;
    fetched: boolean;
    fetching: boolean;
    success: boolean;
    response: T | any;
}

interface IUseApiProps {
    abortOnUnmount?: boolean
}

interface IUseApiResponse<T extends {}> extends ApiController<T> {
    request: (params: RequestPayload) => void;
    getRequest: (params: GetRequestPayload) => void;
    postRequest: (params: PostRequestPayload) => void;
    deleteRequest: (params: DeleteRequestPayload) => void;
    putRequest: (params: PutRequestPayload) => void;
}

const useApi: <T extends {}>(params?: IUseApiProps) => IUseApiResponse<T> = <T extends {}>(params = { abortOnUnmount: true }) => {
    const { abortOnUnmount } = params;
    const { iFetch } = useUtils();

    const { url: contextURL, onSuccess: contextOnSuccess, onError: contextOnError } = useApiContext();

    const { token } = useAuth()

    const [data, setData] = useState<ApiController<T>>({
        success: undefined,
        firstTimeFetched: false,
        fetched: false,
        fetching: false,
        response: {}
    });

    const { fetching } = data;
    const abortController = useMemo(() => new AbortController(), [fetching]);

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
    }, [token, contextURL, onSuccess, onError, setData, abortController.signal])


    const getRequest = useCallback((payload: GetRequestPayload = {}) => {
        request({ ...payload, method: "GET" })
    }, [request])

    const postRequest = useCallback((payload: PostRequestPayload = {}) => {
        request({ ...payload, method: "POST" })
    }, [request])

    const deleteRequest = useCallback((payload: DeleteRequestPayload = {}) => {
        request({ ...payload, method: "DELETE" })
    }, [request])

    const putRequest = useCallback((payload: PutRequestPayload = {}) => {
        request({ ...payload, method: "PUT" })
    }, [request])


    useEffect(() => {
        return () => {
            if (abortOnUnmount)
                abortController.abort()
        }
    }, [abortController.abort, abortOnUnmount])

    return {
        request,
        getRequest,
        postRequest,
        deleteRequest,
        putRequest,
        ...data
    }
}

export default useApi
