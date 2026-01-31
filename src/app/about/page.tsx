import Link from "next/link";
import type { Metadata } from "next";
import CalendlyModal from "@/components/CalendlyModal";

export const metadata: Metadata = {
  title: "About | The Next Role",
  description:
    "Meet the founder of The Next Role - an active Microsoft PM with a proven track record of navigating the tech job market and helping others do the same.",
};

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy-800 text-white">
        <div className="container-max section-padding !py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              Meet your coach
            </h1>
            <p className="text-xl text-cream-300">
              Not a former PM. An active one who just did exactly what you&apos;re
              trying to do.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Photo Placeholder */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="aspect-square bg-gradient-to-br from-navy-100 to-coral-100 rounded-2xl flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-navy-500 to-coral-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">HG</span>
                      </div>
                      <p className="text-navy-400 text-sm">Photo coming soon</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-navy-500">
                      <svg
                        className="w-5 h-5 mr-3 text-coral-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Product Manager @ Microsoft
                    </div>
                    <div className="flex items-center text-navy-500">
                      <svg
                        className="w-5 h-5 mr-3 text-coral-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Seattle → Toronto
                    </div>
                    <div className="flex items-center text-navy-500">
                      <svg
                        className="w-5 h-5 mr-3 text-coral-500"
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
                      MS in AI Management, Purdue
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="lg:col-span-2 prose prose-lg max-w-none">
                <h2 className="font-display text-3xl font-bold text-navy-800 mb-6">
                  My story
                </h2>

                <p className="text-navy-600 leading-relaxed">
                  I started my career path in India, moved to Dubai, and eventually
                  made my way to North America for my Master&apos;s degree at Purdue
                  University—where I specialized in AI Management & Policy.
                </p>

                <p className="text-navy-600 leading-relaxed">
                  In 2021, I landed a PM internship at Microsoft. By 2022, I converted
                  to a full-time Product Manager role, and I&apos;ve since grown to PM2,
                  shipping features to over 320 million users and working on
                  cutting-edge AI agents.
                </p>

                <p className="text-navy-600 leading-relaxed">
                  But here&apos;s the thing: I recently decided to move back to Canada
                  and join Docebo as an AI Product Manager. That meant going through
                  the job search process all over again—in 2025, in a tough market.
                </p>

                <div className="bg-coral-50 border-l-4 border-coral-500 p-6 my-8 rounded-r-lg">
                  <p className="text-navy-700 font-medium mb-0">
                    I applied to 70 jobs. Got 25 interviews. Received 3 offers from
                    companies like Docebo, Thinkific, and Loopio. I know exactly what
                    works right now because I just did it.
                  </p>
                </div>

                <h3 className="font-display text-2xl font-bold text-navy-800 mt-8 mb-4">
                  Why I started coaching
                </h3>

                <p className="text-navy-600 leading-relaxed">
                  Throughout my journey—as an immigrant, a career switcher, a startup
                  founder (I built MyCart), and a big tech PM—I&apos;ve had incredible
                  mentors who helped me navigate each transition.
                </p>

                <p className="text-navy-600 leading-relaxed">
                  Now I want to pay it forward. I believe everyone deserves guidance
                  from someone who&apos;s been in their shoes recently, not someone who
                  left the industry years ago.
                </p>

                <p className="text-navy-600 leading-relaxed">
                  My mission is simple:{" "}
                  <strong>
                    Bridge the gap between where you are and where you belong in your
                    career.
                  </strong>
                </p>

                <h3 className="font-display text-2xl font-bold text-navy-800 mt-8 mb-4">
                  What Makes Me Different
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
                  {[
                    {
                      title: "Active Practitioner",
                      desc: "I'm currently a PM, not a former one",
                    },
                    {
                      title: "Recent Job Seeker",
                      desc: "I know the 2025/2026 market firsthand",
                    },
                    {
                      title: "Immigrant Experience",
                      desc: "I've navigated Canada as a newcomer",
                    },
                    {
                      title: "Both Paths",
                      desc: "Startup founder + Big Tech experience",
                    },
                    {
                      title: "AI-Focused",
                      desc: "Master's in AI, working on AI products",
                    },
                    {
                      title: "GTA Expert",
                      desc: "Deep knowledge of local tech ecosystem",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start p-4 bg-cream-100 rounded-lg"
                    >
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
                      <div>
                        <p className="font-semibold text-navy-800">
                          {item.title}
                        </p>
                        <p className="text-sm text-navy-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-padding bg-cream-100">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              The journey
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  year: "2026",
                  title: "AI Product Manager @ Docebo",
                  desc: "Moving to Toronto to lead AI product initiatives",
                  current: true,
                },
                {
                  year: "2022-2025",
                  title: "Product Manager 2 @ Microsoft",
                  desc: "Shipped features to 320M+ users, worked on AI agents",
                },
                {
                  year: "2021",
                  title: "PM Intern @ Microsoft",
                  desc: "Converted to full-time after successful internship",
                },
                {
                  year: "2020-2021",
                  title: "MS in AI Management & Policy @ Purdue",
                  desc: "Specialized in AI strategy and product management",
                },
                {
                  year: "2019",
                  title: "Founded MyCart",
                  desc: "Built and scaled a startup, learned entrepreneurship firsthand",
                },
                {
                  year: "Earlier",
                  title: "India → Dubai → USA → Canada",
                  desc: "Built an international perspective and adaptability",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                        item.current
                          ? "bg-coral-500 text-white"
                          : "bg-white border-2 border-cream-300 text-navy-500"
                      }`}
                    >
                      {item.year.slice(-2)}
                    </div>
                    {i < 5 && (
                      <div className="w-0.5 h-full bg-cream-300 mt-2"></div>
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="text-sm text-coral-600 font-medium">
                      {item.year}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-navy-800">
                      {item.title}
                    </h3>
                    <p className="text-navy-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              Companies I know inside out
            </h2>
            <p className="text-xl text-navy-500 max-w-2xl mx-auto">
              I know the interview processes at these companies firsthand.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-cream-400">
            {[
              "Microsoft",
              "Docebo",
              "Thinkific",
              "Loopio",
              "PagerDuty",
              "Shopify",
              "Wealthsimple",
              "1Password",
            ].map((company, i) => (
              <div
                key={i}
                className="px-6 py-3 bg-cream-200 rounded-lg text-navy-600 font-medium"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">The mission</h2>
            <blockquote className="text-2xl sm:text-3xl font-light text-cream-300 italic mb-8">
              &ldquo;Bridging the gap between where you are and where you belong in
              your career.&rdquo;
            </blockquote>
            <p className="text-lg text-cream-400 mb-8">
              I believe in empowering the next generation to discover their
              talent, so that no potential goes unplayed. Everyone deserves a
              career they love—one that helps them achieve their ambitions.
            </p>
            <Link href="/services" className="btn-primary">
              View Services & Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-max text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-coral-100 mb-8 max-w-2xl mx-auto">
            Book a free call. No pitch, no pressure — just an honest conversation about where you want to go.
          </p>
          <CalendlyModal className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-coral-700 bg-white rounded-lg hover:bg-coral-50 transition-colors duration-200 shadow-lg" />
        </div>
      </section>
    </>
  );
}
