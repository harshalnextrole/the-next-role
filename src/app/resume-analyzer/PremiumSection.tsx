"use client";

import CalendlyModal from "@/components/CalendlyModal";

interface Rewrite {
  original: string;
  rewritten: string;
  why: string;
}

interface PremiumSectionProps {
  rewrites: Rewrite[];
  unlocked: boolean;
  onUnlock: () => void;
}

const PREVIEW_COUNT = 2;

export default function PremiumSection({
  rewrites,
  unlocked,
  onUnlock,
}: PremiumSectionProps) {
  const previewRewrites = rewrites.slice(0, PREVIEW_COUNT);
  const lockedRewrites = rewrites.slice(PREVIEW_COUNT);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-display font-bold text-navy-800 mb-2">
        Rewrite Suggestions
      </h2>
      <p className="text-navy-500 text-sm mb-6">
        Here&apos;s how we&apos;d rewrite your weak bullet points to align with this role.
      </p>

      {/* Free preview rewrites */}
      <div className="space-y-5">
        {previewRewrites.map((rw, i) => (
          <RewriteCard key={i} rewrite={rw} />
        ))}
      </div>

      {/* Locked rewrites */}
      {lockedRewrites.length > 0 && !unlocked && (
        <>
          <div className="relative mt-5">
            <div className="space-y-5 blur-[6px] select-none pointer-events-none">
              {lockedRewrites.map((rw, i) => (
                <RewriteCard key={i} rewrite={rw} />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-navy-800/80 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                +{lockedRewrites.length} more rewrites
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 card p-8 text-center bg-gradient-to-br from-navy-800 to-navy-900 border-none">
            <p className="text-cream-200 text-sm mb-1">You&apos;re seeing {PREVIEW_COUNT} of {rewrites.length} rewrites</p>
            <h3 className="text-xl font-display font-bold text-white mb-2">
              Get every bullet point rewritten for this role
            </h3>
            <p className="text-cream-300 text-sm mb-6 max-w-lg mx-auto">
              In a free 30-min call, I&apos;ll walk you through each rewrite,
              help you fill the gaps in your resume, and build a strategy
              to position you as the top candidate.
            </p>
            <CalendlyModal
              text="Book Free Call to Unlock All Rewrites"
              className="bg-coral-500 hover:bg-coral-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            />
          </div>
        </>
      )}

      {/* Unlocked rewrites */}
      {unlocked && lockedRewrites.length > 0 && (
        <div className="space-y-5 mt-5">
          {lockedRewrites.map((rw, i) => (
            <RewriteCard key={i} rewrite={rw} />
          ))}
        </div>
      )}
    </div>
  );
}

function RewriteCard({ rewrite }: { rewrite: Rewrite }) {
  return (
    <div className="card p-5 space-y-3">
      <div>
        <p className="text-xs font-semibold text-navy-400 uppercase mb-1">Current</p>
        <p className="text-sm text-navy-500 line-through">&ldquo;{rewrite.original}&rdquo;</p>
      </div>
      <div>
        <p className="text-xs font-semibold text-forest-600 uppercase mb-1">Rewritten</p>
        <p className="text-sm text-navy-800 font-medium">&ldquo;{rewrite.rewritten}&rdquo;</p>
      </div>
      <p className="text-xs text-navy-400 italic">{rewrite.why}</p>
    </div>
  );
}
