import express from "express";
import { pool } from '../coinDatabase/coinDatabase.js'

const coinRouter = express.Router();

// write unit tests for each of the following routes
// route for saving a  new coin

coinRouter.post('/coins_new', async (request, response) => {
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

  coinRouter.get('/coins_new', async (request, response) => {
    try {
      const query = 'SELECT * FROM coins;';
      const allCoins = await pool.query(query);
      response.status(200).json(allCoins.rows);
      } catch (error) {
      console.error(error);
      response.status(500).send('some error has occured');
      }
  });

  coinRouter.get('/coins_new/:id', async (request, response) => {
    try {
      const { id } = request.params;
      const coinsById = 'SELECT * FROM coins WHERE id = $1;';
      const { rows } = await pool.query(coinsById, [id]);
  
      if (rows.length === 0) {
        return response.status(404).send('this date is not in the database');
      }
  
      response.status(200).json(rows[0]);
    } catch (error) {
      console.error(error);
      response.status(500).send('some error has occured');
    }
  });

  coinRouter.put('/coins_new/:id', async (request, response) => {
    try {
      const { id } = request.params;
      const { type, mintlocation, mintyear, circulation, grade } = request.body;
  
      if (!type && !mintlocation && !mintyear && !circulation && !grade) {
        return response.status(400).send('provide a field (type, mintlocation, mintyear, circulation, grade)');
      }
  
      const query = `
        UPDATE coins
        SET type = COALESCE($1, weatherdate),
            mintlocation = COALESCE($2, conditions),
            mintyear = COALESCE($3, mintemp),
            circulation = COALESCE($4, maxtemp),
            grade = COALESCE($5, precip)
        WHERE id = $6
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [weatherdate, conditions, mintemp, maxtemp, precip, id]);
  
      if (rows.length === 0) {
        return response.status(404).send('Cannot find anything');
      }
  
      response.status(200).json(rows[0]);
    } catch (error) {
      console.error(error);
      response.status(500).send('Some error has occured failed');
    }
  });

  export default coinRouter;