import { NextResponse } from 'next/server';

// Services
import { createClub, getAllClubs } from '@/services/ClubService';

export const POST = async (req: Request) => {
  try {
    const {
      name,
      description,
      location
    }: { name: string; description: string; location: string } =
      await req.json();

    const createdClub = await createClub(name, description, location);
    
    return NextResponse.json(createdClub, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 401 });
  }
};

export const GET = async () => {
  try {
    const clubs = await getAllClubs();

    return NextResponse.json(clubs, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
};
