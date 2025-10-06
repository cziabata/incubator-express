import { body, param } from "express-validator";
import { resultValidationMiddleware } from "./__result-validator";

export const postIdValidator = param("id")
  .exists()
  .withMessage("Post id is required")
  .isString()
  .withMessage("Post id must be a string")
  .isLength({ min: 1 })
  .withMessage("Post id is required")
  .isNumeric()
  .withMessage("Post id must be a numeric string");

export const titleInputValidator = body("title")
  .trim()
  .notEmpty()
  .withMessage("Title is required")
  .isString()
  .withMessage("Title must be a string")
  .isLength({ max: 30 })
  .withMessage("Title should not exceed 20 characters");

export const shortDescriptionInputValidator = body("shortDescription")
  .trim()
  .notEmpty()
  .withMessage("Short description is required")
  .isString()
  .withMessage("Short description must be a string")
  .isLength({ max: 100 })
  .withMessage("Short description should not exceed 100 characters");

export const contentInputValidator = body("content")
  .trim()
  .notEmpty()
  .withMessage("Content is required")
  .isString()
  .withMessage("Content must be a string")
  .isLength({ max: 1000 })
  .withMessage("Content should not exceed 1000 characters");

export const blogIdInputValidator = body("blogId")
  .trim()
  .notEmpty()
  .withMessage("Blog id is required")
  .isString()
  .withMessage("Blog id must be a string")
  .isLength({ min: 1 })
  .withMessage("Blog id is required")
  .isNumeric()
  .withMessage("Blog id must be a numeric string");

export const getPostByIdValidators = [
  postIdValidator,
  resultValidationMiddleware,
];

export const createPostValidators = [
  titleInputValidator,
  shortDescriptionInputValidator,
  contentInputValidator,
  blogIdInputValidator,
  resultValidationMiddleware,
];

export const updatePostValidators = [
  postIdValidator,
  titleInputValidator,
  shortDescriptionInputValidator,
  contentInputValidator,
  blogIdInputValidator,
  resultValidationMiddleware,
];

export const deletePostValidators = [
  postIdValidator,
  resultValidationMiddleware,
];
