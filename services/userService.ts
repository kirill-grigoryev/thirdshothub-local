import bcrypt from 'bcryptjs';

// Utils
import prisma from '@/prisma';
import { connectToDb } from '@/utils';

export const getAllUsers = async () => {
  try {
    await connectToDb();

    const users = await prisma.user.findMany();

    const result = users.map((user) => {
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    });

    return result;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get users`);
  }
};

export const getAllusersByLocation = async (locationId: string) => {
  try {
    await connectToDb();

    const location = await prisma.location.findUnique({
      include: { users: true },
      where: { id: locationId }
    });

    const users = location?.users;

    if (!users) return [];

    const result = users.map((user) => {
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    });

    return result;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get users`);
  }
};

export const getAllAdmins = async () => {
  try {
    await connectToDb();

    const users = await prisma.user.findMany({
      where: {
        roles: {
          some: {
            value: 'admin'
          }
        }
      }
    });

    const result = users.map((user) => {
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    });

    return result;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get users`);
  }
};

export const getAllAdminsByLocation = async (locationId: string) => {
  try {
    await connectToDb();

    const users = await prisma.user.findMany({
      where: {
        roles: {
          some: {
            value: 'admin'
          }
        },
        locations: {
          some: {
            id: locationId
          }
        }
      }
    });

    const result = users.map((user) => {
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    });

    return result;
  } catch (e) {
    console.error(e);
    throw new Error(`Can't get users`);
  }
};

export const createUser = async (
  email: string,
  password: string,
  locationId: string,
  name: string
) => {
  try {
    await connectToDb();

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 5),
        roles: {
          connect: {
            value: 'user'
          }
        },
        locations: {
          connect: {
            id: locationId
          }
        }
      }
    });

    return {
      id: user.id,
      name,
      email
    };
  } catch (e) {
    console.error(e);
    throw new Error(`Can't create user`);
  }
};

export const addRoleToUser = async (roleId: string, userId: string) => {
  try {
    connectToDb();

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        roles: {
          connect: {
            id: roleId
          }
        }
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Can't add role to user`);
  }
};

export const removeRoleFromUser = async (roleId: string, userId: string) => {
  try {
    connectToDb();

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        roles: {
          disconnect: {
            id: roleId
          }
        }
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Can't add role to user`);
  }
};

export const addLocationToUser = async (locationId: string, userId: string) => {
  try {
    connectToDb();

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        locations: {
          connect: {
            id: locationId
          }
        }
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Can't add role to user`);
  }
};

export const removeUserFromLocation = async (
  locationId: string,
  userId: string
) => {
  try {
    connectToDb();

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        locations: {
          disconnect: {
            id: locationId
          }
        }
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Can't add role to user`);
  }
};
