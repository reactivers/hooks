import { FC } from "react";
import { RequestPayload } from ".";
interface FetchContextProps {
    url?: string;
    credentials?: RequestCredentials;
    transformResponse?: (response: any) => any;
    isSuccess?: (response: any) => boolean;
    isError?: (response: any) => boolean;
    onRequest?: (request: RequestPayload) => void;
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
    getAuthorizationHeader?: (token: string) => string;
}
declare const FetchProvider: FC<FetchContextProps>;
export declare const useFetchContext: () => FetchContextProps;
export default FetchProvider;
