import { FC } from "react";
import { RequestPayload } from ".";
interface FetchContextProps {
    url?: string;
    onRequest?: (response: RequestPayload) => void;
    onSuccess?: (response: any) => void;
    onError?: (response: any, responseJSON?: any) => void;
}
interface FetchProviderProps {
    url?: string;
    onRequest?: (response: RequestPayload) => void;
    onSuccess?: (response: any) => void;
    onError?: (response: any, responseJSON?: any) => void;
}
declare const FetchProvider: FC<FetchProviderProps>;
export declare const useFetchContext: () => FetchContextProps;
export default FetchProvider;
