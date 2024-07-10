import { StatusCode } from 'hono/utils/http-status';

type ErrorRespose = {
  status: StatusCode;
  message: string;
};
