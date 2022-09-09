import { Sequelize } from 'sequelize-typescript';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ListProductUseCase from './list.product.usecase';
import CreateProductUseCase from '../create/create.product.usecase';

describe('Test list product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      logging: false,
      sync: { force: true }
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should list all products use case', async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const listProductUseCase = new ListProductUseCase(productRepository);

    const product1 = {
      name: 'Product 1',
      price: 100
    };

    const product2 = {
      name: 'Product 2',
      price: 100
    };

    await createProductUseCase.execute(product1);
    await createProductUseCase.execute(product2);

    const result = await listProductUseCase.execute();

    expect(result.products.length).toBe(2);
  });
});
