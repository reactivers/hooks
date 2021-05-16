import { FC } from "react";
interface AuthContextProps {
    localStorageTokenKeyName: string;
    user?: UserInfo;
    setUser: (info: UserInfo) => void;
    setToken: (token: string) => void;
    onLogin: (info: UserInfo) => void;
    onLogout: () => void;
}
interface AuthProviderProps {
    localStorageTokenKeyName?: string;
    authTokenKeyName?: string;
    initialCheckToken?: boolean;
    user?: UserInfo;
    onLogin?: (info: UserInfo) => void;
    onLogout?: () => void;
}
export interface UserInfo {
    username?: string;
    token?: string;
    isLoggedIn: boolean;
    userInfo?: any;
}
declare const AuthProvider: FC<AuthProviderProps>;
export declare const useAuthContext: () => AuthContextProps;
export default AuthProvider;
