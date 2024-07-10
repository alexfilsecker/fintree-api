import { Context } from 'hono';
import { ZodError } from 'zod';

type ValidationErrorType =
  | {
      success: true;
      data: unknown;
    }
  | {
      success: false;
      data: unknown;
      error: ZodError;
    };

const validationError = (result: ValidationErrorType, c: Context) => {
  if (!result.success) {
    return c.json({
      message: 'Validation error',
      errors: result.error.errors,
    });
  }
};

export default validationError;
