import { NextRequest, NextResponse } from 'next/server';

// Services
import { createCourt, getAllCourtsByLocationId } from '@/services/courtService';

// POST Crate court for location
export const POST = async (
  req: Request,
  { params }: { params: { locationId: string } }
) => {
  try {
    const { name, defaultPrice }: { name: string; defaultPrice: number } =
      await req.json();

    const id = params.locationId;

    const createdCourt = await createCourt(id, name, defaultPrice);

    return NextResponse.json(createdCourt, { status: 201 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 401 });
  }
};

// GET courts by location ID.
export const GET = async (
  req: NextRequest,
  { params }: { params: { locationId: string } }
) => {
  try {
    const id = params.locationId;

    const courts = getAllCourtsByLocationId(id);

    return NextResponse.json(courts, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
};
