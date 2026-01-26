"use client";

import { InlineWidget } from "react-calendly";
import { useState, useEffect } from "react";

interface CalendlyModalProps {
  text?: string;
  className?: string;
}

export default function CalendlyModal({
  text = "Book Your Free Consultation",
  className = "btn-primary",
}: CalendlyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Start loading the widget after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={className}>
        {text}
      </button>

      {/* Pre-loaded hidden widget */}
      <div
        className={`fixed inset-0 z-[9999] transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Modal */}
        <div className="absolute inset-4 md:inset-10 lg:inset-20 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              Book Your Free Consultation
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Calendly Widget - always loaded, just hidden */}
          <div className="flex-1 overflow-hidden">
            {isLoaded && (
              <InlineWidget
                url="https://calendly.com/harshal-nextrole/30min"
                styles={{ height: "100%", width: "100%" }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
