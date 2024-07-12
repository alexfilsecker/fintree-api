import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';

import authRouter from './routes/authRouter';
import verifyToken from './middleware/verifyToken';

const app = new Hono();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.get('/', () => {
  return new Response('Hello, World!');
});

app.route('/auth', authRouter);

app.use(verifyToken);

serve({ fetch: app.fetch });
