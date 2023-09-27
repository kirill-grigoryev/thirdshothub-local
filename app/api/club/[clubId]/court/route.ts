import { NextRequest, NextResponse } from 'next/server';

// Services
import { createCourt, getAllCourtsByClubId } from '@/services/courtService';

// POST Crate court for club
export const POST = async (
  req: Request,
  { params }: { params: { clubId: string } }
) => {
  try {
    const { name, defaultPrice }: { name: string; defaultPrice: number } =
      await req.json();

    const id = params.clubId;

    const createdCourt = await createCourt(id, name, defaultPrice);

    return NextResponse.json(createdCourt, { status: 201 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 401 });
  }
};

// GET courts by club ID.
export const GET = async (
  req: NextRequest,
  { params }: { params: { clubId: string } }
) => {
  try {
    const id = params.clubId;

    const courts = getAllCourtsByClubId(id);

    return NextResponse.json(courts, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
};
