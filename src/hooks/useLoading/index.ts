import { useLoadingContext } from './context';

interface IUseLoading {
    isLoading: boolean;
    increase: () => void;
    decrease: () => void;
}

const useLoading: () => IUseLoading = () => {
    const { loading, increase, decrease } = useLoadingContext();
    const isLoading = loading > 0
    return { isLoading, increase, decrease };
};

export default useLoading;
