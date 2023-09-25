import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

// POST Crate court for location
export const POST = async (
  req: Request,
  { params }: { params: { locationId: string } }
) => {
  try {
    const { name, default_price }: { name: string; default_price: number } =
      await req.json();

    const id = params.locationId;

    await connectToDb();

    const location = await prisma.location.findUnique({
      where: {
        id,
      },
    });

    if (!location) {
      return NextResponse.json(
        { message: `Can't find location with id: ${id}` },
        { status: 404 }
      );
    }

    const createdLocation = await prisma.court.create({
      data: {
        name,
        default_price,
        location: {
          connect: {
            id: location.id,
          },
        },
      },
    });

    return NextResponse.json(createdLocation, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ e }, { status: 401 });
  } finally {
    prisma.$disconnect();
  }
};

// GET courts by location ID.
export const GET = async (req: NextRequest, { params }: { params: { locationId: string } }) => {
  try {
    const id = params.locationId;

    await connectToDb();

    const location = await prisma.location.findUnique({
      where: {
        id,
      },
      include: {
        courts: true,
      },
    });

    if (!location) {
      return NextResponse.json(
        { message: `Can't find location with id: ${id}` },
        { status: 404 }
      );
    }

    const locationCourts = location.courts;

    return NextResponse.json(locationCourts, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ e }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};