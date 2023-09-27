import { NextResponse } from "next/server";

// Services
import { createUser } from "@/services/userService";

export const POST = async (req: Request) => {
  try {
    const {
      email,
      password,
      name,
      locationId,
    }: { email: string; password: string; name: string, locationId: string } = await req.json();
    
    const createdUser = await createUser(email, password, locationId, name);

    return NextResponse.json({ user: createdUser }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 401 });
  }
};
