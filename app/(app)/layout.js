'use client';

import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from '../../(app)/context/auth'; // adjust path if needed
import { AuthProvider } from './context/auth'; // correct the path

export default function MainLayout({ children }) {
  return (
    <AuthProvider>
      {/* Optional: global navbar, footer, etc. */}
      {children}

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
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
          success: { style: { background: '#C263F2', color: '#fff' } },
          error: { style: { background: '#C263F2', color: '#fff' } },
        }}
      />
    </AuthProvider>
  );
}
