import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import { userRoutes } from './module/user/user.routes';
import { authRoutes } from './module/auth/auth.routes';
import { categoryRoutes } from './module/category/category.routes';
import { notFound } from './middlewares/notFound';
import { globalErrorHandler } from './middlewares/globalErrorHandler';

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
app.use('/api/category', categoryRoutes);

app.use(notFound);
app.use(globalErrorHandler);
export default app;
