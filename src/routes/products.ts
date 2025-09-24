import { Router } from "express";
import { productsService } from "../services/products";
import { 
  createProductValidators, 
  deleteProductValidators,
  getProductByIdValidators, 
  updateProductValidators 
} from "../middlewares/validators/products";
import { basicAuthGuardMiddleware } from "../middlewares/guards/basic-auth.guard";

export const productsRouter = Router();

productsRouter.get("/", basicAuthGuardMiddleware, productsService.getProducts);

productsRouter.get("/:id", basicAuthGuardMiddleware, ...getProductByIdValidators, productsService.getProductById);

productsRouter.post("/", basicAuthGuardMiddleware, ...createProductValidators, productsService.createProduct);

productsRouter.put("/:id", basicAuthGuardMiddleware, ...updateProductValidators, productsService.updateProduct);

productsRouter.delete("/:id", basicAuthGuardMiddleware, ...deleteProductValidators, productsService.deleteProduct);