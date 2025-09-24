import { body, param } from "express-validator";
import { resultValidationMiddleware } from "./__result-validator.ts";

export const titleInputValidator = body("title")
  .trim()
  .notEmpty()
  .withMessage("Title is required")
  .isString()
  .withMessage("Title must be a string")
  .isLength({ max: 20 })
  .withMessage("Title should not exceed 20 characters")
  .isLength({ min: 3 })
  .withMessage("Title should be at least 3 characters");

export const productIdValidator = param("id")
  .exists()
  .withMessage("Product id is required")
  .isString()
  .withMessage("Product id be a string")
  .isLength({ min: 1 })
  .withMessage("Product id is required")
  .isNumeric()
  .withMessage("Product id must be a numeric string");

export const getProductByIdValidators = [
  productIdValidator,
  resultValidationMiddleware,
];

export const createProductValidators = [
  titleInputValidator,
  resultValidationMiddleware,
];

export const updateProductValidators = [
  productIdValidator,
  titleInputValidator,
  resultValidationMiddleware,
];

export const deleteProductValidators = [
  productIdValidator,
  resultValidationMiddleware,
];
