import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import validationError from './validationError';
import { MiddlewareHandler } from 'hono';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const loginValidator = zValidator('json', loginSchema, validationError);

type outLogin = typeof loginValidator extends MiddlewareHandler<
  any,
  any,
  infer Out
>
  ? Out['out']
  : never;

export type LoginBodyType = outLogin['json'];

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

const refreshValidator = zValidator('json', refreshSchema, validationError);

type outRefresh = typeof refreshValidator extends MiddlewareHandler<
  any,
  any,
  infer Out
>
  ? Out['out']
  : never;

export type RefreshBodyType = outRefresh['json'];

export { loginValidator, refreshValidator };
