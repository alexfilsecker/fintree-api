import { Hono } from 'hono';

const app = new Hono();

app.get('/', () => {
  return new Response('Hello, World!');
});

export default app;
