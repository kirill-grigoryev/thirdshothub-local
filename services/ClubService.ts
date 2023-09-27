// Utils
import prisma from '@/prisma';

export const getAllClubs = async () => {
  try {
    const clubs = await prisma.club.findMany({
      include: {
        courts: true
      }
    });

    return clubs;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get clubs`);
  }
};

export const getClubById = async (clubId: string) => {
  try {
    const club = await prisma.club.findUnique({
      where: {
        id: clubId
      }
    });

    return club;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get club`);
  }
};

export const createClub = async (
  name: string,
  description: string,
  location: string
) => {
  try {
    const createdClub = await prisma.club.create({
      data: {
        name,
        description,
        location
      }
    });

    return createdClub;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't create club`);
  }
};

export const updateClub = async (
  id: string,
  name?: string,
  description?: string,
  location?: string
) => {
  try {
    const updatedClub = await prisma.club.update({
      where: {
        id
      },
      data: {
        name,
        description,
        location
      }
    });

    return updatedClub;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't update club`);
  }
};
