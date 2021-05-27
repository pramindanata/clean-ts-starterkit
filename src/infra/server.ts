import express, { Express } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {
  Auth,
  AuthController,
  ExceptionHandler,
  Guest,
  RequestContext,
} from '@/adapter';
import { wrapMiddleware as m, wrapController as c } from './server-util';

export function createServer(): Express {
  const server = express();

  server.use(cookieParser());
  server.use(bodyParser.json());

  server.use(m(RequestContext));

  server.post('/login', m(Guest), c(AuthController, 'login'));
  server.post('/register', m(Guest), c(AuthController, 'register'));
  server.get('/me', m(Auth), c(AuthController, 'me'));

  server.use(m(ExceptionHandler));

  return server;
}
