"use client";
import React from 'react';

const APP_NAME = "Lifeshift";
const PRIMARY_COLOR = "#C263F2";

const CheckCircleSVG = ({ size, color, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function ThankYou() {
  const handleProceed = () => {
    console.log("Proceeding to dashboard/results... Navigation simulated.");
    const messageElement = document.getElementById('status-message');
    if (messageElement) {
      messageElement.textContent = "Thank you page completed. You would now proceed to your personalized results dashboard!";
      messageElement.classList.remove('hidden');
      setTimeout(() => {
        messageElement.classList.add('hidden');
      }, 3000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div id="status-message" className="hidden fixed top-4 z-50 p-3 rounded-lg bg-green-500 text-white shadow-xl transition-all duration-300">
        Message placeholder
      </div>

      <div className="text-3xl font-extrabold text-gray-900 mb-8">
        <span style={{ color: PRIMARY_COLOR }}>{APP_NAME}</span>
      </div>

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border-t-4" style={{ borderColor: PRIMARY_COLOR }}>
        <div className="mb-6 flex justify-center">
          <style jsx="true">{`
            @keyframes bounce-slow {
              0%, 100% { transform: translateY(-5%); }
              50% { transform: translateY(0); }
            }
            .animate-bounce-slow {
              animation: bounce-slow 2s infinite ease-in-out;
            }
          `}</style>
          <CheckCircleSVG size={64} color={PRIMARY_COLOR} className="animate-bounce-slow" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          All Done! Thank You.
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          You've successfully completed the questionnaire. We now have a clear picture of your health goals and lifestyle. Your dedication means we can create the most effective **{APP_NAME}** plan for you!
        </p>
        
        <p className="text-base text-gray-700 mb-6 font-medium">
          Click below to see your personalized **Lifeshift Plan** tailored just for you.
        </p>

        <button
          onClick={handleProceed}
          className="w-full py-4 rounded-xl font-bold text-lg transition duration-300 transform 
                     bg-[#C263F2] text-white hover:bg-[#9E47CC] shadow-lg hover:shadow-xl hover:scale-[1.01]"
        >
          View My Personalized Plan
        </button>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        You may now close this window or proceed to your results.
      </div>
    </div>
  );
}
