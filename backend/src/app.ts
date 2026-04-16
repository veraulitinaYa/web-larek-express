import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';

import productModel from './models/product';
import cors from 'cors';
import path from 'path';
import { notFound } from './middlewares/not-found';
import { errorHandler } from './middlewares/error-handler';

//import { MongoClient } from 'mongodb';

//const client = new MongoClient('mongodb://localhost:27017/weblarek');




const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(productRoutes);
app.use(orderRoutes);
app.use(
  '/images',
  express.static(path.join(__dirname, 'dump/images'))
);

app.use(notFound);
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/weblarek')
  .then(() => console.log('Подключено к MongoDB'))
.catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Сервер работает');
});

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});

