import {useCallback} from 'react';

const useLocalStorage = (key, defaultValue) => {

    const getItem = useCallback((_defaultValue) => {
        try {
            const value = JSON.parse(window.localStorage.getItem(key))
            return value || _defaultValue || defaultValue
        } catch (e) {
            return defaultValue;
        }
    }, [defaultValue, key])

    const setItem = useCallback((_value) => {
        try {
            const value = JSON.stringify(_value);
            window.localStorage.setItem(key, value)
        } catch (e) {
            window.localStorage.setItem(key, defaultValue || '{}')
        }
    }, [defaultValue, key])

    const removeItem = useCallback(() => {
        window.localStorage.removeItem(key)
    }, [key])

    return {getItem, setItem, removeItem}
}

export default useLocalStorage
