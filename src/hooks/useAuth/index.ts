import { useCallback } from 'react';
import { useAuthContext, UserInfo } from './context';

interface IUseAuth {
    setToken: (token: string) => void,
    login: (data: any) => void,
    logout: () => void,
    setUser: (user: UserInfo) => void,
    user: UserInfo,
    token: string
}

const useAuth: () => IUseAuth = () => {
    const { onLogout, onLogin, setToken, setUser, user } = useAuthContext();
    const { token } = user;

    const logout = useCallback(() => {
        onLogout();
    }, [onLogout])

    const login = useCallback((data) => {
        onLogin(data)
    }, [onLogin])

    return {
        setToken,
        login,
        logout,
        setUser,
        user,
        token
    }
}

export default useAuth;
