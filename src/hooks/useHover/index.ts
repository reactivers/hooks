import { useState, useCallback, useEffect, MutableRefObject } from 'react';
import useUtils from '../useUtils';

const zeroOffset = { top: 0, right: 0, bottom: 0, left: 0 };

interface HoverProps {
    ref: MutableRefObject<any>;
    active?: boolean;
    axis?: { vertical?: boolean, horizontal?: boolean };
    offsets?: { top?: number, right?: number, bottom?: number, left?: number };
    updateOnTouchEnd?: boolean
    includeBorders?: boolean;
}

interface HoverResponse {
    isHover: boolean;
}

const useHover: (props: HoverProps) => HoverResponse = ({
    ref,
    active = true,
    axis = { vertical: true, horizontal: true },
    offsets: _offsets = {},
    updateOnTouchEnd = true,
    includeBorders = true
}) => {
    const { isPointInRect, isInRange, } = useUtils();

    const [isHover, setIsHover] = useState(false);
    const { vertical: checkInVertically, horizontal: checkInHorizontally } = axis;
    const offsets = { ...zeroOffset, ..._offsets };
    const { top, right, bottom, left } = offsets;

    const isMouseOver = useCallback(
        (e) => {
            if (!ref.current) return;
            const event = e.touches ? e.touches[0] : e;
            const { clientX, clientY } = event;
            const point = { x: clientX, y: clientY };
            const boundingRect = ref.current.getBoundingClientRect().toJSON();

            boundingRect.top += top;
            boundingRect.right += right;
            boundingRect.bottom += bottom;
            boundingRect.left += left;

            const checkBoth = checkInVertically && checkInHorizontally;

            const _isHover = checkBoth
                ? isPointInRect(point, boundingRect, includeBorders) :
                checkInVertically ?
                    isInRange([boundingRect.top, boundingRect.bottom], clientY, includeBorders, includeBorders)
                    : isInRange([boundingRect.left, boundingRect.right], clientX, includeBorders, includeBorders);

            setIsHover(_isHover)
        },
        [ref.current, isHover, includeBorders, checkInVertically, checkInHorizontally, top, right, bottom, left]
    );


    const onTouchEnd = useCallback(() => {
        setIsHover(false);
    }, [])

    useEffect(() => {
        if (updateOnTouchEnd)
            document.addEventListener('touchend', onTouchEnd, { passive: true });
        return () => {
            document.removeEventListener('touchend', onTouchEnd);
        }
    }, [updateOnTouchEnd, onTouchEnd])

    useEffect(() => {
        if (active) {
            document.addEventListener('mousemove', isMouseOver, { passive: true });
            document.addEventListener('touchmove', isMouseOver, { passive: true });
        } else {
            setIsHover(false);
        }
        return () => {
            document.removeEventListener('mousemove', isMouseOver);
            document.removeEventListener('touchmove', isMouseOver);
        };
    }, [isMouseOver, active]);

    return { isHover };
};
export default useHover;
