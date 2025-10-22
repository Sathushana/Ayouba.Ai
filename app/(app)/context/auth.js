'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Load token when app starts (safe for SSR)
  useEffect(() => {
    // Prevent hydration mismatch (run only in browser)
    if (typeof window !== 'undefined') {
      const storedToken =
        localStorage.getItem('token') || sessionStorage.getItem('token');
      if (storedToken) setToken(storedToken);
      setLoading(false);
    }
  }, []);

  // ✅ Login with Remember Me option
  const login = (accessToken, rememberMe = false) => {
    // Clear any existing tokens
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    if (rememberMe) {
      localStorage.setItem('token', accessToken); // persists after closing tab
    } else {
      sessionStorage.setItem('token', accessToken); // clears when tab closed
    }

    setToken(accessToken);

    toast.success('Login successful! Redirecting...', {
      style: { fontWeight: 'bold' },
    });

    // Add a short delay to allow toast to appear
    setTimeout(() => router.push('/dashboard'), 1000);
  };

  // ✅ Logout clears both storages
  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setToken(null);

    toast.success('Logged out successfully!', {
      style: { fontWeight: 'bold' },
      position: 'center',
    });

    setTimeout(() => router.push('/login'), 500);
  };

  // ✅ Authenticated fetch helper
  const authFetch = async (url, options = {}) => {
    if (!options.headers) options.headers = {};
    options.headers['Authorization'] = `Bearer ${token}`;
    const response = await fetch(url, options);

    if (response.status === 401) {
      toast.error('Session expired. Please log in again.', {
        style: { fontWeight: 'bold' },
        position: 'center',
      });
      logout();
      throw new Error('Unauthorized');
    }

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        authFetch,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
