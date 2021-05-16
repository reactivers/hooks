import { HTTPMethods } from '../../utils/functions';
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
    abortOnUnmount?: boolean;
}
export interface IUseFetchResponse<T extends {}> extends FetchController<T> {
    request: (params: RequestPayload) => void;
}
declare const useFetch: <T extends {}>(params?: IUseFetchProps) => IUseFetchResponse<T>;
export default useFetch;
