import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';

import authRouter from './routes/authRouter';
import verifyToken from './middleware/verifyToken';
import movementRouter from './routes/movementRouter';

const app = new Hono();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(logger());

app.get('/', () => {
  return new Response('Hello, World!');
});

app.route('/auth', authRouter);

app.use(verifyToken);

app.route('/movements', movementRouter);

serve({ fetch: app.fetch });
