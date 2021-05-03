export interface ISafeArea {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
declare const SafeAreaProvider: ({ children }: {
    children: any;
}) => JSX.Element;
export default SafeAreaProvider;
export declare const useSafeAreaContext: () => ISafeArea;
