import { Sequelize } from 'sequelize-typescript';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import CreateProductUseCase from './create.product.usecase';

describe('Test create product use case', () => {
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

  it('should create a product use case', async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'Product Name',
      price: 100
    };

    const result = await createProductUseCase.execute(input);

    expect(result).toMatchObject({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });
});
