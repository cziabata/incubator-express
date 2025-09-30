import express, { type Express } from "express";
import { productsRouter } from "./routes/products";
import { testingRouter } from "./routes/testing";
 
export const setupApp = (app: Express) => {

  app.use(express.json()); // middleware для парсинга JSON в теле запроса
 
  app.get('/', (req, res) => {
    res.status(200).send('Hello World!!!!7')
  })
  
  app.use('/products', productsRouter);

  app.use('/testing', testingRouter);

  return app;
};