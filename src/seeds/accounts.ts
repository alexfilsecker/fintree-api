import { PrismaClient, Account } from '@prisma/client';
import { credentialsData } from './credentials';

const accountsData: Account[] = [
  {
    id: 1,
    name: 'SMART_ACCESS',
    currency: 'AUD',
    credentialsId: credentialsData.commonWealth.id,
  },
];

const accountSeed = async (prisma: PrismaClient) => {
  try {
    await Promise.all(
      accountsData.map(async (accountData) =>
        prisma.account.upsert({
          where: { id: accountData.id },
          update: accountData,
          create: accountData,
        }),
      ),
    );
  } catch (error) {
    console.error('Error seeding account table:', error);
  }
};

export default accountSeed;
