import { NextFunction, Request, Response } from 'express';
import productModel from '../models/product';
import { ConflictError } from '../errors/conflict-error';
import { BadRequestError } from '../errors/bad-request-error';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await productModel.find();
    res.json({ items });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json(product);

  } catch (error: any) {

    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('Товар с таким title уже существует'));
    }

    if (error.name === 'ValidationError') {
      return next(new BadRequestError(error.message));
    }

    next(error);
  }
};