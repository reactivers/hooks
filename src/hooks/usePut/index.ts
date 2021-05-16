import { useCallback } from 'react';
import useFetch, { GenericRequestPayload, IUseFetchProps, IUseFetchResponse } from '../useFetch';

interface PutRequestPayload extends GenericRequestPayload {
    params?: any;
}

const usePut: <T extends {}>(params?: IUseFetchProps) => IUseFetchResponse<T> = <T extends {}>(params = { abortOnUnmount: true }) => {
    const { request, ...rest } = useFetch<T>(params)

    const putRequest = useCallback((payload: PutRequestPayload = {}) => {
        request({ ...payload, method: "PUT" })
    }, [request])

    return {
        request: putRequest,
        ...rest
    }
}

export default usePut
