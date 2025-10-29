'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../(app)/context/auth';
import { toast } from 'react-hot-toast';

export default function DashboardPage() {
  const { token, logout, authFetch, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('Loading...');
  const [mounted, setMounted] = useState(false); // ✅ Fix for hydration issue

  // ✅ Ensure client-only rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || loading) return; // ✅ only run after mount and when auth is ready

    if (!token) {
      setMessage("No token found. Please log in.");
      setTimeout(() => (window.location.href = "/login"), 1500);
      return;
    }

    authFetch("http://127.0.0.1:8000/protected")
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username || '');
        setMessage(data.message);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Unauthorized or token expired");
        toast.error("Session expired. Please log in again.", {
          style: { fontWeight: 'bold' },
        });
        setTimeout(() => (window.location.href = "/login"), 1500);
      });
  }, [token, loading, mounted]);

  const handleLogout = () => logout();

  // ✅ Prevent SSR mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {loading ? (
        <h1 className="text-3xl font-bold">Loading...</h1>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">
            {username ? `Hello ${username}, you are authenticated!` : message}
          </h1>
          {username && (
            <button
              onClick={handleLogout}
              className="mt-4 px-6 py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-600 transition"
            >
              Logout
            </button>
          )}
        </>
      )}
    </div>
  );
}