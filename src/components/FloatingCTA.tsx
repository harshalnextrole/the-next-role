"use client";

import { useEffect, useState } from "react";
import CalendlyModal from "./CalendlyModal";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <CalendlyModal
        text="Book Free Call"
        className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-coral-500 rounded-full hover:bg-coral-600 transition-all duration-200 shadow-xl hover:shadow-2xl"
      />
    </div>
  );
}
