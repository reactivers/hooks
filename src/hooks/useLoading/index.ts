import { useLoadingContext } from './context';

const useLoading = () => {
    const { loading, increase, decrease } = useLoadingContext();
    const isLoading = loading && loading > 0
    return { isLoading, increase, decrease };
};
export default useLoading;
