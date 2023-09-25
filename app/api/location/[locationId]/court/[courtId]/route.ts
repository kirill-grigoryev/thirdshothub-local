import prisma from "@/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";

// PATCH Update court in location
export const PATCH = async (
  req: Request,
  { params }: { params: { courtId: string } }
) => {
  try {
    const { name, default_price }: { name?: string; default_price?: number } =
      await req.json();

    const { courtId } = params;

    await connectToDb();

    const createdLocation = await prisma.court.update({
      where: {
        id: courtId,
      },
      data: {
        name,
        default_price,
      },
    });

    return NextResponse.json(createdLocation, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ e }, { status: 401 });
  } finally {
    prisma.$disconnect();
  }
};

// GET court by court ID.
export const GET = async ({ params }: { params: { courtId: string } }) => {
  try {
    const { courtId } = params;

    await connectToDb();

    const court = await prisma.court.findUnique({
      where: {
        id: courtId,
      },
    });

    if (!court) {
      return NextResponse.json(
        { message: `Can't find court with id: ${courtId}` },
        { status: 404 }
      );
    }

    return NextResponse.json(court, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ e }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
