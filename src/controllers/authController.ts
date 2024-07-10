import { Context } from 'hono';
import controllerAction, { NormalResponse } from './controllerAction';

type LoginResponse = {
  token: string;
  refreshToken: string;
};

export const loginAction = async (
  _: Context
): Promise<NormalResponse & Record<'responseData', LoginResponse>> => {
  return {
    responseData: { token: 'Login', refreshToken: 'semen' },
  };
};

const authController = {
  login: async (c: Context) => controllerAction(c, loginAction),
};

export default authController;
