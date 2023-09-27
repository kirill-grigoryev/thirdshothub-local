import { NextRequest, NextResponse } from 'next/server';

// Services
import { getCourtById, updateCourt } from '@/services/courtService';

// PATCH Update court in location
export const PATCH = async (
  req: Request,
  { params }: { params: { locationId: string; courtId: string } }
) => {
  try {
    const { name, defaultPrice }: { name?: string; defaultPrice?: number } =
      await req.json();

    const { courtId } = params;

    const updatedCourt = await updateCourt(courtId, name, defaultPrice);

    return NextResponse.json(updatedCourt, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 401 });
  }
};

// GET court by court ID.
export const GET = async (
  req: NextRequest,
  {
    params
  }: {
    params: { locationId: string; courtId: string };
  }
) => {
  try {
    const { courtId } = params;

    const court = getCourtById(courtId);

    if (!court) {
      return NextResponse.json(
        { message: `Can't find court with id: ${courtId}` },
        { status: 404 }
      );
    }

    return NextResponse.json(court, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
};
