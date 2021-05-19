import { useCallback } from 'react';
import useFetch, { RequestPayload, IUseFetchProps, IUseFetchResponse } from '../useFetch';
import useUtils from '../useUtils';

interface DeleteRequestPayload extends RequestPayload {
    params?: any;
}

const useDelete: <T extends {}>(params?: IUseFetchProps) => IUseFetchResponse<T> = <T extends {}>(params = { abortOnUnmount: true }) => {
    const { request, ...rest } = useFetch<T>(params)
    const { applicationJSONHeader } = useUtils();
    const deleteRequest = useCallback((payload: DeleteRequestPayload = {}) => {
        request({ headers: applicationJSONHeader, ...payload, method: "DELETE" })
    }, [request])

    return {
        request: deleteRequest,
        ...rest
    }
}

export default useDelete
