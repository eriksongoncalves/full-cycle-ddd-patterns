import Entity from '../../@shared/entity/entity.abstract';
import EventDispatcher from '../../@shared/event/event-dispatcher';
import NotificationError from '../../@shared/notification/notification.error';
import CustomerCreatedEvent from '../event/customer-created.event';
import SendConsoleLogWhenAddressChanged from '../event/handler/send-console-log-when-address-changed.handler';
import CustomerValidatorFactory from '../factory/customer.validator.factory';
import Address from '../value-object/address';

export default class Customer extends Entity {
  private _name = '';
  private _address!: Address;
  private _active = false;
  private _rewardPoints = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;

    this.validate();
  }

  get name() {
    return this._name;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }

  changeAddress(address: Address) {
    this._address = address;

    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogWhenAddressChanged();
    eventDispatcher.register('CustomerCreatedEvent', eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: this.id,
      name: this._name,
      street: address._street
    });

    eventDispatcher.notify(customerCreatedEvent);
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer');
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
