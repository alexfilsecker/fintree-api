import { TokenizedContext } from '../middleware/verifyToken';
import prisma from '../utils/prismaClient';
import controllerAction from './controllerAction';
import { Context } from 'hono';

const getCategoriesAction = async (context: TokenizedContext) => {
  const token = context.var.tokenData;
  const categories = await prisma.category.findMany({
    where: { userId: token.userId },
    select: {
      id: true,
      name: true,
      parentCategoryId: true,
    },
  });
  return { categories };
};

const categoriesController = {
  getCategories: async (c: Context) => controllerAction(c, getCategoriesAction),
};

export default categoriesController;
