import { validationResult, type ValidationError } from 'express-validator';
import { type Request, type Response, type NextFunction } from 'express';
import { HttpStatus } from '../types/http-status.ts';
 
const formatErrors = (error: ValidationError) => ({
  field: error.type === 'field' ? error.path : 'unknown', // Используем path для field errors
  message: error.msg, 
});
 
export const resultValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).formatWith(formatErrors).array({onlyFirstError: true});
 
  if (errors.length) {
    return res.status(HttpStatus.BadRequest).json({ errorMessages: errors });
  }
 
  next(); // Если ошибок нет, передаём управление дальше

};