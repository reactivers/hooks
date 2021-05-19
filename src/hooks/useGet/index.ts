import { useCallback } from 'react';
import useFetch, { GenericRequestPayload, IUseFetchProps, IUseFetchResponse } from '../useFetch';

interface GetRequestPayload extends GenericRequestPayload {
}

const useGet: <T extends {}>(params?: IUseFetchProps) => IUseFetchResponse<T> = <T extends {}>(params = { abortOnUnmount: true }) => {
    const { request, ...rest } = useFetch<T>(params)

    const getRequest = useCallback((payload: GetRequestPayload = {}) => {
        return request({ ...payload, method: "GET" })
    }, [request])

    return {
        request: getRequest,
        ...rest
    }
}

export default useGet
