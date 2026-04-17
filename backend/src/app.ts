import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';

import productRoutes from './routes/product';
import orderRoutes from './routes/order';
import { requestLogger, errorLogger } from './middlewares/logger';
import notFound from './middlewares/not-found';
import errorHandler from './middlewares/error-handler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use(productRoutes);
app.use(orderRoutes);

app.use(
  '/images',
  express.static(path.join(__dirname, 'dump/images')),
);

app.get('/', (_req, res) => {
  res.send('Сервер работает');
});

app.use(notFound);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

if (!process.env.DB_ADDRESS) {
  throw new Error('DB_ADDRESS не задан в .env');
}

mongoose
  .connect(process.env.DB_ADDRESS)
  .then(() => console.log('Подключено к MongoDB'))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});
