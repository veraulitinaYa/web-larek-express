import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import BaseError from '../errors/base-error'; // FIX

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
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

export default errorHandler;
