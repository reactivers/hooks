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
declare const useMeasure: (a: UseMeasureProps) => Measure;
export default useMeasure;
