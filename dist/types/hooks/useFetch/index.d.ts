import { HTTPMethods } from '../../utils/functions';
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
export interface RequestPayload extends GenericRequestPayload {
    method?: HTTPMethods;
    params?: any;
    formData?: any;
}
interface FetchController<T extends {}> {
    firstTimeFetched: boolean;
    fetched: boolean;
    fetching: boolean;
    success: boolean;
    response: T | any;
}
interface IUseFetchProps {
    abortOnUnmount?: boolean;
}
interface IUseFetchResponse<T extends {}> extends FetchController<T> {
    request: (params: RequestPayload) => void;
    getRequest: (params: GetRequestPayload) => void;
    postRequest: (params: PostRequestPayload) => void;
    deleteRequest: (params: DeleteRequestPayload) => void;
    putRequest: (params: PutRequestPayload) => void;
}
declare const useFetch: <T extends {}>(params?: IUseFetchProps) => IUseFetchResponse<T>;
export default useFetch;
