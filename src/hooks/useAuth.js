import {useCallback, useContext} from 'react';
import {StoreContext} from "../store";
import useLocalStorage from "./useLocalStorage";
import actions from "../actions";

const useAuth = () => {
    const [state, dispatch] = useContext(StoreContext);
    const {setItem} = useLocalStorage("token")
    const {auth} = state || {};

    const logout = useCallback(() => {
        setItem("")
        dispatch({type: actions.LOGOUT})

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

    }, [dispatch, setItem])

    const setToken = useCallback((token) => {
        if (token)
            setItem(token);
        dispatch({type: actions.SET_TOKEN, payload: {data: {token}}})
    }, [dispatch, setItem])

    const update = useCallback((data) => {
        dispatch({type: actions.UPDATE_AUTH, payload: {data}})
    }, [dispatch])

    const login = useCallback((data) => {
        setToken(data.token);
        delete data.token;
        dispatch({type: actions.LOGIN, payload: {data, checked: true, isLoggedIn: true}})
    }, [dispatch, setToken])

    return {...auth, logout, setToken, login, update}
}

export default useAuth;
