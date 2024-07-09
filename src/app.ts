import { Hono } from 'hono';
import { serve } from '@hono/node-server';

import authRouter from './routes/authRouter';

const app = new Hono();

app.get('/', () => {
  return new Response('Hello, World!');
});

// app.post('/scrap', () => {
//   return new Response('Update');
// });

app.route('/auth', authRouter);

export default app;
