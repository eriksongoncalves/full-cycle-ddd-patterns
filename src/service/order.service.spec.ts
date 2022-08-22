import Customer from '../entity/customer';
import Order from '../entity/order';
import OrderItem from '../entity/order_item';
import OrderService from './order.service';

describe('Order service unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer('c1', 'Customer 1');

    const item1 = new OrderItem('1', 'Item 1', 10, 'p1', 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should throw error when don't have items", () => {
    expect(() => {
      const customer = new Customer('c1', 'Customer 1');

      const order = OrderService.placeOrder(customer, []);
    }).toThrowError('Order must have at least one item');
  });

  it('should get total of all orders', () => {
    const item1 = new OrderItem('1', 'Item 1', 100, 'p1', 1);
    const item2 = new OrderItem('2', 'Item 2', 200, 'p1', 2);

    const order1 = new Order('1', '123', [item1]);
    const order2 = new Order('2', '123', [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(500);
  });
});
