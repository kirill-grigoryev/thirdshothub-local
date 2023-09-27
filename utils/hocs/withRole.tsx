'use client';

import { Roles } from '@/constants';
import { NextComponentType } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const withRole = (Component: NextComponentType, role: Roles) => {
  const AuthenticatedComponent: NextComponentType = (props) => {
    const session = useSession();
    const router = useRouter();

    if (session.status === 'loading') {
      return <div>Loading...</div>;
    }

    if (
      !session.data?.user ||
      !session.data.user.role.includes(role.toString())
    ) {
      router.replace('/signin');

      return null;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withRole;
