import { Request, Response } from 'express';

// TODO: create operation middleware with useCase callback
export async function Operation(req: Request, res: Response, useCase: (req: Request, res: Response) => {}) {
  try {
    const response = await useCase(req, res);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
}
