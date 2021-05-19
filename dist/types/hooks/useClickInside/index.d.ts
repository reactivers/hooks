import { MutableRefObject } from "react";
interface IUseClickInside {
    ref: MutableRefObject<any>;
    callback: (event: MouseEvent | TouchEvent) => void;
    withState?: boolean;
}
declare const useClickInside: (params: IUseClickInside) => boolean;
export default useClickInside;
