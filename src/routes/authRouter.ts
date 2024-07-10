import authController from '../controllers/authController';
import { Hono } from 'hono';
import loginValidator from '../validators/authValidator';

const authRouter = new Hono();

authRouter.post('/login', loginValidator, authController.login);

export default authRouter;
