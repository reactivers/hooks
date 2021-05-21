import { useCallback, useEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill"

interface UseMeasureProps {
    ref: React.MutableRefObject<any>;
    updateOnWindowResize?: boolean;
    onResize?: (a: Measure) => void;
}

interface Measure {
    left: number;
    top: number;
    width: number;
    bottom: number;
    right: number;
    x: number;
    y: number;
    height: number;
    offsetLeft: number;
    offsetTop: number;
}

const defaultValue: Measure = {
    left: 0,
    top: 0,
    width: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    height: 0,
    offsetLeft: 0,
    offsetTop: 0,
};

const useMeasure: (a: UseMeasureProps) => Measure = ({
    ref,
    updateOnWindowResize = false,
    onResize,
}) => {
    const [bounds, setBounds] = useState<Measure>(defaultValue);

    const set = useCallback((newBounds) => {
        if (onResize) onResize(newBounds);
        else setBounds(newBounds);
    }, [setBounds, onResize]);

    const registerObserver = useCallback((element) => {
        const observer = new ResizeObserver(() => {
            if (ref.current) {
                const newBounds = ref.current.getBoundingClientRect();
                newBounds.offsetLeft = ref.current?.offsetLeft;
                newBounds.offsetTop = ref.current?.offsetTop;
                if (newBounds) set(newBounds);
            }
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, [set, ref.current])

    useEffect(() => {
        if (updateOnWindowResize)
            return registerObserver(document.body)
    }, [updateOnWindowResize, registerObserver]);

    useEffect(() => {
        if (ref.current)
            return registerObserver(ref.current)
    }, [registerObserver, ref.current]);

    return bounds;
};


export default useMeasure;