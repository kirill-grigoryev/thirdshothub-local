import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { locationId: string } }
) => {
  try {
    const {
      name,
      description,
      location,
    }: { name?: string; description?: string; location?: string } =
      await req.json();

    const id = params.locationId;

    await connectToDb();

    const createdLocation = await prisma.location.update({
      where: {
        id,
      },
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

export const GET = async (req: NextRequest, { params }: { params: { locationId: string } }) => {
  try {
    const id = params.locationId;

    await connectToDb();

    const location = await prisma.location.findUnique({
      where: {
        id,
      },
      include: {
        users: true,
        courts: true,
      },
    });

    if (!location) {
      return NextResponse.json(
        { message: `Can't find location with id: ${id}` },
        { status: 500 }
      );
    }

    return NextResponse.json(location, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ e }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
