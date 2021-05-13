import { useCallback } from 'react';
import useLocalStorage from "../useLocalStorage";
import { useAuthContext } from './context';

declare global {
    interface Window {
        gapi: GoogleAuthApi;
        FB: FacebookAuthApi;
    }
}

interface GoogleAuthApi {
    auth2: any
}

interface FacebookAuthApi {
    logout: any
}

const useAuth = () => {
    const { localStorageTokenKeyName, onLogout, onLogin, setToken, setUser, user } = useAuthContext();
    const { token } = user;
    const { setItem } = useLocalStorage(localStorageTokenKeyName)

    const logout = useCallback(() => {
        setItem("")
        const gapi = window.gapi;
        if (gapi)
            if (gapi.auth2) {
                var auth2 = gapi.auth2.getAuthInstance();
                if (auth2) {
                    auth2.signOut().then(function () {
                        console.log('User signed out.');
                    });
                }
            }

        const FB = window.FB;
        if (FB) {
            if (FB.logout) {
                FB.logout(function (response) {
                });
            }
        }
        onLogout();
    }, [setItem, onLogout])

    const login = useCallback((data) => {
        setToken(data.token);
        onLogin(data)
    }, [onLogin, setToken])

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
