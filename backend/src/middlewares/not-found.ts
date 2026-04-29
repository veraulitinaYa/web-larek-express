import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/not-found-error';

const notFound = (_req: Request, _res: Response, next: NextFunction): void => {
  next(new NotFoundError());
};

export default notFound;
