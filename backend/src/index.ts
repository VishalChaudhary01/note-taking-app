import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
const app = express();


app.get('/', (req: Request, res: Response) => {
    res.send('Healthy Server');
})

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server is started on http://localhost:${PORT}`);
})

