'use client';

import useAuthStore from '@/store/authStore';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const { currentUser } = useAuthStore();
  const mustLogin = ['/cart'];
  const AlreadyLoggedIn = ['/auth/login', '/auth/register'];

  useEffect(() => {
    if (currentUser) {
      if (AlreadyLoggedIn.includes(pathname)) {
        router.push('/');
      }
    } else {
      if (mustLogin.includes(pathname)) {
        router.push('/auth/login');
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
