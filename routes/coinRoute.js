import express from "express";
import { Coin } from '../models/coinModel.js';
import { pool } from '../coinDatabase/coinDatabase.js'

const router = express.Router();

// write unit tests for each of the following routes
// route for saving a  new coin
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.type ||
            !request.body.mintLocation ||
            !request.body.mintYear ||
            !request.body.circulation ||
            !request.body.grade
        ) {
            return response.status(400).send({
                message: 'Please include all required fields: type, mint location, mint year'
            });
        }
        const newCoin = {
            type: request.body.type,
            mintLocation: request.body.mintLocation,
            mintYear: request.body.mintYear,
            circulation: request.body.circulation,
            grade: request.body.grade
        };

        const coin = await Coin.create(newCoin);

        return response.status(201).send(coin);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all coins from the database
router.get('/', async (request, response) => {
    try {
        const coins = await Coin.find({});

        return response.status(200).json({
            count: coins.length,
            data: coins
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// route to get a single coin
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const coin = await Coin.findById(id);

        return response.status(200).json(coin);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/:type', async (request, response) => {
    try {

        const { type } = request.params;

        const coin = await Coin.find(type);

        return response.status(200).json(coin);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// route to update a coins record in the database
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.type ||
            !request.body.mintLocation ||
            !request.body.mintYear ||
            !request.body.circulation ||
            !request.body.grade
        ) {
            return response.status(400).send({
                message: 'Please include all required fields: type, mint location, mint year',
            });
        }

        const { id } = request.params;

        const result = await Coin.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({message: 'Coin not found'});
        }
        
        return response.status(200).send({message: 'Coin updated successfully!'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// route to delete a coin from the database
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Coin.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({message: 'Coin not found'});
        }
        
        return response.status(200).send({message: 'Coin eradicated successfully!'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;