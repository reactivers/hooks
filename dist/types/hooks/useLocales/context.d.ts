import { FC } from "react";
export interface LocalesContextProps {
    locale: any;
    getLocale: (payload: {
        name: string;
        params?: any;
    }) => string;
    setActiveLanguage: (lang: string) => void;
}
export interface LocalesProviderProps {
    locales?: any;
    activeLanguage?: string;
}
declare const LocalesProvider: FC<LocalesProviderProps>;
export declare const useLocalesContext: () => LocalesContextProps;
export default LocalesProvider;
