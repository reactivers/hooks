import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"

interface IUseClickInside {
    ref: MutableRefObject<any>;
    callback: (event: MouseEvent | TouchEvent) => void;
    withState?: boolean;
}

const useClickInside: (params: IUseClickInside) => boolean = ({ ref, callback, withState = false }) => {
    const [clickedState, setClickedState] = useState(false);
    const clickedRef = useRef(false);

    const updateSwitch = useCallback((newValue) => {
        if (withState) {
            setClickedState(true)
        } else {
            clickedRef.current = true;
        }
    }, [withState])

    const onClick = useCallback((event) => {
        if (ref.current) {
            if (ref.current.contains(event.target)) {
                updateSwitch(true)
                callback(event)
            } else {
                updateSwitch(false)
            }
        }
    }, [ref.current, callback, updateSwitch])

    useEffect(() => {
        document.addEventListener("click", onClick);
        return () => {
            document.removeEventListener("click", onClick);

        }
    }, [onClick])

    return withState ? clickedState : clickedRef.current;
}

export default useClickInside;