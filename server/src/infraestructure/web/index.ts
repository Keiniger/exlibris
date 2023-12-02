import express from 'express';
import { initRoutes } from './routes';
import bodyParser from 'body-parser';

export function initHttpServer() {
  const app = express();
  const API_PORT = process.env.API_PORT;

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.listen(API_PORT, () => {
    console.log(`Server running on port at ${API_PORT}`);
  });

  initRoutes(app);
}
