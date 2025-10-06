import express from "express";
import request from "supertest";
import { describe, expect, beforeAll } from '@jest/globals';
import { setupApp } from "../src/setupApp";
import { Blog, CreateBlogDto, UpdateBlogDto } from "../src/types/blogs";

describe('Blogs API', () => {

  const app = express();
  setupApp(app);

   // Set up environment variables for Basic Auth
   beforeAll(() => {
    process.env.BASIC_AUTH_LOGIN = 'admin';
    process.env.BASIC_AUTH_PASSWORD = 'qwerty';
  })


  // Helper function to create Basic Auth header
  const createAuthHeader = (username: string = 'admin', password: string = 'qwerty') => {
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');
    return `Basic ${credentials}`;
  };

  let blogs: Blog[] = [
    { id: "1", name: "Blog 1", description: "Blog 1 description", websiteUrl: "https://blog1.com" },
    { id: "2", name: "Blog 2", description: "Blog 2 description", websiteUrl: "https://blog2.com" },
    { id: "3", name: "Blog 3", description: "Blog 3 description", websiteUrl: "https://blog3.com" },
  ];

  let newBlog: CreateBlogDto = { name: "Blog 4", description: "Blog 4 description", websiteUrl: "https://blog4.com" };
  let updatedBlog: UpdateBlogDto = { name: "Blog 4", description: "Blog 4 description", websiteUrl: "https://blog4.com" };

  it('GET /blogs should return 200 status and blogs array', async () => {
    const response = await request(app).get('/blogs');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toEqual(blogs);
  });

  it('GET /blogs/:id should return 200 status and blog', async () => {
    const response = await request(app).get('/blogs/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(blogs[0]);
  });

  it('POST /blogs should return 201 status and new blog', async () => {
    const response = await request(app).post('/blogs').set('Authorization', createAuthHeader()).send(newBlog);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: "4",
      name: "Blog 4",
      description: "Blog 4 description",
      websiteUrl: "https://blog4.com",
    });
  });

  it('PUT /blogs/:id should return 204 status and updated blog', async () => {
    const response = await request(app).put('/blogs/1').set('Authorization', createAuthHeader()).send(updatedBlog);
    expect(response.status).toBe(204);
  });

  it('DELETE /blogs/:id should return 204 status', async () => {
    const response = await request(app).delete('/blogs/1').set('Authorization', createAuthHeader());
    expect(response.status).toBe(204);
  });

  it('DELETE /blogs/:id should return 404 status and error', async () => {
    const response = await request(app).delete('/blogs/10').set('Authorization', createAuthHeader());
    expect(response.status).toBe(404);
    expect(response.body).toEqual({error: 'Blog not found'});
  });

  it('GET /blogs/:id should return 404 status and error', async () => {
    const response = await request(app).get('/blogs/10');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({error: 'Blog not found'});
  });

  it('POST /blogs should return 400 status and errors', async () => {
    const response = await request(app).post('/blogs').set('Authorization', createAuthHeader()).send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({errorMessages: [{field: 'name', message: 'Name is required'}, {field: 'description', message: 'Description is required'}, {field: 'websiteUrl', message: 'Website url is required'}]});
  });

  it('PUT /blogs/:id should return 400 status and errors', async () => {
    const response = await request(app).put('/blogs/1').set('Authorization', createAuthHeader()).send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({errorMessages: [{field: 'name', message: 'Name is required'}, {field: 'description', message: 'Description is required'}, {field: 'websiteUrl', message: 'Website url is required'}]});
  });

  it('PUT /blogs/:id should return 404 status and error', async () => {
    const response = await request(app).put('/blogs/10').set('Authorization', createAuthHeader()).send(updatedBlog);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({error: 'Blog not found'});
  });


  // Authorization tests
  it('POST /blogs without authorization should return 401 status', async () => {
    const response = await request(app).post('/blogs').send(newBlog);
    expect(response.status).toBe(401);
  });

  it('PUT /blogs/:id without authorization should return 401 status', async () => {
    const response = await request(app).put('/blogs/1').send(updatedBlog);
    expect(response.status).toBe(401);
  });

  it('DELETE /blogs/:id without authorization should return 401 status', async () => {
    const response = await request(app).delete('/blogs/1');
    expect(response.status).toBe(401);
  });

});
