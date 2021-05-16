interface IUseLoading {
    isLoading: boolean;
    increase: () => void;
    decrease: () => void;
}
declare const useLoading: () => IUseLoading;
export default useLoading;
