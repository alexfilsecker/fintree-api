type TokenEnvs = {
  tokenSecretKey: string;
  refreshTokenSecretKey: string;
  tokenExprationTime: string;
  refreshTokenExprationTime: string;
};

const getTokenEnvs = (): TokenEnvs => {
  const tokenSecretKey = process.env.TOKEN_SECRET_KEY;
  if (tokenSecretKey === undefined) {
    throw new Error('Token secret key not found');
  }
  const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
  if (refreshTokenSecretKey === undefined) {
    throw new Error('Refresh token secret key not found');
  }
  const tokenExprationTime = process.env.TOKEN_EXPIRATION_TIME;
  if (tokenExprationTime === undefined) {
    throw new Error('Token expiration time not found');
  }
  const refreshTokenExprationTime = process.env.REFRESH_TOKEN_EXPIRATION_TIME;
  if (refreshTokenExprationTime === undefined) {
    throw new Error('Refresh token expiration time not found');
  }

  return {
    tokenSecretKey,
    refreshTokenSecretKey,
    tokenExprationTime,
    refreshTokenExprationTime,
  };
};

export default getTokenEnvs;
