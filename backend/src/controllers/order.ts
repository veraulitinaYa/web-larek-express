import { Request, Response } from 'express';
import productModel from '../models/product';
import { faker } from '@faker-js/faker';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { payment, email, phone, address, total, items } = req.body;

    if (!payment || !email || !phone || !address || !total || !items) {
      return res.status(400).json({ message: 'Не все поля заполнены' });
    }

    if (!['card', 'online'].includes(payment)) {
      return res.status(400).json({ message: 'Неверный способ оплаты' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Неверный email' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'items должен быть непустым массивом' });
    }

    const products = await productModel.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return res.status(400).json({ message: 'Некоторые товары не найдены' });
    }

    const invalidProduct = products.find(p => p.price === null);
    if (invalidProduct) {
      return res.status(400).json({ message: 'Один из товаров недоступен для продажи' });
    }

    const calculatedTotal = products.reduce((sum, p) => sum + (p.price || 0), 0);

    if (calculatedTotal !== total) {
      return res.status(400).json({
        message: 'Неверная сумма заказа',
        expected: calculatedTotal
      });
    }

    const orderId = faker.string.uuid();

    return res.status(201).json({
      id: orderId,
      total: calculatedTotal
    });

  } catch (err) {
    return res.status(500).json({ message: 'Ошибка оформления заказа' });
  }
};