import { useCallback, useState } from "react";

const useCounter = (params = { initial: 0 }) => {
    const [counter, setCounter] = useState(params.initial);

    const increase = useCallback((by = 1) => {
        setCounter(old => old + by)
    }, [])

    const decrease = useCallback((by = 1) => {
        setCounter(old => old - by)
    }, [])

    return { counter, increase, decrease };
};
export default useCounter;
