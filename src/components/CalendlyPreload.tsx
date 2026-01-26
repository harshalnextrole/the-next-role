"use client";

import { useEffect } from "react";

export default function CalendlyPreload() {
  useEffect(() => {
    // Preload Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}
