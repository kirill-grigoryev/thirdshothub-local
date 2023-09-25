import { authConfig } from "@/configs/auth";
import prisma from "@/prisma";
import { connectToDb } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const session = await getServerSession(req, res, authConfig)

    console.log(session);

    await connectToDb();

    const users = await prisma.user.findMany();

    const result = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return NextResponse.json(result, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ e }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
