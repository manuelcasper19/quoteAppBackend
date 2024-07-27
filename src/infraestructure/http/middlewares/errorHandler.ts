import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../domain';


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  // Para errores no operacionales (errores de programación, etc.)
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong' + err
  });
};