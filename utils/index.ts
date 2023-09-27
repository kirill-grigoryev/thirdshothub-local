import prisma from '@/prisma';

let isConnected = false;

// eslint-disable-next-line consistent-return
export const connectToDb = async () => {
  try {
    if (!isConnected) {
      await prisma.$connect();

      isConnected = true;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return new Error(err.message);
  }
};

// eslint-disable-next-line consistent-return
export const disconnectFromDb = async () => {
  try {
    if (isConnected) {
      await prisma.$disconnect();
      isConnected = false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return new Error(err.message);
  }
};
