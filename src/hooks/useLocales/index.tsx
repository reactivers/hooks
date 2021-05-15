import { createContext, FC, useCallback, useContext, useMemo, useState } from "react";
import AllLocales from "../../locales/locales";

export interface LocalesContextProps<T> {
    locale: T;
    getLocale: (payload: { name: keyof T, params?: any }) => string;
    setActiveLanguage: (lang: string) => void;
}

export interface LocalesProviderProps<T> {
    locales?: Record<string, T>;
    activeLanguage?: string
}

function createLocale<T>() {

    const LocalesContext = createContext({} as LocalesContextProps<T>);

    const LocalesProvider: FC<LocalesProviderProps<T>> = ({ locales = AllLocales, activeLanguage: _activeLanguage, children }) => {

        const [activeLanguage, setActiveLanguage] = useState(_activeLanguage)
        const locale = useMemo(() => locales[activeLanguage], [locales, activeLanguage])

        const getLocale: (params: { name: keyof T, params?: any }) => string = useCallback(({ name, params }) => {
            const localeValue = locale[name]
            if (localeValue) {
                return localeValue(params)
            }
            return name;
        }, [locale])

        return (
            <LocalesContext.Provider value={{
                locale,
                getLocale,
                setActiveLanguage,
            }}>
                {children}
            </LocalesContext.Provider>
        )
    }

    const useLocale = () => {
        const context = useContext(LocalesContext);
        if (context === undefined) {
            throw new Error('useLocalesContext must be used within an LocalesContext.Provider');
        }
        return context;
    };

    return {
        LocalesProvider,
        useLocale
    };
}

export default createLocale;
