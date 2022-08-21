import Address from './entity/address';
import Customer from './entity/customer';
import Order from './entity/order';
import OrderItem from './entity/order_item';

const customer = new Customer('123', 'Erikson');
const address = new Address('Rua dois', 2, '12345-000', 'São Paulo');
customer.Address = address;
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 10, '1', 1);
const item2 = new OrderItem('1', 'Item 2', 15, '2', 1);

const order = new Order('1', '123', [item1, item2]);
