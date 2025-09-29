"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("#hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setScrolled(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur shadow-md translate-y-0" 
          : "bg-transparent md:-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link
          href="/"
          className={`text-2xl sm:text-3xl font-bold transition-colors ${
            scrolled ? "text-gray-900" : "text-gray-900"
          }`}
        >
          Ayubo.Ai
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          <Link 
            href="#features" 
            className={`font-semibold transition ${
              scrolled ? "text-gray-700 hover:text-[#e72638]" : "text-gray-700 hover:text-[#e72638]"
            }`}
          >
            Features
          </Link>
          <Link 
            href="/about" 
            className={`font-semibold transition ${
              scrolled ? "text-gray-700 hover:text-[#e72638]" : "text-gray-700 hover:text-[#e72638]"
            }`}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={`font-semibold transition ${
              scrolled ? "text-gray-700 hover:text-[#e72638]" : "text-gray-700 hover:text-[#e72638]"
            }`}
          >
            Contact
          </Link>
          <Link
            href="/try"
            className="bg-[#e72638] text-white px-4 py-1 rounded-lg font-semibold hover:bg-[#c71f40] transition"
          >
            Try Ayubo
          </Link>
        </nav>

        {/* Hamburger/X Button - Always visible on mobile */}
        <button
          className="md:hidden p-2 rounded text-2xl transition text-gray-900"
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Dropdown Container */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-4 gap-2 bg-white border-t border-gray-100">
          <Link
            href="#features"
            className="px-2 py-2 font-medium text-gray-700 hover:text-white hover:bg-[#e72638] rounded-md transition"
            onClick={handleLinkClick}
          >
            Features
          </Link>
          <Link
            href="/about"
            className="px-2 py-2 font-medium text-gray-700 hover:text-white hover:bg-[#e72638] rounded-md transition"
            onClick={handleLinkClick}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-2 py-2 font-medium text-gray-700 hover:text-white hover:bg-[#e72638] rounded-md transition"
            onClick={handleLinkClick}
          >
            Contact
          </Link>
          <Link
            href="/try"
            className="mt-2 bg-[#e72638] text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-white hover:text-[#e72638] transition"
            onClick={handleLinkClick}
          >
            Try Ayubo
          </Link>
        </nav>
      </div>
    </header>
  );
}