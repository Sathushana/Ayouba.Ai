'use client';
import React, { useState } from 'react';
import { useAuth } from '../../(app)/context/auth';
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";



const PRIMARY_COLOR_HEX = "#C263F2";
const SECONDARY_COLOR_HEX = "#E6E6FA";

const LoginPage = () => {

  const { login } = useAuth(); // ✅ get login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);  // FastAPI expects `username`
      formData.append("password", password);

      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.access_token); // ✅ Use AuthContext login
      } else {
        toast.error(data.detail || "Invalid email or password", {
          style: { fontWeight: 'bold' },
        });
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Something went wrong. Please try again.", {
        style: { fontWeight: 'bold' },
      });
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
        className="flex flex-col md:flex-row w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out md:h-[600px]"
        style={{
          boxShadow: `0 15px 50px rgba(0, 0, 0, 0.1), 0 0 100px rgba(194, 99, 242, 0.2)`,
        }}
      >
        <style jsx global>{`
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>

        {/* Left Section */}
        <div
          className="hidden md:flex md:w-1/2 p-10 lg:p-14 flex-col justify-center text-white space-y-6"
          style={{
            background: `linear-gradient(145deg, ${PRIMARY_COLOR_HEX}, #9d4edc)`,
            animation: 'fadeInLeft 0.8s ease forwards',
          }}
        >
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
            Wellness Made Effortless.
          </h2>
          <p className="text-lg font-light opacity-90 leading-relaxed">
            Lifeshift delivers personalized, evidence-based lifestyle coaching built on robust behavioral science to drive genuine, sustainable change.
          </p>
          <ul className="list-none space-y-2 text-sm font-medium pt-4">
            <li className="flex items-center">
              <span className="text-yellow-300 mr-3">&#9733;</span> AI-powered Contextual Support
            </li>
            <li className="flex items-center">
              <span className="text-yellow-300 mr-3">&#9733;</span> Focus on Metabolic & Mental Health
            </li>
            <li className="flex items-center">
              <span className="text-yellow-300 mr-3">&#9733;</span> Sustainable Behavioral Change
            </li>
          </ul>
        </div>

        {/* Right Section (Form) */}
        <div
          className="w-full md:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center space-y-8"
          style={{ animation: 'fadeInRight 0.8s ease forwards' }}
        >
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Welcome Back
            </h1>
            <p className="text-base mt-2 text-gray-500 font-medium">
              Log in to continue your personalized journey.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition duration-300 ease-in-out"
              style={{ outline: 'none', '--tw-ring-color': PRIMARY_COLOR_HEX }}
            />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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


            <button
              type="submit"
              disabled={loading}
              style={buttonGradient}
              className={`w-full p-4 text-lg font-bold rounded-xl text-white transition-all duration-300 ease-in-out transform ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01] hover:shadow-xl'
              }`}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <a
              href="/register"
              className="font-semibold hover:underline transition duration-200"
              style={{ color: PRIMARY_COLOR_HEX }}
            >
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
