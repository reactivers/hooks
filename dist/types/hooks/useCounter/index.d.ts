declare const useCounter: (params?: {
    initial: number;
}) => {
    counter: number;
    increase: (by?: number) => void;
    decrease: (by?: number) => void;
};
export default useCounter;
