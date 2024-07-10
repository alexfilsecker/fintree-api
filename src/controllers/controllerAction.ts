import { Context, MiddlewareHandler, Next } from 'hono';
import { StatusCode } from 'hono/utils/http-status';

export type NormalResponse = { responseData: unknown; status?: StatusCode };

const controllerAction = async (
  c: Context,
  action: (c: Context) => Promise<NormalResponse>
) => {
  const actionResponse = await action(c);
  const responseStatus = actionResponse.status || 200;

  c.status(responseStatus);
  return c.json(actionResponse);
};

export default controllerAction;
