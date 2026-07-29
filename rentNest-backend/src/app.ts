import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import { userRoutes } from './module/user/user.routes';
import { authRoutes } from './module/auth/auth.routes';

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/api/auth', userRoutes);
app.use('/api/auth', authRoutes);

export default app;
