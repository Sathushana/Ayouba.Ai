'use client';
import React, { useState } from 'react';

const PRIMARY_COLOR_HEX = "#C263F2";
const SECONDARY_COLOR_HEX = "#E6E6FA";

const RegisterApp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      console.error("Registration failed: Passwords do not match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log('Attempting registration with:', { name, email, password });
      setLoading(false);
    }, 2000);
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
      className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-hidden pt-24" // 👈 Added pt-24 to prevent overlap with fixed navbar
      style={newGradientStyle}
    >
      <div
        className="w-full flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out z-10 md:h-[650px] md:max-w-4xl"
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

        {/* Left Panel */}
        <div
          className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-center text-white space-y-6"
          style={{
            background: `linear-gradient(145deg, ${PRIMARY_COLOR_HEX}, #9d4edc)`,
            animationName: 'fadeInLeft',
            animationDuration: '0.8s',
            animationFillMode: 'both',
            animationDelay: '0.1s'
          }}
        >
          <h2 className="text-4xl font-extrabold tracking-tight">
            Wellness Made Effortless.
          </h2>
          <p className="text-lg font-light opacity-90">
            Lifeshift delivers personalized, evidence-based lifestyle coaching built on robust behavioral science models to drive genuine, sustainable change.
          </p>
          <ul className="list-none space-y-2 text-sm font-medium pt-4">
            <li className="flex items-center"><span className="text-yellow-300 mr-3">&#9733;</span> AI-powered Contextual Support</li>
            <li className="flex items-center"><span className="text-yellow-300 mr-3">&#9733;</span> Focus on Metabolic & Mental Health</li>
            <li className="flex items-center"><span className="text-yellow-300 mr-3">&#9733;</span> Sustainable Behavioral Change</li>
          </ul>
        </div>

        {/* Right Panel (Form) */}
        <div
          className="md:w-1/2 p-8 sm:p-12 space-y-6 flex flex-col justify-center bg-white"
          style={{
            animationName: 'fadeInRight',
            animationDuration: '0.8s',
            animationFillMode: 'both',
            animationDelay: '0.1s'
          }}
        >
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Create Your Account
            </h1>
            <p className="text-base mt-2 text-gray-500 font-medium">
              Join Lifeshift and start your personalized wellness journey.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out focus:ring-offset-white"
              style={{ outline: 'none', '--tw-ring-color': PRIMARY_COLOR_HEX }}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out focus:ring-offset-white"
              style={{ outline: 'none', '--tw-ring-color': PRIMARY_COLOR_HEX }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out focus:ring-offset-white"
              style={{ outline: 'none', '--tw-ring-color': PRIMARY_COLOR_HEX }}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out focus:ring-offset-white"
              style={{ outline: 'none', '--tw-ring-color': PRIMARY_COLOR_HEX }}
            />

            <button
              type="submit"
              disabled={loading}
              style={buttonGradient}
              className={`w-full p-4 text-lg font-bold rounded-xl text-white transition-all duration-300 ease-in-out transform mt-6 ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01] hover:shadow-xl'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 pt-4">
            Already have an account?{" "}
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
};

export default RegisterApp;
