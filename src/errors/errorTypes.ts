import { ZodIssue } from 'zod';
import { ErrorInType } from './loginError';

type NormalError = {
  message: string;
  stack?: string;
};

type CUnknownError = NormalError & {
  type: 'Unknown';
};

type CError = NormalError & {
  type: 'Error';
};

type CValidationError = NormalError & {
  type: 'ValidationError';
  validationErrors: ZodIssue[];
};

type CLoginError = NormalError & {
  type: 'LoginError';
  errorIn: ErrorInType;
};

export type ErrorData = CUnknownError | CError | CValidationError | CLoginError;
