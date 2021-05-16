import { useGlobalStateContext } from './context';

interface IUseGlobalState {
    globalState: Record<string, any>;
    setGlobalState: any;
}

const useGlobalState: () => IUseGlobalState = () => {
    const { globalState, setGlobalState } = useGlobalStateContext()
    return { globalState, setGlobalState }
}

export default useGlobalState;
