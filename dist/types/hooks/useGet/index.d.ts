import { IUseFetchProps, IUseFetchResponse } from '../useFetch';
declare const useGet: <T extends {}>(params?: IUseFetchProps) => IUseFetchResponse<T>;
export default useGet;
