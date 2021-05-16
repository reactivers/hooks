interface IUseCounter {
    increase: (by?: number) => void;
    decrease: (by?: number) => void;
    reset: () => void;
    setCounter: (counter: number) => void;
    counter: number;
}
declare const useCounter: (params?: {
    initial: number;
}) => IUseCounter;
export default useCounter;
