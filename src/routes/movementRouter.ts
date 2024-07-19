import { Hono } from 'hono';
import movementController from '../controllers/movementsController';

const movementRouter = new Hono();

movementRouter.post('/scrap', movementController.scrap);

export default movementRouter;
