interface IUseGlobalState {
    globalState: Record<string, any>;
    setGlobalState: any;
}
declare const useGlobalState: () => IUseGlobalState;
export default useGlobalState;
