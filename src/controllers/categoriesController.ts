import { MyBadQueryError } from '../errors/badQueryError';
import { MyBadRequestError } from '../errors/badRequestError';
import { PatchCategoryNameBodyType } from '../middleware/validators/categoriesValidator';
import { TokenizedContext } from '../middleware/verifyToken';
import { ContextWithCategoryId } from '../routes/categoriesRouter';
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

const patchCategoryName = async (context: ContextWithCategoryId) => {
  const { categoryId, tokenData } = context.var;

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      userId: true,
    },
  });

  if (category === null) {
    throw new MyBadQueryError('Category not found');
  }

  if (category.userId !== tokenData.userId) {
    throw new MyBadRequestError('Category not found');
  }

  const { name, parentId } =
    await context.req.json<PatchCategoryNameBodyType>();

  await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name,
      parentCategoryId: parentId,
    },
  });

  return { message: 'Category updated' };
};

const categoriesController = {
  getCategories: async (c: Context) => controllerAction(c, getCategoriesAction),
  patchCategory: async (c: Context) => controllerAction(c, patchCategoryName),
};

export default categoriesController;
