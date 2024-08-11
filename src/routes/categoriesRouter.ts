import categoriesController from '../controllers/categoriesController';
import { Context, Hono } from 'hono';

const categoriesRouter = new Hono();

categoriesRouter.get('/', categoriesController.getCategories);

export default categoriesRouter;
