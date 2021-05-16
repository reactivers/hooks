import { createContext, FC, useCallback, useContext, useState } from "react";
import useUtils from "../useUtils";


interface LocalStorageContext {
    localStorage: Record<string, any>;
    getItem: (key: string) => any;
    removeItem: (key: string) => void;
    setItem: (params: { key: string, value: any }) => void;
}
const LocalStorageContext = createContext({} as LocalStorageContext);

interface LocalStorageProviderProps {
    withState?: boolean;
    onChange?: (localStorage: Record<string, any>) => void;
}

const LocalStorageProvider: FC<LocalStorageProviderProps> = ({ withState = true, onChange, children }) => {
    const { tryJSONparse, tryJSONStringify } = useUtils();

    const getLocalStorage = useCallback(() => {
        const localStorageKeys = Object.keys(window.localStorage);
        const localStorage = {};
        localStorageKeys.forEach(key => {
            let value = window.localStorage[key];
            localStorage[key] = tryJSONparse(value);
        })
        return localStorage;
    }, [])

    const [localStorage, setLocalStorage] = useState(getLocalStorage());


    const setItem: (params: { key: string, value: any }) => void = useCallback(({ key, value: _value }) => {
        if (!key) throw new Error("No key passed");

        const value = tryJSONparse(_value);
        window.localStorage.setItem(key, tryJSONStringify(_value));
        if (withState) {
            setLocalStorage(old => {
                const newLocalStorage = { ...old, [key]: value };
                if (onChange) onChange(newLocalStorage)
                return newLocalStorage;
            })
        } else {
            onChange(getLocalStorage())
        }
    }, [onChange, withState, getLocalStorage])

    const getItem: (key: string) => void = useCallback(key => {
        if (!key) throw new Error("No key passed");
        if (withState)
            return localStorage[key];
        else
            return getLocalStorage()[key]
    }, [localStorage, withState, getLocalStorage])

    const removeItem: (key: string) => void = useCallback(key => {
        if (!key) throw new Error("No key passed");
        window.localStorage.removeItem(key);
        if (withState)
            setLocalStorage(old => {
                const newLocalStorage = { ...old };
                delete newLocalStorage[key];
                if (onChange) onChange(newLocalStorage)
                return newLocalStorage;
            })
        else
            if (onChange) onChange(getLocalStorage())
    }, [onChange, withState, getLocalStorage])

    return (
        <LocalStorageContext.Provider value={{
            localStorage,
            getItem,
            setItem,
            removeItem
        }}>
            {children}
        </LocalStorageContext.Provider>
    )
}

export const useLocalStorageContext = () => {
    const context = useContext(LocalStorageContext);
    if (context === undefined) {
        throw new Error('useLocalStorageContext must be used within an LocalStorageContext.Provider');
    }
    return context;
};

export default LocalStorageProvider;
