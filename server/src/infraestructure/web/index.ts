import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { initRoutes } from './routes';

export function initHttpServer() {
  const app = express();
  const API_PORT = process.env.API_PORT;

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: process.env.FRONTEND || 'http://localhost:5173',
    })
  );

  app.listen(API_PORT, () => {
    console.log(`Server running on port at ${API_PORT}`);
  });

  initRoutes(app);
}
