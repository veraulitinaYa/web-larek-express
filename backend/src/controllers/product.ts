import { NextFunction, Request, Response } from 'express';
import productModel from '../models/product';
import ConflictError from '../errors/conflict-error';
import BadRequestError from '../errors/bad-request-error';

export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const items = await productModel.find();

    res.json({ items });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const product = await productModel.create(req.body);

    res.status(201).json(product);
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('E11000')) {
      next(new ConflictError('Товар с таким title уже существует'));
      return;
    }

    if (error.name === 'ValidationError') {
      next(new BadRequestError(error.message));
      return;
    }

    next(error);
  }
};
