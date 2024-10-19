
import mysql2, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool: Pool | null = null;

const mySqlInstance = async (): Promise<Pool> => {
  if (!pool) {
    try {
      pool = mysql2.createPool({
        port: Number(process.env.DB_PORT),
        host: process.env.DB_HOSTNAME as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_DATABASE as string,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      console.log('MySQL pool created.');
    } catch (error) {
      console.error('Error creating MySQL pool:', error);
      throw new Error('Failed to create MySQL pool');
    }
  }
  return pool;
};


export default mySqlInstance;

