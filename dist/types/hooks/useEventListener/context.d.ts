import React, { EffectCallback } from 'react';
interface EventListenerContextProps {
    removeEvent: (component: string, name: any, id: string) => void;
    registerEvent: (component: string, name: any, event: Function) => EffectCallback;
    registerEventById: (component: string, name: any, id: string, event: any) => EffectCallback;
    callEvent: (component: string, name: any, id: string, parameters?: any) => any;
    callAllEvents: (component: string, name: any, parameters?: any, callback?: any) => any;
}
declare const EventListenerProvider: React.FC;
export declare const useEventListenerContext: () => EventListenerContextProps;
export default EventListenerProvider;
