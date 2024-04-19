import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ hello: 'world pene' });
});

Bun.serve({
  fetch: app.fetch,
  port: 3030,
});
