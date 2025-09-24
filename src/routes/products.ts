import { Router } from "express";
import { productsService } from "../services/products.ts";
import { 
  createProductValidators, 
  deleteProductValidators,
  getProductByIdValidators, 
  updateProductValidators 
} from "../validators/products.ts";

export const productsRouter = Router();

productsRouter.get("/", productsService.getProducts);

productsRouter.get("/:id", ...getProductByIdValidators, productsService.getProductById);

productsRouter.post("/", ...createProductValidators, productsService.createProduct);

productsRouter.put("/:id", ...updateProductValidators, productsService.updateProduct);

productsRouter.delete("/:id", ...deleteProductValidators, productsService.deleteProduct);