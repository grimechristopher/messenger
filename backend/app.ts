import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app: Express = express();

// CORS
app.use(cors());

// Import routes

// routes


app.get('/api/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export = app;