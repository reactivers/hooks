
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import useUtils from '../useUtils';
import ResizeObserver from "resize-observer-polyfill"

export interface ISafeArea {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

const SafeAreaContext = createContext({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
} as ISafeArea);

const SafeAreaProvider = ({ children }) => {
    const { isEqualJSON } = useUtils();
    const [safeArea, setSafeArea] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
    const insets = ["safe-area-inset-top", "safe-area-inset-right", "safe-area-inset-bottom", "safe-area-inset-left"]

    useEffect(() => {
        insets.forEach(inset => {
            document.documentElement.style.setProperty(`--${inset}`, `env(${inset})`);
        })
    }, [])

    const getOffsets = useCallback(() => {
        const [top, right, bottom, left] = insets.map(inset => parseInt(window.getComputedStyle(document.documentElement).getPropertyValue(`--${inset}`) || "0"))
        const offsets = { top, bottom, left, right };
        return offsets;
    }, []);

    const update = useCallback(() => {
        setSafeArea((oldSafeArea) => {
            const newSafeArea = getOffsets();
            if (!isEqualJSON(oldSafeArea, newSafeArea)) {
                return { ...newSafeArea };
            }
            return oldSafeArea;
        });
    }, [getOffsets]);

    useEffect(() => {
        update();
        const body = new ResizeObserver(update);
        window.visualViewport.addEventListener("resize", update)
        window.addEventListener("orientationchange", update)
        if (body) body.observe(document.body);
        return () => {
            if (body) body.disconnect();
            window.visualViewport.removeEventListener("resize", update)
            window.removeEventListener("orientationchange", update);
        };
    }, [update]);

    return (
        <SafeAreaContext.Provider value={safeArea}>{children}</SafeAreaContext.Provider>
    );
};
export default SafeAreaProvider;


export const useSafeAreaContext = () => {
    const context = useContext(SafeAreaContext);
    return context;
}