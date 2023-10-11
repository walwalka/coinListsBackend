import pg from 'pg'

const { Pool } = pg;

export const pool = new Pool({
    user: 'postgres',
    host: '10.3.100.223',
    database: 'coins',
    password: 'P0stGr3sAdmin',
    port: 5432,
  });

  async function createCoinTable() {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS coins (
          id SERIAL PRIMARY KEY,
          type date NOT NULL,
          mintlocation VARCHAR(255) NOT NULL,
          mintyear NUMERIC(10, 2) NOT NULL,
          circulation VARCHAR(255) NOT NULL,
          grade NUMERIC(10, 2)
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

