// Utils
import prisma from '@/prisma';
import { connectToDb } from '@/utils';

export const getAllCourts = async () => {
  try {
    await connectToDb();

    const courts = await prisma.court.findMany({
      include: {
        location: true
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
    await connectToDb();

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

export const getAllCourtsByLocationId = async (locationId: string) => {
  try {
    await connectToDb();

    const courts = await prisma.court.findMany({
      where: {
        locationId
      }
    });

    return courts;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get courts`);
  }
};

export const createCourt = async (
  locationId: string,
  name: string,
  defaultPrice: number
) => {
  try {
    await connectToDb();

    const createdCourt = await prisma.court.create({
      data: {
        name,
        default_price: defaultPrice,
        location: {
          connect: {
            id: locationId
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
    await connectToDb();

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