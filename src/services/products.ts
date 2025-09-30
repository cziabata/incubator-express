import { productsRepository } from "../repositories/products";
import { CreateProductDto, Product } from "../types/products";

export const productsService = {
  getProducts(searchTitle: string) {
    return productsRepository.getProducts(searchTitle);
  },

  getProductById(id: number): Product | null {
    const product = productsRepository.getProductById(id);
    if (product) {
      return product;
    } else {
      return null;
    }
  },

  createProduct(product: CreateProductDto): Product {
    const newProduct = productsRepository.createProduct(product);
    return newProduct;
  },

  updateProduct(id: number, product: CreateProductDto): Product | null {
    const updatedProduct = productsRepository.updateProduct(id, product);
    if (!updatedProduct) {
      return null;
    }
    return updatedProduct;
  },

  deleteProduct(id: number): Product | null {
    const deletedProduct = productsRepository.deleteProduct(id);
    if (deletedProduct) {
      return deletedProduct;
    } else {
      return null;
    }
  },
};
