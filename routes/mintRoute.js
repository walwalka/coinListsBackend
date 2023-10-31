import express, { response } from 'express';
import { pool } from '../database/database.js';

const router = express.Router();

// Below are the routes for the mint locations

router.get('/', (request, response) => {
  response.status(200).send('Welcome to the Mints Backend Server!')
});

router.get('/mints', async (request, response) => {
  try {
    const query = 'SELECT * FROM mintlocations;';
    const allMints = await pool.query(query);
    return response.status(200).json({
      data: allMints
    });
    } catch (error) {
    console.error(error);
    response.status(500).send('some error has occured');
    }
});

router.post('/mints', async (request, response) => {
  // Validate the incoming JSON data
  const { name, city, usState } = request.body;
  console.log(request.body);
  if (!name || !city || !usState) {
    return response.status(400).send('One of the name, city, state data points is missing');
  }

  try {
    // try to send data to the database
    const query = `
      INSERT INTO mintlocations (name, city, state)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const values = [name, city, usState];

    const result = await pool.query(query, values);
    response.status(200).send({ message: 'New mint saved!', mintId: result.rows[0].id });
  } catch (error) {
    console.error(error);
    response.status(500).send('some error has occured');
  }
});

router.post('/mints/create', async (request, response) => {
  // Validate the incoming JSON data
  const { name, city, usState } = request.body;
  console.log(request.body);
  if (!name || !city || !usState) {
    return response.status(400).send('One of the name, city or state data points is missing');
  }

  try {
    // try to send data to the database
    const query = `
      INSERT INTO mintlocations (name, city, state)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const values = [name, city, usState];

    const result = await pool.query(query, values);
    response.status(200).send({ message: 'New mint saved!', mintId: result.rows[0].id });
  } catch (error) {
    console.error(error);
    response.status(500).send('some error has occured');
  }
});

router.get('/mints/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const query = 'SELECT * FROM mintlocations WHERE id = $1;';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return response.status(404).send('this mint is not in the database');
    }

    return response.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    response.status(500).send('some error has occured');
  }
});

router.put('/mints/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { name, city, state } = request.body;

    if (!name && !city && !state) {
      return response.status(400).send('provide a field name, city and state.');
    }

    const query = `
      UPDATE mintlocations
      SET name = COALESCE($1, name),
          city = COALESCE($2, city),
          state = COALESCE($3, state)
      WHERE id = $4
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [name, city, state, id]);

    if (rows.length === 0) {
      return response.status(404).send('Cannot find anything');
    }

    response.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    response.status(500).send('Some error has occured failed');
  }
});

router.delete('/mints/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const query = 'DELETE FROM mintlocations WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return response.status(404).send('we have not found that mint');
    }

    response.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    response.status(500).send('some error has occured');
  }
});


// Mint location name route
router.get('/locations', async (request, response) => {
  try {
    const query = 'SELECT name FROM mintlocations;';
    const mintLocations = await pool.query(query);
    return response.status(200).json({
      name: mintLocations,
    });
    } catch (error) {
    console.error(error);
    response.status(500).send('some error has occured');
    }
});

export default router;