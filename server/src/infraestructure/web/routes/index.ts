import { Request, Response, Application } from 'express';
import getBookByTitle from '../../../use-cases/get-book-by-title.use-case';

export function initRoutes(app: Application) {
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, this is your TypeScript Node.js server with Express!');
  });

  app.get('/book', async (req: Request, res: Response) => {
    const title = req.query.title as string;

    const booksFound = await getBookByTitle(title);

    res.json(booksFound);
  });
}
