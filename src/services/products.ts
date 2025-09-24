import { productsRepository } from "../repositories/products.ts";
import { type Request, type Response } from "express";

export const productsService = {
  getProducts(req: Request, res: Response) {
    const searchTitle = req.query.title ? req.query.title.toString() : "";

    const products = productsRepository.getProducts(searchTitle);
    res.send(products);
  },

  getProductById(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const product = productsRepository.getProductById(id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ error: "Product not found" });
    }
  },

  createProduct(req: Request, res: Response) {
    const product = req.body;
    const newProduct = productsRepository.createProduct(product);
    res.status(201).send(newProduct);
  },

  updateProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const product = req.body;
    const updatedProduct = productsRepository.updateProduct(id, product);
    if (!updatedProduct) {
      res.status(404).send({ error: "Product not found" });
      return;
    }
    res.status(200).send(updatedProduct);
  },

  deleteProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const deletedProduct = productsRepository.deleteProduct(id);
    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send({ error: "Product not found" });
    }
  },
};
