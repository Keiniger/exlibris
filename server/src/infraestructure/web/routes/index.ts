import { Request, Response, Application } from 'express';
import getBookByTitle from '../../../use-cases/get-book-by-title.use-case';
const libgen = require('libgen');
import http from 'http';

export function initRoutes(app: Application) {
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, this is your TypeScript Node.js server with Express!');
  });

  app.get('/book', async (req: Request, res: Response) => {
    const title = req.query.title as string;

    const booksFound = await getBookByTitle(title);

    res.json(booksFound);
  });

  app.get('/book-libgen-api', async (req: Request, res: Response) => {
    const query = req.query.q as string;
    const mirror = 'http://libgen.is';
    const options = { mirror, query };
    try {
      const data = await libgen.search(options);
      res.json(data);
    } catch (err) {
      res.status(500).send('Error fetching query');
    }
  });

  app.get('/cover/*', async (req: Request, res: Response) => {
    const coverUrl = req.originalUrl.split('/cover/')[1];

    if (!coverUrl) return res.status(500).send('Error fetching the file');

    http
      .get('http://libgen.is/' + coverUrl, (response) => {
        res.setHeader('Content-type', 'image/jpeg');
        response.pipe(res);
      })
      .on('error', (err) => {
        res.status(500).send('Error fetching the file');
      });
  });
}
