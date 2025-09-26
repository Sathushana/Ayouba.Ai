"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("#hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Hero is visible → hide header
            setShowHeader(false);
          } else {
            // Scrolled past hero → show header
            setShowHeader(true);
          }
        });
      },
      { threshold: 0.2 } // adjust sensitivity
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed w-full bg-white/80 backdrop-blur z-50 shadow-sm transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-4xl font-bold"
          style={{ color: "#0b1724" }}
        >
          Ayouba.Ai
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="font-bold hover:text-blue-600">
            Features
          </Link>
          <Link href="#about" className="font-bold hover:text-blue-600">
            About
          </Link>
          <Link href="#contact" className="font-bold hover:text-blue-600">
            Contact
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col p-4 gap-2">
            <Link href="#features">Features</Link>
            <Link href="#about">About</Link>
            <Link href="#contact">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
