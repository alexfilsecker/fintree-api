import { Context } from 'hono';
import controllerAction from './controllerAction';
import { TokenizedContext } from '../middleware/verifyToken';
import prisma from '../utils/prismaClient';
import { requestCommonWealthScrap } from '../service/scraper';
import saveCommonWealthMovements from '../querys/saveCommonWealthMovements';

const getMovementsAction = async (context: TokenizedContext) => {
  const token = context.var.tokenData;

  const movementsPrisma = await prisma.movement.findMany({
    where: {
      userId: token.userId,
    },
    select: {
      institution: {
        select: {
          name: true,
          currency: true,
        },
      },
      pending: true,
      amount: true,
      date: true,
      valueDate: true,
      description: true,
      userDescription: true,
    },
  });

  const movements = movementsPrisma.map((movement) => ({
    institution: movement.institution.name,
    pending: movement.pending,
    amount: movement.amount,
    date: movement.date,
    valueDate: movement.valueDate,
    description: movement.description,
    userDescription: movement.userDescription,
    currency: movement.institution.currency,
  }));

  return { movements };
};

const scrapAction = async (context: TokenizedContext) => {
  const token = context.var.tokenData;

  const userCredentials = await prisma.userInstitutionCredentials.findMany({
    where: {
      userId: token.userId,
    },
    select: {
      username: true,
      password: true,
      institution: {
        select: {
          id: true,

          name: true,
        },
      },
    },
  });

  console.log('started');

  await Promise.all(
    userCredentials.map(async (credentials) => {
      const bank = credentials.institution.name;
      if (bank === 'COMMONWEALTH') {
        const commonWealthMovements = await requestCommonWealthScrap({
          client_number: credentials.username,
          password: credentials.password,
        });

        await saveCommonWealthMovements(
          commonWealthMovements,
          token.userId,
          credentials.institution.id
        );
      }
    })
  );

  return { message: 'Scraped' };
};

const movementController = {
  scrap: async (c: Context) => controllerAction(c, scrapAction),
  getMovements: async (c: Context) => controllerAction(c, getMovementsAction),
};

export default movementController;
