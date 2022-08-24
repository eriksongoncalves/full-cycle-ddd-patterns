import EventDispatcher from '../event/@shared/event-dispatcher';
import CustomerCreatedEvent from '../event/customer/customer-created.event';
import SendConsoleLogWhenAddressChanged from '../event/customer/handler/send-console-log-when-address-changed.handler';
import Address from './address';

export default class Customer {
  private _id: string;
  private _name = '';
  private _address!: Address;
  private _active = false;
  private _rewardPoints = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }

    if (this._name.length === 0) {
      throw new Error('Name is required');
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
      id: this._id,
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
