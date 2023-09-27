import bcrypt from 'bcryptjs';

// Utils
import prisma from '@/prisma';

export const getAllUsers = async () => {
  try {
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

export const getAllusersByClub = async (clubId: string) => {
  try {
    const club = await prisma.club.findUnique({
      include: { users: true },
      where: { id: clubId }
    });

    const users = club?.users;

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

export const getAllAdminsByClub = async (clubId: string) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        roles: {
          some: {
            value: 'admin'
          }
        },
        clubs: {
          some: {
            id: clubId
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
  clubId: string,
  name: string
) => {
  try {
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
        clubs: {
          connect: {
            id: clubId
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

export const addClubToUser = async (clubId: string, userId: string) => {
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        clubs: {
          connect: {
            id: clubId
          }
        }
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Can't add role to user`);
  }
};

export const removeUserFromClub = async (
  clubId: string,
  userId: string
) => {
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        clubs: {
          disconnect: {
            id: clubId
          }
        }
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Can't add role to user`);
  }
};
