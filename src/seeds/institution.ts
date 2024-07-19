import { PrismaClient, Institution } from '@prisma/client';

type InstitutionsData<T extends string> = {
  [key in T]: Institution;
};

export const institutionsData: InstitutionsData<'santander' | 'commonWealth'> =
  {
    santander: {
      id: 1,
      name: 'SANTANDER',
    },
    commonWealth: {
      id: 2,
      name: 'COMMONWEALTH',
    },
  };

const institutionSeed = async (prisma: PrismaClient) => {
  try {
    await Promise.all(
      Object.values(institutionsData).map(async (institutionData) =>
        prisma.institution.upsert({
          where: { id: institutionData.id },
          update: institutionData,
          create: institutionData,
        })
      )
    );
  } catch (error) {
    console.error('Error seeding institution table:', error);
  }
};

export default institutionSeed;
