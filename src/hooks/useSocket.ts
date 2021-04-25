import { useCallback, useEffect, useState } from 'react';
import useAuth from "./useAuth";

interface SocketProps {
    onopen?: (a: any) => void,
    onclose?: (a: any) => void,
    onerror?: (a: any) => void,
    onmessage?: (a: any) => void

}

interface SocketResponse {
    connect: () => void;
    socket: WebSocket
}

const useSocket: (props: SocketProps) => SocketResponse = ({
    onopen, onclose, onerror, onmessage
}) => {
    const { user } = useAuth();
    const { username } = user || {}
    //@ts-ignore
    const [socket, setSocket] = useState<WebSocket>({});

    const connect = useCallback(() => {
        const { readyState } = socket;

        if (readyState === WebSocket.OPEN || readyState === WebSocket.CONNECTING) return;
        const host = process.env.REACT_APP_PROXY_HOST
        const protocol = process.env.REACT_APP_USE_SSL === "1" ? "wss" : "ws";
        const _socket = new WebSocket(`${protocol}://${host}/ws?username=${username}`)
        setSocket(_socket)
    }, [username, socket])

    useEffect(() => {
        connect();
    }, [connect])

    useEffect(() => {
        if (socket) {
            socket.onopen = (e) => {
                if (onopen) onopen(e)
            };

            socket.onmessage = (event) => {
                const { data: _data } = event;
                let data = _data;
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    console.error("JSON PARSE error", e)
                }
                onmessage(data);
                //console.log(`[message] Data received from server`, data, _data);
            };

            socket.onclose = (event) => {
                if (onclose) onclose(event)
                if (event.wasClean) {
                    //alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                } else {
                    //alert('[close] Connection died');
                }
            };

            socket.onerror = (error) => {
                if (onerror) onerror(error)
            };
        }
    }, [onclose, onerror, onmessage, onopen, socket])

    useEffect(() => {
        return () => {
            if (socket.close)
                socket.close(1000, "User disconnected!");
        }
    }, [socket])


    return { connect, socket }
}

export default useSocket;
