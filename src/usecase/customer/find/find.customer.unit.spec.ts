import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindCustomerUseCase from './find.usecase';

const address = new Address('Street', 123, 'Zip', 'city');
const customer = new Customer('123', 'John');
customer.changeAddress(address);

const mockCustomerRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  findAll: jest.fn()
});

describe('Unit Test find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = mockCustomerRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

    const input = { id: '123' };

    const output = {
      id: '123',
      name: 'John',
      address: {
        street: 'Street',
        city: 'city',
        number: 123,
        zip: 'Zip'
      }
    };

    const result = await findCustomerUseCase.execute(input);

    expect(result).toMatchObject(output);
  });
});
