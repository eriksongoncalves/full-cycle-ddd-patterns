import Product from '../../../domain/product/entity/product';
import FindProductUseCase from './find.product';

const product = new Product('1', 'Product name', 100);

const mockProductRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn()
});

describe('Unit Test find product use case', () => {
  it('should find a customer', async () => {
    const productRepository = mockProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const input = { id: '1' };

    const output = {
      id: '1',
      name: 'Product name',
      price: 100
    };

    const result = await findProductUseCase.execute(input);

    expect(result).toMatchObject(output);
  });
});
