import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import { connectDB } from './config/db';
import { errorHandler } from './middlewares/error.handler';
import { CustomError } from './utils/custom.error';

const PORT = process.env.PORT || 3000;

const app = express();
connectDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Healthy Server');
})

app.all('*', () => {
    throw new CustomError('API url not found', 'NOT_FOUND');
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log(`Server is started on http://localhost:${PORT}`);
})

