import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import { CustomError } from './utils/custom.error';
import { errorHandler } from './middlewares/error.handler';
import userRoutes from './routes/user.route';

const PORT = process.env.PORT || 3000;

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Healthy Server');
})

app.all('*', () => {
    throw new CustomError('API url not found', 'NOT_FOUND');
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is started on http://localhost:${PORT}`);
})
