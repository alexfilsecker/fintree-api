import { Context, MiddlewareHandler, Next } from 'hono';
import { StatusCode } from 'hono/utils/http-status';

export type NormalResponse =
  | { responseData: unknown }
  | { status: StatusCode; message: string };

const controllerAction = async (
  c: Context,
  action: (c: Context) => Promise<NormalResponse>
) => {
  const actionResponse = await action(c);

  let responseStatus: StatusCode = 200;
  if (!('responseData' in actionResponse)) {
    responseStatus = actionResponse.status;
  }

  c.status(responseStatus);
  return c.json(actionResponse);
};

export default controllerAction;
