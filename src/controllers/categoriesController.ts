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

const patchCategoryAction = async (context: ContextWithCategoryId) => {
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

const deleteCategoryAction = async (context: ContextWithCategoryId) => {
  const { categoryId, tokenData } = context.var;

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      userId: true,
      parentCategoryId: true,
    },
  });

  if (category === null) {
    throw new MyBadQueryError('Category not found');
  }

  if (category.userId !== tokenData.userId) {
    throw new MyBadRequestError('Category not found');
  }

  const childrenCategories = await prisma.category.findMany({
    where: {
      parentCategoryId: categoryId,
    },
    select: { id: true },
  });

  const grandParentCategoryId = category.parentCategoryId;

  await prisma.$transaction([
    prisma.category.delete({
      where: {
        id: categoryId,
      },
    }),
    prisma.category.updateMany({
      where: { id: { in: childrenCategories.map((c) => c.id) } },
      data: { parentCategoryId: grandParentCategoryId },
    }),
    prisma.movement.updateMany({
      where: { categoryId: categoryId },
      data: { categoryId: grandParentCategoryId },
    }),
  ]);

  return { message: 'Category deleted' };
};

const categoriesController = {
  getCategories: async (c: Context) => controllerAction(c, getCategoriesAction),
  patchCategory: async (c: Context) => controllerAction(c, patchCategoryAction),
  deleteCategory: async (c: Context) =>
    controllerAction(c, deleteCategoryAction),
};

export default categoriesController;
