import { FC } from "react";
interface CookieContext {
    cookie: Record<string, any>;
    getItem: (key: string) => any;
    removeItem: (key: string) => void;
    setItem: (params: {
        key: string;
        value: any;
    }) => void;
}
declare const CookieContext: import("react").Context<CookieContext>;
interface LocalStorateProviderProps {
    onChange?: (cookie: Record<string, any>) => void;
}
export interface CookieSetItem {
    key: string;
    value: any;
    expireDays?: number;
    expireHours?: number;
    expire?: string;
    path?: string;
}
declare const CookieProvider: FC<LocalStorateProviderProps>;
export declare const useCookieContext: () => CookieContext;
export default CookieProvider;
