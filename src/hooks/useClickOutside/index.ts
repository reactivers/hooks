import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"

interface IUseClickOutside {
    ref: MutableRefObject<any>;
    callback: (event: MouseEvent | TouchEvent) => void;
    withState?: boolean;
    passive?: boolean;
}

const useClickOutside: (params: IUseClickOutside) => boolean = ({ ref, callback, withState = false, passive = true }) => {
    const [clickedState, setClickedState] = useState(false);
    const clickedRef = useRef(false);

    const updateSwitch = useCallback((newValue) => {
        if (withState) {
            setClickedState(newValue)
        } else {
            clickedRef.current = newValue;
        }
    }, [withState])

    const onClick = useCallback((event) => {
        if (ref.current) {
            if (!ref.current.contains(event.target)) {
                updateSwitch(true)
                callback(event)
            } else {
                updateSwitch(false)
            }
        }
    }, [ref.current, callback, updateSwitch])

    useEffect(() => {
        document.addEventListener("click", onClick, { passive });
        return () => {
            document.removeEventListener("click", onClick);
        }
    }, [onClick, passive])

    return withState ? clickedState : clickedRef.current;
}

export default useClickOutside;