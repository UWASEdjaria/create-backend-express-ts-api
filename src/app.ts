import express, { Application } from 'express';
import cors from 'cors';
import rootRouter from './routes/index';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true
    }));
  }

  private routes(): void {
    this.app.use("/api", rootRouter);
  }
}

export default new App().app;