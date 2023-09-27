import { NextRequest, NextResponse } from 'next/server';

// Services
import { getLocationById, updateLocation } from '@/services/locationService';

export const PATCH = async (
  req: Request,
  { params }: { params: { locationId: string } }
) => {
  try {
    const {
      name,
      description,
      location
    }: { name?: string; description?: string; location?: string } =
      await req.json();

    const id = params.locationId;

    const updatedLocation = updateLocation(id, name, description, location);

    return NextResponse.json(updatedLocation, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 401 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { locationId: string } }
) => {
  try {
    const id = params.locationId;

    const location = await getLocationById(id);

    if (!location) {
      return NextResponse.json(
        { message: `Can't find location with id: ${id}` },
        { status: 500 }
      );
    }

    return NextResponse.json(location, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
};
