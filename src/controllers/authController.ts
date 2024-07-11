import { Context } from 'hono';
import controllerAction from './controllerAction';
import { LoginBodyType } from '../validators/authValidator';
import prisma from '../utils/prismaClient';
import { compareSync } from 'bcrypt';
import makeTokens from '../utils/tokens/makeTokens';
import { MyLoginError } from '../errors/loginError';

type LoginActionResponse = {
  token: string;
  refreshToken: string;
};

export const loginAction = async (c: Context): Promise<LoginActionResponse> => {
  const { username, password } = await c.req.json<LoginBodyType>();

  const userWithUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (userWithUsername === null) {
    throw new MyLoginError('Username does not exist', 'username');
  }

  const validPassword = compareSync(password, userWithUsername.password);

  if (!validPassword) {
    throw new MyLoginError('Password is incorrect', 'password');
  }

  const { token, refreshToken } = makeTokens(userWithUsername);

  return { token, refreshToken };
};

const authController = {
  login: async (c: Context) => controllerAction(c, loginAction),
};

export default authController;
