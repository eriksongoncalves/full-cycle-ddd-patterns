import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import EventInterface from '../../../@shared/event/event.interface';
import CustomerCreatedEvent from '../customer-created.event';

export default class SendConsoleLogWhenAddressChanged
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: EventInterface): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.street}`
    );
  }
}
