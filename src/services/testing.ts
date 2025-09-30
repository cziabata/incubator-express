import { productsRepository } from "../repositories/products";

export const testingService = {
  clearDb(): void {
    productsRepository.clearProducts();
  },
};