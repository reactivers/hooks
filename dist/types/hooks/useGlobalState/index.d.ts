declare const useLocalStorage: (key?: string) => {
    getItem: (_key?: any) => any;
    setItem: (value: any) => any;
    removeItem: (_key?: any) => any;
    setItemWithKey: (_key: any, value: any) => any;
    localStorage: any;
};
export default useLocalStorage;
