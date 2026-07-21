import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME, // 🔥 Имя переменной совпадает с .env
});

export async function testDbConnection(retries = 5, delay = 3000) {
  while (retries > 0) {
    try {
      const res = await pool.query('SELECT NOW()');
      console.log('✅ Успешное подключение к PostgreSQL!');
      console.log(`Время БД: ${res.rows[0].now}`);
      return;
    } catch (err) {
      retries -= 1;
      console.log(`⏳ БД ещё загружается. Осталось попыток: ${retries}`);
      if (retries === 0) {
        console.error('❌ Ошибка подключения к БД:', err);
      } else {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
}