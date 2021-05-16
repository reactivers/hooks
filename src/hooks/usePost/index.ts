import { useCallback } from 'react';
import useFetch, { GenericRequestPayload, IUseFetchProps, IUseFetchResponse } from '../useFetch';

interface PostRequestPayload extends GenericRequestPayload {
    params?: any;
}

const usePost: <T extends {}>(params?: IUseFetchProps) => IUseFetchResponse<T> = <T extends {}>(params = { abortOnUnmount: true }) => {
    const { request, ...rest } = useFetch<T>(params)

    const postRequest = useCallback((payload: PostRequestPayload = {}) => {
        request({ ...payload, method: "POST" })
    }, [request])

    return {
        request: postRequest,
        ...rest
    }
}

export default usePost
