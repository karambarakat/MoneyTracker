import { Request, Response } from 'express'

export default function apiIsWorking(req: Request, res: Response) {
  res.status(200).json({
    message: 'api is working',
    data: null,
    error: null,
  })
}

export function serverIsWroking(req: Request, res: Response) {
  res.status(200).send('server is working go for /api or /api/v1')
}
