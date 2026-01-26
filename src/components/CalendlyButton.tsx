"use client";

import { PopupButton } from "react-calendly";
import { useEffect, useState } from "react";

interface CalendlyButtonProps {
  text?: string;
  className?: string;
}

export default function CalendlyButton({
  text = "Book Your Free Consultation",
  className = "btn-primary",
}: CalendlyButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={className} disabled>
        {text}
      </button>
    );
  }

  return (
    <PopupButton
      url="https://calendly.com/harshal-nextrole/30min"
      rootElement={document.body}
      text={text}
      className={className}
    />
  );
}
