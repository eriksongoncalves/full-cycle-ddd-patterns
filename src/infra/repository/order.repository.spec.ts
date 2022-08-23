import { Sequelize } from 'sequelize-typescript';
import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import Order from '../../domain/entity/order';
import OrderItem from '../../domain/entity/order_item';
import Product from '../../domain/entity/product';
import CustomerModel from '../db/sequelize/model/customer.model';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import OrderModel from '../db/sequelize/model/order.model';
import ProductModel from '../db/sequelize/model/product.model';
import CustomerRepository from './customer.repository';
import OrderRepository from './order.repository';
import ProductRepository from './product.repository';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([
      OrderModel,
      OrderItemModel,
      CustomerModel,
      ProductModel
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Street 1', 1, '0000-000', 'City 1');
    const customer = new Customer('1', 'Customer 1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          product_id: orderItem.productId,
          order_id: order.id,
          quantity: orderItem.quantity,
          name: orderItem.name,
          price: orderItem.price
        }
      ]
    });
  });

  it('should update a order', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Street 1', 1, '0000-000', 'City 1');
    const customer = new Customer('1', 'Customer 1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const orderItem2 = new OrderItem(
      '2',
      product.name,
      product.price,
      product.id,
      3
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          product_id: orderItem.productId,
          order_id: order.id,
          quantity: orderItem.quantity,
          name: orderItem.name,
          price: orderItem.price
        }
      ]
    });

    const orderUpdated = new Order('1', customer.id, [orderItem, orderItem2]);
    await orderRepository.update(orderUpdated);

    const orderModelUpdated = await OrderModel.findOne({
      where: { id: orderUpdated.id },
      include: ['items']
    });

    expect(orderModelUpdated.total).toBe(50);
  });

  it('should find a order', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Street 1', 1, '0000-000', 'City 1');
    const customer = new Customer('1', 'Customer 1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderResult = await orderRepository.find(order.id);

    expect(order).toStrictEqual(orderResult);
  });

  it('should throw an error when order is not found', async () => {
    expect(async () => {
      const orderRepository = new OrderRepository();
      await orderRepository.find('200');
    }).rejects.toThrowError('Order not found');
  });

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Street 1', 1, '0000-000', 'City 1');
    const customer = new Customer('1', 'Customer 1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const orderRepository = new OrderRepository();

    const order1 = new Order('1', customer.id, [orderItem]);
    await orderRepository.create(order1);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(1);
    expect(orders).toContainEqual(order1);
  });
});
