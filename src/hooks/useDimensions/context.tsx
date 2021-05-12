import { createContext, FC, useContext } from "react";

export declare type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

interface DimensionsContextProps {
    sizes: Array<Breakpoint>;
    widths: Array<number>;
}

interface DimensionsProviderProps {
    sizes?: Array<Breakpoint>;
    widths?: Array<number>;
}

const DimensionsContext = createContext({} as DimensionsContextProps);

const DimensionsProvider: FC<DimensionsProviderProps> = ({
    widths = [576, 768, 992, 1200, 1600, 1800],
    sizes = ["xs", "sm", "md", "lg", "xl", "xxl"],
    children }) => {
    return (
        <DimensionsContext.Provider value={{ sizes, widths }}>
            {children}
        </DimensionsContext.Provider>
    )
}

export const useDimensionsContext = () => {
    const context = useContext(DimensionsContext);
    if (context === undefined) {
        throw new Error('useDimensionsContext must be used within an DimensionsContext.Provider');
    }
    return context;
};

export default DimensionsProvider;
