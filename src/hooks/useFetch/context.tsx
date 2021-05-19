import { createContext, FC, useContext } from "react";
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

const FetchContext = createContext({} as FetchContextProps);

const FetchProvider: FC<FetchContextProps> = ({ children, getAuthorizationHeader = (token) => token ? `Bearer ${token}` : "", ...rest }) => {
    return (
        <FetchContext.Provider value={{
            getAuthorizationHeader,
            ...rest
        }}>
            {children}
        </FetchContext.Provider>
    )
}

export const useFetchContext = () => {
    const context = useContext(FetchContext);
    if (context === undefined) {
        throw new Error('useFetchContext must be used within an FetchContext.Provider');
    }
    return context;
};

export default FetchProvider;
