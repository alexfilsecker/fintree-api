import { z } from 'zod';
import validationError from './validationError';
import { zValidator } from '@hono/zod-validator';
import { MiddlewareHandler } from 'hono';

const patchCategoryNameBodySchema = z.object({
  name: z.string().min(1),
});

const patchCategoryNameValidator = zValidator(
  'json',
  patchCategoryNameBodySchema,
  validationError,
);

type outPatchCategoryName =
  typeof patchCategoryNameValidator extends MiddlewareHandler<
    any,
    any,
    infer Out
  >
    ? Out['out']
    : never;

export type PatchCategoryNameBodyType = outPatchCategoryName['json'];

export { patchCategoryNameValidator };
