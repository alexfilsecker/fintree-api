import getTokenEnvs from './getTokenEnvs';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

const makeTokens = (user: User): { token: string; refreshToken: string } => {
  const {
    tokenSecretKey,
    refreshTokenSecretKey,
    // tokenExprationTime,
    refreshTokenExprationTime,
  } = getTokenEnvs();

  const userTokenData = {
    userId: user.id,
    username: user.username,
  };
  const token = jwt.sign(userTokenData, tokenSecretKey, {
    // expiresIn: tokenExprationTime,
    expiresIn: '5s',
  });

  const refreshTokenData = { userId: user.id };
  const refreshToken = jwt.sign(refreshTokenData, refreshTokenSecretKey, {
    expiresIn: refreshTokenExprationTime,
  });

  return {
    token,
    refreshToken,
  };
};

export default makeTokens;
