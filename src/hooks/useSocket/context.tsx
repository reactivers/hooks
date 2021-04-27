import { createContext, FC, useCallback, useContext, useRef } from "react";

interface SocketContextProps {
    connect: ({ path: string }) => WebSocket
}

const SocketContext = createContext({} as SocketContextProps);

const SocketProvider = ({ children }) => {
    const sockets = useRef({});

    const connect = useCallback(({ path }) => {
        const socket = sockets.current[path] || {};
        const { readyState } = socket;
        if (readyState === WebSocket.OPEN || readyState === WebSocket.CONNECTING) return socket;
        const _socket = new WebSocket(path)
        sockets.current[path] = _socket;
        return _socket;
    }, [sockets.current])

    return (
        <SocketContext.Provider value={{ connect }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocketContext must be used within an SocketContext.Provider');
    }
    return context;
};

export default SocketProvider;
