import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';

import productModel from './models/product';
import cors from 'cors';
import path from 'path';
import { requestLogger, errorLogger } from './middlewares/logger';
import { errors } from 'celebrate';
import { notFound } from './middlewares/not-found';
import { errorHandler } from './middlewares/error-handler';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use(productRoutes);
app.use(orderRoutes);
app.use(
  '/images',
  express.static(path.join(__dirname, 'dump/images'))
);

app.get('/', (req, res) => {
  res.send('Сервер работает');
});


app.use(notFound);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

if (!process.env.DB_ADDRESS) {
  throw new Error('DB_ADDRESS не задан в .env');
}

mongoose.connect(process.env.DB_ADDRESS as string)
  .then(() => console.log('Подключено к MongoDB'))
.catch(err => console.error(err));


app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});

