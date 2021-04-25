import { useCallback } from 'react';
import { useEventListenerContext } from './context';

const useEventListener = (component: string) => {
  const {
    registerEvent: _registerEvent,
    registerEventById: _registerEventById,
    removeEvent: _removeEvent,
    callAllEvents: _callAllEvents,
    callEvent: _callEvent,
  } = useEventListenerContext();

  const registerEvent = useCallback(
    (name: string, event): (() => void) => {
      if (_registerEvent) return _registerEvent(component, name, event);
    },
    [_registerEvent, component]
  );

  const registerEventById = useCallback(
    (id: string, name: string, event: any): (() => void) => {
      if (_registerEventById) return _registerEventById(component, id, name, event);
    },
    [_registerEventById, component]
  );

  const removeEvent = useCallback(
    (name: string, id: string) => _removeEvent && _removeEvent(component, name, id),
    [_removeEvent, component]
  );
  const callAllEvents = useCallback(
    (name: string, parameters?: any, callback?: any) =>
      _callAllEvents && _callAllEvents(component, name, parameters, callback),
    [_callAllEvents, component]
  );
  const callEvent = useCallback(
    (name: string, id: string, parameters?: any) =>
      _callEvent && _callEvent(component, name, id, parameters),
    [_callEvent, component]
  );

  return { registerEvent, registerEventById, removeEvent, callAllEvents, callEvent };
};

export default useEventListener;
