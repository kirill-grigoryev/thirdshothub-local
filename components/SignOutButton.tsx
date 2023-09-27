'use client';

import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  return (
    <button
      type='button'
      className="text-base font-medium text-black"
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
