import { CommonWealthReturnData } from '../service/scraper';
import prisma from '../utils/prismaClient';

const saveCommonWealthMovements = async (
  movements: CommonWealthReturnData,
  userId: number,
  institutionId: number
) => {
  console.log(movements);

  await Promise.all(
    movements.pending.movements.map(async (movement) => {
      await prisma.movement.upsert({
        where: {
          userId_institutionId_valueDate_description_amount: {
            userId: userId,
            institutionId: institutionId,
            valueDate: movement.value_date,
            amount: movement.ammount,
            description: movement.description,
          },
        },
        create: {
          userId: userId,
          institutionId: institutionId,
          amount: movement.ammount,
          date: movement.date,
          valueDate: movement.value_date,
          pending: true,
          description: movement.description,
        },
        update: {
          date: movement.date,
          pending: true,
        },
      });
    })
  );

  await Promise.all(
    movements.non_pending.map(async (movement) => {
      await prisma.movement.upsert({
        where: {
          userId_institutionId_valueDate_description_amount: {
            userId: userId,
            institutionId: institutionId,
            valueDate: movement.value_date,
            amount: movement.ammount,
            description: movement.description,
          },
        },
        create: {
          userId: userId,
          institutionId: institutionId,
          date: movement.date,
          valueDate: movement.value_date,
          amount: movement.ammount,
          balance: movement.balance,
          description: movement.description,
          pending: false,
        },
        update: {
          date: movement.date,
          balance: movement.balance,
          pending: false,
        },
      });
    })
  );
};

export default saveCommonWealthMovements;
