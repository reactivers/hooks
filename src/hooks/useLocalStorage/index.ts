import { useCallback } from 'react';
import { useLocalStorageContext } from './context';

const useLocalStorage = (key?: string) => {
    const { getItem: _getItem, setItem: _setItem, removeItem: _removeItem, localStorage } = useLocalStorageContext();

    const getItem = useCallback((_key = undefined) => {
        return _getItem(key || _key)
    }, [_getItem])

    const setItem = useCallback((value) => {
        return _setItem({ key, value })
    }, [_setItem])

    const setItemWithKey = useCallback((_key, value) => {
        return _setItem({ key: key || _key, value })
    }, [_setItem])

    const removeItem = useCallback((_key = undefined) => {
        return _removeItem(key || _key)
    }, [_removeItem])

    return { getItem, setItem, removeItem, setItemWithKey, localStorage }
}

export default useLocalStorage
