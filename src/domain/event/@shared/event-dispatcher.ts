import EventDispatcherInterface from './event-dispatcher.interface';
import EventHandlerInterface from './event-handler.interface';
import eventHandlerInterface from './event-handler.interface';
import eventInterface from './event.interface';

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  notify(event: eventInterface): void {
    throw new Error('Method not implemented.');
  }

  register(
    eventName: string,
    eventHandler: eventHandlerInterface<eventInterface>
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(
    eventName: string,
    eventHandler: eventHandlerInterface<eventInterface>
  ): void {
    const index = this.getEventHandlers[eventName].indexOf(eventHandler);

    if (index !== -1) {
      this.eventHandlers[eventName].splice(index, 1);
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
