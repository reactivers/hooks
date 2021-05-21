import { MutableRefObject } from "react";
interface IUseClickInside {
    ref: MutableRefObject<any>;
    callback: (event: MouseEvent | TouchEvent) => void;
    passive?: boolean;
    withState?: boolean;
}
declare const useClickInside: (params: IUseClickInside) => boolean;
export default useClickInside;
