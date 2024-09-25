/**
 * Type for the return functions of the UseEventBus hook.
 */
export type UseEventBusState = {
  /**
   * Function to fire an event on the bus.
   * @param event The event name.
   * @param detail The event payload.
   */
  fireEvent: (event: string, detail: unknown) => void;
  /**
   * Subscribes to events by passing in the array of events and the handler to call.
   * @param events The event names to subscribe to.
   * @param onEventFired The handler to call when one of the subscribed events fire.
   */
  subscribe: (events: string[], onEventFired?: (e: Event) => void) => void;
  /**
   * Unsubscribes to passed in events.
   * @param events The event names to subscribe to.
   * @param onEventFired The handler to call when one of the subscribed events fire.
   */
  unsubscribe: (events: string[], onEventFired?: (e: Event) => void) => void;
};

/**
 * Hook to fire and subscribe to events.
 * @returns The event bus functions.
 */
const UseEventBus = () => {
  /**
   * Function to fire an event on the bus.
   * @param event The event name.
   * @param detail The event payload.
   */
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  const fireEvent = <TDetail extends unknown>(event: string, detail?: TDetail) => {
    window.dispatchEvent(new CustomEvent(event, { detail }));
  };

  /**
   * Subscribes to events by passing in the array of events and the handler to call.
   * @param events The event names to subscribe to.
   * @param onEventFired The handler to call when one of the subscribed events fire.
   */
  const subscribe = (events: string[], onEventFired: (e: Event) => void) => {
    events.forEach((e) => {
      window.addEventListener(e, onEventFired);
    });
  };

  /**
   * Unsubscribes to passed in events.
   * @param events The event names to subscribe to.
   * @param onEventFired The handler to call when one of the subscribed events fire.
   */
  const unsubscribe = (events: string[], onEventFired: (e: Event) => void) => {
    events.forEach((e) => {
      window.removeEventListener(e, onEventFired);
    });
  };

  return { fireEvent, subscribe, unsubscribe };
};

export default UseEventBus;
