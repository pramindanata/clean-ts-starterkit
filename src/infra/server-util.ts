import { RequestHandler } from 'express';
import { Ctor, MiddlewareFactory } from '@/common';
import { container } from './provider';

export function wrapController<
  C extends Record<string, any>,
  K extends keyof C,
>(ctor: Ctor<C>, key: K): C[K] {
  const controller = container.resolve(ctor);
  const method = controller[key];

  return method.bind(controller);
}

export function wrapMiddleware<M extends MiddlewareFactory>(
  ctor: Ctor<M>,
  ...args: Parameters<M['create']>
): RequestHandler {
  const factory = container.resolve(ctor);

  return factory.create(...args);
}
