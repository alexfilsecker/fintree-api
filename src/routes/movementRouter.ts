import { Hono } from 'hono';

const movementRouter = new Hono();

movementRouter.post('/scrap', () => {
  return new Response('Hello, World!');
});

export default movementRouter;
