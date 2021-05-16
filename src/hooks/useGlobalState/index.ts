import { useGlobalStateContext } from './context';

const useGlobalState = () => {
    const { globalState, setGlobalState } = useGlobalStateContext()
    return { globalState, setGlobalState }
}

export default useGlobalState;
