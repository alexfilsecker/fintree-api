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
      account: { credentials: { userId: token.userId } },
    },
    select: {
      id: true,
      account: {
        select: {
          id: true,
          currency: true,
          credentials: {
            select: {
              institution: {
                select: {
                  name: true,
                },
              },
            },
          },
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
    id: movement.id,
    institution: movement.account.credentials.institution.name,
    pending: movement.pending,
    amount: movement.amount,
    date: movement.date,
    valueDate: movement.valueDate,
    description: movement.description,
    userDescription: movement.userDescription,
    currency: movement.account.currency,
  }));

  return { movements };
};

const scrapAction = async (context: TokenizedContext) => {
  const token = context.var.tokenData;

  const userCredentials = await prisma.credentials.findMany({
    where: {
      userId: token.userId,
    },
    select: {
      username: true,
      password: true,
      institution: {
        select: {
          name: true,
        },
      },
      accounts: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  await Promise.all(
    userCredentials.map(async (credentials) => {
      const bank = credentials.institution.name;
      if (bank === 'COMMONWEALTH') {
        const commonWealthScraps = await Promise.all(
          credentials.accounts.map(async (account) => {
            const movements = await requestCommonWealthScrap({
              client_number: credentials.username,
              password: credentials.password,
            });

            return {
              accountId: account.id,
              movements,
            };
          })
        );

        await Promise.all(
          commonWealthScraps.map(async (scrap) => {
            await saveCommonWealthMovements(scrap.movements, scrap.accountId);
          })
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
