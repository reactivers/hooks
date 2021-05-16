interface CookieSetItem {
    key?: string;
    value: any;
    expireDays?: number;
    expireHours?: number;
    expire?: string;
    path?: string;
}
declare const useCookie: (key?: string) => {
    getItem: (_key?: any) => any;
    setItem: (_params: CookieSetItem) => void;
    removeItem: (_key?: any) => void;
    cookie: Record<string, any>;
};
export default useCookie;
