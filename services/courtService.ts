// Utils
import prisma from '@/prisma';

export const getAllCourts = async () => {
  try {
    const courts = await prisma.court.findMany({
      include: {
        club: true
      }
    });

    return courts;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get courts`);
  }
};

export const getCourtById = async (courtId: string) => {
  try {
    const court = await prisma.court.findUnique({
      where: {
        id: courtId
      }
    });

    return court;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get court`);
  }
};

export const getAllCourtsByClubId = async (clubId: string) => {
  try {
    const courts = await prisma.court.findMany({
      where: {
        clubId
      }
    });

    return courts;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get courts`);
  }
};

export const createCourt = async (
  clubId: string,
  name: string,
  defaultPrice: number
) => {
  try {
    const createdCourt = await prisma.court.create({
      data: {
        name,
        default_price: defaultPrice,
        club: {
          connect: {
            id: clubId
          }
        }
      }
    });

    return createdCourt;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get courts`);
  }
};

export const updateCourt = async (
  courtId: string,
  name?: string,
  defaultPrice?: number
) => {
  try {
    const updatedCourt = await prisma.court.update({
      where: {
        id: courtId
      },
      data: {
        name,
        default_price: defaultPrice
      }
    });

    return updatedCourt;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get courts`);
  }
};
