import { RequestHandler } from 'express';
import { MiddlewareFactory } from '@/common';
import { UnauthorizedException } from '../exception';

export class Guest implements MiddlewareFactory {
  create(): RequestHandler {
    return (req, res, next) => {
      if (!req.ctx.user) {
        return next();
      }

      throw new UnauthorizedException();
    };
  }
}
