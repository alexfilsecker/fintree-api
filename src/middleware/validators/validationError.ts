import { MyResponse } from '@/controllers/controllerAction';
import { Context } from 'hono';
import { type $ZodError } from 'zod/v4/core';

type ZodValidationErrorType =
  | {
      success: true;
      data: unknown;
    }
  | {
      success: false;
      data: unknown;
      error: $ZodError;
    };

const validationError = (result: ZodValidationErrorType, c: Context) => {
  if (!result.success) {
    c.status(400);

    const response: MyResponse = {
      status: 400,
      errorData: {
        type: 'ValidationError',
        message: 'Bad Request',
        validationErrors: result.error.issues,
      },
    };

    return c.json(response);
  }
};

export default validationError;
