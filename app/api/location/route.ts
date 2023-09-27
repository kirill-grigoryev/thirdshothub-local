import { NextResponse } from 'next/server';

// Services
import { createLocation, getAllLocations } from '@/services/locationService';

export const POST = async (req: Request) => {
  try {
    const {
      name,
      description,
      location
    }: { name: string; description: string; location: string } =
      await req.json();

    const createdLocation = await createLocation(name, description, location);
    
    return NextResponse.json(createdLocation, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 401 });
  }
};

export const GET = async () => {
  try {
    const locations = await getAllLocations();

    return NextResponse.json(locations, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
};
