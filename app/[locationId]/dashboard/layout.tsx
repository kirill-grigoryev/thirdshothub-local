'use client';

import AdminNavigation from '@/components/AdminNavigation';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { locationId } = useParams();
  const router = useRouter();

  const session = useSession();

  if (session.status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (
    session.status === 'unauthenticated' ||
    session.data?.user.role.includes('user')
  ) {
    router.push('/');
  } else
    return (
      <>
        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              {session.data?.user.role.includes('admin') ? (
                <AdminNavigation path={locationId.toString()} userRole="admin" />
              ) : (
                <AdminNavigation path={locationId.toString()} userRole="superadmin" />
              )}
            </ul>
          </div>
        </aside>

        <div className="p-4 sm:ml-64">{children}</div>
      </>
    );
}
