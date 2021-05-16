declare const useGlobalState: () => {
    globalState: Record<string, any>;
    setGlobalState: (param: any) => void;
};
export default useGlobalState;
