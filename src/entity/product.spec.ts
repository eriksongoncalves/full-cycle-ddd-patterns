import Product from './product';

describe('Product unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new Product('', '', 0);
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      const product = new Product('1', '', 0);
    }).toThrowError('Name is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => {
      const product = new Product('1', 'Product 1', -1);
    }).toThrowError('Price must be greater than zero');
  });

  it('should change the name', () => {
    const product = new Product('1', 'Product 1', 10);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  });

  it('should throw error when changeName is empty', () => {
    expect(() => {
      const product = new Product('1', 'Product 1', 10);
      product.changeName('');
    }).toThrowError('Name is required');
  });

  it('should change the price', () => {
    const product = new Product('1', 'Product 1', 10);
    product.changePrice(15);
    expect(product.price).toBe(15);
  });

  it('should throw error when changePrice is less than zero', () => {
    expect(() => {
      const product = new Product('1', 'Product 1', 10);
      product.changePrice(-1);
    }).toThrowError('Price must be greater than zero');
  });
});
