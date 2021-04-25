import {guid} from "../utils/functions";
import actions from "../actions";

const modalsReducer = (state={}, action) => {
    const {id: _id, ...rest} = action.payload || {}
    const id = _id || guid();
    const oldState = {...state};
    switch (action.type) {
        case actions.SHOW_MODAL:
            oldState[id] = {id, visible: true, ...rest};
            return oldState;
        case actions.HIDE_MODAL:
            oldState[id] = {id, visible: false, ...rest};
            return oldState
        case actions.DELETE_MODAL:
            delete oldState[id];
            return oldState
    }
    return state;
}

export default modalsReducer;
