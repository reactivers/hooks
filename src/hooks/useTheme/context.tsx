import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import useUtils from "../useUtils";

declare type Themes = "light" | "dark";

interface ThemeContextProps<T> {
    theme: T;
    current: Themes;
    setCurrentTheme: (current: Themes | "system") => void;
}

interface ThemeStyle<T> {
    light: T
    dark: T
}

interface ThemeContextCreater<T> {
    theme?: Themes | "system";
    styles: ThemeStyle<T>,
    onChange?: (theme: Themes) => void;
}

interface ThemeProviderProps<T> extends ThemeContextCreater<T> {
    children: ReactNode
}

const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";
const LIGHT_MEDIA_QUERY = "(prefers-color-scheme: light)";
const AndroidDarkMode = "AndroidDarkMode"

function createTheme<T>() {

    const ThemeContext = createContext<ThemeContextProps<T>>({} as ThemeContextProps<T>)

    const ThemeProvider = ({ theme: _theme = "system", styles, onChange = (a: Themes) => { }, children }: ThemeProviderProps<T>) => {
        const { isBrowser } = useUtils();


        const getInitialTheme = useCallback(() => {
            if (isBrowser()) {
                const darkMedia = window.matchMedia(DARK_MEDIA_QUERY);
                if (_theme === "system")
                    return darkMedia.matches ? "dark" : "light";
                else
                    return theme
            } else {
                return "light"
            }
        }, [])
        const isChanged = useRef(false);
        const [currentTheme, _setCurrentTheme] = useState<Themes>(getInitialTheme());

        const setCurrentTheme = useCallback((newTheme) => {
            isChanged.current = true;
            if (newTheme === 'system') {
                _setCurrentTheme(getInitialTheme())
            } else {
                _setCurrentTheme(newTheme)
            }
        }, [getInitialTheme])

        const updateInitialTheme = useCallback(() => {
            setCurrentTheme(getInitialTheme());
        }, [setCurrentTheme, getInitialTheme])

        useEffect(() => {
            if (isBrowser()) {
                if (!isChanged.current) {
                    updateInitialTheme()
                }
            }
        }, [isChanged.current, updateInitialTheme])

        const getCurrentTheme = useCallback((e) => {
            const { navigator: { userAgent } } = window;
            if (userAgent.includes(AndroidDarkMode)) {
                setCurrentTheme('dark');
                onChange('dark')
            } else if (e && e.matches) {
                if (e.media === DARK_MEDIA_QUERY) {
                    setCurrentTheme('dark');
                    onChange('dark')
                } else {
                    setCurrentTheme('light');
                    onChange('light')
                }
            }
        }, [onChange]);

        useEffect(() => {
            const darkMedia = window.matchMedia(DARK_MEDIA_QUERY);
            const lightMedia = window.matchMedia(LIGHT_MEDIA_QUERY);
            if (_theme === "system") {
                if (darkMedia.addEventListener) {
                    darkMedia.addEventListener("change", getCurrentTheme);
                    lightMedia.addEventListener("change", getCurrentTheme);
                } else if (darkMedia.addListener) {
                    darkMedia.addListener(getCurrentTheme)
                    lightMedia.addListener(getCurrentTheme)
                }
            } else {
                setCurrentTheme(_theme as Themes)
            }
            return () => {
                if (darkMedia.removeEventListener) {
                    darkMedia.removeEventListener("change", getCurrentTheme);
                    lightMedia.removeEventListener("change", getCurrentTheme);
                }
                else if (darkMedia.removeListener) {
                    darkMedia.removeListener(getCurrentTheme);
                    lightMedia.removeListener(getCurrentTheme);
                }
            }
        }, [_theme, getCurrentTheme])

        const theme = styles[currentTheme];
        const value: ThemeContextProps<T> = { theme, current: currentTheme, setCurrentTheme };

        return (
            <ThemeContext.Provider value={value}>
                {children}
            </ThemeContext.Provider>
        )
    }

    const useTheme = () => {
        const context = useContext(ThemeContext);
        if (context === undefined) {
            throw new Error('useThemeContext must be used within an ThemeProvider');
        }
        return context;
    }

    return {
        ThemeProvider,
        useTheme
    };
}

export default createTheme;