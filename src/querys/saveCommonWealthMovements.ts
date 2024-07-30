import stringToDate from '../utils/stringToDate';
import { CommonWealthReturnData } from '../service/scraper';
import prisma from '../utils/prismaClient';

const saveCommonWealthMovements = async (
  movements: CommonWealthReturnData,
  accountId: number
) => {
  await Promise.all(
    movements.pending.movements.map(async (movement) => {
      await prisma.movement.deleteMany({
        where: {
          account: { credentials: { institution: { name: 'COMMONWEALTH' } } },
          pending: true,
        },
      });
      await prisma.movement.createMany({
        data: {
          accountId: accountId,
          date: stringToDate(movement.date),
          valueDate: stringToDate(movement.value_date),
          amount: movement.ammount,
          balance: movement.balance,
          description: movement.description,
          pending: true,
        },
      });
    })
  );

  await Promise.all(
    movements.non_pending.map(async (movement) => {
      await prisma.movement.upsert({
        where: {
          accountId_valueDate_description_amount: {
            accountId: accountId,
            valueDate: stringToDate(movement.value_date),
            amount: movement.ammount,
            description: movement.description,
          },
        },
        create: {
          accountId: accountId,
          date: stringToDate(movement.date),
          valueDate: stringToDate(movement.value_date),
          amount: movement.ammount,
          balance: movement.balance,
          description: movement.description,
          pending: false,
        },
        update: {
          date: stringToDate(movement.date),
          valueDate: stringToDate(movement.value_date),
          balance: movement.balance,
          pending: false,
        },
      });
    })
  );
};

export default saveCommonWealthMovements;
