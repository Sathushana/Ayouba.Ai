'use client';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../(app)/context/auth'; // correct relative path

export default function MainLayout({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-right" />
    </AuthProvider>
  );
}
