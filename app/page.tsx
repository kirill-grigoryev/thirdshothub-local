'use client'

import { getServerSession } from "next-auth";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const session = useSession();

  console.log(session);

  return (
    <main>
      <button onClick={() => signOut({callbackUrl: '/'})}>logout</button>
    </main>
  );
}
