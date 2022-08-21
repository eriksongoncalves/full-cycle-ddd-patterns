import Order from './order';
import OrderItem from './order_item';

describe('Order unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const order = new Order('', '123', []);
    }).toThrowError('Id is required');
  });

  it('should throw error when customerId is empty', () => {
    expect(() => {
      const order = new Order('1', '', []);
    }).toThrowError('CustomerId is required');
  });

  it('should throw error when items is empty', () => {
    expect(() => {
      const order = new Order('1', '123', []);
    }).toThrowError('Items are required');
  });

  it('should calculate total', () => {
    const item1 = new OrderItem('1', 'Item 1', 10, 'p1', 2);
    const order = new Order('1', '123', [item1]);

    expect(order.total()).toBe(20);
  });

  it('should throw error if the item qte is less or equal than 0', () => {
    expect(() => {
      const item1 = new OrderItem('1', 'Item 1', 10, 'p1', 0);
      const order = new Order('1', '123', [item1]);
    }).toThrowError('Quantity must be greater than 0');
  });
});
