import type { Context, Next } from 'hono';

const verifyToken = async (context: Context, next: Next): Promise<void> => {
  const token = context.req.header('Authorization');
  console.log('🚀 - token:', token);
  return next();
};

export default verifyToken;
