import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Prodct name',
      price: 100
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Prodct name');
    expect(response.body.price).toBe(100);
  });

  it('should throw an error when creating a product', async () => {
    const response = await request(app).post('/product').send({
      name: '',
      price: 100
    });

    expect(response.status).toBe(500);
  });
});
