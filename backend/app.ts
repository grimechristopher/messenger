import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app: Express = express();

// CORS
app.use(cors());
// Api uses JSON
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());

// Import routes
import authRouter from './routes/auth.route'
import accountRouter from './routes/account.route'
import conversationRouter from './routes/conversation.route';

// routes
app.use('/api/auth', authRouter);
app.use('/api/accounts/', accountRouter);
app.use('/api/conversations/', conversationRouter);

app.get('/api/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export = app;