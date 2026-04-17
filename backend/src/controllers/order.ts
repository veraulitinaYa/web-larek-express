import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import productModel from '../models/product';
import BadRequestError from '../errors/bad-request-error';

export default async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const {
      payment,
      email,
      phone,
      address,
      total,
      items,
    } = req.body; // FIX: object-curly-newline + max-len

    if (!payment || !email || !phone || !address || total === undefined || !items) {
      next(new BadRequestError('Не все поля заполнены'));
      return;
    }

    if (!['card', 'online'].includes(payment)) {
      next(new BadRequestError('Неверный способ оплаты'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      next(new BadRequestError('Неверный email'));
      return;
    }

    if (!Array.isArray(items) || items.length === 0) {
      next(new BadRequestError('items должен быть непустым массивом'));
      return;
    }

    const products = await productModel.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      next(new BadRequestError('Некоторые товары не найдены'));
      return;
    }

    const invalidProduct = products.find((p) => p.price === null);

    if (invalidProduct) {
      next(new BadRequestError('Один из товаров недоступен для продажи'));
      return;
    }

    const calculatedTotal = products.reduce((sum, p) => sum + (p.price || 0), 0);

    if (calculatedTotal !== total) {
      next(new BadRequestError('Неверная сумма заказа'));
      return;
    }

    const orderId = faker.string.uuid();

    res.status(201).json({
      id: orderId,
      total: calculatedTotal,
    });
  } catch (err) {
    next(err);
  }
}
