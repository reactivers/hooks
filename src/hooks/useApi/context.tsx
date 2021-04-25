import { createContext, FC, useContext } from "react";

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

const ApiContext = createContext({} as ApiContextProps);

const ApiProvider: FC<ApiProviderProps> = ({ url, onSuccess, onError, children }) => {
    return (
        <ApiContext.Provider value={{ url, onSuccess, onError }}>
            {children}
        </ApiContext.Provider>
    )
}

export const useApiContext = () => {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error('useApiContext must be used within an ApiContext.Provider');
    }
    return context;
};

export default ApiProvider;
