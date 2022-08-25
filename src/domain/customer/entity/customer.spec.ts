import Address from '../value-object/address';
import Customer from './customer';

describe('Customer unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const consumer = new Customer('', 'Erikson');
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      const consumer = new Customer('1', '');
    }).toThrowError('Name is required');
  });

  it('should throw error when change the name is empty', () => {
    expect(() => {
      const consumer = new Customer('1', 'Erikson');
      consumer.changeName('');
    }).toThrowError('Name is required');
  });

  it('should activate customer', () => {
    const customer = new Customer('1', 'Erikson');
    const address = new Address('Street 1', 123, '123423', 'São Paulo');
    customer.changeAddress(address);
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'Erikson');
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when activate a customer without address', () => {
    expect(() => {
      const customer = new Customer('1', 'Erikson');
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'Erikson');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(20);
  });

  it('should change address', () => {
    const consoleLogMock = jest.spyOn(console, 'log');
    const customer = new Customer('1', 'Erikson');

    expect(customer.Address).toBeUndefined();

    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');

    customer.changeAddress(address);

    expect(address._street).toBe('Street 1');

    expect(consoleLogMock).toHaveBeenCalledWith(
      'Endereço do cliente: 1, Erikson alterado para: Street 1'
    );
  });
});
