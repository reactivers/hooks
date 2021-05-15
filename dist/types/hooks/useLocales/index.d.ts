import { FC } from "react";
export interface LocalesContextProps<T> {
    locale: T;
    getLocale: (payload: {
        name: keyof T;
        params?: any;
    }) => string;
    setActiveLanguage: (lang: string) => void;
}
export interface LocalesProviderProps<T> {
    locales?: {
        [key: string]: T;
    };
    activeLanguage?: string;
}
declare function createLocale<T>(): {
    LocalesProvider: FC<LocalesProviderProps<T>>;
    useLocale: () => LocalesContextProps<T>;
};
export default createLocale;
