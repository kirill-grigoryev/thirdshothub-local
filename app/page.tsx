'use client'

import { getServerSession } from "next-auth";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    <main>
      <h1>Present page</h1>
    </main>
  );
}
