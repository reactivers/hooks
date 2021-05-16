import { FC } from "react";
interface LocalStorageContext {
    localStorage: Record<string, any>;
    getItem: (key: string) => any;
    removeItem: (key: string) => void;
    setItem: (params: {
        key: string;
        value: any;
    }) => void;
}
declare const LocalStorageContext: import("react").Context<LocalStorageContext>;
interface LocalStorageProviderProps {
    withState?: boolean;
    onChange?: (localStorage: Record<string, any>) => void;
}
declare const LocalStorageProvider: FC<LocalStorageProviderProps>;
export declare const useLocalStorageContext: () => LocalStorageContext;
export default LocalStorageProvider;
