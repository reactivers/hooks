import actions from "../actions";

const authReducer = (state={}, action) => {
    const {data} = action.payload || {}
    switch (action.type) {
        case actions.SET_TOKEN:
            return {...state, ...(data || {})};
        case actions.UPDATE_AUTH:
            return {...state, ...(data || {})};
        case actions.LOGIN:
            return {...state, ...(data || {}), checked: true, isLoggedIn: true};
        case actions.LOGOUT:
            return {checked: true, isLoggedIn: false};
        default:
            return state;
    }
}

export default authReducer;
