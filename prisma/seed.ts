import { PrismaClient } from '@prisma/client';

import userSeed from '../src/seeds/user';

const prisma = new PrismaClient();

const main = async () => {
  await userSeed(prisma);
};

(async () => {
  try {
    await main();
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
})();
