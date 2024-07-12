import { Hono } from 'hono';

const movementRouter = new Hono();

movementRouter.get('/', () => {
  return new Response('Hello, World!');
});
