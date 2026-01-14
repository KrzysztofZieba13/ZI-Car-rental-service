import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import defaultRoutes from './routes/authRoutes.js';
import carRoutes from "./routes/carRoutes.js";
import rentRoutes from "./routes/rentRoutes.js";

const app: Express = express();
const corsOptions = {
    origin: 'https://csr-frontend-zq6v.onrender.com/',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World');
});

app.use('/api/auth', defaultRoutes);
app.use('/api/rent', rentRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);

export default app;
