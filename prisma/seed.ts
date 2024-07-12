import { PrismaClient } from '@prisma/client';

import userSeed from '../src/seeds/user';
import institutionSeed from '../src/seeds/institution';
import userInstitutionCredentialsSeed from '../src/seeds/userInstitutionCredentials';

const prisma = new PrismaClient();

const main = async () => {
  await userSeed(prisma);
  await institutionSeed(prisma);
  await userInstitutionCredentialsSeed(prisma);
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
