import categoriesController from '../controllers/categoriesController';
import { Context, Hono, Next } from 'hono';
import { TokenizedEnv } from '../middleware/verifyToken';
import { patchCategoryValidator } from '../middleware/validators/categoriesValidator';

const categoriesRouter = new Hono();

categoriesRouter.get('/', categoriesController.getCategories);

export type ContextWithCategoryId = Context<
  TokenizedEnv & {
    Variables: {
      categoryId: number;
    };
  }
>;

categoriesRouter.patch(
  '/:id',
  (context: ContextWithCategoryId, next: Next) => {
    const { id } = context.req.param();
    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parsedId)) {
      return context.json(
        {
          status: 400,
          errorData: {
            type: 'ValidationError',
            message: 'Id is not a number',
          },
        },
        400,
      );
    }
    context.set('categoryId', parsedId);
    return next();
  },
  patchCategoryValidator,
  categoriesController.patchCategory,
);

export default categoriesRouter;
