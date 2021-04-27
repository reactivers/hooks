interface SocketProps {
    url: string;
    wss?: boolean;
    disconnectOnUnmount?: boolean;
    onOpen?: (a: any) => void;
    onClose?: (a: any) => void;
    onError?: (a: any) => void;
    onMessage?: (a: any, data: any) => void;
}
interface SocketState {
    readyState: number;
    lastData: any;
}
interface SocketResponse extends SocketState {
    connect: ({ path: string }: {
        path: any;
    }) => WebSocket;
    socket: WebSocket;
    sendData: (p: any) => void;
}
declare const useSocket: (props: SocketProps) => SocketResponse;
export default useSocket;
