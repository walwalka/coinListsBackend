import "dotenv/config.js";
import { PORT } from './config.js';
import express from 'express';
import coinRoute from './routes/coinRoute.js';
import mintRoute from './routes/mintRoute.js';
import cors from 'cors';

console.log(process.env.NODE_ENV);

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS policy
app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('coinList backend server');
});

app.get('/health', (request, response) => {
  console.log('Health Check');
  return response.status(200).send('coinList backend server online');
});

app.use('/coins', coinRoute);

app.use('/mintlocations', mintRoute);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});
