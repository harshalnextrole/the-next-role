"use client";

import Link from "next/link";
import { useState } from "react";
import CalendlyModal from "./CalendlyModal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/resume-analyzer", label: "Resume Analyzer", isNew: true },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream-100/95 backdrop-blur-sm border-b border-cream-300">
      <nav className="container-max section-padding !py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center">
              <span className="text-coral-400 font-display font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-display font-bold text-navy-800">
              The Next Role
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-navy-600 hover:text-coral-500 font-medium transition-colors flex items-center gap-1.5"
              >
                {link.label}
                {link.isNew && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-coral-500 text-white rounded-full leading-none">
                    NEW
                  </span>
                )}
              </Link>
            ))}
            <CalendlyModal text="Let's Talk" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-navy-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-cream-300 pt-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-navy-600 hover:text-coral-500 font-medium transition-colors flex items-center gap-1.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                  {link.isNew && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-coral-500 text-white rounded-full leading-none">
                      NEW
                    </span>
                  )}
                </Link>
              ))}
              <CalendlyModal
                text="Let's Talk"
                className="btn-primary text-center"
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
