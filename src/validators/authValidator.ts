import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import validationError from '../errors/validationError';
import { MiddlewareHandler } from 'hono';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const loginValidator = zValidator('json', loginSchema, validationError);

type out = typeof loginValidator extends MiddlewareHandler<any, any, infer Out>
  ? Out['out']
  : never;

export type LoginBodyType = out['json'];

export default loginValidator;
