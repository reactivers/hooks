import { FC } from "react";
interface GlobalStateContext {
    globalState: Record<string, any>;
    setGlobalState: (param: any) => void;
}
declare const GlobalStateContext: import("react").Context<GlobalStateContext>;
declare const GlobalStateProvider: FC;
export declare const useGlobalStateContext: () => GlobalStateContext;
export default GlobalStateProvider;
