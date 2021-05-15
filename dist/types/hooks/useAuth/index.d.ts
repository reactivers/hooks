import { UserInfo } from './context';
interface IUseAuth {
    setToken: (token: string) => void;
    login: (data: any) => void;
    logout: () => void;
    setUser: (user: UserInfo) => void;
    user: UserInfo;
    checked: boolean;
    isLoggedIn: boolean;
    token: string;
}
declare const useAuth: () => IUseAuth;
export default useAuth;
