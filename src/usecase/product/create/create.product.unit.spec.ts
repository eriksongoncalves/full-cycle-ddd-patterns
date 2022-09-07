import CreateProductUseCase from './create.product.usecase';

const input = {
  name: 'Product Name',
  price: 100
};

const mockProductRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn()
});

describe('Unit Test create product use case', () => {
  it('should create a product', async () => {
    const productRepository = mockProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const result = await createProductUseCase.execute(input);

    expect(result).toMatchObject({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });
});
