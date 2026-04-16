import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import { BaseError } from '../errors/base-error';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (isCelebrateError(err)) {
    const body = err.details.get('body');

    return res.status(400).json({
      message: body?.message || 'Ошибка валидации данных',
    });
  }

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'Внутренняя ошибка сервера',
  });
};