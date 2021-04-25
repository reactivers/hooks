import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";
import useRoute from "../../hooks/useRoute";

const history = createBrowserHistory();

const AppWrapper = (props) => {
    const {userLoadOptions, publicLayout, authorizedLayout, checkingRenderer} = props;
    const {isLoggedIn, checked, logout, login, token, setToken} = useAuth();

    const {getItem: getLocalToken, removeItem: removeToken} = useLocalStorage("token")
    const {fetched, fetching, load} = useApi()

    const localToken = getLocalToken()

    useEffect(() => {
        if (localToken) {
            if (token) {
                if (!fetching && !fetched) {
                    load({
                        ...userLoadOptions,
                        onSuccess: (response) => {
                            if (response.data) {
                                login(response.data)
                            } else {
                                logout()
                            }
                        },
                        onError: () => {
                            removeToken();
                            logout()
                        }
                    })
                }
            } else {
                setToken(localToken)
            }
        } else {
            logout()
        }
    }, [localToken, removeToken, fetching, load, fetched, login, logout, token, setToken])

    if (!checked || (localToken && !fetched)) {
        if (checkingRenderer)
            return <props.checkingRenderer/>
        return (
            <div style={{minHeight: "100vh"}} className="center">
                Yükleniyor...
            </div>
        );
    } else if (isLoggedIn) {
        return (
            <AppRouter layout={authorizedLayout}/>
        )
    } else {
        return (
            <AppPublicRouter layout={publicLayout}/>
        )
    }
}

const AppPublicRouter = props => {
    return (
        <Router history={history}>
            <props.layout>
                <AppPublicRoutesRenderer/>
            </props.layout>
        </Router>
    )
}

const AppPublicRoutesRenderer = props => {
    const {publicRouterRoutes} = useRoute();
    return (
        <Switch>
            {publicRouterRoutes}
        </Switch>
    )
}

const AppRouter = props => {
    return (
        <Router history={history}>
            <props.layout>
                <AppRoutesRenderer/>
            </props.layout>
        </Router>
    )
};

const AppRoutesRenderer = () => {
    const {authorizedRouterRoutes} = useRoute();
    return (
        <Switch>
            {authorizedRouterRoutes}
        </Switch>
    )
}

export default AppWrapper;
