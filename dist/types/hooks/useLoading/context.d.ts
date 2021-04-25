import { FC } from "react";
interface LoadingContextProps {
    loading: number;
    increase: () => void;
    decrease: () => void;
}
interface LoadingProviderProps {
    onIncrease?: (loading: number) => void;
    onDecrease?: (loading: number) => void;
}
declare const LoadingProvider: FC<LoadingProviderProps>;
export declare const useLoadingContext: () => LoadingContextProps;
export default LoadingProvider;
