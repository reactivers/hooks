import { FC } from "react";
interface GlobalStateContext {
    globalState: Record<string, any>;
    setGlobalState: (param: any) => void;
}
declare const GlobalStateContext: import("react").Context<GlobalStateContext>;
interface GlobalStateProviderProps {
    onChange?: (GlobalState: Record<string, any>) => void;
}
declare const GlobalStateProvider: FC<GlobalStateProviderProps>;
export declare const useGlobalStateContext: () => GlobalStateContext;
export default GlobalStateProvider;
