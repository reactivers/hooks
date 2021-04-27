import { Breakpoint } from './context';
interface DimensionProps {
    breakpoints?: Array<Breakpoint>;
    watchWindowSize?: boolean;
}
interface Dimensions {
    width: number;
    height: number;
    size: Breakpoint;
}
interface DimensionResponse extends Dimensions {
    isSizeEqualOrLargerThan: (size: Breakpoint) => boolean;
    isSizeLargerThan: (size: Breakpoint) => boolean;
    isSizeEqualTo: (size: Breakpoint) => boolean;
    isSizeSmallerThan: (size: Breakpoint) => boolean;
    isSizeEqualOrSmallerThan: (size: Breakpoint) => boolean;
}
declare const useDimensions: (payload?: DimensionProps) => DimensionResponse;
export default useDimensions;
