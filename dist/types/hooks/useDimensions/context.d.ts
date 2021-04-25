import { FC } from "react";
export declare type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
interface DimensionsContextProps {
    sizes: Array<Breakpoint>;
    widths: Array<number>;
}
interface DimensionsProviderProps {
    sizes?: Array<Breakpoint>;
    widths?: Array<number>;
}
declare const DimensionsProvider: FC<DimensionsProviderProps>;
export declare const useDimensionsContext: () => DimensionsContextProps;
export default DimensionsProvider;
