import React, {useCallback, useContext} from 'react';
import {StoreContext} from "../store";
import actions from '../actions'

const useNotification = () => {
    const [, dispatch] = useContext(StoreContext);

    const pushNotification = useCallback((params) => {
        const {type, ...rest} = params;
        dispatch({
            type: actions.PUSH_IN_APP_NOTIFICATION,
            payload: {
                data: {
                    type,
                    ...rest
                }
            }
        })
    }, [dispatch])

    const pushSuccessNotification = useCallback((params) => {
        pushNotification({
            type: 'success',
            ...params
        })
    }, [pushNotification])

    const pushErrorNotification = useCallback((params) => {
        pushNotification({
            type: 'error',
            ...params
        })
    }, [pushNotification])

    const pushInfoNotification = useCallback((params) => {
        pushNotification({
            type: 'info',
            ...params
        })
    }, [pushNotification])


    return {pushNotification, pushSuccessNotification, pushErrorNotification, pushInfoNotification};
};
export default useNotification;
