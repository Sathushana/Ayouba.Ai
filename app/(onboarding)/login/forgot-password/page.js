'use client';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const PRIMARY_COLOR_HEX = "#C263F2";
const SECONDARY_COLOR_HEX = "#E6E6FA";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      toast.success(data.message, { style: { fontWeight: 'bold' } });
      setEmail('');
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.", { style: { fontWeight: 'bold' } });
    } finally {
      setLoading(false);
    }
  };

  const newGradientStyle = {
    background: `linear-gradient(135deg, white, ${SECONDARY_COLOR_HEX})`,
  };

  const buttonGradient = {
    background: `linear-gradient(90deg, #d38df8, ${PRIMARY_COLOR_HEX})`,
    boxShadow: `0 8px 25px rgba(194, 99, 242, 0.4)`,
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-10 relative overflow-hidden"
      style={newGradientStyle}
    >
      <div
        className="flex flex-col md:flex-row w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out md:h-[500px]"
        style={{
          boxShadow: `0 15px 50px rgba(0, 0, 0, 0.1), 0 0 100px rgba(194, 99, 242, 0.2)`,
        }}
      >
        {/* Left Section */}
        <div
          className="hidden md:flex md:w-1/2 p-10 lg:p-14 flex-col justify-center text-white space-y-6"
          style={{
            background: `linear-gradient(145deg, ${PRIMARY_COLOR_HEX}, #9d4edc)`,
            animation: 'fadeInLeft 0.8s ease forwards',
          }}
        >
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
            Forgot Password?
          </h2>
          <p className="text-lg font-light opacity-90 leading-relaxed">
            {`Enter your email and we'll send you a link to reset your password.`}
          </p>
        </div>

        {/* Right Section (Form) */}
        <div
          className="w-full md:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center space-y-8"
          style={{ animation: 'fadeInRight 0.8s ease forwards' }}
        >
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Reset Your Password
            </h1>
            <p className="text-base mt-2 text-gray-500 font-medium">
              Enter your email below to receive a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition duration-300 ease-in-out"
              style={{ outline: 'none', '--tw-ring-color': PRIMARY_COLOR_HEX }}
            />

            <button
              type="submit"
              disabled={loading}
              style={buttonGradient}
              className={`w-full p-4 text-lg font-bold rounded-xl text-white transition-all duration-300 ease-in-out transform ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01] hover:shadow-xl'
              }`}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Remembered your password?{' '}
            <a
              href="/login"
              className="font-semibold hover:underline transition duration-200"
              style={{ color: PRIMARY_COLOR_HEX }}
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
