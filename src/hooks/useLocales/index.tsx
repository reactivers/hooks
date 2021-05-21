import { createContext, FC, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import useUtils from "../useUtils";

export interface LocalesContextProps<T> {
    locale: T;
    setActiveLanguage: (lang: Languages) => void;
}

declare type Languages = ('af' | 'sq' | 'an' | 'ar' | 'ar-dz' | 'ar-bh' | 'ar-eg' | 'ar-iq' | 'ar-jo' | 'ar-kw' | 'ar-lb' | 'ar-ly' | 'ar-ma' | 'ar-om' | 'ar-qa' | 'ar-sa' | 'ar-sy' | 'ar-tn' | 'ar-ae' | 'ar-ye' | 'hy' | 'as' | 'ast' | 'az' | 'eu' | 'bg' | 'be' | 'bn' | 'bs' | 'br' | 'my' | 'ca' | 'ch' | 'ce' | 'zh' | 'zh-hk' | 'zh-cn' | 'zh-sg' | 'zh-tw' | 'cv' | 'co' | 'cr' | 'hr' | 'cs' | 'da' | 'nl' | 'nl-be' | 'en' | 'en-au' | 'en-bz' | 'en-ca' | 'en-ie' | 'en-jm' | 'en-nz' | 'en-ph' | 'en-za' | 'en-tt' | 'en-gb' | 'en-us' | 'en-zw' | 'eo' | 'et' | 'fo' | 'fa' | 'fj' | 'fi' | 'fr' | 'fr-be' | 'fr-ca' | 'fr-fr' | 'fr-lu' | 'fr-mc' | 'fr-ch' | 'fy' | 'fur' | 'gd' | 'gd-ie' | 'gl' | 'ka' | 'de' | 'de-at' | 'de-de' | 'de-li' | 'de-lu' | 'de-ch' | 'el' | 'gu' | 'ht' | 'he' | 'hi' | 'hu' | 'is' | 'id' | 'iu' | 'ga' | 'it' | 'it-ch' | 'ja' | 'kn' | 'ks' | 'kk' | 'km' | 'ky' | 'tlh' | 'ko' | 'ko-kp' | 'ko-kr' | 'la' | 'lv' | 'lt' | 'lb' | 'mk' | 'ms' | 'ml' | 'mt' | 'mi' | 'mr' | 'mo' | 'nv' | 'ng' | 'ne' | 'no' | 'nb' | 'nn' | 'oc' | 'or' | 'om' | 'fa-ir' | 'pl' | 'pt' | 'pt-br' | 'pa' | 'pa-in' | 'pa-pk' | 'qu' | 'rm' | 'ro' | 'ro-mo' | 'ru' | 'ru-mo' | 'sz' | 'sg' | 'sa' | 'sc' | 'sd' | 'si' | 'sr' | 'sk' | 'sl' | 'so' | 'sb' | 'es' | 'es-ar' | 'es-bo' | 'es-cl' | 'es-co' | 'es-cr' | 'es-do' | 'es-ec' | 'es-sv' | 'es-gt' | 'es-hn' | 'es-mx' | 'es-ni' | 'es-pa' | 'es-py' | 'es-pe' | 'es-pr' | 'es-es' | 'es-uy' | 'es-ve' | 'sx' | 'sw' | 'sv' | 'sv-fi' | 'sv-sv' | 'ta' | 'tt' | 'te' | 'th' | 'tig' | 'ts' | 'tn' | 'tr' | 'tk' | 'uk' | 'hsb' | 'ur' | 've' | 'vi' | 'vo' | 'wa' | 'cy' | 'xh' | 'ji' | 'zu')

export interface LocalesProviderProps<T> {
    locales?: {
        [language in Languages]?: T
    };
    activeLanguage?: Languages,
    defaultLanguage?: Languages;
}

function createLocale<T>() {

    const LocalesContext = createContext({} as LocalesContextProps<T>);

    const LocalesProvider: FC<LocalesProviderProps<T>> = ({ locales, activeLanguage: _activeLanguage, defaultLanguage = "en-us", children }) => {
        const { isBrowser } = useUtils();
        const fallbacked = useRef(false);
        const getValidLanguage = useCallback((activeLanguage: Languages) => {
            fallbacked.current = false;
            if (locales[activeLanguage]) {
                return activeLanguage;
            } else {
                if (isBrowser()) {
                    const language = (navigator.language || "").toLowerCase();
                    const primLanguage = language.substring(0, 2)
                    if (locales[language])
                        return language as Languages
                    else if (locales[primLanguage]) {
                        return locales[primLanguage];
                    } else {
                        return defaultLanguage
                    }
                } else {
                    fallbacked.current = true;
                    return defaultLanguage
                }
            }
        }, [locales, defaultLanguage])


        const [activeLanguage, setActiveLanguage] = useState<Languages>(getValidLanguage(_activeLanguage))
        const locale = useMemo(() => locales[activeLanguage], [locales, activeLanguage])

        useLayoutEffect(() => {
            if (fallbacked.current) {
                setActiveLanguage(getValidLanguage(_activeLanguage));
            }
        }, [getValidLanguage, _activeLanguage, fallbacked.current])

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
