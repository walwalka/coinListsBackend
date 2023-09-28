import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Coin } from './models/coinModel.js';
import coinRoute from './routes/coinRoute.js';
import cors from 'cors';


const app = express();

// middleware for parsing request body
app.use(express.json());


// middleware for handling CORS policy
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('coinList backend server');
});

app.use('/coins', coinRoute);

// calling mongoose library for object modeling
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
        })
        .catch((error) => {
            console.log(error);
        });

