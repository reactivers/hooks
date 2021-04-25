interface ApiPayload<T extends {}> {
    endpoint?: string;
    method?: string;
    params?: any;
    initialValue?: T;
    formData?: any;
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
    load: (payload: ApiPayload<T>) => void;
}
declare const useApi: <T extends {}>(payload?: ApiPayload<T>) => Api<T>;
export default useApi;
