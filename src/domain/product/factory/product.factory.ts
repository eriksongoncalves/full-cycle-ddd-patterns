import { v4 as uuid } from 'uuid';

import Product from '../entity/product';
import ProductB from '../entity/product-b';
import ProductInterface from '../entity/product.interface';

type ProductType = 'a' | 'b';

export default class ProductFactory {
  static create(
    type: ProductType,
    name: string,
    price: number
  ): ProductInterface {
    const actions = {
      a: new Product(uuid(), name, price),
      b: new ProductB(uuid(), name, price)
    };

    return actions[type];
  }
}
