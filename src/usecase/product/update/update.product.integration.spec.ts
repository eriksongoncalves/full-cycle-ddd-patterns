import { Sequelize } from 'sequelize-typescript';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import UpdateProductUseCase from './update.product.usecase';
import CreateProductUseCase from '../create/create.product.usecase';

describe('Test update product use case', () => {
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

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const productData = {
      name: 'Product Name',
      price: 100
    };

    const product = await createProductUseCase.execute(productData);

    product.name = 'Product 1';

    const result = await updateProductUseCase.execute(product);

    expect(result.name).toBe('Product 1');
  });
});
