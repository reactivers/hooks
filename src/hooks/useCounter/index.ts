import { useCallback, useState } from "react";

interface IUseCounter {
    increase: (by?: number) => void;
    decrease: (by?: number) => void;
    reset: () => void;
    setCounter: (counter: number) => void;
    counter: number
}

const useCounter: (params?: { initial: number }) => IUseCounter = (params = { initial: 0 }) => {
    const [counter, setCounter] = useState<number>(params.initial);

    const increase = useCallback((by: number = 1) => {
        setCounter(old => old + by)
    }, [])

    const decrease = useCallback((by: number = 1) => {
        setCounter(old => old - by)
    }, [])

    const reset = useCallback(() => {
        setCounter(params.initial)
    }, [params.initial])

    return { counter, setCounter, reset, increase, decrease };
};
export default useCounter;
