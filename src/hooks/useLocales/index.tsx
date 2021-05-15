import { createContext, FC, useContext, useMemo, useState } from "react";

export interface LocalesContextProps<T> {
    locale: T;
    setActiveLanguage: (lang: string) => void;
}

export interface LocalesProviderProps<T> {
    locales?: Record<string, T>;
    activeLanguage?: string
}

function createLocale<T>() {

    const LocalesContext = createContext({} as LocalesContextProps<T>);

    const LocalesProvider: FC<LocalesProviderProps<T>> = ({ locales, activeLanguage: _activeLanguage, children }) => {

        const [activeLanguage, setActiveLanguage] = useState<keyof typeof locales>(_activeLanguage)
        const locale = useMemo(() => locales[activeLanguage], [locales, activeLanguage])

        return (
            <LocalesContext.Provider value={{
                locale,
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
