const authActions = {
    SET_TOKEN: "set-token",
    UPDATE_AUTH: "update-auth",
    LOGIN: 'login',
    LOGOUT: 'logout',
    SIGNUP: 'signup',
}

const notificationActions = {
    PUSH_IN_APP_NOTIFICATION: 'pushInAppNotification',
    POP_IN_APP_NOTIFICATION: 'popInAppNotification',
}

const modalActions = {
    SHOW_MODAL: 'show-modal',
    HIDE_MODAL: 'hide-modal',
    DELETE_MODAL: "delete-modal"
}

const lodaingActions = {
    INCREASE_LOADING_QUEUE: 'increaseLoadingQueue',
    DECREASE_LOADING_QUEUE: 'decreaseLoadingQueue',
}

const socketActions = {
    ADD_MESSAGE_LISTENER: 'addMessageListener',
    REMOVE_MESSAGE_LISTENER: 'removeMessageListener',
    SET_SOCKET: 'setSocket',
}

const actions = {
    ...authActions,
    ...notificationActions,
    ...modalActions,
    ...lodaingActions,
    ...socketActions
}


export default actions
