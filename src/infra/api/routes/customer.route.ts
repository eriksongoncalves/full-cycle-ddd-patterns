import express from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.usecase';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import CustomerPresenter from '../presenters/customer.presenter';

export const customerRoute = express.Router();

customerRoute.post('/', async (req, res) => {
  const createCustomerUseCase = new CreateCustomerUseCase(
    new CustomerRepository()
  );

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip
      }
    };

    const output = await createCustomerUseCase.execute(customerDto);

    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get('/', async (_, res) => {
  const listCustomerUseCase = new ListCustomerUseCase(new CustomerRepository());

  try {
    const output = await listCustomerUseCase.execute();

    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(CustomerPresenter.listXML(output))
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
