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

type CBadRequestError = NormalError & {
  type: 'BadRequestError';
};

type CBadQueryError = NormalError & {
  type: 'BadQueryError';
};

type CTokenError = NormalError & {
  type: 'TokenError';
};

export type ErrorData =
  | CUnknownError
  | CError
  | CValidationError
  | CLoginError
  | CBadRequestError
  | CBadQueryError
  | CTokenError;
