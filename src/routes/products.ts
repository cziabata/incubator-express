import { Router } from "express";
import { 
  createProductValidators, 
  deleteProductValidators,
  getProductByIdValidators, 
  updateProductValidators 
} from "../middlewares/validators/products";
import { basicAuthGuardMiddleware } from "../middlewares/guards/basic-auth.guard";
import { productsController } from "../controller/products";

export const productsRouter = Router();

productsRouter.get("/", basicAuthGuardMiddleware, productsController.getProducts);

productsRouter.get("/:id", basicAuthGuardMiddleware, ...getProductByIdValidators, productsController.getProductById);

productsRouter.post("/", basicAuthGuardMiddleware, ...createProductValidators, productsController.createProduct);

productsRouter.put("/:id", basicAuthGuardMiddleware, ...updateProductValidators, productsController.updateProduct);

productsRouter.delete("/:id", basicAuthGuardMiddleware, ...deleteProductValidators, productsController.deleteProduct);