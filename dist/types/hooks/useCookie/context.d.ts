import { FC } from "react";
interface CookieContext {
    cookie: Record<string, any>;
    getItem: (key: string) => any;
    removeItem: (key: string) => void;
    setItem: (params: CookieSetItem) => void;
}
declare const CookieContext: import("react").Context<CookieContext>;
interface CookieProviderProps {
    withState?: boolean;
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
declare const CookieProvider: FC<CookieProviderProps>;
export declare const useCookieContext: () => CookieContext;
export default CookieProvider;
