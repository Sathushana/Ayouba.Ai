"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";


const PRIMARY_COLOR_HEX = "#C263F2"; 
const SECONDARY_COLOR_HOVER_HEX = "#E6E6FA"; 
const PRIMARY_COLOR_DARK_HOVER = "#A326E7"; 


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
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link
          href="/"
          className={`text-2xl sm:text-3xl font-bold transition-colors ${
            scrolled ? "text-gray-900" : "text-gray-900"
          }`}
        >
          Lifeshift
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          <Link
            href="#learn"
            className={`font-semibold transition ${
              scrolled
                ? `text-gray-700 hover:text-[${PRIMARY_COLOR_HEX}]`
                : `text-gray-700 hover:text-[${PRIMARY_COLOR_HEX}]`
            }`}
          >
            Features
          </Link>
          <Link
            href="/about"
            className={`font-semibold transition ${
              scrolled
                ? `text-gray-700 hover:text-[${PRIMARY_COLOR_HEX}]`
                : `text-gray-700 hover:text-[${PRIMARY_COLOR_HEX}]`
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`font-semibold transition ${
              scrolled
                ? `text-gray-700 hover:text-[${PRIMARY_COLOR_HEX}]`
                : `text-gray-700 hover:text-[${PRIMARY_COLOR_HEX}]`
            }`}
          >
            Contact
          </Link>
          
          <Link
            href="/try"
            style={{
              backgroundColor: PRIMARY_COLOR_HEX,
              color: "white",
              border: `2px solid ${PRIMARY_COLOR_HEX}`,
            }}
            
            className={`px-4 py-1 rounded-lg font-semibold transition hover:bg-[${SECONDARY_COLOR_HOVER_HEX}] hover:text-[${PRIMARY_COLOR_HEX}] hover:border-[${PRIMARY_COLOR_HEX}]`}
          >
            Try Lifeshift
          </Link>
        </nav>

        
        <button
          className="md:hidden p-2 rounded text-2xl transition text-gray-900"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-4 gap-2 bg-white border-t border-gray-100">
          <Link
            href="#learn"
            className={`px-2 py-2 font-medium text-gray-700 hover:text-white hover:bg-[${PRIMARY_COLOR_HEX}] rounded-md transition`}
            onClick={handleLinkClick}
          >
            Features
          </Link>
          <Link
            href="/about"
            className={`px-2 py-2 font-medium text-gray-700 hover:text-white hover:bg-[${PRIMARY_COLOR_HEX}] rounded-md transition`}
            onClick={handleLinkClick}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`px-2 py-2 font-medium text-gray-700 hover:text-white hover:bg-[${PRIMARY_COLOR_HEX}] rounded-md transition`}
            onClick={handleLinkClick}
          >
            Contact
          </Link>
          
          <Link
            href="/try"
            style={{
              backgroundColor: PRIMARY_COLOR_HEX,
              color: "white",
              border: `2px solid ${PRIMARY_COLOR_HEX}`,
            }}
            
            className={`mt-2 px-4 py-2 rounded-lg font-semibold text-center transition hover:bg-[${SECONDARY_COLOR_HOVER_HEX}] hover:text-[${PRIMARY_COLOR_HEX}] hover:border-[${PRIMARY_COLOR_HEX}]`}
            onClick={handleLinkClick}
          >
            Try Lifeshift
          </Link>
        </nav>
      </div>
    </header>
  );
}