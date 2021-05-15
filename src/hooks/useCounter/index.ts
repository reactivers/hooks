import { useCallback, useState } from "react";

const useCounter = (params = { initial: 0 }) => {
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
