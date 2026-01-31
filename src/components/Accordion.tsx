"use client";

import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="card cursor-pointer"
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-navy-800 pr-4">
              {item.question}
            </h3>
            <svg
              className={`w-5 h-5 text-coral-500 flex-shrink-0 transition-transform duration-300 ${
                openIndex === i ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? "max-h-96 mt-3 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-navy-500">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
