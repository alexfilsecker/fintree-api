import authController from '../controllers/authController';
import { Hono } from 'hono';
import {
  loginValidator,
  refreshValidator,
} from '../middleware/validators/authValidator';

const authRouter = new Hono();

authRouter.post('/login', loginValidator, authController.login);

authRouter.post('/refresh', refreshValidator, authController.refresh);

export default authRouter;
