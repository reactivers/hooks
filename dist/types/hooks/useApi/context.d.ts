import { FC } from "react";
import { RequestPayload } from ".";
interface ApiContextProps {
    url?: string;
    onRequest?: (response: RequestPayload) => void;
    onSuccess?: (response: any) => void;
    onError?: (response: any, responseJSON?: any) => void;
}
interface ApiProviderProps {
    url?: string;
    onRequest?: (response: RequestPayload) => void;
    onSuccess?: (response: any) => void;
    onError?: (response: any, responseJSON?: any) => void;
}
declare const ApiProvider: FC<ApiProviderProps>;
export declare const useApiContext: () => ApiContextProps;
export default ApiProvider;
