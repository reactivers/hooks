interface IUseLocalStorageReturn {
    localStorage: Record<string, any>;
    getItem: (key?: string) => any;
    setItem: (value: any) => void;
    setItemWithKey: (key: string, value: any) => void;
    removeItem: (key?: string) => void;
}
declare const useLocalStorage: (key?: string) => IUseLocalStorageReturn;
export default useLocalStorage;
