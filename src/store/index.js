import React, {createContext, useMemo, useReducer} from 'react';
import {combineReducers} from "../utils/functions";
import authReducer from "../reducers/auth";
import loadingReducer from "../reducers/loading";
import notificationsReducer from "../reducers/notifications";
import modalsReducer from "../reducers/modals";

let initialState = {
    auth: {},
    loading: {queue: 0},
    notifications: [],
    modals: {}
};

let reducers = {
    auth: authReducer,
    loading: loadingReducer,
    notifications: notificationsReducer,
    modals: modalsReducer
}

const rootReducer = combineReducers(reducers);
const StoreContext = createContext(initialState)

const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const store = useMemo(() => [state, dispatch], [state]);
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};

export {StoreContext}

export default StoreProvider
