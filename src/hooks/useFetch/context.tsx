import { createContext, FC, useContext } from "react";
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

const FetchContext = createContext({} as FetchContextProps);

const FetchProvider: FC<FetchProviderProps> = ({ url, onRequest, onSuccess, onError, children }) => {
    return (
        <FetchContext.Provider value={{ url, onSuccess, onRequest, onError }}>
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
