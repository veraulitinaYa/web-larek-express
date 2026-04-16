import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/base-error';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'Внутренняя ошибка сервера',
  });
};