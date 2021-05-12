import { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AllLocales from "../../locales/locales";

export interface LocalesContextProps {
    locale: any;
    getLocale: (payload: { name: string, params?: any }) => string;
    setActiveLanguage: (lang: string) => void;
}

export interface LocalesProviderProps {
    locales?: any
    activeLanguage?: string
}

const LocalesContext = createContext({} as LocalesContextProps);

const LocalesProvider: FC<LocalesProviderProps> = ({ locales = AllLocales, activeLanguage: _activeLanguage = 'en', children }) => {

    const [activeLanguage, setActiveLanguage] = useState(_activeLanguage)
    const locale = useMemo(() => locales[activeLanguage], [locales, activeLanguage])

    const getLocale = useCallback(({ name, params }) => {
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

export const useLocalesContext = () => {
    const context = useContext(LocalesContext);
    if (context === undefined) {
        throw new Error('useLocalesContext must be used within an LocalesContext.Provider');
    }
    return context;
};

export default LocalesProvider;
