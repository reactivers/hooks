import { createContext, FC, useContext, useMemo, useState } from "react";

export interface LocalesContextProps<T> {
    locale: T;
    setActiveLanguage: (lang: Languages) => void;
}

declare type Languages = "af" | "sq" | "ar-SA" | "ar-IQ" | "ar-EG" | "ar-LY" | "ar-DZ" | "ar-MA" | "ar-TN" | "ar-OM" |
    "ar-YE" | "ar-SY" | "ar-JO" | "ar-LB" | "ar-KW" | "ar-AE" | "ar-BH" | "ar-QA" | "eu" | "bg" |
    "be" | "ca" | "zh-TW" | "zh-CN" | "zh-HK" | "zh-SG" | "hr" | "cs" | "da" | "nl" | "nl-BE" | "en" |
    "en-US" | "en-EG" | "en-AU" | "en-GB" | "en-CA" | "en-NZ" | "en-IE" | "en-ZA" | "en-JM" |
    "en-BZ" | "en-TT" | "et" | "fo" | "fa" | "fi" | "fr" | "fr-BE" | "fr-CA" | "fr-CH" | "fr-LU" |
    "gd" | "gd-IE" | "de" | "de-CH" | "de-AT" | "de-LU" | "de-LI" | "el" | "he" | "hi" | "hu" |
    "is" | "id" | "it" | "it-CH" | "ja" | "ko" | "lv" | "lt" | "mk" | "mt" | "no" | "pl" |
    "pt-BR" | "pt" | "rm" | "ro" | "ro-MO" | "ru" | "ru-MI" | "sz" | "sr" | "sk" | "sl" | "sb" |
    "es" | "es-AR" | "es-GT" | "es-CR" | "es-PA" | "es-DO" | "es-MX" | "es-VE" | "es-CO" |
    "es-PE" | "es-EC" | "es-CL" | "es-UY" | "es-PY" | "es-BO" | "es-SV" | "es-HN" | "es-NI" |
    "es-PR" | "sx" | "sv" | "sv-FI" | "th" | "ts" | "tn" | "tr" | "uk" | "ur" | "ve" | "vi" | "xh" |
    "ji" | "zu"

export interface LocalesProviderProps<T> {
    locales?: {
        [language in Languages]?: T
    };
    activeLanguage?: Languages
}

function createLocale<T>() {

    const LocalesContext = createContext({} as LocalesContextProps<T>);

    const LocalesProvider: FC<LocalesProviderProps<T>> = ({ locales, activeLanguage: _activeLanguage, children }) => {

        const [activeLanguage, setActiveLanguage] = useState<Languages>(_activeLanguage || (navigator.language as Languages))
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
