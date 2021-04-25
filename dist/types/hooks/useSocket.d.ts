interface SocketProps {
    onopen?: (a: any) => void;
    onclose?: (a: any) => void;
    onerror?: (a: any) => void;
    onmessage?: (a: any) => void;
}
interface SocketResponse {
    connect: () => void;
    socket: WebSocket;
}
declare const useSocket: (props: SocketProps) => SocketResponse;
export default useSocket;
