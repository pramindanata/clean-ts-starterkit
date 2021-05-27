import { User } from '@/domain';
import { RequestHandler } from 'express';

export type Ctor<T = Record<string, any>> = new (...args: any[]) => T;

export interface Config {
  app: {
    host: string;
    port: number;
    secret: string;
  };
  db: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
  };
}

export interface ConfigKey {
  'app.host': string;
  'app.port': number;
  'app.secret': string;
  'db.host': string;
  'db.port': number;
  'db.name': string;
  'db.user': string;
  'db.password': string;
}

export interface RequestContext {
  user?: User;
}

export interface MiddlewareFactory {
  create(...args: any[]): RequestHandler;
}
