import { FC } from "react";
interface ApiContextProps {
    url: string;
    onSuccess?: (response: any) => void;
    onError?: (response: any, responseJSON?: any) => void;
}
interface ApiProviderProps {
    url: string;
    onSuccess?: (response: any) => void;
    onError?: (response: any, responseJSON?: any) => void;
}
declare const ApiProvider: FC<ApiProviderProps>;
export declare const useApiContext: () => ApiContextProps;
export default ApiProvider;
