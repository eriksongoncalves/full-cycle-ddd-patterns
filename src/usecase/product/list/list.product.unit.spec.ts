import ProductFactory from '../../../domain/product/factory/product.factory';
import ListProductUseCase from './list.product.usecase';

const product1 = ProductFactory.createWithoutType('Product 1', 100);
const product2 = ProductFactory.createWithoutType('Product 2', 150);

const mockProductRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
});

describe('Unit Test list product use case', () => {
  it('should list all products', async () => {
    const productRepository = mockProductRepository();
    const listCustomerUseCase = new ListProductUseCase(productRepository);

    const result = await listCustomerUseCase.execute();

    const output = [product1, product2].map(product => ({
      id: product.id,
      name: product.name,
      price: product.price
    }));

    expect(result).toEqual({
      products: output
    });
  });
});
