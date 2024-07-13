import { Context } from 'hono';
import controllerAction from './controllerAction';
import {
  LoginBodyType,
  RefreshBodyType,
} from '../middleware/validators/authValidator';
import prisma from '../utils/prismaClient';
import { compareSync } from 'bcrypt';
import makeTokens from '../utils/tokens/makeTokens';
import { MyLoginError } from '../errors/loginError';
import getTokenEnvs from '../utils/tokens/getTokenEnvs';
import jwt from 'jsonwebtoken';

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

type RefreshActionResponse = {
  newToken: string;
  newRefreshToken: string;
};

const refreshAction = async (c: Context): Promise<RefreshActionResponse> => {
  const { refreshToken } = await c.req.json<RefreshBodyType>();

  const { refreshTokenSecretKey } = getTokenEnvs();

  const decodedRefreshToken = jwt.verify(refreshToken, refreshTokenSecretKey);
  if (typeof decodedRefreshToken === 'string') {
    throw new Error('decodedRefreshToken is a string');
  }
  if (
    decodedRefreshToken.userId === undefined ||
    typeof decodedRefreshToken.userId !== 'number'
  ) {
    throw new Error('decodedRefreshToken.userId is undefined or not a number');
  }

  const userWithId = await prisma.user.findUnique({
    where: { id: decodedRefreshToken.userId },
  });

  if (userWithId === null) {
    throw new Error('User does not exist');
  }

  const { token: newToken, refreshToken: newRefreshToken } =
    makeTokens(userWithId);

  return {
    newToken,
    newRefreshToken,
  };
};

const authController = {
  login: async (c: Context) => controllerAction(c, loginAction),
  refresh: async (c: Context) => controllerAction(c, refreshAction),
};

export default authController;
