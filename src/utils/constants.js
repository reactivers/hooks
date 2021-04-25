let mainColor = "#002171";
let successColor = "green";
let dangerColor = "#EF5350";

let routes = {
    publicRoutes: [],
    authorizedRoutes: [],
};

export const getRoutes = () => routes;
export const setRoutes = (newRoutes) => {
    routes = newRoutes
};

export let appURLs = {
    HTTP_REST_SERVER: {
        development: `http://localhost:8080/api`,
        production: "http://localhost:8080/api"
    },
    WS_REST_SERVER: {
        development: `ws://localhost:8080/ws`,
        production: "ws://localhost:8080/ws"
    }
}

let APP_NAMES = {
    WS_REST_SERVER: "WS_REST_SERVER",
    HTTP_REST_SERVER: "HTTP_REST_SERVER",
}

export const getAppURLs = () => {
    return appURLs
}

export const setAppURLs = (newAppURLs) => {
    appURLs = newAppURLs;
}

export const getAppNames = () => {
    return APP_NAMES
}

export const setAppNames = (newAppNames) => {
    APP_NAMES = newAppNames;
}

const getAppURL = (appname) => {
    const {NODE_ENV} = process.env;
    const appURLs = getAppURLs() || {};
    return appURLs[appname][NODE_ENV]
}

export const getMainColor = () => {
    return mainColor
}

export const setMainColor = (color) => {
    mainColor = color;
}

export const getSuccessColor = () => {
    return successColor
}

export const setSuccessColor = (color) => {
    successColor = color;
}

export const getDangerColor = () => {
    return dangerColor
}

export const setDangerColor = (color) => {
    dangerColor = color;
}

const constants = {
    mainColor: getMainColor(),
    successColor: getSuccessColor(),
    mainDangerColor: getDangerColor(),
    REST_SERVER: getAppURL(getAppNames().HTTP_REST_SERVER),
    WS_SERVER: getAppURL(getAppNames().WS_REST_SERVER),
}

export default constants
