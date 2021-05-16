import { useCallback } from 'react';
import { CookieSetItem as ContextCookieSetItem, useCookieContext } from './context';

interface CookieSetItem {
    key?: string,
    value: any,
    expireDays?: number,
    expireHours?: number,
    expire?: string,
    path?: string
}

interface IUseCookieReturn {
    getItem: (key?: string) => any;
    setItem: (params: CookieSetItem) => void;
    removeItem: (key?: string) => void;
    cookie: Record<string, any>
}

const useCookie: (key?: string) => IUseCookieReturn = (key?: string) => {
    const { getItem: _getItem, setItem: _setItem, removeItem: _removeItem, cookie } = useCookieContext();

    const getItem = useCallback((_key = undefined) => {
        return _getItem(key || _key)
    }, [_getItem])

    const setItem = useCallback((_params: CookieSetItem) => {
        const params = { ..._params };
        if (!!key && !params.key) params.key = key;
        _setItem(params as ContextCookieSetItem)
    }, [_setItem])


    const removeItem = useCallback((_key = undefined) => {
        return _removeItem(key || _key)
    }, [_removeItem])

    return { getItem, setItem, removeItem, cookie }
}

export default useCookie
