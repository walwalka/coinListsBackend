import "dotenv/config.js";
import pg from 'pg'
import { sqlIp , sqlDb, sqlPass, sqlUser, sqlPort } from '../config.js';

const { Pool } = pg;

export const pool = new Pool({
    user: sqlUser,
    host: sqlIp,
    database: sqlDb,
    password: sqlPass,
    port: sqlPort,
  });

  async function createCoinTable() {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS coins (
          id SERIAL PRIMARY KEY,
          type VARCHAR(255) NOT NULL,
          mintlocation VARCHAR(255) NOT NULL,
          mintyear DATE NOT NULL,
          circulation VARCHAR(255) NOT NULL,
          grade VARCHAR(255) NOT NULL
        );
      `;
  
      await pool.query(query);
      console.log('Coin table created');
    } catch (error) {
      console.error(error);
      console.error('Coin table creation failed');
    }
  }
  
  createCoinTable();

