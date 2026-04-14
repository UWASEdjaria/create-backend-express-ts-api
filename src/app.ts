import express from 'express';
import cors from 'cors';
import rootRouter from './routes/index';


const app = express();
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL || 'http://localhost:3000', // Allow  frontend
    credentials: true
}));
app.use("/api", rootRouter);

export default app;