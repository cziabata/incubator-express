import express from "express";
import request from "supertest";
import { describe, test, expect, beforeAll } from '@jest/globals';
import { setupApp } from "../src/setupApp";

describe('Testing API', () => {

  const app = express();
  setupApp(app);

  test('DELETE /testing/all-data should return 204 status', async () => {
    const response = await request(app).delete('/testing/all-data');
    expect(response.status).toBe(204);
  });
  
})