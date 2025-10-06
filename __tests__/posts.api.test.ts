import express from "express";
import request from "supertest";
import { describe, test, expect, beforeAll } from '@jest/globals';
import { setupApp } from "../src/setupApp";
import { CreatePostDto, Post, PostViewModel, UpdatePostDto } from "../src/types/posts";

describe('Posts API', () => {
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

  let posts: Post[] = [
    { id: "1", title: "Post 1", shortDescription: "Short description 1", content: "Content 1", blogId: "1" },
    { id: "2", title: "Post 2", shortDescription: "Short description 2", content: "Content 2", blogId: "2" },
    { id: "3", title: "Post 3", shortDescription: "Short description 3", content: "Content 3", blogId: "3" },
  ];

  let postsViewModel: PostViewModel[] = [
    { id: "1", title: "Post 1", shortDescription: "Short description 1", content: "Content 1", blogId: "1", blogName: "Blog 1" },
    { id: "2", title: "Post 2", shortDescription: "Short description 2", content: "Content 2", blogId: "2", blogName: "Blog 2" },
    { id: "3", title: "Post 3", shortDescription: "Short description 3", content: "Content 3", blogId: "3", blogName: "Blog 3" },
  ];

  let newPost: CreatePostDto = { title: "Post 4", shortDescription: "Short description 4", content: "Content 4", blogId: "3" };
  let updatedPost: UpdatePostDto = { title: "Post 4", shortDescription: "Short description 4", content: "Content 4", blogId: "3" };

  it('GET /posts should return 200 status and posts array', async () => {
    const response = await request(app).get('/posts');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toEqual(postsViewModel);
  });
  
  it('GET /posts/:id should return 200 status and post', async () => {
    const response = await request(app).get('/posts/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(postsViewModel[0]);
  });
  
  it('POST /posts should return 201 status and new post', async () => {
    const response = await request(app).post('/posts').set('Authorization', createAuthHeader()).send(newPost);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: "4",
      title: "Post 4",
      shortDescription: "Short description 4",
      content: "Content 4",
      blogId: "3",
      blogName: "Blog 3",
    });
  });

  it('PUT /posts/:id should return 204 status', async () => {
    const response = await request(app).put('/posts/1').set('Authorization', createAuthHeader()).send(updatedPost);
    expect(response.status).toBe(204);
  });

  it('DELETE /posts/:id should return 204 status', async () => {
    const response = await request(app).delete('/posts/1').set('Authorization', createAuthHeader());
    expect(response.status).toBe(204);
  });

  it('DELETE /posts/:id should return 404 status and error', async () => {
    const response = await request(app).delete('/posts/10').set('Authorization', createAuthHeader());
    expect(response.status).toBe(404);
    expect(response.body).toEqual({error: 'Post not found'});
  });

  it('GET /posts/:id should return 404 status and error', async () => {
    const response = await request(app).get('/posts/10');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({error: 'Post not found'});
  });

  it('POST /posts should return 400 status and errors', async () => {
    const response = await request(app).post('/posts').set('Authorization', createAuthHeader()).send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({errorMessages: [
      {field: 'title', message: 'Title is required'}, 
      {field: 'shortDescription', message: 'Short description is required'}, 
      {field: 'content', message: 'Content is required'}, 
      {field: 'blogId', message: 'Blog id is required'}
    ]});
  });

  it('PUT /posts/:id should return 400 status and errors', async () => {
    const response = await request(app).put('/posts/1').set('Authorization', createAuthHeader()).send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({errorMessages: [
      {field: 'title', message: 'Title is required'}, 
      {field: 'shortDescription', message: 'Short description is required'}, 
      {field: 'content', message: 'Content is required'}, 
      {field: 'blogId', message: 'Blog id is required'}
    ]});
  });

  it('PUT /posts/:id should return 404 status and error', async () => {
    const response = await request(app).put('/posts/10').set('Authorization', createAuthHeader()).send(updatedPost);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({error: 'Post not found'});
  });

  it('DELETE /posts/:id should return 404 status and error', async () => {
    const response = await request(app).delete('/posts/10').set('Authorization', createAuthHeader());
    expect(response.status).toBe(404);
    expect(response.body).toEqual({error: 'Post not found'});
  });

  // Authorization tests
  it('POST /posts without authorization should return 401 status', async () => {
    const response = await request(app).post('/posts').send(newPost);
    expect(response.status).toBe(401);
  });
  
  it('PUT /posts/:id without authorization should return 401 status', async () => {
    const response = await request(app).put('/posts/1').send(updatedPost);
    expect(response.status).toBe(401);
  });

  it('DELETE /posts/:id without authorization should return 401 status', async () => {
    const response = await request(app).delete('/posts/1');
    expect(response.status).toBe(401);
  });
})
