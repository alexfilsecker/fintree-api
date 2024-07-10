import { Hono } from 'hono';
import { serve } from '@hono/node-server';

import authRouter from './routes/authRouter';

const app = new Hono();

app.get('/', () => {
  return new Response('Hello, World!');
});

app.route('/auth', authRouter);

serve({ fetch: app.fetch });
