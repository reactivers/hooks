import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useAuth from "../useAuth";
import useUtils from '../useUtils';
import { useApiContext } from './context';

interface ApiPayload<T extends {}> {
    endpoint?: string;
    method?: string,
    params?: any;
    initialValue?: T;
    formData?: any,
    onSuccess?: (respose: any) => void;
    onError?: (responseJSON: any, response: any) => void;
}

interface ApiController<T extends {}> {
    firstTimeFetched: boolean;
    fetched: boolean;
    fetching: boolean;
    success: boolean;
    response: T;
}

interface Api<T extends {}> extends ApiController<T> {
    load: (payload: ApiPayload<T>) => void
}

const useApi: <T extends {}>(payload?: ApiPayload<T>) => Api<T> = <T extends {}>(parameterPayload = {}) => {
    const { iFetch } = useUtils();
    const payloadRef = useRef<ApiPayload<T>>(parameterPayload);
    const {
        endpoint,
        method = 'GET',
        params,
        initialValue,
        formData,
        onSuccess: payloadOnSuccess,
        onError: payloadOnError,
    } = payloadRef.current;

    const { url, onSuccess: contextOnSuccess, onError: contextOnError } = useApiContext();
    const { token } = useAuth()

    const [shouldFetch, setShouldFetch] = useState(false);

    const [data, setData] = useState<ApiController<T>>({
        success: undefined,
        firstTimeFetched: false,
        fetched: false,
        fetching: false,
        response: initialValue
    });

    const controller = useMemo(() => new AbortController(), []);
    const { signal } = controller;

    const onSuccess = useCallback((response) => {
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
    }, [payloadOnSuccess, contextOnSuccess])

    const onError = useCallback((response, responseJSON = {}) => {
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
    }, [payloadOnError, contextOnError])

    const updateData = useCallback(() => {
        setData(oldData => ({
            ...oldData,
            fetching: true,
            fetched: false,
        }))
    }, [])

    const load = useCallback((payload: ApiPayload<T> = {}) => {
        payloadRef.current = { ...payloadRef, ...payload }
        updateData()
        setShouldFetch(true)
    }, [updateData, setShouldFetch])


    useEffect(() => {
        if (shouldFetch) {
            iFetch({
                url,
                endpoint,
                params,
                method,
                formData,
                onSuccess,
                onError,
                token,
                signal
            })
            setShouldFetch(false);
        }

    }, [
        url,
        endpoint,
        params,
        method,
        formData,
        onSuccess,
        onError,
        token,
        signal,
        shouldFetch,
        setShouldFetch
    ])

    useEffect(() => {
        return () => {
            controller.abort()
        }
    }, [controller])

    return { load, ...data }
}

export default useApi
