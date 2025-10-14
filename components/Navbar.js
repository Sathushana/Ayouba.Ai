"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";


const PRIMARY_COLOR_HEX = "#C263F2"; 
const SECONDARY_COLOR_HOVER_HEX = "#E6E6FA"; 


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
          ? "bg-white/95 backdrop-blur-md shadow-xl translate-y-0"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link
          href="/"
          className={`text-2xl sm:text-3xl font-extrabold transition-colors tracking-tight`}
          style={{ color: PRIMARY_COLOR_HEX }}
        >
          LIFESHIFT
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#learn"
            className={`font-semibold text-gray-700 transition duration-300 hover:text-black hover:scale-105`}
          >
            Features
          </Link>
          <Link
            href="/about"
            className={`font-semibold text-gray-700 transition duration-300 hover:text-black hover:scale-105`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`font-semibold text-gray-700 transition duration-300 hover:text-black hover:scale-105`}
          >
            Contact
          </Link>
          
          <Link
            href="/try"
            style={{
              backgroundColor: PRIMARY_COLOR_HEX,
              color: "white",
            }}
            
            className={`px-5 py-2 rounded-xl font-bold transition duration-300 shadow-lg hover:shadow-xl hover:bg-opacity-90 active:scale-95`}
          >
            Try Free
          </Link>
        </nav>

        
        <button
          className="md:hidden p-2 rounded text-2xl transition duration-300 text-gray-900 active:scale-95"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-white border-t border-gray-100`}
      >
        <nav className="flex flex-col p-4 gap-2">
          <Link
            href="#learn"
            className={`px-3 py-3 font-medium text-gray-700 rounded-lg transition duration-300 hover:text-white hover:font-semibold`}
            style={{ backgroundColor: open ? PRIMARY_COLOR_HEX : "" }}
            onClick={handleLinkClick}
          >
            Features
          </Link>
          <Link
            href="/about"
            className={`px-3 py-3 font-medium text-gray-700 rounded-lg transition duration-300 hover:text-white hover:font-semibold`}
            style={{ backgroundColor: open ? PRIMARY_COLOR_HEX : "" }}
            onClick={handleLinkClick}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`px-3 py-3 font-medium text-gray-700 rounded-lg transition duration-300 hover:text-white hover:font-semibold`}
            style={{ backgroundColor: open ? PRIMARY_COLOR_HEX : "" }}
            onClick={handleLinkClick}
          >
            Contact
          </Link>
          
          <Link
            href="/try"
            style={{
              backgroundColor: PRIMARY_COLOR_HEX,
              color: "white",
            }}
            
            className={`mt-4 px-4 py-3 rounded-xl font-bold text-center transition duration-300 shadow-md hover:bg-opacity-90 active:scale-95`}
            onClick={handleLinkClick}
          >
            Try Free
          </Link>
        </nav>
      </div>
    </header>
  );
}