import { Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import { handleError } from '../errors/handleError';
import { ErrorData } from '../errors/errorTypes';

type SuccesfulResponse = {
  status: 200;
  responseData: unknown;
};

type ErrorResponse = {
  status: StatusCode;
  errorData: ErrorData;
};

export type MyResponse = SuccesfulResponse | ErrorResponse;

const controllerAction = async (
  c: Context,
  action: (c: Context) => Promise<unknown>
) => {
  let actionResponse: unknown;
  let responseStatus: StatusCode = 200;
  let response: MyResponse;
  try {
    actionResponse = await action(c);
  } catch (error) {
    const { errorStatus, errorData } = handleError(error);
    c.status(responseStatus);
    response = {
      status: errorStatus,
      errorData,
    };
    return c.json(response);
  }

  response = {
    status: 200,
    responseData: actionResponse,
  };

  c.status(responseStatus);
  return c.json(response);
};

export default controllerAction;
