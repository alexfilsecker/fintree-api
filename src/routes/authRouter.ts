import authController from '../controllers/authController';
import { Hono } from 'hono';

const authRouter = new Hono();

authRouter.post('/login', authController.login);

export default authRouter;
