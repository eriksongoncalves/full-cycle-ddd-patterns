import Order from '../../domain/entity/order';
import OrderItem from '../../domain/entity/order_item';
import OrderRepositoryInterface from '../../domain/repository/order-repository-interface';
import OrderModel from '../db/sequelize/model/order.model';

export default class OrderRepository implements OrderRepositoryInterface {
  async create(order: Order): Promise<void> {
    await OrderModel.create(
      {
        id: order.id,
        customer_id: order.customerId,
        total: order.total(),
        items: order.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity
        }))
      },
      {
        include: ['items']
      }
    );
  }

  async update(order: Order): Promise<void> {
    try {
      await OrderModel.update(
        {
          customer_id: order.customerId,
          items: order.items,
          total: order.total()
        },
        {
          where: { id: order.id }
        }
      );
    } catch (e) {
      console.log('>>> error ', e);
    }
  }

  async find(id: string): Promise<Order> {
    try {
      const orderModel = await OrderModel.findOne({
        where: {
          id
        },
        include: ['items'],
        rejectOnEmpty: true
      });

      const items = orderModel.items.map(
        item =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      );

      const order = new Order(orderModel.id, orderModel.customer_id, items);

      return order;
    } catch (error) {
      throw new Error('Order not found');
    }
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ['items'] });

    return orderModels.map(orderModel => {
      const items = orderModel.items.map(
        item =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      );

      return new Order(orderModel.id, orderModel.customer_id, items);
    });
  }
}
