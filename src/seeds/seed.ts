import { PrismaClient } from '../../prisma-gen/client';

import userSeed from './user';
import institutionSeed from './institution';
import credentialsSeed from './credentials';
import accountSeed from './accounts';

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
