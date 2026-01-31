import Link from "next/link";
import type { Metadata } from "next";
import CalendlyModal from "@/components/CalendlyModal";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = {
  title: "Services & Pricing | The Next Role",
  description:
    "PM career coaching services including resume reviews, mock interviews, and comprehensive career transformation packages. Student rates available.",
};

export default function Services() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy-800 text-white">
        <div className="container-max section-padding !py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              Services & Pricing
            </h1>
            <p className="text-xl text-cream-300">
              Flexible options to match where you are in your career journey.
              All services include student rates.
            </p>
          </div>
        </div>
      </section>

      {/* Free Consultation */}
      <section className="section-padding bg-coral-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-forest-100 text-forest-700 rounded-full text-sm font-medium mb-4">
              Start Here
            </div>
            <h2 className="font-display text-3xl font-bold text-navy-800 mb-4">
              Start here — it&apos;s free
            </h2>
            <p className="text-xl text-navy-500 mb-6 max-w-2xl mx-auto">
              A 30-minute assessment to understand your career goals, identify
              skill gaps, and create actionable next steps. No commitment
              required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <div className="text-4xl font-bold text-forest-600">FREE</div>
              <div className="text-cream-400">|</div>
              <div className="text-navy-500">30 minutes</div>
            </div>
            <CalendlyModal className="btn-primary text-lg px-8 py-4" />
          </div>
        </div>
      </section>

      {/* Individual Services */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              One-off sessions
            </h2>
            <p className="text-xl text-navy-500 max-w-2xl mx-auto">
              Pay-per-session options for focused support on specific
              challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Single Session */}
            <div className="card border border-cream-300">
              <h3 className="font-display text-2xl font-bold text-navy-800 mb-2">
                Single Session
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-navy-800">$150</span>
                <span className="text-navy-400">CAD</span>
                <span className="text-cream-400">|</span>
                <span className="text-coral-600 font-medium">
                  $100 student rate
                </span>
              </div>
              <p className="text-navy-500 mb-6">
                A 60-minute deep dive into your specific challenge. Perfect for
                focused help on one area.
              </p>
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-navy-800">
                  Choose your focus:
                </h4>
                {[
                  "Resume review & optimization",
                  "Interview preparation & strategy",
                  "Career strategy & planning",
                  "Specific challenge troubleshooting",
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-coral-500 mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-navy-500">{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-navy-400 mb-4">
                Duration: 1 hour
              </div>
              <CalendlyModal
                text="Book Single Session"
                className="btn-secondary w-full"
              />
            </div>

            {/* Resume/LinkedIn Review */}
            <div className="card border border-cream-300">
              <h3 className="font-display text-2xl font-bold text-navy-800 mb-2">
                Resume/LinkedIn Review
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-navy-800">$50</span>
                <span className="text-navy-400">CAD</span>
                <span className="text-cream-400">|</span>
                <span className="text-coral-600 font-medium">
                  $25 student rate
                </span>
              </div>
              <p className="text-navy-500 mb-6">
                Async detailed written feedback with specific rewrite
                suggestions. Perfect if you need quick, actionable feedback.
              </p>
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-navy-800">You&apos;ll receive:</h4>
                {[
                  "Line-by-line feedback",
                  "Specific rewrite suggestions",
                  "PM-focused improvements",
                  "Delivered within 48 hours",
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-coral-500 mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-navy-500">{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-navy-400 mb-4">
                Async delivery: ~30 min review time
              </div>
              <CalendlyModal
                text="Get Resume Reviewed"
                className="btn-secondary w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Package Services */}
      <section className="section-padding bg-cream-100">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              Go deeper
            </h2>
            <p className="text-xl text-navy-500 max-w-2xl mx-auto">
              Comprehensive support for your job search or career transition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Job Search Sprint */}
            <div className="card border-2 border-coral-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-coral-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="font-display text-2xl font-bold text-navy-800 mb-2">
                Job Search Sprint
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-navy-800">$400</span>
                <span className="text-navy-400">CAD</span>
                <span className="text-cream-400">|</span>
                <span className="text-coral-600 font-medium">
                  $300 student rate
                </span>
              </div>
              <p className="text-navy-500 mb-6">
                4 sessions over 4 weeks to completely overhaul your job search
                approach and get you interview-ready.
              </p>
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-navy-800">What&apos;s included:</h4>
                {[
                  "Complete resume overhaul",
                  "LinkedIn profile optimization",
                  "Target company strategy",
                  "Mock interviews with feedback",
                  "Weekly accountability check-ins",
                  "Email/message support between sessions",
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-coral-500 mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-navy-500">{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-navy-400 mb-4">
                Duration: 4 weeks (~5 hours total)
              </div>
              <CalendlyModal
                text="Start Your Sprint"
                className="btn-primary w-full"
              />
            </div>

            {/* Career Transformation */}
            <div className="card border border-cream-300">
              <h3 className="font-display text-2xl font-bold text-navy-800 mb-2">
                Career Transformation
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-navy-800">$800</span>
                <span className="text-navy-400">CAD</span>
                <span className="text-cream-400">|</span>
                <span className="text-coral-600 font-medium">
                  $500 student rate
                </span>
              </div>
              <p className="text-navy-500 mb-6">
                8 sessions over 2 months for a complete career pivot. Ideal for
                career switchers or major transitions.
              </p>
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-navy-800">What&apos;s included:</h4>
                {[
                  "Everything in Job Search Sprint",
                  "Career narrative development",
                  "Skills gap analysis & plan",
                  "Extended mock interview practice",
                  "Offer negotiation support",
                  "90-day onboarding guidance",
                  "Priority support throughout",
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-coral-500 mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-navy-500">{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-navy-400 mb-4">
                Duration: 2 months (~10 hours total)
              </div>
              <CalendlyModal
                text="Transform Your Career"
                className="btn-secondary w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              Add-ons
            </h2>
            <p className="text-xl text-navy-500 max-w-2xl mx-auto">
              Enhance any service with targeted support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Job Postings Add-on */}
            <div className="card border border-cream-300">
              <h3 className="font-display text-xl font-bold text-navy-800 mb-2">
                Targeted Job Postings
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-navy-800">$75</span>
                <span className="text-navy-400">CAD</span>
                <span className="text-cream-400">|</span>
                <span className="text-coral-600 font-medium">
                  $35 student rate
                </span>
              </div>
              <p className="text-navy-500 mb-4">
                Receive curated job postings where you have the best chances of
                landing an interview based on your profile.
              </p>
              <p className="text-sm text-navy-400">
                Can be added to any service except Intro Call.
              </p>
            </div>

            {/* Group Sessions */}
            <div className="card border border-cream-300">
              <h3 className="font-display text-xl font-bold text-navy-800 mb-2">
                Group Sessions
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-navy-800">
                  $100
                </span>
                <span className="text-navy-400">CAD/person</span>
                <span className="text-cream-400">|</span>
                <span className="text-coral-600 font-medium">
                  $50 student rate
                </span>
              </div>
              <p className="text-navy-500 mb-4">
                60-90 minute group coaching sessions. Great for teams, cohorts,
                or friends job searching together.
              </p>
              <p className="text-sm text-navy-400">
                Minimum 5 people, maximum 12 people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="section-padding bg-cream-100">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              All pricing at a glance
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-navy-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Service</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Regular Price
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Student Rate
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-300">
                {[
                  {
                    service: "Intro Call",
                    regular: "FREE",
                    student: "FREE",
                    duration: "30 min",
                  },
                  {
                    service: "Single Session",
                    regular: "$150",
                    student: "$100",
                    duration: "1 hour",
                  },
                  {
                    service: "Resume/LinkedIn Review",
                    regular: "$50",
                    student: "$25",
                    duration: "Async",
                  },
                  {
                    service: "Job Search Sprint",
                    regular: "$400",
                    student: "$300",
                    duration: "4 weeks",
                  },
                  {
                    service: "Career Transformation",
                    regular: "$800",
                    student: "$500",
                    duration: "2 months",
                  },
                  {
                    service: "Targeted Job Postings",
                    regular: "$75",
                    student: "$35",
                    duration: "Add-on",
                  },
                  {
                    service: "Group Session",
                    regular: "$100/person",
                    student: "$50/person",
                    duration: "60-90 min",
                  },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-cream-100">
                    <td className="px-6 py-4 font-medium text-navy-800">
                      {row.service}
                    </td>
                    <td className="px-6 py-4 text-center text-navy-500">
                      {row.regular}
                    </td>
                    <td className="px-6 py-4 text-center text-coral-600 font-medium">
                      {row.student}
                    </td>
                    <td className="px-6 py-4 text-center text-navy-400">
                      {row.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-navy-400 mt-6">
            All prices in CAD. Student rates require valid student ID.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              Common questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion
              items={[
                {
                  question: "What qualifies me for the student rate?",
                  answer: "Current students at any accredited institution (undergraduate, graduate, bootcamp, or co-op) qualify for student rates. Recent graduates (within 6 months of graduation) also qualify. Just provide a valid student ID or proof of recent graduation.",
                },
                {
                  question: "How do sessions work?",
                  answer: "All sessions are conducted via video call (Google Meet or Zoom). You'll receive a calendar invite with the meeting link after booking. Sessions are recorded for your reference if you'd like.",
                },
                {
                  question: "What's your refund policy?",
                  answer: "If you're not satisfied after the first session of any package, I'll refund the remaining sessions. Single sessions are non-refundable but can be rescheduled with 24 hours notice.",
                },
                {
                  question: "Can I switch between packages?",
                  answer: "Yes! If you start with a single session and want to upgrade to a package, I'll credit your single session payment toward the package price.",
                },
                {
                  question: "Do you work with people outside Canada?",
                  answer: "While my expertise is focused on the Canadian (especially GTA) market, I work with clients globally. For US or international markets, I can still help with resume strategy, interview prep, and general PM career guidance.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-max text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Not sure what you need?
          </h2>
          <p className="text-xl text-cream-300 mb-8 max-w-2xl mx-auto">
            Book a free call. No pitch, no pressure — just an honest conversation about where you want to go.
          </p>
          <CalendlyModal className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-navy-800 bg-white rounded-lg hover:bg-coral-50 transition-colors duration-200 shadow-lg" text="Let's Talk About Your Career" />
        </div>
      </section>
    </>
  );
}
