'use client'

import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();

  return (
    <header>
      <div className="bg-gray-100 border-b border-gray-200 z-10">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between h-16 lg:h-20">
            <div className="hidden lg:flex lg:items-center lg:space-x-10">
              <Link className="text-base font-medium text-black" href="/test">
                Test page
              </Link>
            </div>

            <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
              <div className="flex-shrink-0">
                <h2 className="w-auto h-8 lg:h-10">Third Shot Hub</h2>
              </div>
            </div>

            {session?.data?.user ? (
              <SignOutButton />
            ) : (
              <div className="hidden lg:flex lg:items-center lg:space-x-10">
                <Link
                  className="text-base font-medium text-black"
                  href="/signup"
                >
                  Sign up
                </Link>
                <Link
                  className="text-base font-medium text-black"
                  href="/signin"
                >
                  Sign in
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
