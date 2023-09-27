import { NextResponse } from "next/server";

// Services
import { getAllUsers } from "@/services/userService";

export const GET = async () => {
  try {

    const result = await getAllUsers();

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    console.error(e);

    return NextResponse.json({ e }, { status: 500 });
  }
};
