import { PrismaClient } from '@prisma/client';

import userSeed from '../src/seeds/user';
import institutionSeed from '../src/seeds/institution';
import credentialsSeed from '../src/seeds/credentials';
import accountSeed from '../src/seeds/accounts';

const prisma = new PrismaClient();

const main = async () => {
  await userSeed(prisma);
  await institutionSeed(prisma);
  await credentialsSeed(prisma);
  await accountSeed(prisma);
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
