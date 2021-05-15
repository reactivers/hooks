import { FC } from "react";
export interface LocalesContextProps<T> {
    locale: T;
    setActiveLanguage: (lang: string) => void;
}
export interface LocalesProviderProps<T> {
    locales?: Record<string, T>;
    activeLanguage?: string;
}
declare function createLocale<T>(): {
    LocalesProvider: FC<LocalesProviderProps<T>>;
    useLocale: () => LocalesContextProps<T>;
};
export default createLocale;
