import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

declare type Themes = "light" | "dark";

interface ThemeContextProps<T> {
    theme: T;
    current: Themes
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
        const darkMedia = window.matchMedia(DARK_MEDIA_QUERY);
        const lightMedia = window.matchMedia(LIGHT_MEDIA_QUERY);

        const initialTheme: Themes = _theme === "system" ? darkMedia.matches ? "dark" : "light" : _theme as Themes;
        const [currentTheme, setCurrentTheme] = useState<Themes>(initialTheme);

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
            if (_theme === "system") {
                darkMedia.addEventListener("change", getCurrentTheme);
                lightMedia.addEventListener("change", getCurrentTheme);
            } else {
                setCurrentTheme(_theme as Themes)
            }
            return () => {
                darkMedia.removeEventListener("change", getCurrentTheme);
                lightMedia.removeEventListener("change", getCurrentTheme);
            }
        }, [_theme, getCurrentTheme])

        const theme = styles[currentTheme];
        const value: ThemeContextProps<T> = { theme, current: currentTheme };

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