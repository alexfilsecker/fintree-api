import { StatusCode } from 'hono/utils/http-status';
import { ErrorData } from './errorTypes';
import { MyLoginError } from './loginError';
import { MyBadRequestError } from './badRequestError';
import { MyBadQueryError } from './badQueryError';

type HandleErrorReturn = {
  errorStatus: StatusCode;
  errorData: ErrorData;
};

export const handleError = (error: unknown): HandleErrorReturn => {
  let errorStatus: StatusCode = 500;
  let errorData: ErrorData = {
    type: 'Unknown',
    message: 'Unknown Error',
    stack: 'No Stack',
  };
  if (error instanceof Error) {
    errorData = {
      ...errorData,
      type: 'Error',
      message: error.message,
      stack: error.stack,
    };
    if (error instanceof MyLoginError) {
      console.log('🚀 - error:', error);
      errorStatus = 401;
      errorData = {
        type: 'LoginError',
        message: error.message,
        errorIn: error.errorIn,
      };
    } else if (error.name === 'BadRequestError') {
      errorStatus = 400;
      errorData = {
        type: 'BadRequestError',
        message: error.message,
      };
    } else if (error.name === 'BadQueryError') {
      errorStatus = 404;
      errorData = {
        type: 'BadQueryError',
        message: error.message,
        stack: error.stack,
      };
    }
  }

  return { errorStatus, errorData };
};
