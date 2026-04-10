import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Сервер работает');
});

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});