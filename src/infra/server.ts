import express, { Express } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {
  Auth,
  AuthController,
  ExceptionHandler,
  Guest,
  LoginSchema,
  PostController,
  PostCreateBodySchema,
  PostIndexQuerySchema,
  RegisterSchema,
  RequestContext,
  SchemaValidator,
} from '@/adapter';
import { wrapMiddleware as m, wrapController as c } from './server-util';

export function createServer(): Express {
  const server = express();

  server.use(cookieParser());
  server.use(bodyParser.json());

  server.use(m(RequestContext));

  server.post(
    '/login',
    m(Guest),
    m(SchemaValidator, { body: LoginSchema }),
    c(AuthController, 'login'),
  );
  server.post(
    '/register',
    m(Guest),
    m(SchemaValidator, { body: RegisterSchema }),
    c(AuthController, 'register'),
  );
  server.get('/me', m(Auth), c(AuthController, 'me'));
  server.post('/logout', m(Auth), c(AuthController, 'logout'));

  server.get(
    '/posts',
    m(SchemaValidator, { query: PostIndexQuerySchema }),
    c(PostController, 'index'),
  );
  server.post(
    '/posts',
    m(Auth),
    m(SchemaValidator, { body: PostCreateBodySchema }),
    c(PostController, 'create'),
  );

  server.use(m(ExceptionHandler));

  return server;
}
