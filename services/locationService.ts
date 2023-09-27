// Utils
import prisma from '@/prisma';

export const getAllLocations = async () => {
  try {
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
