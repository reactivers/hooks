import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"

interface IUseClickInside {
    ref: MutableRefObject<any>;
    callback: (event: MouseEvent | TouchEvent) => void;
    withState?: boolean;
}

const useClickInside: (params: IUseClickInside) => boolean = ({ ref, callback, withState = false }) => {
    const [clickedState, setClickedState] = useState(false);
    const clickedRef = useRef(false);

    const onClick = useCallback((event) => {
        if (ref.current) {
            if (ref.current.contains(event.target)) {
                if (withState) {
                    setClickedState(true)
                } else {
                    clickedRef.current = true;
                }
                callback(event)
            }
        }
    }, [ref.current, callback, withState])

    useEffect(() => {
        document.addEventListener("click", onClick);
        return () => {
            document.removeEventListener("click", onClick);

        }
    }, [onClick])

    return withState ? clickedState : clickedRef.current;
}

export default useClickInside;