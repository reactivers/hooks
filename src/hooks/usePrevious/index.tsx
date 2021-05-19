import { useEffect, useRef } from "react";

const usePrevious = (current) => {
    const previous = useRef(current);
    useEffect(() => {
        previous.current = current
    }, [current])
    return previous.current as typeof current;
}

export default usePrevious;