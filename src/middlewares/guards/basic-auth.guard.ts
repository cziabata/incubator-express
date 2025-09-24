import { type NextFunction, type Request, type Response } from 'express';
import { HttpStatus } from '../../types/http-status';
import { BASIC_AUTH_LOGIN, BASIC_AUTH_PASSWORD } from '../../config';
 
export const basicAuthGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'] as string; // 'Basic xxxx'
  if (!auth) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }
 
  const [authType, token] = auth.split(' '); //login:password
  if (authType !== 'Basic' || !token) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }
 
  const credentials = Buffer.from(token, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');
 
  if (username !== BASIC_AUTH_LOGIN || password !== BASIC_AUTH_PASSWORD) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }
 
  next(); // Успешная авторизация, продолжаем
};