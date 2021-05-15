import { FC } from "react";
interface LoadingContextProps {
    loading: number;
    increase: () => void;
    decrease: () => void;
}
declare const LoadingProvider: FC;
export declare const useLoadingContext: () => LoadingContextProps;
export default LoadingProvider;
