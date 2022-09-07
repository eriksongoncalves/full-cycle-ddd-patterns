import ProductFactory from '../../../domain/product/factory/product.factory';
import UpdateProductUseCase from './update.product.usecase';

const product = ProductFactory.createWithoutType('Product name', 100);

const input = {
  id: product.id,
  name: 'Product 1',
  price: 200
};

const mockProductRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn()
});

describe('Unit Test update product use case', () => {
  it('should update a product', async () => {
    const productRepository = mockProductRepository();
    const updateProductRepositoryUseCase = new UpdateProductUseCase(
      productRepository
    );

    const result = await updateProductRepositoryUseCase.execute(input);

    expect(result).toMatchObject(input);
  });
});
