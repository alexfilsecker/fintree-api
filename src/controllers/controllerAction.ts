import { Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import { handleError } from '../errors/handleError';
import { ErrorData } from '../errors/errorTypes';

type SuccesfulResponse = {
  status: 200;
  responseData: unknown;
};

export type ErrorResponse = {
  status: StatusCode;
  errorData: ErrorData;
};

export type MyResponse = SuccesfulResponse | ErrorResponse;

const controllerAction = async (
  c: Context,
  action: (c: Context) => Promise<unknown>
) => {
  let actionResponse: unknown;
  let response: MyResponse;
  try {
    actionResponse = await action(c);
  } catch (error) {
    const { errorStatus, errorData } = handleError(error);
    c.status(errorStatus);
    response = {
      status: errorStatus,
      errorData,
    };
    return c.json(response);
  }

  const responseStatus = 200;

  response = {
    status: responseStatus,
    responseData: actionResponse,
  };

  c.status(responseStatus);
  return c.json(response);
};

export default controllerAction;
