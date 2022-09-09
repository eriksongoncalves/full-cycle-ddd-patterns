import { Sequelize } from 'sequelize-typescript';
import FindProductUseCase from './find.product.usecase';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductFactory from '../../../domain/product/factory/product.factory';

describe('Test find product use case', () => {
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

  it('should find a product use case', async () => {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const product = ProductFactory.createWithoutType('Product name', 100);

    await productRepository.create(product);

    const input = { id: product.id };

    const output = {
      id: product.id,
      name: product.name,
      price: product.price
    };

    const result = await findProductUseCase.execute(input);

    expect(result).toMatchObject(output);
  });
});
