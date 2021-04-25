interface ApiPayload {
    endpoint?: string;
    method?: string;
    params?: any;
    initialValue?: any;
    formData?: any;
    onSuccess?: (respose: any) => void;
    onError?: (responseJSON: any, response: any) => void;
}
interface ApiController {
    firstTimeFetched: boolean;
    fetched: boolean;
    fetching: boolean;
    success: boolean;
    response: any;
}
declare const useApi: (payload: ApiPayload) => ApiController;
export default useApi;
