import { ReactNode } from "react";
declare type Themes = "light" | "dark";
interface ThemeContextProps<T> {
    theme: T;
    current: Themes;
}
interface ThemeStyle<T> {
    light: T;
    dark: T;
}
interface ThemeContextCreater<T> {
    theme?: Themes | "system";
    styles: ThemeStyle<T>;
    onChange?: (theme: Themes) => void;
}
interface ThemeProviderProps<T> extends ThemeContextCreater<T> {
    children: ReactNode;
}
declare function createTheme<T>(): {
    ThemeProvider: ({ theme: _theme, styles, onChange, children }: ThemeProviderProps<T>) => JSX.Element;
    useTheme: () => ThemeContextProps<T>;
};
export default createTheme;
