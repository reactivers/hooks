declare const useCounter: (params?: {
    initial: number;
}) => {
    counter: number;
    setCounter: import("react").Dispatch<import("react").SetStateAction<number>>;
    reset: () => void;
    increase: (by?: number) => void;
    decrease: (by?: number) => void;
};
export default useCounter;
