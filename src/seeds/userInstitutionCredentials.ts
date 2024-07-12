import { PrismaClient, UserInstitutionCredentials } from '@prisma/client';
import { usersData } from './user';
import { institutionsData } from './institution';

const userInstitutionCredentialsData: UserInstitutionCredentials[] = [
  {
    id: 1,
    userId: usersData.alex.id,
    institutionId: institutionsData.santander.id,
    username: '20071991-3',
    password: '46@8sA5uqV',
  },
  {
    id: 2,
    userId: usersData.alex.id,
    institutionId: institutionsData.commonWealth.id,
    username: '75336907',
    password: '46@8sA5uqV',
  },
];

const userInstitutionCredentialsSeed = async (prisma: PrismaClient) => {
  try {
    await Promise.all(
      userInstitutionCredentialsData.map(
        async (userInstitutionCredentialData) =>
          prisma.userInstitutionCredentials.upsert({
            where: { id: userInstitutionCredentialData.id },
            update: userInstitutionCredentialData,
            create: userInstitutionCredentialData,
          })
      )
    );
  } catch (error) {
    console.error('Error seeding UserInstitutionCredentials table:', error);
  }
};

export default userInstitutionCredentialsSeed;
