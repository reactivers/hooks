import { createContext, FC, useCallback, useContext, useState } from "react";
import useUtils from "../useUtils";

interface CookieContext {
    cookie: Record<string, any>;
    getItem: (key: string) => any;
    removeItem: (key: string) => void;
    setItem: (params: CookieSetItem) => void;
}
const CookieContext = createContext({} as CookieContext);

interface LocalStorateProviderProps {
    onChange?: (cookie: Record<string, any>) => void;
}

export interface CookieSetItem {
    key: string,
    value: any,
    expireDays?: number,
    expireHours?: number,
    expire?: string,
    path?: string
}

const CookieProvider: FC<LocalStorateProviderProps> = ({ onChange, children }) => {
    const { tryJSONparse, tryJSONStringify } = useUtils();

    const getCookies = useCallback(() => {
        const _cookies = document.cookie.split(';');
        const cookies = {};
        _cookies.forEach(cookie => {
            const [key, value] = cookie.split("=");
            cookies[key] = tryJSONparse(value);
        });
        return cookies;
    }, [])

    const [cookie, setCookie] = useState(getCookies());


    const setItem: (params: CookieSetItem) => void = useCallback(({ key, value, expireDays, expireHours, expire, path = "/" }) => {
        if (!key) throw new Error("No key passed");
        var d = new Date();
        const oneHour = 60 * 60 * 1000;
        if (!!expireDays) {
            d.setTime(d.getTime() + (expireDays * 24 * oneHour));
        } else if (!!expireHours) {
            d.setTime(d.getTime() + (expireHours * oneHour));
        }
        const newCookie = tryJSONStringify(value)
        document.cookie = `${key}=${newCookie};expires=${expire || d.toUTCString()};path=${path}`;
        setCookie(old => {
            const newCookies = { ...old, [key]: newCookie };
            if (onChange) onChange(newCookies)
            return newCookies;
        })
    }, [onChange])

    const getItem: (key: string) => void = useCallback(key => {
        if (!key) throw new Error("No key passed");
        return cookie[key];
    }, [cookie])

    const removeItem: (key: string) => void = useCallback(key => {
        if (!key) throw new Error("No key passed");
        const invalidDate = "Thu, 01 Jan 1970 00:00:01 GMT";
        setCookie(old => {
            const newCookie = { ...old };
            document.cookie = `${key}= ;expires=${invalidDate};`;
            delete newCookie[key];
            if (onChange) onChange(newCookie)
            return newCookie;
        })
    }, [onChange])

    return (
        <CookieContext.Provider value={{
            cookie,
            getItem,
            setItem,
            removeItem
        }}>
            {children}
        </CookieContext.Provider>
    )
}

export const useCookieContext = () => {
    const context = useContext(CookieContext);
    if (context === undefined) {
        throw new Error('useCookieContext must be used within an CookieContext.Provider');
    }
    return context;
};

export default CookieProvider;
