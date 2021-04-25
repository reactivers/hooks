import React, {useCallback, useEffect, useState} from 'react';
import {getRoutes} from "../utils/constants";
import {Route} from "react-router-dom";
import useAuth from "./useAuth";
import {takeUndefinedAsTrue} from "../utils/functions";

const useRoute = params => {
    const {publicRoutes, authorizedRoutes} = getRoutes();
    const [publicRouterRoutes, setPublicRouterRoutes] = useState([]);
    const [authorizedRouterRoutes, setAuthorizedRouterRoutes] = useState([]);
    const [currentRouterRoutes, setCurrentRouterRoutes] = useState([]);
    const {isLoggedIn} = useAuth();

    const getAuthorizedRouterRoutes = useCallback(() => {
        return authorizedRoutes.map((route, index) => {
            const {exact: _exact, path, component, ...rest} = route;
            const exact = takeUndefinedAsTrue(_exact);
            return <Route exact={exact} path={path} component={component} key={index} {...rest}/>
        })
    }, [authorizedRoutes])

    const getPublicRouterRoutes = useCallback(() => {
        return publicRoutes.map((route, index) => {
            const {exact: _exact, path, component, ...rest} = route;
            const exact = takeUndefinedAsTrue(_exact);
            return <Route exact={exact} path={path} component={component} key={index} {...rest}/>
        })
    }, [publicRoutes])

    useEffect(() => {
        if (isLoggedIn)
            setCurrentRouterRoutes(authorizedRouterRoutes)
        else
            setCurrentRouterRoutes(publicRouterRoutes)
    }, [isLoggedIn, authorizedRouterRoutes, publicRouterRoutes])

    useEffect(() => {
        setAuthorizedRouterRoutes(getAuthorizedRouterRoutes())
        setPublicRouterRoutes(getPublicRouterRoutes())
    }, [getAuthorizedRouterRoutes, getPublicRouterRoutes])

    return {publicRouterRoutes, authorizedRouterRoutes, currentRouterRoutes};
}

export default useRoute;
