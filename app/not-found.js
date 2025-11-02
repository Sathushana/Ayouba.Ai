import React from 'react';
import Link from 'next/link';
import { Ghost, ChevronLeft } from 'lucide-react';

const PRIMARY_COLOR = '#C263F2';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col items-center justify-center p-6 text-white text-center">
      
      {/* Custom Pulse Animation Style - Moved to standard <style> tag */}
      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(0.95);
            }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s infinite ease-in-out;
          }
        `}
      </style>

      {/* Ghost Icon & Error Code */}
      <div className="mb-8">
        <Ghost className="mx-auto size-24 md:size-32 animate-pulse-slow" style={{ color: PRIMARY_COLOR }} />
        <h1 className="text-7xl md:text-9xl font-extrabold mt-4" style={{ color: PRIMARY_COLOR }}>
          404
        </h1>
      </div>

      {/* Message */}
      <div className="max-w-md space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Page Vibe Check Failed
        </h2>
        <p className="text-gray-400 text-lg">
          {`Looks like the content you're searching for is currently off the grid.
          It might be chillin' somewhere else or just doesn't exist yet.`}
        </p>
      </div>

      {/* Call to Action */}
      {/* <div className="mt-10">
        <a 
          href="/" 
          style={{ backgroundColor: PRIMARY_COLOR, color: 'white' }}
          className="inline-flex items-center px-8 py-3 rounded-xl font-bold transition duration-300 shadow-lg hover:shadow-violet-500/50 active:scale-95 text-base"
        >
          <ChevronLeft className="size-5 mr-2" />
          Back to the Main Hub
        </a>
      </div> */}
      {/* Call to Action */}
      <div className="mt-10">
        <Link
          href="/"
          style={{ backgroundColor: PRIMARY_COLOR, color: 'white' }}
          className="inline-flex items-center px-8 py-3 rounded-xl font-bold transition duration-300 shadow-lg hover:shadow-violet-500/50 active:scale-95 text-base"
        >
          <ChevronLeft className="size-5 mr-2" />
          Back to the Main Hub
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
