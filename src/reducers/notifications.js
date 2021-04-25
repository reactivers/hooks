import actions from "../actions";

const notificationsReducer = (state = [], action) => {
    const {data} = action.payload || {}
    const {index, type, title, message} = data || {};

    const oldState = [...state];
    switch (action.type) {
        case actions.PUSH_IN_APP_NOTIFICATION:
            oldState.push({type, title, message});
            return oldState;
        case actions.POP_IN_APP_NOTIFICATION:
            oldState.splice(index, 1);
            return oldState
    }
    return state;
}

export default notificationsReducer;
