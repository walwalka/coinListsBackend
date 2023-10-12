import express from 'express';
import { PORT } from './config.js';
import coinRoute from './routes/coinRoutePostrges.js';
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

app.get('/health', (request, response) => {
  console.log('Health Check');
  return response.status(200).send('coinList backend server online');
});

app.use('/coins', coinRoute);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  });
