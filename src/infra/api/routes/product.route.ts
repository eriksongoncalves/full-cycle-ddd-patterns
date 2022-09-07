import express from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';

export const productRoute = express.Router();

productRoute.post('/', async (req, res) => {
  const createProductUseCase = new CreateProductUseCase(
    new ProductRepository()
  );

  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price
    };

    const output = await createProductUseCase.execute(productDto);

    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get('/', async (req, res) => {
  const listProductUseCase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await listProductUseCase.execute();

    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
