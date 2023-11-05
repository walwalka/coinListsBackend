import express, { json, response } from 'express';
import { pool } from '../database/database.js';

const router = express.Router();

router.get('/', (request, response) => {
    response.status(200).send('Welcome to the Coins Backend Server!')
  });

router.post('/api', async (request, response) => {
    // Validate the incoming JSON data
    const { type, mintlocation, mintyear, circulation, grade } = request.body;
    console.log(request.body);
    if (!type || !mintlocation || !mintyear || !circulation || !grade) {
      return response.status(400).send('One of the type, mintlocation, mintyear, circulation, grade data points is missing');
    }
    try {
      // try to send data to the database
      const query = `
        INSERT INTO coins (type, mintlocation, mintyear, circulation, grade)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
      `;
      const values = [type, mintlocation, mintyear, circulation, grade];
  
      const result = await pool.query(query, values);
      response.status(200).send({ message: 'New coin record created', coinId: result.rows[0].id });
    } catch (error) {
      console.error(error);
      response.status(500).send('some error has occured');
    }
  });

router.get('/api', async (request, response) => {
  try {
    const query = 'SELECT * FROM coins;';
    const allCoins = await pool.query(query);
    return response.status(200).json({
      data: allCoins.rows
    });
    } catch (error) {
    console.error(error);
    response.status(500).send('some error has occured');
    }
});

router.get('/api/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const query = 'SELECT * FROM coins WHERE id = $1;';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return response.status(404).send('this coin is not in the database');
    }

    return response.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    response.status(500).send('some error has occured');
  }
});

router.put('/api/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { type, mintlocation, mintyear, circulation, grade } = request.body;

    if (!type && !mintlocation && !mintyear && !circulation && !grade) {
      return response.status(400).send('provide a field (type, mintlocation, mintyear, circulation, grade)');
    }

    const query = `
      UPDATE coins
      SET type = COALESCE($1, type),
          mintlocation = COALESCE($2, mintlocation),
          mintyear = COALESCE($3, mintyear),
          circulation = COALESCE($4, circulation),
          grade = COALESCE($5, grade)
      WHERE id = $6
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [type, mintlocation, mintyear, circulation, grade, id]);

    if (rows.length === 0) {
      return response.status(404).send('Cannot find anything');
    }

    response.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    response.status(500).send('Some error has occured failed');
  }
});

router.delete('/api/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const query = 'DELETE FROM coins WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return response.status(404).send('we have not found that coin');
    }

    response.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    response.status(500).send('some error has occured');
  }
});

export default router;