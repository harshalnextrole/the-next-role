"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import CalendlyModal from "@/components/CalendlyModal";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (productId: string) => void;
  rewriteCount: number;
}

const tiers = [
  {
    id: "single_rewrite",
    name: "Single Rewrite",
    price: "$2",
    description: "Unlock one bullet point rewrite",
    features: ["1 AI-powered rewrite", "Tailored to the job description"],
    accent: false,
  },
  {
    id: "full_access",
    name: "Full Access",
    price: "$19",
    description: "Everything for this analysis",
    features: [
      "All bullet point rewrites",
      "Unlimited chat messages",
      "Save & export results",
    ],
    accent: true,
    badge: "Best Value",
  },
  {
    id: "expert_review",
    name: "Expert Review",
    price: "$79",
    description: "Harshal personally reviews your resume",
    features: [
      "Everything in Full Access",
      "Personal Loom video walkthrough",
      "Rewritten resume in 48 hrs",
      "1 round of revisions",
    ],
    accent: false,
    badge: "Most Popular",
  },
];

export default function PricingModal({
  isOpen,
  onClose,
  onPurchase,
  rewriteCount,
}: PricingModalProps) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handlePurchase(productId: string) {
    setLoading(productId);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      if (data.url) {
        window.location.href = data.url;
      } else {
        onPurchase(productId);
        onClose();
      }
    } catch {
      // If Stripe isn't configured, grant access for demo purposes
      onPurchase(productId);
      onClose();
    } finally {
      setLoading(null);
    }
  }

  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 pb-2 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-navy-800">
              Invest in Your Next Role
            </h2>
            <p className="text-navy-500 text-sm mt-1">
              {rewriteCount} rewrites ready for your resume. Choose how you want to access them.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cream-100 rounded-lg transition-colors text-navy-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tiers */}
        <div className="p-6 grid md:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-xl border-2 p-5 flex flex-col ${
                tier.accent
                  ? "border-coral-500 bg-coral-50/30"
                  : "border-cream-300 bg-white"
              }`}
            >
              {tier.badge && (
                <span
                  className={`absolute -top-3 left-4 px-3 py-0.5 text-xs font-bold rounded-full ${
                    tier.accent
                      ? "bg-coral-500 text-white"
                      : "bg-navy-800 text-white"
                  }`}
                >
                  {tier.badge}
                </span>
              )}
              <div className="mb-4">
                <p className="text-sm font-semibold text-navy-600">{tier.name}</p>
                <p className="text-3xl font-display font-bold text-navy-800 mt-1">
                  {tier.price}
                </p>
                <p className="text-xs text-navy-400 mt-1">{tier.description}</p>
              </div>
              <ul className="space-y-2 mb-5 flex-1">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy-600">
                    <svg
                      className="w-4 h-4 text-forest-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePurchase(tier.id)}
                disabled={loading === tier.id}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  tier.accent
                    ? "bg-coral-500 hover:bg-coral-600 text-white"
                    : "bg-navy-800 hover:bg-navy-700 text-white"
                } disabled:opacity-50`}
              >
                {loading === tier.id ? "Processing..." : `Get ${tier.name}`}
              </button>
            </div>
          ))}
        </div>

        {/* Free option */}
        <div className="px-6 pb-6 text-center">
          <p className="text-navy-400 text-xs mb-2">Prefer to talk it through?</p>
          <CalendlyModal
            text="Book a Free 30-Min Strategy Call Instead"
            className="text-sm text-coral-500 hover:text-coral-600 font-medium transition-colors underline underline-offset-2"
          />
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}
