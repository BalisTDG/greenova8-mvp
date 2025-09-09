import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const isCloudRun = process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production';

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ...(isCloudRun
    ? {
        host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
      }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
      }),
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});

export default pool; 