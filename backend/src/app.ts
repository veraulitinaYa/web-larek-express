import express from 'express';
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017/weblarek');




const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Сервер работает');
});

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});

async function run() {
  await client.connect();
  const db = client.db('weblarek');
  console.log('Подключились к серверу MongoDB');
  const collection = db.collection("products");
  console.log (collection);
}
run().catch(console.dir);