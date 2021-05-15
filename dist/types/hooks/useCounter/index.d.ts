declare const useCounter: (params?: {
    initial: number;
}) => {
    counter: number;
    increase: (by?: any) => void;
    decrease: (by?: any) => void;
};
export default useCounter;
