import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import defaultRoutes from './routes/authRoutes';
import carRoutes from "./routes/carRoutes";

const app: Express = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World');
});

app.use('/api/auth', defaultRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);

export default app;
