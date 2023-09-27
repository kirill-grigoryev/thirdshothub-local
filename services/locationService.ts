// Utils
import prisma from '@/prisma';
import { connectToDb } from '@/utils';

export const getAllLocations = async () => {
  try {
    await connectToDb();

    const locations = await prisma.location.findMany({
      include: {
        courts: true
      }
    });

    return locations;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get locations`);
  }
};

export const getLocationById = async (locationId: string) => {
  try {
    await connectToDb();

    const location = await prisma.location.findUnique({
      where: {
        id: locationId
      }
    });

    return location;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get location`);
  }
};

export const createLocation = async (
  name: string,
  description: string,
  location: string
) => {
  try {
    await connectToDb();

    const createdLocation = await prisma.location.create({
      data: {
        name,
        description,
        location
      }
    });

    return createdLocation;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't create location`);
  }
};

export const updateLocation = async (
  id: string,
  name?: string,
  description?: string,
  location?: string
) => {
  try {
    await connectToDb();

    const updatedLocation = await prisma.location.update({
      where: {
        id
      },
      data: {
        name,
        description,
        location
      }
    });

    return updatedLocation;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't update location`);
  }
};
