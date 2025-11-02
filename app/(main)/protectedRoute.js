'use client';
import { useAuth } from '../(app)/context/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only check in the browser
    if (!token && typeof window !== "undefined" && !localStorage.getItem('token')) {
      router.push('/login');
    }
  }, [token, router]);

  // While checking auth, don't render anything
  if (!token && (typeof window === "undefined" || !localStorage.getItem('token'))) {
    return null;
  }

  return <>{children}</>;
}
