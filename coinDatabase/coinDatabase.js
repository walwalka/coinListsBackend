import pg from 'pg'

const { Pool } = pg;

export const pool = new Pool({
    user: 'coinsapp-srv',
    host: '10.2.100.54',
    database: 'coins',
    password: 'FoW3cN2NnirYyv9ary69',
    port: 5432,
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

