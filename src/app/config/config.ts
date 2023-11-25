import dotenv from 'dotenv';
import path from 'path';
// config .env
dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL as string,
  saltRounds: process.env.SALT_ROUNDS,
};
