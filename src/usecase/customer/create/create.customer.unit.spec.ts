import CreateCustomerUseCase from './create.usecase';

const input = {
  name: 'John',
  address: {
    street: 'Street',
    city: 'city',
    number: 123,
    zip: 'Zip'
  }
};

const mockCustomerRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn()
});

describe('Unit Test create customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = mockCustomerRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    const result = await createCustomerUseCase.execute(input);

    expect(result).toMatchObject({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip
      }
    });
  });

  it('should throw an error when name is missing', () => {
    const customerRepository = mockCustomerRepository();
    const findCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = '';

    expect(async () => {
      await findCustomerUseCase.execute(input);
    }).rejects.toThrow('Name is required');
  });

  it('should throw an error when address is missing', () => {
    const customerRepository = mockCustomerRepository();
    const findCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = '';

    expect(async () => {
      await findCustomerUseCase.execute(input);
    }).rejects.toThrow('Street is required');
  });
});
