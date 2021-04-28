import { MutableRefObject } from 'react';
interface HoverProps {
    ref: MutableRefObject<any>;
    active?: boolean;
    axis?: {
        vertical?: boolean;
        horizontal?: boolean;
    };
    offsets?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    updateOnTouchEnd?: boolean;
    includeBorders?: boolean;
}
interface HoverResponse {
    isHover: boolean;
}
declare const useHover: (props: HoverProps) => HoverResponse;
export default useHover;
