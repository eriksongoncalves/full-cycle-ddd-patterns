import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'Street',
          city: 'City',
          number: 123,
          zip: '12345'
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John');
    expect(response.body.address.street).toBe('Street');
    expect(response.body.address.city).toBe('City');
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe('12345');
  });

  it('should throw an error when creating a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: '',
        address: {
          street: 'Street',
          city: 'City',
          number: 123,
          zip: '12345'
        }
      });

    expect(response.status).toBe(500);
  });

  it('should list all customers', async () => {
    const response1 = await request(app)
      .post('/customer')
      .send({
        name: 'Customer 1',
        address: {
          street: 'Street',
          city: 'City',
          number: 123,
          zip: '12345'
        }
      });

    expect(response1.status).toBe(200);

    const response2 = await request(app)
      .post('/customer')
      .send({
        name: 'Customer 2',
        address: {
          street: 'Street',
          city: 'City',
          number: 123,
          zip: '12345'
        }
      });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get('/customer').send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);

    const customer1 = listResponse.body.customers[0];
    const customer2 = listResponse.body.customers[1];

    expect(customer1.name).toBe('Customer 1');
    expect(customer2.name).toBe('Customer 2');
  });
});
