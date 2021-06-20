import { Request } from 'express';
import Joi from 'joi';
import { RequestPayloadSchema } from '@/common';

export class PostIndexQuerySchema implements RequestPayloadSchema {
  async get(req: Request, joi: Joi.Root): Promise<Joi.ObjectSchema> {
    return joi.object({
      limit: joi.number().min(8).max(16).default(8),
      page: joi.number().min(0).default(1),
    });
  }
}
