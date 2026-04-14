import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product';

import productModel from './models/product';
import cors from 'cors';

//import { MongoClient } from 'mongodb';

//const client = new MongoClient('mongodb://localhost:27017/weblarek');




const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(productRoutes);

mongoose.connect('mongodb://localhost:27017/weblarek')
  .then(() => console.log('Подключено к MongoDB'))
.catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Сервер работает');
});

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});

