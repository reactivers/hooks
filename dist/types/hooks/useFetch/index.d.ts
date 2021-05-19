import { ResponseContentType } from '../../utils/functions';
export interface GenericRequestPayload extends RequestInit {
    url?: string;
    endpoint?: string;
    onSuccess?: (respose: any) => void;
    onError?: (error: any) => void;
    responseContentType?: ResponseContentType;
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
    abortOnUnmount?: boolean;
}
export interface IUseFetchResponse<T extends {}> extends FetchController<T> {
    request: (params: RequestPayload) => void;
}
declare const useFetch: <T extends {}>(params?: IUseFetchProps) => IUseFetchResponse<T>;
export default useFetch;
