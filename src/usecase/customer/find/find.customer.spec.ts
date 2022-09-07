import { Sequelize } from 'sequelize-typescript';
import Address from '../../../domain/entity/address';
import Customer from '../../../domain/entity/customer';
import CustomerModel from '../../../infra/db/sequelize/model/customer.model';
import CustomerRepository from '../../../infra/repository/customer.repository';
import FindCustomerUseCase from './find.usecase';

describe('Test find customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([CustomerModel]);
    sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
    const customer = new Customer('123', 'John');
    const address = new Address('Street', 123, 'Zip', 'city');

    customer.changeAddress(address);

    await customerRepository.create(customer);

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
