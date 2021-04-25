import React, { EffectCallback, createContext, useCallback, useContext, useRef } from 'react';
import useUtils from '../useUtils';

interface Event {
    [componentName: string]: {
        [eventName: string]: {
            [eventId: string]: (parameters?: any) => any;
        };
    };
}

interface EventListenerContextProps {
    removeEvent: (component: string, name: string, id: string) => void;
    registerEvent: (component: string, name: string, event: Function) => EffectCallback;
    registerEventById: (component: string, name: string, id: string, event: any) => EffectCallback;
    callEvent: (component: string, name: string, id: string, parameters?: any) => any;
    callAllEvents: (component: string, name: string, parameters?: any, callback?: any) => any;
}

const EventListenerContext = createContext({} as EventListenerContextProps);

const EventListenerProvider: React.FC = ({ children }) => {
    const events = useRef<Event>({}).current;
    const { guid } = useUtils();

    const removeEvent = useCallback(
        (component: string, name: string, id: string) => {
            if (!!events)
                if (!!events[component]) if (!!events[component][name]) delete events[component][name][id];
        },
        [events]
    );

    const registerEvent = useCallback(
        (component: string, name: string, event: any) => {
            const newEventId = guid();
            if (!events[component]) events[component] = {};
            if (!events[component][name]) events[component][name] = {};
            events[component][name][newEventId] = event;
            return (() => removeEvent(component, name, newEventId)) as EffectCallback;
        },
        [events, removeEvent]
    );

    const registerEventById = useCallback(
        (component: string, name: string, newEventId: string, event: any) => {
            if (!events[component]) events[component] = {};
            if (!events[component][name]) events[component][name] = {};
            events[component][name][newEventId] = event;
            return (() => {
                removeEvent(component, name, newEventId);
            }) as EffectCallback;
        },
        [events, removeEvent]
    );

    const callEvent = useCallback(
        (component: string, name: string, id: string, parameters?: any) => {
            const _events = events[component] || {};
            const registeredEvents = _events[name] || {};
            const registeredEvent = registeredEvents[id];
            if (registeredEvent) return registeredEvent(parameters);
        },
        [events]
    );

    const callAllEvents = useCallback(
        (component: string, name: string, parameters?: any, callback?: any) => {
            const _events = events[component] || {};
            const registeredEvents = _events[name] || {};
            Object.keys(registeredEvents).forEach((key) => {
                const result = callEvent(component, name, key, parameters);
                if (callback) {
                    callback(result);
                }
            });
        },
        [events]
    );

    return (
        <EventListenerContext.Provider
            value={{
                removeEvent,
                registerEvent,
                registerEventById,
                callEvent,
                callAllEvents,
            }}
        >
            {children}
        </EventListenerContext.Provider>
    );
};

export const useEventListenerContext = () => {
    const context = useContext(EventListenerContext);
    if (context === undefined) {
        throw new Error('useEventListenerContext must be used within an EventListenerContext');
    }
    return context;
};


export default EventListenerProvider;