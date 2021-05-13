import { UserInfo } from './context';
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
interface IUseAuth {
    setToken: (token: string) => void;
    login: (data: any) => void;
    logout: () => void;
    setUser: (user: UserInfo) => void;
    user: UserInfo;
    token: string;
}
declare const useAuth: () => IUseAuth;
export default useAuth;
