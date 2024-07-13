import { MyResponse } from '../../controllers/controllerAction';
import { Context } from 'hono';
import { ZodError } from 'zod';

type ZodValidationErrorType =
  | {
      success: true;
      data: unknown;
    }
  | {
      success: false;
      data: unknown;
      error: ZodError;
    };

const validationError = (result: ZodValidationErrorType, c: Context) => {
  if (!result.success) {
    c.status(400);

    const response: MyResponse = {
      status: 400,
      errorData: {
        type: 'ValidationError',
        message: 'Bad Request',
        validationErrors: result.error.errors,
      },
    };

    return c.json(response);
  }
};

export default validationError;
