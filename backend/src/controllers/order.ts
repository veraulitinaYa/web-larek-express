import { Request, Response, NextFunction } from 'express';
import productModel from '../models/product';
import { faker } from '@faker-js/faker';
import { BadRequestError } from '../errors/bad-request-error';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { payment, email, phone, address, total, items } = req.body;

    if (!payment || !email || !phone || !address || total === undefined || !items) {
      return next(new BadRequestError('Не все поля заполнены'));
    }

    if (!['card', 'online'].includes(payment)) {
      return next(new BadRequestError('Неверный способ оплаты'));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new BadRequestError('Неверный email'));
    }

    if (!Array.isArray(items) || items.length === 0) {
      return next(new BadRequestError('items должен быть непустым массивом'));
    }

    const products = await productModel.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return next(new BadRequestError('Некоторые товары не найдены'));
    }

    const invalidProduct = products.find(p => p.price === null);
    if (invalidProduct) {
      return next(new BadRequestError('Один из товаров недоступен для продажи'));
    }

    const calculatedTotal = products.reduce((sum, p) => sum + (p.price || 0), 0);

    if (calculatedTotal !== total) {
      return next(new BadRequestError('Неверная сумма заказа'));
    }

    const orderId = faker.string.uuid();

    res.status(201).json({
      id: orderId,
      total: calculatedTotal
    });

  } catch (err) {
    next(err);
  }
};