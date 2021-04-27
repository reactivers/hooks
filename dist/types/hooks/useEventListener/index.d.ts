declare const useEventListener: <T extends Record<string, any>>(component: string) => {
    registerEvent: (name: keyof T, event: any) => (() => void);
    registerEventById: (name: keyof T, id: string, event: any) => (() => void);
    removeEvent: (name: keyof T, id: string) => void;
    callAllEvents: (name: keyof T, parameters?: any, callback?: any) => any;
    callEvent: (name: keyof T, id: string, parameters?: any) => any;
};
export default useEventListener;
