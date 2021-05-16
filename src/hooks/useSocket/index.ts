import { useCallback, useEffect, useRef, useState } from 'react';
import { emptyFunction } from '../../utils/functions';
import { useSocketContext } from './context';

interface SocketProps {
    url?: string;
    wss?: boolean;
    disconnectOnUnmount?: boolean;
    onOpen?: (a: any) => void,
    onClose?: (a: any) => void,
    onError?: (a: any) => void,
    onMessage?: (a: any, data: any) => void

}

interface SocketState {
    readyState: number;
    lastData: any;
}

interface SocketResponse extends SocketState {
    connect: (params: ({ url: string })) => WebSocket;
    socket: WebSocket,
    sendData: (p: any) => void;
}

const useSocket: (props: SocketProps) => SocketResponse = ({ url, wss = false, disconnectOnUnmount = true, onOpen = emptyFunction, onClose = emptyFunction, onError = emptyFunction, onMessage = emptyFunction }) => {
    const protocol = wss ? "wss" : "ws";
    const { connect: connectContext } = useSocketContext();

    //@ts-ignore
    const socket = useRef<WebSocket>({});

    const [socketState, setSocketState] = useState<SocketState>({ readyState: 0, lastData: undefined })


    useEffect(() => {
        return () => {
            if (disconnectOnUnmount) {
                if (socket.current.close) {
                    socket.current.close(1000, "User disconnected!");
                }
            }
        }
    }, [disconnectOnUnmount])

    const connect: (params?: { url: string }) => WebSocket = useCallback(({ url: _url }) => {
        const path = `${protocol}://${_url || url}`
        socket.current = connectContext({ path });
        setSocketState(old => ({ ...old, readyState: socket.current.readyState }))
        return socket.current;
    }, [connectContext, protocol, url, disconnectOnUnmount])

    const onopen = useCallback((event) => {
        setSocketState(old => ({ ...old, readyState: WebSocket.OPEN }))
        onOpen(event)
    }, [onOpen])

    const onmessage = useCallback((event) => {
        setSocketState(old => ({ ...old, lastData: event.data }))
        let { data } = event;
        try {
            data = JSON.parse(data);
        } catch (e) {
            //console.error("JSON PARSE error", e)
        }
        onMessage(event, data)
    }, [onMessage])

    const onclose = useCallback((event) => {
        setSocketState(old => ({ ...old, readyState: WebSocket.CLOSED }))
        onClose(event)
    }, [onClose])

    const onerror = useCallback((event) => {
        setSocketState(old => ({ ...old, readyState: WebSocket.CLOSING }))
        onError(event)
    }, [onError])

    useEffect(() => {
        if (socket.current) socket.current.addEventListener('open', onopen)
        return () => {
            socket.current.removeEventListener('open', onopen);
        }
    }, [socket.current, onopen])

    useEffect(() => {
        if (socket.current) socket.current.addEventListener('close', onclose)
        return () => {
            socket.current.removeEventListener('close', onclose);
        }
    }, [socket.current, onclose])

    useEffect(() => {
        if (socket.current) socket.current.addEventListener('message', onmessage)
        return () => {
            socket.current.removeEventListener('message', onmessage);
        }
    }, [socket.current, onmessage])

    useEffect(() => {
        if (socket.current) socket.current.addEventListener('error', onerror)
        return () => {
            socket.current.removeEventListener('error', onerror);
        }
    }, [socket.current, onerror])


    const sendData = useCallback((data) => {
        socket.current.send(data)
    }, [socket.current])

    return { connect, socket: socket.current, sendData, ...socketState }
}

export default useSocket;
