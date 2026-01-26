"use client";

import { PopupButton } from "react-calendly";

interface CalendlyButtonProps {
  text?: string;
  className?: string;
}

export default function CalendlyButton({
  text = "Book Your Free Consultation",
  className = "btn-primary",
}: CalendlyButtonProps) {
  return (
    <PopupButton
      url="https://calendly.com/harshal-nextrole/30min"
      rootElement={typeof window !== "undefined" ? document.body : undefined}
      text={text}
      className={className}
    />
  );
}
