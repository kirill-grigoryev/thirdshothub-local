import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email, password, name } = await req.json();
    console.log({ email, password, name });
    await connectToDb();

    await prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 5),
      },
    });

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ e }, { status: 401 });
  } finally {
    prisma.$disconnect();
  }
};