'use client';

import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useEffect } from 'react';
import LoadingDiv from '@/components/auth/LoadingDiv';
import useAuthStore from '@/store/authStore';

const inter = Inter({ subsets: ['latin'] });

export default function MainLayout({ children }) {
  const { token, fetchCurrentUser, loadingFetching } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    }
  }, [token]);

  return (
    <html lang="en">
      <body className={inter.className}>
        {loadingFetching ? (
          <LoadingDiv />
        ) : (
          <>
            <Header />
            {children}
            <Footer />
          </>
        )}
        <script src="https://kit.fontawesome.com/459dbe24a4.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
