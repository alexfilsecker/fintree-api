import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import validationError from '../errors/validationError';

const loginSchema = z.object({
  username: z.string().min(1).trim(), // Required string with minimum length of 1 (trimmed)
  password: z.string(),
});

const loginValidator = zValidator('json', loginSchema, validationError);

export default loginValidator;
