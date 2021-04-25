declare global {
    interface Window {
        gapi: GoogleAuthApi;
        FB: FacebookAuthApi;
    }
}
interface GoogleAuthApi {
    auth2: any;
}
interface FacebookAuthApi {
    logout: any;
}
declare const useAuth: () => {
    login: (data: any) => void;
    logout: () => void;
    setUser: (info: import("./context").UserInfo) => void;
    user: import("./context").UserInfo;
    token: string;
};
export default useAuth;
