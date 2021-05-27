import { ErrorRequestHandler } from 'express';
import { BaseDomainException } from '@/domain';
import { BaseHTTPException } from '../exception';

export function handleException(): ErrorRequestHandler {
  return (err, req, res, next) => {
    if (err instanceof BaseDomainException) {
      return res.status(403).json({
        domain: true,
        name: err.constructor.name,
        message: err.message,
      });
    }

    if (err instanceof BaseHTTPException) {
      return res.status(err.getCode()).json(err.getBody());
    }

    next(err);
  };
}
