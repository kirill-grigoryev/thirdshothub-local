'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Test = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated" ) {
    router.push("/");
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
      <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">{session.data?.user.role[0]} content</h2>
    </div>
  );
};

export default Test;
