import { createContext, FC, useContext, useState } from "react";

interface GlobalStateContext {
    globalState: Record<string, any>;
    setGlobalState: (param: any) => void;
}
const GlobalStateContext = createContext({} as GlobalStateContext);


const GlobalStateProvider: FC = ({ children }) => {

    const [globalState, setGlobalState] = useState({});

    return (
        <GlobalStateContext.Provider value={{
            globalState,
            setGlobalState
        }}>
            {children}
        </GlobalStateContext.Provider>
    )
}

export const useGlobalStateContext = () => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalStateContext must be used within an GlobalStateContext.Provider');
    }
    return context;
};

export default GlobalStateProvider;
