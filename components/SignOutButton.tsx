"use client";

import { signOut, useSession } from "next-auth/react";

export default function SignOutButton() {
  const session = useSession();

  console.log(session);

  return <button className="text-base font-medium text-black" onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>;
}
