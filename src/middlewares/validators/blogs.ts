import { body, param } from "express-validator";
import { resultValidationMiddleware } from "./__result-validator";

export const nameInputValidator = body("name")
  .trim()
  .notEmpty()
  .withMessage("Name is required")
  .isString()
  .withMessage("Name must be a string")
  .isLength({ max: 15 })
  .withMessage("Name should not exceed 15 characters");

export const blogIdValidator = param("id")
  .exists()
  .withMessage("Blog id is required")
  .isString()
  .withMessage("Blog id be a string")
  .isLength({ min: 1 })
  .withMessage("Blog id is required")
  .isNumeric()
  .withMessage("Blog id must be a numeric string");

export const descriptionInputValidator = body("description")
  .trim()
  .notEmpty()
  .withMessage("Description is required")
  .isString()
  .withMessage("Description must be a string")
  .isLength({ max: 500 })
  .withMessage("Description should not exceed 500 characters");

export const websiteUrlInputValidator = body("websiteUrl")
  .trim()
  .notEmpty()
  .withMessage("Website url is required")
  .isString()
  .withMessage("Website url must be a string")
  .isLength({ max: 100 })
  .withMessage("Website url should not exceed 100 characters")
  .matches(
    /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
  )
  .withMessage("Website url must be a valid URL");

export const createBlogValidators = [
  nameInputValidator,
  descriptionInputValidator,
  websiteUrlInputValidator,
  resultValidationMiddleware,
];

export const updateBlogValidators = [
  blogIdValidator,
  nameInputValidator,
  descriptionInputValidator,
  websiteUrlInputValidator,
  resultValidationMiddleware,
];

export const getBlogByIdValidators = [
  blogIdValidator,
  resultValidationMiddleware,
];

export const deleteBlogValidators = [
  blogIdValidator,
  resultValidationMiddleware,
];
