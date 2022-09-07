import express from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';

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
