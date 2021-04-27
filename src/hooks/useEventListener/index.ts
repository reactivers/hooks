import { useCallback } from 'react';
import { useEventListenerContext } from './context';

const useEventListener = <T extends Record<string, any>>(component: string) => {
  const {
    registerEvent: _registerEvent,
    registerEventById: _registerEventById,
    removeEvent: _removeEvent,
    callAllEvents: _callAllEvents,
    callEvent: _callEvent,
  } = useEventListenerContext();

  const registerEvent = useCallback(
    (name: keyof T, event): (() => void) => {
      if (_registerEvent) return _registerEvent(component, name, event);
    },
    [_registerEvent, component]
  );

  const registerEventById = useCallback(
    (name: keyof T, id: string, event: any): (() => void) => {
      if (_registerEventById) return _registerEventById(component, name, id, event);
    },
    [_registerEventById, component]
  );

  const removeEvent = useCallback(
    (name: keyof T, id: string) => _removeEvent && _removeEvent(component, name, id),
    [_removeEvent, component]
  );
  const callAllEvents = useCallback(
    (name: keyof T, parameters?: any, callback?: any) =>
      _callAllEvents && _callAllEvents(component, name, parameters, callback),
    [_callAllEvents, component]
  );
  const callEvent = useCallback(
    (name: keyof T, id: string, parameters?: any) =>
      _callEvent && _callEvent(component, name, id, parameters),
    [_callEvent, component]
  );

  return { registerEvent, registerEventById, removeEvent, callAllEvents, callEvent };
};

export default useEventListener;
