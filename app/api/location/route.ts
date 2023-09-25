import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const {
      name,
      description,
      location,
    }: { name: string; description: string; location: string } =
      await req.json();
    await connectToDb();

    const createdLocation = await prisma.location.create({
      data: {
        name,
        description,
        location,
      },
    });

    return NextResponse.json(createdLocation, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ e }, { status: 401 });
  } finally {
    prisma.$disconnect();
  }
};

export const GET = async () => {
  try {
    await connectToDb();

    const locations = await prisma.location.findMany({
      include: {
        courts: true,
      },
    });

    return NextResponse.json(locations, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ e }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
