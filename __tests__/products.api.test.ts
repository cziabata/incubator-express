import express from "express";
import request from "supertest";
import { describe, test, expect, beforeAll } from '@jest/globals';
import { setupApp } from "../src/setupApp";
import type { Product } from "../src/types/products";

describe('Products API', () => {

  const app = express();
  setupApp(app);

  const products: Product[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'cucumber'}, {id: 3, title: 'carrot'}]

  // Set up environment variables for Basic Auth
  beforeAll(() => {
    process.env.BASIC_AUTH_LOGIN = 'admin';
    process.env.BASIC_AUTH_PASSWORD = 'qwerty';
  });

  // Helper function to create Basic Auth header
  const createAuthHeader = (username: string = 'admin', password: string = 'qwerty') => {
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');
    return `Basic ${credentials}`;
  };

  test('GET / should return 200 status and "Hello World" message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!!!!7');
  });

  test('GET /products should return 200 status and products array', async () => {
    const response = await request(app)
      .get('/products')
      .set('Authorization', createAuthHeader());
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toEqual(products);
  });

  test('POST /products should return 201 status and product', async () => {
    const response = await request(app)
      .post('/products')
      .set('Authorization', createAuthHeader())
      .send({title: 'tomato'});
    expect(response.status).toBe(201);
    expect(response.body).toEqual({id: 4, title: 'tomato'});
  });

  test('POST /products should return 400 status and errors', async () => {
    const response = await request(app)
      .post('/products')
      .set('Authorization', createAuthHeader())
      .send({title: ''});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({errorMessages: [{field: 'title', message: 'Title is required'}]});
  })

  test('PUT /products/:id should return 200 status and product', async () => {
    const response = await request(app)
      .put('/products/1')
      .set('Authorization', createAuthHeader())
      .send({title: 'tomato'});
    expect(response.status).toBe(200);
    expect(response.body).toEqual({id: 1, title: 'tomato'});
  })

  test('PUT /products/:id should return 400 status and errors', async () => {
    const response = await request(app)
      .put('/products/1')
      .set('Authorization', createAuthHeader())
      .send({title: ''});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({errorMessages: [{field: 'title', message: 'Title is required'}]});
  })

  test('PUT /products/:id should return 404 status and error', async () => {
    const response = await request(app)
      .put('/products/10')
      .set('Authorization', createAuthHeader())
      .send({title: 'tomato'});
    expect(response.status).toBe(404);
    expect(response.body).toEqual({error: 'Product not found'});
  })

  test('DELETE /products/:id should return 204 status', async () => {
    const response = await request(app)
      .delete('/products/1')
      .set('Authorization', createAuthHeader());
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  })

  test('DELETE /products/:id should return 404 status and error', async () => {
    const response = await request(app)
      .delete('/products/10')
      .set('Authorization', createAuthHeader());
    expect(response.status).toBe(404);
    expect(response.body).toEqual({error: 'Product not found'});
  })

  // Authorization tests
  test('GET /products without authorization should return 401 status', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(401);
  });

  test('POST /products without authorization should return 401 status', async () => {
    const response = await request(app).post('/products').send({title: 'tomato'});
    expect(response.status).toBe(401);
  });

  test('PUT /products/:id without authorization should return 401 status', async () => {
    const response = await request(app).put('/products/1').send({title: 'tomato'});
    expect(response.status).toBe(401);
  });

  test('DELETE /products/:id without authorization should return 401 status', async () => {
    const response = await request(app).delete('/products/1');
    expect(response.status).toBe(401);
  });

  test('GET /products with wrong credentials should return 401 status', async () => {
    const response = await request(app)
      .get('/products')
      .set('Authorization', createAuthHeader('wrong', 'credentials'));
    expect(response.status).toBe(401);
  });

  test('GET /products with malformed authorization header should return 401 status', async () => {
    const response = await request(app)
      .get('/products')
      .set('Authorization', 'InvalidAuthHeader');
    expect(response.status).toBe(401);
  });

  test('GET /products with Bearer token instead of Basic should return 401 status', async () => {
    const response = await request(app)
      .get('/products')
      .set('Authorization', 'Bearer some-token');
    expect(response.status).toBe(401);
  });
});