import actions from "../actions";

const loadingReducer = (state = {}, action) => {
    const {queue} = state;
    switch (action.type) {
        case actions.INCREASE_LOADING_QUEUE:
            return {queue: queue + 1}
        case actions.DECREASE_LOADING_QUEUE:
            return {queue: queue > 0 ? queue - 1 : 0}
    }
    return state;
}

export default loadingReducer;
