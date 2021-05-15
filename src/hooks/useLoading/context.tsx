import { createContext, FC, useCallback, useContext, useState } from "react";
import useCounter from "../useCounter";

interface LoadingContextProps {
    loading: number;
    increase: () => void;
    decrease: () => void;
}


const LoadingContext = createContext({} as LoadingContextProps);

const LoadingProvider: FC = ({ children }) => {

    const { counter, increase, decrease } = useCounter();

    return (
        <LoadingContext.Provider value={{ loading: counter, increase, decrease }}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoadingContext = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoadingContext must be used within an LoadingContext.Provider');
    }
    return context;
};

export default LoadingProvider;
