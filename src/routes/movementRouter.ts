import { Context, Hono, Next } from 'hono';
import movementController from '../controllers/movementsController';
import { TokenizedEnv } from '../middleware/verifyToken';
import { patchUserDescriptionValidator } from '../middleware/validators/movementsValidator';

const movementRouter = new Hono();

movementRouter.post('/scrap', movementController.scrap);

movementRouter.get('/', movementController.getMovements);

export type ContextWithMovementId = Context<
  TokenizedEnv & {
    Variables: {
      movementId: number;
    };
  }
>;

movementRouter.patch(
  '/:id/user-description',
  (context: ContextWithMovementId, next: Next) => {
    const { id } = context.req.param();
    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parsedId)) {
      return context.json({
        status: 400,
        errorData: {
          type: 'ValidationError',
          message: 'Id is not a number',
        },
      });
    }
    context.set('movementId', parsedId);
    return next();
  },
  patchUserDescriptionValidator,
  movementController.patchUserDescription
);

export default movementRouter;
