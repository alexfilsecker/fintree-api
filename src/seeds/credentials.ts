import { PrismaClient, Credentials } from '@prisma/client';

import { hashSync, genSaltSync } from 'bcrypt';
import { institutionsData } from './institution';
import { usersData } from './user';

type CredentialsData<T extends string> = {
  [key in T]: Credentials;
};

const retrieveEnv = (env: string): string => {
  const value = process.env[env];
  if (value === undefined) {
    throw new Error(`${env} environment variable is not set`);
  }
  return value;
};

const santanderUsername = retrieveEnv('SANTANDER_USERNAME');
const santanderPassword = retrieveEnv('SANTANDER_PASSWORD');
const commonWealthUsername = retrieveEnv('COMMONWEALTH_USERNAME');
const commonWealthPassword = retrieveEnv('COMMONWEALTH_PASSWORD');

export const credentialsData: CredentialsData<'santander' | 'commonWealth'> = {
  santander: {
    id: 1,
    institutionId: institutionsData.santander.id,
    userId: usersData.alex.id,
    username: santanderUsername,
    password: hashSync(santanderPassword, genSaltSync()),
  },
  commonWealth: {
    id: 2,
    institutionId: institutionsData.commonWealth.id,
    userId: usersData.alex.id,
    username: commonWealthUsername,
    password: hashSync(commonWealthPassword, genSaltSync()),
  },
};

const credentialsSeed = async (prisma: PrismaClient) => {
  try {
    await Promise.all(
      Object.values(credentialsData).map(async (credentialData) =>
        prisma.credentials.upsert({
          where: { id: credentialData.id },
          update: credentialData,
          create: credentialData,
        }),
      ),
    );
  } catch (error) {
    console.error('Error seeding credentials table:', error);
  }
};

export default credentialsSeed;
