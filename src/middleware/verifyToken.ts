import getTokenEnvs from '../utils/tokens/getTokenEnvs';
import { ErrorResponse } from '../controllers/controllerAction';
import type { Context, Env, Next } from 'hono';
import jwt from 'jsonwebtoken';
import { TokenData } from '../utils/tokens/makeTokens';

const noTokenError = (context: Context) => {
  const response: ErrorResponse = {
    status: 401,
    errorData: {
      type: 'TokenError',
      message: 'Token not found in header',
    },
  };
  context.status(401);
  return response;
};

type TokenizedEnv = Env & {
  Variables: {
    tokenData: jwt.JwtPayload & TokenData;
  };
};

export type TokenizedContext = Context<TokenizedEnv>;

const verifyToken = async (context: TokenizedContext, next: Next) => {
  let token = context.req.header('Authorization');
  if (token === undefined) {
    return context.json(noTokenError(context));
  }

  token = token.split(' ')[1];

  if (token === undefined) {
    return context.json(noTokenError(context));
  }

  const { tokenSecretKey } = getTokenEnvs();
  let decodedToken: jwt.JwtPayload | string;
  try {
    decodedToken = jwt.verify(token, tokenSecretKey);
    if (typeof decodedToken === 'string') {
      throw new Error('Token is invalid');
    }
    context.set('tokenData', decodedToken as jwt.JwtPayload & TokenData);
  } catch (error) {
    const response: ErrorResponse = {
      status: 401,
      errorData: {
        type: 'TokenError',
        message: 'Token is invalid',
      },
    };
    context.status(401);
    return context.json(response);
  }

  return next();
};

export default verifyToken;
