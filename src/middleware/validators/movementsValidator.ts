import { z } from 'zod';
import validationError from './validationError';
import { zValidator } from '@hono/zod-validator';
import { MiddlewareHandler } from 'hono';

const patchUserDescriptionBodySchema = z.object({
  userDescription: z.string().min(1),
});

const patchUserDescriptionValidator = zValidator(
  'json',
  patchUserDescriptionBodySchema,
  validationError
);

type outPatchUserDescription =
  typeof patchUserDescriptionValidator extends MiddlewareHandler<
    any,
    any,
    infer Out
  >
    ? Out['out']
    : never;

export type PatchUserDescriptionBodyType = outPatchUserDescription['json'];

export { patchUserDescriptionValidator };
