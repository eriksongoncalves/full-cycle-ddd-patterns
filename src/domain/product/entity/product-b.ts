import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import ProductInterface from './product.interface';

export default class ProductB extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price * 2;
  }

  validate() {
    if (this._id.length === 0) {
      this.notification.addError({
        context: 'product',
        message: 'Id is required'
      });
    }

    if (this._name.length === 0) {
    }

    if (this._price < 0) {
      this.notification.addError({
        context: 'product',
        message: 'Price must be greater than zero'
      });
    }

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }
}
