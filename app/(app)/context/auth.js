'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
    setLoading(false); // ✅ Mark done after checking storage
  }, []);

  const login = (accessToken) => {
    localStorage.setItem('token', accessToken);
    setToken(accessToken);
    toast.success('Login successful! Redirecting...', { style: { fontWeight: 'bold' } });
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.success('Logged out successfully!', { style: { fontWeight: 'bold' }, position: 'center' });
    router.push('/login');
  };

  const authFetch = async (url, options = {}) => {
    if (!options.headers) options.headers = {};
    options.headers['Authorization'] = `Bearer ${token}`;
    const response = await fetch(url, options);
    if (response.status === 401) {
      toast.error('Session expired. Please log in again.', { style: { fontWeight: 'bold' }, position: 'center' });
      logout();
      throw new Error('Unauthorized');
    }
    return response;
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, authFetch, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
