import { NextRequest, NextResponse } from 'next/server';

// Services
import { getClubById, updateClub } from '@/services/ClubService';

export const PATCH = async (
  req: Request,
  { params }: { params: { clubId: string } }
) => {
  try {
    const {
      name,
      description,
      location
    }: { name?: string; description?: string; location?: string } =
      await req.json();

    const id = params.clubId;

    const updatedClub = updateClub(id, name, description, location);

    return NextResponse.json(updatedClub, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 401 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { clubId: string } }
) => {
  try {
    const id = params.clubId;

    const club = await getClubById(id);

    if (!club) {
      return NextResponse.json(
        { message: `Can't find club with id: ${id}` },
        { status: 500 }
      );
    }

    return NextResponse.json(club, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
};
