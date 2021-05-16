interface CookieSetItem {
    key?: string;
    value: any;
    expireDays?: number;
    expireHours?: number;
    expire?: string;
    path?: string;
}
interface IUseCookieReturn {
    getItem: (key?: string) => any;
    setItem: (params: CookieSetItem) => void;
    removeItem: (key?: string) => void;
    cookie: Record<string, any>;
}
declare const useCookie: (key?: string) => IUseCookieReturn;
export default useCookie;
