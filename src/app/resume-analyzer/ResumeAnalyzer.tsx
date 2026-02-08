"use client";

import { useState, useRef, useEffect } from "react";
import ScoreCircle from "./ScoreCircle";
import ChatCoach from "./ChatCoach";
import PricingModal from "./PricingModal";
import CalendlyModal from "@/components/CalendlyModal";

const LOADING_MESSAGES = [
  "Reading your resume...",
  "Comparing against the job description...",
  "Finding what to improve...",
  "Writing better bullets for you...",
  "Almost there...",
];

interface Rewrite {
  original: string;
  rewritten: string;
  why: string;
}

interface AnalysisResult {
  matchScore: number;
  coachSummary: string;
  strengths: string[];
  gaps: string[];
  rewrites: Rewrite[];
}

const FREE_REWRITES = 3;

export default function ResumeAnalyzer() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [chatMessagesUsed, setChatMessagesUsed] = useState(0);
  const [hasFullAccess, setHasFullAccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const purchased = params.get("purchased");
    if (purchased === "full_access" || purchased === "expert_review") {
      setHasFullAccess(true);
    }
    if (purchased) {
      window.history.replaceState({}, "", "/resume-analyzer");
    }
  }, []);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingMsgIndex((prev) =>
        prev < LOADING_MESSAGES.length - 1 ? prev + 1 : prev
      );
    }, 2500);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  function handlePurchase(productId: string) {
    if (productId === "full_access" || productId === "expert_review") {
      setHasFullAccess(true);
    } else if (productId === "chat_pack") {
      setChatMessagesUsed((prev) => Math.max(0, prev - 10));
    }
  }

  async function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to parse PDF");
      setResume(data.text);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to parse PDF");
    } finally {
      setPdfLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    setLoadingMsgIndex(0);
    try {
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const totalRewrites = result?.rewrites.length ?? 0;
  const lockedRewrites = hasFullAccess
    ? 0
    : Math.max(0, totalRewrites - FREE_REWRITES);

  const analysisContext = result
    ? `Score: ${result.matchScore}/100. Summary: ${result.coachSummary}. Strengths: ${result.strengths.join("; ")}. Gaps: ${result.gaps.join("; ")}.`
    : "";

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-navy-700">
              Your Resume
            </label>
            <label className="text-sm text-coral-500 hover:text-coral-600 cursor-pointer font-medium transition-colors">
              {pdfLoading ? "Parsing..." : "Upload PDF"}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handlePdfUpload}
                disabled={pdfLoading}
              />
            </label>
          </div>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your resume text here..."
            className="w-full h-48 p-4 rounded-xl border border-cream-400 bg-white text-navy-700 text-sm placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent resize-none transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy-700 mb-2">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full h-48 p-4 rounded-xl border border-cream-400 bg-white text-navy-700 text-sm placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent resize-none transition"
            required
          />
        </div>
        {error && (
          <div className="p-4 bg-coral-50 border border-coral-200 rounded-xl text-coral-700 text-sm">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading || !resume.trim() || !jobDescription.trim()}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? LOADING_MESSAGES[loadingMsgIndex] : "Analyze My Resume"}
        </button>
      </form>

      {loading && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-cream-400 border-t-coral-500 rounded-full animate-spin" />
          <p className="text-navy-500 text-sm animate-pulse">
            {LOADING_MESSAGES[loadingMsgIndex]}
          </p>
        </div>
      )}

      {result && (
        <div ref={resultsRef} className="mt-12 space-y-8">
          {/* Score + Summary */}
          <div className="card p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <ScoreCircle score={result.matchScore} />
              <div className="flex-1">
                <p className="text-navy-700 text-sm leading-relaxed">
                  {result.coachSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Strengths + Gaps side by side */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-display font-bold text-navy-800 mb-4">
                Working in Your Favor
              </h3>
              <div className="space-y-3">
                {result.strengths.map((s, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-3 rounded-lg bg-forest-50/50 border border-forest-200"
                  >
                    <span className="flex-shrink-0 w-5 h-5 bg-forest-100 text-forest-600 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-sm text-navy-600">{s}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-bold text-navy-800 mb-4">
                Gaps to Address
              </h3>
              <div className="space-y-3">
                {result.gaps.map((g, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-3 rounded-lg bg-coral-50/50 border border-coral-200"
                  >
                    <span className="flex-shrink-0 w-5 h-5 bg-coral-100 text-coral-600 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01" />
                      </svg>
                    </span>
                    <p className="text-sm text-navy-600">{g}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rewrites — the main event */}
          {totalRewrites > 0 && (
            <div>
              <h3 className="font-display font-bold text-navy-800 text-xl mb-2">
                {totalRewrites} Bullet{totalRewrites !== 1 ? "s" : ""} I&apos;d Rewrite
              </h3>
              <p className="text-navy-500 text-sm mb-5">
                These bullets aren&apos;t pulling their weight for this role. Here&apos;s how I&apos;d fix them.
              </p>

              <div className="space-y-4">
                {result.rewrites.map((rw, i) => {
                  const isFree = hasFullAccess || i < FREE_REWRITES;

                  return (
                    <div key={i} className="card p-5">
                      {/* Original */}
                      <div className="flex items-start gap-3 mb-3">
                        <span className="flex-shrink-0 mt-1 w-5 h-5 bg-coral-100 text-coral-500 rounded-full flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-navy-400 uppercase mb-1">Current</p>
                          <p className="text-sm text-navy-600 line-through decoration-coral-300">
                            &ldquo;{rw.original}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Rewrite — free or locked */}
                      {isFree ? (
                        <div className="ml-8 p-3 bg-forest-50 rounded-lg border border-forest-200">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs font-semibold text-forest-600 uppercase">Rewrite</p>
                            {!hasFullAccess && (
                              <span className="text-[10px] font-bold text-forest-600 bg-forest-100 px-2 py-0.5 rounded-full">
                                FREE
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-navy-800 font-medium">
                            &ldquo;{rw.rewritten}&rdquo;
                          </p>
                          <p className="text-xs text-navy-400 mt-1.5 italic">{rw.why}</p>
                        </div>
                      ) : (
                        <div className="ml-8 p-3 bg-cream-100 rounded-lg border border-cream-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              <p className="text-sm text-navy-500">Rewrite ready — unlock to see it</p>
                            </div>
                            <button
                              onClick={() => setPricingOpen(true)}
                              className="text-xs bg-coral-500 hover:bg-coral-600 text-white font-semibold px-4 py-1.5 rounded-full transition-colors"
                            >
                              Unlock
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          {!hasFullAccess && lockedRewrites > 0 && (
            <div className="card p-6 bg-gradient-to-r from-navy-800 to-navy-900 border-none text-center">
              <p className="text-white font-display font-bold text-lg mb-1">
                {lockedRewrites} more rewrite{lockedRewrites !== 1 ? "s" : ""} ready
              </p>
              <p className="text-cream-300 text-sm mb-5 max-w-lg mx-auto">
                Unlock every rewrite and get unlimited coaching chat — or
                book a free call and I&apos;ll walk through everything personally.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button
                  onClick={() => setPricingOpen(true)}
                  className="bg-coral-500 hover:bg-coral-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
                >
                  Unlock All — $19
                </button>
                <CalendlyModal
                  text="Book Free Strategy Call"
                  className="bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-colors"
                />
              </div>
            </div>
          )}

          {/* Chat Coach */}
          <ChatCoach
            analysisContext={analysisContext}
            freeMessages={5}
            usedMessages={chatMessagesUsed}
            onMessageUsed={() => setChatMessagesUsed((prev) => prev + 1)}
            hasUnlimitedChat={hasFullAccess}
            onUpgradeClick={() => setPricingOpen(true)}
          />

          {/* Pricing Modal */}
          <PricingModal
            isOpen={pricingOpen}
            onClose={() => setPricingOpen(false)}
            onPurchase={handlePurchase}
            rewriteCount={totalRewrites}
          />
        </div>
      )}
    </div>
  );
}
