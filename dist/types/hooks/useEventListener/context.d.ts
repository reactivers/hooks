import React, { EffectCallback } from 'react';
interface EventListenerContextProps {
    removeEvent: (component: string, name: string, id: string) => void;
    registerEvent: (component: string, name: string, event: Function) => EffectCallback;
    registerEventById: (component: string, name: string, id: string, event: any) => EffectCallback;
    callEvent: (component: string, name: string, id: string, parameters?: any) => any;
    callAllEvents: (component: string, name: string, parameters?: any, callback?: any) => any;
}
declare const EventListenerProvider: React.FC;
export declare const useEventListenerContext: () => EventListenerContextProps;
export default EventListenerProvider;
