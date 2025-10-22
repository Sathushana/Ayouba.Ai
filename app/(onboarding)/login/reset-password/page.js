'use client';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PRIMARY_COLOR_HEX = "#C263F2";
const SECONDARY_COLOR_HEX = "#E6E6FA";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!", { style: { fontWeight: 'bold' } });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, new_password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successful!", { style: { fontWeight: 'bold' } });
        router.push('/login');
      } else {
        toast.error(data.detail || "Reset failed. Try again.", { style: { fontWeight: 'bold' } });
      }
    } catch (err) {
      console.error(err);
      toast.error("Reset failed. Token may be invalid or expired.", { style: { fontWeight: 'bold' } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-10"
         style={{ background: `linear-gradient(135deg, white, ${SECONDARY_COLOR_HEX})` }}>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Reset Password</h2>
        <p className="text-center text-gray-500 mb-6">Enter your new password for {email}</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition duration-300 ease-in-out"
              style={{ outline: 'none', '--tw-ring-color': PRIMARY_COLOR_HEX }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <div className="relative w-full">
            <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition duration-300 ease-in-out"
                style={{ outline: 'none', '--tw-ring-color': PRIMARY_COLOR_HEX }}
            />
            <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl"
            >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
           </div>

          <button
            type="submit"
            disabled={loading}
            style={{ background: `linear-gradient(90deg, #d38df8, ${PRIMARY_COLOR_HEX})`, boxShadow: `0 8px 25px rgba(194, 99, 242, 0.4)` }}
            className={`w-full p-4 text-lg font-bold rounded-xl text-white transition-all duration-300 ease-in-out transform ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01] hover:shadow-xl'
            }`}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
