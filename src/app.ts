import { Hono } from 'hono';
import axios from 'axios';

const app = new Hono();

app.get('/', () => {
  return new Response('Hello, World!');
});

app.post('/scrap', () => {
  return new Response('Update');
});

export default app;
