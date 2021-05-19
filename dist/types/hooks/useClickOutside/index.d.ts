import { MutableRefObject } from "react";
interface IUseClickOutside {
    ref: MutableRefObject<any>;
    callback: (event: MouseEvent | TouchEvent) => void;
    withState?: boolean;
}
declare const useClickOutside: (params: IUseClickOutside) => boolean;
export default useClickOutside;
