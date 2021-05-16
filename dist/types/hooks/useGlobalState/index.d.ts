declare const useLocalStorage: (key?: string) => {
    getItem: (_key?: any) => any;
    setItem: (value: any) => void;
    removeItem: (_key?: any) => void;
    setItemWithKey: (_key: any, value: any) => void;
    localStorage: Record<string, any>;
};
export default useLocalStorage;
