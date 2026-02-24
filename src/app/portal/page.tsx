"use client";

import { useState } from "react";
import Link from "next/link";
import CalendlyModal from "@/components/CalendlyModal";

interface Session {
  id: string;
  date: string;
  type: string;
  status: "completed" | "upcoming" | "cancelled";
  notes?: string;
}

export default function PortalPage() {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessions] = useState<Session[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - in production this would verify against Calendly bookings
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoggedIn(true);
    setIsLoading(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-navy-800 mb-2">
              Client Portal
            </h1>
            <p className="text-navy-600">
              Access your session history and resources
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-navy-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter the email you used to book"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-4 disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Access Portal"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-cream-200 text-center">
              <p className="text-navy-500 text-sm mb-4">
                New here? Book your first session.
              </p>
              <CalendlyModal
                text="Book a Session"
                className="btn-secondary w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy-800">
              Welcome Back!
            </h1>
            <p className="text-navy-600">{email}</p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-navy-500 hover:text-navy-700"
          >
            Sign Out
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-coral-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-navy-800 mb-2">
              Book a Session
            </h3>
            <p className="text-navy-500 text-sm mb-4">
              Schedule your next coaching session
            </p>
            <CalendlyModal
              text="Book Now"
              className="btn-primary w-full text-sm py-2"
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-forest-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-navy-800 mb-2">
              Resume Analyzer
            </h3>
            <p className="text-navy-500 text-sm mb-4">
              Get instant feedback on your resume
            </p>
            <Link
              href="/resume-analyzer"
              className="btn-secondary w-full text-sm py-2 text-center block"
            >
              Analyze Resume
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-navy-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-navy-800 mb-2">
              Resources
            </h3>
            <p className="text-navy-500 text-sm mb-4">
              Read career tips and guides
            </p>
            <Link
              href="/blog"
              className="btn-secondary w-full text-sm py-2 text-center block"
            >
              View Blog
            </Link>
          </div>
        </div>

        {/* Session History */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="font-display text-xl font-semibold text-navy-800 mb-6">
            Session History
          </h2>

          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-cream-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-navy-500 mb-4">No sessions yet</p>
              <p className="text-navy-400 text-sm max-w-md mx-auto">
                Your session history will appear here once you book your first
                coaching session. Ready to get started?
              </p>
              <CalendlyModal
                text="Book Your First Session"
                className="btn-primary mt-6"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-cream-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-navy-800">{session.type}</p>
                    <p className="text-navy-500 text-sm">
                      {new Date(session.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      session.status === "completed"
                        ? "bg-forest-100 text-forest-600"
                        : session.status === "upcoming"
                        ? "bg-coral-100 text-coral-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {session.status.charAt(0).toUpperCase() +
                      session.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leave a Testimonial */}
        <div className="mt-8 bg-gradient-to-r from-coral-500 to-coral-600 rounded-2xl p-8 text-center text-white">
          <h2 className="font-display text-2xl font-bold mb-2">
            Enjoying your experience?
          </h2>
          <p className="text-coral-100 mb-6">
            Share your feedback to help others discover the coaching they need.
          </p>
          <Link
            href="/testimonials"
            className="inline-block px-6 py-3 bg-white text-coral-600 font-semibold rounded-lg hover:bg-cream-100 transition-colors"
          >
            Leave a Testimonial
          </Link>
        </div>
      </div>
    </div>
  );
}
