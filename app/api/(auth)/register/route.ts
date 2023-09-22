import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const {
      email,
      password,
      name,
    }: { email: string; password: string; name: string } = await req.json();
    await connectToDb();

    const userRole = await prisma.role.findFirst({
      where: {
        value: "user",
      },
    });

    if (!userRole) {
      return NextResponse.json({ message: "Can't find role" }, { status: 500 });
    }

    await prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 5),
        roles: {
          connect: {
            value: 'user'
          }
        },
      },
    });

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ e }, { status: 401 });
  } finally {
    prisma.$disconnect();
  }
};
