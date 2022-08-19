export default class OrderItem {
  _id: string;
  _name: string;
  _price: string;

  constructor(id: string, name: string, price: string) {
    this._id = id;
    this._name = name;
    this._price = price;
  }
}
