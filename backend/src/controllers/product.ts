import { Request, Response } from 'express';
import productModel from '../models/product';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const items = await productModel.find();
    res.json({ items });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения товаров' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};