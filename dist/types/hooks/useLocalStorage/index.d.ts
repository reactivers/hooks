declare const useLocalStorage: (key: string, defaultValue?: string) => {
    getItem: (_defaultValue?: any) => any;
    setItem: (_value: any) => void;
    removeItem: () => void;
};
export default useLocalStorage;
