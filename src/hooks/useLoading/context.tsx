import { createContext, FC, useCallback, useContext, useState } from "react";

interface LoadingContextProps {
    loading: number;
    increase: () => void;
    decrease: () => void;
}

interface LoadingProviderProps {
    onIncrease?: (loading: number) => void;
    onDecrease?: (loading: number) => void
}

const LoadingContext = createContext({} as LoadingContextProps);

const LoadingProvider: FC<LoadingProviderProps> = ({ onIncrease, onDecrease, children }) => {

    const [loading, setLoading] = useState(0);

    const increase = useCallback(() => {
        setLoading(old => {
            const newLoading = old + 1;
            if (onIncrease) onIncrease(newLoading)
            return newLoading
        })
    }, [onIncrease])

    const decrease = useCallback(() => {
        setLoading(old => {
            const newLoading = old - 1;
            if (onDecrease) onDecrease(newLoading)
            return newLoading
        })
    }, [onDecrease])

    return (
        <LoadingContext.Provider value={{ loading, increase, decrease }}>
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
