import { Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';

export type NormalResponse = { responseData: unknown; status: number };

const controllerAction = async (
  c: Context,
  action: (c: Context) => Promise<NormalResponse>
) => {
  let response: NormalResponse;
  let responseStatus: StatusCode = 200;

  response = await action(c);

  c.status(responseStatus);
  return c.json(response);
};

export default controllerAction;
