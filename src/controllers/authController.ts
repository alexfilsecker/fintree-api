import { Context } from 'hono';
import controllerAction, { NormalResponse } from './controllerAction';
import { LoginBodyType } from '../validators/authValidator';
import prisma from '../utils/prismaClient';
import { compareSync } from 'bcrypt';
import makeTokens from '../utils/tokens/makeTokens';

type LoginResponse = {
  token: string;
  refreshToken: string;
};

type LoginActionResponse =
  | (NormalResponse & Record<'responseData', LoginResponse>)
  | (NormalResponse & Omit<NormalResponse, 'responseData'>);

export const loginAction = async (c: Context): Promise<LoginActionResponse> => {
  const { username, password } = await c.req.json<LoginBodyType>();

  const userWithUsername = await prisma.user.findUnique({
    where: { username },
  });
  console.log('🚀 - userWithUsername:', userWithUsername);

  if (userWithUsername === null) {
    return {
      status: 401,
      message: 'username does not exist',
    };
  }

  console.log(userWithUsername.password, password);
  const validPassword = compareSync(password, userWithUsername.password);

  if (!validPassword) {
    return {
      status: 401,
      message: 'password is incorrect',
    };
  }

  return {
    responseData: makeTokens(userWithUsername),
  };
};

const authController = {
  login: async (c: Context) => controllerAction(c, loginAction),
};

export default authController;
