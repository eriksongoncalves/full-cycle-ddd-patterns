import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import ListCustomerUseCase from './list.customer.usecase';

const customer1 = CustomerFactory.createWithAddress(
  'John',
  new Address('Street 1', 123, 'Zip 1', 'City 1')
);

const customer2 = CustomerFactory.createWithAddress(
  'Jane',
  new Address('Street 2', 456, 'Zip 2', 'City 2')
);

const mockCustomerRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2]))
});

describe('Unit Test list customer use case', () => {
  it('should list all customers', async () => {
    const customerRepository = mockCustomerRepository();
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

    const result = await listCustomerUseCase.execute();

    const output = [customer1, customer2].map(customer => ({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip
      }
    }));

    expect(result).toEqual({
      customers: output
    });
  });
});
