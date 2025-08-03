import { PrismaClient, User } from '@prisma/client';

import { hashSync, genSaltSync } from 'bcrypt';

// Load environment variables from .cred.env
import dotenv from 'dotenv';
dotenv.config({ path: '.creds.env', debug: true });

type UsersData<T extends string> = Record<T, User>;

const alexPassword = process.env.ALEX_PASSWORD;

if (alexPassword === undefined) {
  throw new Error('ALEX_PASSWORD environment variable is not set');
}

export const usersData: UsersData<'alex'> = {
  alex: {
    id: 1,
    username: 'alex',
    password: hashSync(alexPassword, genSaltSync()),
  },
};

const userSeed = async (prisma: PrismaClient) => {
  try {
    await Promise.all(
      Object.values(usersData).map(async (userData) =>
        prisma.user.upsert({
          where: { id: userData.id },
          update: userData,
          create: userData,
        }),
      ),
    );
  } catch (error) {
    console.error('Error seeding user table:', error);
  }
};

export default userSeed;
