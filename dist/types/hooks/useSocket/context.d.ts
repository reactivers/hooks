interface SocketContextProps {
    connect: ({ path: string }: {
        path: any;
    }) => WebSocket;
}
declare const SocketProvider: ({ children }: {
    children: any;
}) => JSX.Element;
export declare const useSocketContext: () => SocketContextProps;
export default SocketProvider;
