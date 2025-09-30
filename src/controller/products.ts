import { type Request, type Response } from "express";
import { productsService } from "../services/products";

export const productsController = {
  getProducts(req: Request, res: Response) {
    const searchTitle = req.query.title ? req.query.title.toString() : "";

    const products = productsService.getProducts(searchTitle);
    res.send(products);
  },

  getProductById(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const product = productsService.getProductById(id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ error: "Product not found" });
    }
  },

  createProduct(req: Request, res: Response) {
    const product = req.body;
    const newProduct = productsService.createProduct(product);
    res.status(201).send(newProduct);
  },

  updateProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const product = req.body;
    const updatedProduct = productsService.updateProduct(id, product);
    if (updatedProduct) {
      res.status(200).send(updatedProduct);
    } else {
      res.status(404).send({ error: "Product not found" });
    }
  },
  
  deleteProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const deletedProduct = productsService.deleteProduct(id);
    if (deletedProduct) {
      res.status(204).send(deletedProduct);
    } else {
      res.status(404).send({ error: "Product not found" });
    }
  },

};