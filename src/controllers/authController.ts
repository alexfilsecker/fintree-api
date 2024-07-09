import { Context } from 'hono';
import controllerAction, { NormalResponse } from './controllerAction';

const loginAction = async (c: Context): Promise<NormalResponse> => {
  return { responseData: 'Login', status: 200 };
};

const authController = {
  login: async (c: Context) => controllerAction(c, loginAction),
};

export default authController;
