import { z } from 'zod';
import validationError from './validationError';
import { zValidator } from '@hono/zod-validator';
import { MiddlewareHandler } from 'hono';

const patchCategoryBodySchema = z.object({
  name: z.string().min(1).optional(),
  parentId: z.number().int().optional().nullable(),
});

const patchCategoryValidator = zValidator(
  'json',
  patchCategoryBodySchema,
  validationError,
);

type outPatchCategory =
  typeof patchCategoryValidator extends MiddlewareHandler<any, any, infer Out>
    ? Out['out']
    : never;

export type PatchCategoryNameBodyType = outPatchCategory['json'];

const createCategoryBodySchema = z.object({
  name: z.string().min(1),
  parentId: z.number().int().nullable(),
});

const createCategoryValidator = zValidator(
  'json',
  createCategoryBodySchema,
  validationError,
);

type outCreateCategory =
  typeof createCategoryValidator extends MiddlewareHandler<any, any, infer Out>
    ? Out['out']
    : never;

export type CreateCategoryBodyType = outCreateCategory['json'];

export { patchCategoryValidator, createCategoryValidator };
