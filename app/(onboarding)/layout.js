'use client';

import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../(app)/context/auth'; // ✅ fixed path

export default function OnboardingLayout({ children }) {
  return (
    <AuthProvider>
      {/* Toaster for notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#000',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '12px',
            padding: '12px 20px',
            fontWeight: 'bold',
          },
          success: {
            style: {
              background: '#C263F2',
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#C263F2',
              color: '#fff',
            },
          },
        }}
      />
      {children}
    </AuthProvider>
  );
}
