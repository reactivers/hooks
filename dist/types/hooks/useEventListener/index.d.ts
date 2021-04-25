declare const useEventListener: (component: string) => {
    registerEvent: (name: string, event: any) => (() => void);
    registerEventById: (id: string, name: string, event: any) => (() => void);
    removeEvent: (name: string, id: string) => void;
    callAllEvents: (name: string, parameters?: any, callback?: any) => any;
    callEvent: (name: string, id: string, parameters?: any) => any;
};
export default useEventListener;
