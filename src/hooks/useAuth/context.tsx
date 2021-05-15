import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import useLocalStorage from "../useLocalStorage";

interface AuthContextProps {
    localStorageTokenKeyName: string;
    user?: UserInfo;
    setUser: (info: UserInfo) => void;
    setToken: (token: string) => void;
    onLogin: (info: UserInfo) => void;
    onLogout: () => void;
}

interface AuthProviderProps {
    localStorageTokenKeyName?: string;
    initialCheckToken?: boolean;
    user?: UserInfo;
    onLogin?: (info: UserInfo) => void;
    onLogout?: () => void;
}

export interface UserInfo {
    username?: string;
    token?: string;
    isLoggedIn: boolean;
    checked: boolean;
    userInfo?: any;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider: FC<AuthProviderProps> = ({
    localStorageTokenKeyName = "token",
    user: _user,
    onLogin: _onLogin,
    onLogout: _onLogout,
    initialCheckToken,
    children
}) => {

    const [user, setUser] = useState<UserInfo>(_user);
    const { getItem, setItem } = useLocalStorage(localStorageTokenKeyName)

    const onLogin = useCallback((info) => {
        setUser({
            token: info.token,
            ...(info || {}),
            isLoggedIn: true,
            checked: true
        })
        if (_onLogin) _onLogin(info)
    }, [_onLogin])

    const onLogout = useCallback(() => {
        setUser({
            isLoggedIn: false,
            checked: true
        })
        if (_onLogout) _onLogout()
    }, [_onLogout])

    const setToken = useCallback((token: string) => {
        setUser((old) => ({ ...old, token }))
        setItem("")
    }, [])

    useEffect(() => {
        if (initialCheckToken) {
            const oldToken = getItem();
            if (oldToken) {
                onLogin({ token: oldToken })
            }
        }
    }, [initialCheckToken, onLogin])

    return (
        <AuthContext.Provider value={{
            localStorageTokenKeyName,
            user,
            setUser,
            setToken,
            onLogin,
            onLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthContext.Provider');
    }
    return context;
};

AuthProvider.defaultProps = {
    localStorageTokenKeyName: "token",
    user: { isLoggedIn: false, checked: false },
    initialCheckToken: true,
}

export default AuthProvider;
