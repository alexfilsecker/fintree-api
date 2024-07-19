import { Context } from 'hono';
import controllerAction from './controllerAction';
import { TokenizedContext } from '../middleware/verifyToken';
import prisma from '../utils/prismaClient';
import { requestCommonWealthScrap } from '../service/scraper';
import saveCommonWealthMovements from '../querys/saveCommonWealthMovements';

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
};

export default movementController;
