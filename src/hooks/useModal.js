import React, {useCallback, useContext} from 'react';
import {StoreContext} from "../store";
import actions from '../actions'

const useModal = () => {
    const [, dispatch] = useContext(StoreContext);

    const showModal = useCallback((params) => {
        const {type, title, ...rest} = params;
        dispatch({
            type: actions.SHOW_MODAL,
            payload: {
                type,
                title,
                ...rest
            }
        })
    }, [dispatch])

    const showConfirmModal = useCallback((params) => {
        showModal({
            type: 'confirm',
            confirmButtonProps: {title: 'Kaldır', type: "danger"},
            ...params
        })
    }, [showModal])

    return {showModal, showConfirmModal};
};
export default useModal;
