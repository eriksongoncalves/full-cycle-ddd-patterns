import Address from '../../../../domain/customer/value-object/address';
import Customer from '../../../../domain/customer/entity/customer';
import EventDispatcher from '../../../../domain//@shared/event/event-dispatcher';
import CustomerCreatedEvent from '../../../../domain/customer/event/customer-created.event';
import SendConsoleLog1 from '../../../../domain/customer/event/handler/send-console-log1.handler';
import SendConsoleLog2 from '../../../../domain/customer/event/handler/send-console-log2.handler';
import CustomerRepositoryInterface from '../../../../domain/customer/repository/customer-repository-interface';
import CustomerModel from './customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(customer: Customer): Promise<void> {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1();
    const eventHandler2 = new SendConsoleLog2();

    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    });

    eventDispatcher.register('CustomerCreatedEvent', eventHandler);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    eventDispatcher.notify(new CustomerCreatedEvent(''));
  }

  async update(customer: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: customer.name,
        street: customer.Address.street,
        number: customer.Address.number,
        zipcode: customer.Address.zip,
        city: customer.Address.city,
        active: customer.isActive(),
        rewardPoints: customer.rewardPoints
      },
      {
        where: {
          id: customer.id
        }
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id
        },
        rejectOnEmpty: true
      });
    } catch (error) {
      throw new Error('Customer not found');
    }

    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );

    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map(customerModels => {
      let customer = new Customer(customerModels.id, customerModels.name);
      customer.addRewardPoints(customerModels.rewardPoints);
      const address = new Address(
        customerModels.street,
        customerModels.number,
        customerModels.zipcode,
        customerModels.city
      );
      customer.changeAddress(address);
      if (customerModels.active) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }
}
