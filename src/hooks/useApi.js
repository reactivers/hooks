import React, {useCallback, useEffect, useState} from 'react';
import {iFetch, takeUndefinedAsTrue} from "../utils/functions";
import useAuth from "./useAuth";
import useLoading from "./useLoading";
import useNotification from "./useNotification";


const useApi = (_payload = {}) => {
    const {pushInfoNotification, pushErrorNotification} = useNotification()
    const {increase, decrease} = useLoading()
    const {token, logout} = useAuth()

    const [payload, setPayload] = useState(_payload)
    const [shouldFetch, setShouldFetch] = useState(false);

    const stringifyPayload = JSON.stringify(payload)

    const [data, setData] = useState({
        firstTimeFetched: false,
        fetched: false,
        fetching: false,
        response: _payload.initialValue || {}
    });
    const {firstTimeFetched} = data;

    const controller = new AbortController();
    const {signal} = controller;

    const {
        endpoint,
        params,
        onSuccess: payloadOnSuccess,
        onError: payloadOnError,
        pushNotification: payloadPushNotification
    } = payload;

    const onSuccess = useCallback((response) => {
        const pushNotification = takeUndefinedAsTrue(payloadPushNotification)
        if (payloadOnSuccess) payloadOnSuccess(response)

        decrease()

        setData(oldData => ({
            ...oldData,
            response,
            fetching: false,
            fetched: true,
            firstTimeFetched: true
        }))

        if (response.message && pushNotification) {
            pushInfoNotification({
                title: "Bildirim!", message: response.message
            })
        }
    }, [payloadPushNotification, payloadOnSuccess])

    const onError = useCallback((response, responseJSON = {}) => {
        const pushNotification = takeUndefinedAsTrue(payloadPushNotification)
        const notificationObj = {}

        pushErrorNotification({
            title: "Hata!",
            message: `options = ${endpoint}
            response = ${JSON.stringify(response)}
responseJSON = ${JSON.stringify(responseJSON)}
`,
        })

        decrease()

        switch (response.status) {
            case 404:
                notificationObj.type = "error"
                notificationObj.message = "Sayfa bulunamadı!"
                break;
            case 403:
                notificationObj.type = "warning"
                notificationObj.message = "Your session has expired!"
                break;
            case 401:
                logout();
                notificationObj.type = "warning"
                notificationObj.message = "Your session has expired!"
                break;
            default:
                notificationObj.type = "error"
                notificationObj.message = "Bilinmeyen hata"
        }

        console.log("[useApi].onError \nresponse", response, "\n responseJSON", responseJSON, "\n notificationObj", notificationObj, payload)

        if (pushNotification) {
            if (response.message || responseJSON.message || notificationObj.message) {
                pushErrorNotification({
                    title: "Hata!",
                    message: response.message || responseJSON.message || notificationObj.message,
                })
            }
        }

        setData(oldData => ({
            ...oldData,
            response: {...(responseJSON || response)},
            fetching: false,
            fetched: true,
            firstTimeFetched: true
        }))

        if (payloadOnError)
            payloadOnError(responseJSON || response)
    }, [endpoint, payloadPushNotification, payloadOnError])

    useEffect(() => {
        const {initial} = payload;
        if (initial) load()
    }, [stringifyPayload])

    const updatePayload = useCallback((__payload) => {
        setPayload(oldPayload => {
            const newPayload = {...oldPayload, ...__payload};
            const {showLoading: _showLoading} = newPayload
            const showLoading = takeUndefinedAsTrue(_showLoading)

            if (!newPayload.method && !newPayload.params) {
                newPayload.method = "GET"
            }

            if (newPayload.method !== "GET" && showLoading) {
                increase()
            }
            return newPayload
        })
    }, [])

    const updateData = useCallback(() => {
        setData(oldData => ({
            ...oldData,
            fetching: true,
            fetched: false,
        }))
    }, [])

    const load = useCallback((__payload = {}) => {
        updatePayload(__payload)
        updateData()
        setShouldFetch(true)
    }, [])


    useEffect(() => {
        if (shouldFetch) {
            iFetch({
                ...payload,
                params,
                onSuccess,
                onError,
                token,
                signal
            })
            setShouldFetch(false);
        }

    }, [onError, onSuccess, params, shouldFetch, token])

    useEffect(() => {
        return () => {
            controller.abort()
        }
    }, [])

    return {load, ...data}
}

export default useApi
