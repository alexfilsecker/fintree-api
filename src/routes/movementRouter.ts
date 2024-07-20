import { Context, Hono, Next } from 'hono';
import movementController from '../controllers/movementsController';

const movementRouter = new Hono();

movementRouter.post('/scrap', movementController.scrap);

movementRouter.get('/', movementController.getMovements);

export default movementRouter;
