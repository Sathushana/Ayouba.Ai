// app/(onboarding)/layout.js
import React from 'react';

// You might also need to import your font and global CSS here if it's not handled by the root layout.

export const metadata = {
  title: 'Lifeshift | Sign In',
  description: 'Authentication and Registration for Lifeshift.',
};

export default function OnboardingLayout({ children }) {
  return (
    // Simple container for Auth pages. No main Navbar or Bottom Nav.
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      {/* Optional: A simple logo/app name header */}
      <header className="py-8">
          <h1 className="text-3xl font-extrabold text-[#C263F2]">LIFESHIFT</h1>
      </header>
      
      {/* The child page (login/register) will be rendered here */}
      <main className="w-full max-w-sm px-4">
        {children}
      </main>
      
      {/* Optional: Footer or copyright */}
      <footer className="mt-8 text-sm text-gray-500">
        &copy; 2025 Lifeshift
      </footer>
    </div>
  );
}