import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import UpdateCustomerUseCase from './update.usecase';
import CreateCustomerUseCase from './update.usecase';

const customer = CustomerFactory.createWithAddress(
  'John',
  new Address('Street', 123, 'Zip', 'City')
);

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'Street Updated',
    number: 123,
    city: 'city Updated',
    zip: 'Zip Updated'
  }
};

const mockCustomerRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  findAll: jest.fn()
});

describe('Unit Test update customer use case', () => {
  it('should update a customer', async () => {
    const customerRepository = mockCustomerRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    const result = await updateCustomerUseCase.execute(input);

    expect(result).toMatchObject(input);
  });
});
