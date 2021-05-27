import { RequestHandler } from 'express';
import { MiddlewareFactory } from '@/common';
import { UnauthenticatedException } from '../exception';

export class Auth implements MiddlewareFactory {
  create(): RequestHandler {
    return (req, res, next) => {
      if (req.ctx.user) {
        return next();
      }

      throw new UnauthenticatedException();
    };
  }
}
