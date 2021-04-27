import { createContext, FC, useCallback, useContext, useState } from "react";

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
    user: _user = {
        isLoggedIn: false,
        checked: false
    },
    onLogin: _onLogin,
    onLogout: _onLogout,
    children
}) => {

    const [user, setUser] = useState<UserInfo>(_user);

    const onLogin = useCallback((info) => {
        setUser({
            ...(info || {}),
            isLoggedIn: true,
            checked: true
        })
        if (_onLogin) _onLogin(info)
    }, [_onLogin])

    const onLogout = useCallback(() => {
        setUser({
            isLoggedIn: false,
            checked: false
        })
        if (_onLogout) _onLogout()
    }, [_onLogout])

    const setToken = useCallback((token: string) => {
        setUser((old) => ({ ...old, token }))
    }, [])

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

export default AuthProvider;
