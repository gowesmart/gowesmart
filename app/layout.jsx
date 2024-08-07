import ProtectedRoute from '@/components/auth/ProtectedRoute';
import './globals.css';
import MainLayout from '@/layouts/MainLayout';

export const metadata = {
  title: 'Gowesmart',
  description: 'the right choice to buy a bicycle',
};

export default function RootLayout({ children }) {
  return (
    <ProtectedRoute>
      <MainLayout>{children}</MainLayout>
    </ProtectedRoute>
  );
}
