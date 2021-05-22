import { MutableRefObject } from "react";
interface IUseClickOutside {
    ref: MutableRefObject<any>;
    callback: (event: MouseEvent | TouchEvent) => void;
    withState?: boolean;
    passive?: boolean;
}
declare const useClickOutside: (params: IUseClickOutside) => boolean;
export default useClickOutside;
