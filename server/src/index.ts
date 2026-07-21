import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { testDbConnection } from './db.js'; // 🔥 Расширение .js обязательно

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, async () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  await testDbConnection();
});