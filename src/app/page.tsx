"use client";

import Link from "next/link";
import CalendlyModal from "@/components/CalendlyModal";
import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollReveal from "@/components/ScrollReveal";
import CareerQuiz from "@/components/CareerQuiz";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-navy-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700"></div>
        <div className="container-max section-padding relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-coral-500/15 border border-coral-500/30 rounded-full text-coral-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-coral-400 rounded-full mr-2 animate-pulse"></span>
              Now accepting clients for 2026
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              I got 3 offers from 70 apps.{" "}
              <span className="text-coral-400">Let me show you how.</span>
            </h1>
            <p className="text-xl text-cream-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              I&apos;m an active PM at Microsoft coaching people into product roles.
              Not theory from a textbook &mdash; real strategies from someone who
              just navigated the job market and won.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalendlyModal
                text="Let's Talk About Your Career"
                className="btn-primary text-lg px-8 py-4"
              />
              <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 border-2 border-white/40 rounded-lg hover:bg-white/20 hover:border-white/60 transition-all duration-200">
                View Services & Pricing
              </Link>
            </div>

            {/* Animated Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <AnimatedCounter
                  end={70}
                  className="text-3xl font-display font-bold text-coral-400"
                />
                <div className="text-sm text-cream-400 mt-1">Applications</div>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  end={25}
                  className="text-3xl font-display font-bold text-coral-400"
                />
                <div className="text-sm text-cream-400 mt-1">Interviews</div>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  end={3}
                  duration={1500}
                  className="text-3xl font-display font-bold text-coral-400"
                />
                <div className="text-sm text-cream-400 mt-1">Offers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="bg-cream-200 py-6 border-b border-cream-300">
        <div className="container-max px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-navy-400 text-sm font-medium">
            <span>Currently at</span>
            <span className="text-navy-700 font-display font-semibold text-base">Microsoft</span>
            <span className="text-cream-400">|</span>
            <span className="text-navy-700 font-display font-semibold text-base">Purdue University</span>
            <span className="text-cream-400">|</span>
            <span>Joining</span>
            <span className="text-navy-700 font-display font-semibold text-base">Docebo</span>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="section-padding bg-cream-100">
        <div className="container-max">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
                Sound like you?
              </h2>
              <p className="text-xl text-navy-500 max-w-2xl mx-auto">
                I work with people who are ready to stop guessing and start
                landing interviews.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Career Switchers",
                description:
                  'Engineers, designers, consultants, or MBAs thinking "I want to be a PM" but not sure how to get there.',
                tag: "Most common",
              },
              {
                title: "Junior & Mid PMs",
                description:
                  "You're already a PM but want to level up to Senior or break into big tech. The jump feels unclear.",
              },
              {
                title: "Students & New Grads",
                description:
                  "About to graduate or just finished a bootcamp. You need someone to show you how the game actually works.",
              },
              {
                title: "New to Canada",
                description:
                  "You have experience back home but the Canadian market feels like a black box. I've been there.",
              },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="card relative hover:border-coral-300 transition-all h-full">
                  {item.tag && (
                    <span className="absolute -top-3 left-4 bg-coral-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  )}
                  <h3 className="text-xl font-display font-semibold text-navy-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-navy-500">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Me Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
                Why listen to me?
              </h2>
              <p className="text-xl text-navy-500 max-w-2xl mx-auto">
                I&apos;m not someone who used to be a PM ten years ago. I&apos;m in it right now.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Active Microsoft PM",
                description:
                  "Shipping features to 320M+ users, working on AI agents. I know what modern PM work actually looks like.",
              },
              {
                title: "Just Did the Job Search",
                description:
                  "70 applications, 25 interviews, 3 offers. Docebo, Thinkific, Loopio, PagerDuty. I know what's working right now.",
              },
              {
                title: "India → Dubai → Canada",
                description:
                  "I've navigated immigration, cultural shifts, and breaking into North American tech. I get the newcomer struggle.",
              },
              {
                title: "Startup Founder + Big Tech",
                description:
                  "Built MyCart from scratch, then joined Microsoft. I can help you figure out which path is right for you.",
              },
              {
                title: "AI Product Specialist",
                description:
                  "Master's in AI Management from Purdue. Joining Docebo as an AI PM. I can position you for what's next.",
              },
              {
                title: "GTA Market Insider",
                description:
                  "Shopify, Wealthsimple, 1Password, Cohere, plus Google, Meta, Microsoft Canada. I know the local landscape.",
              },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 80}>
                <div className="card hover:border-coral-300 transition-all h-full">
                  <div className="w-10 h-10 bg-coral-50 rounded-lg flex items-center justify-center text-coral-500 mb-4">
                    <svg
                      className="w-5 h-5"
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
                  </div>
                  <h3 className="text-lg font-display font-semibold text-navy-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-navy-500">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Career Quiz Section */}
      <section className="section-padding bg-cream-200">
        <div className="container-max">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto bg-cream-100 rounded-2xl border border-cream-300 p-8 md:p-12">
              <CareerQuiz />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-cream-100">
        <div className="container-max">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
                Pick what fits
              </h2>
              <p className="text-xl text-navy-500 max-w-2xl mx-auto">
                From a quick resume fix to a full career transformation.
                Student rates on everything.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Single Session",
                price: "$150",
                studentPrice: "$100",
                description:
                  "60-minute deep dive into your resume, interview prep, or career strategy.",
                features: [
                  "60-minute session",
                  "Personalized feedback",
                  "Actionable next steps",
                ],
              },
              {
                name: "Job Search Sprint",
                price: "$400",
                studentPrice: "$300",
                description:
                  "4 weeks to completely overhaul your job search. The most popular option.",
                features: [
                  "4 sessions over 4 weeks",
                  "Resume + LinkedIn overhaul",
                  "Target company strategy",
                  "Mock interviews",
                ],
                popular: true,
              },
              {
                name: "Career Transformation",
                price: "$800",
                studentPrice: "$500",
                description:
                  "2 months of support for a complete career pivot into product management.",
                features: [
                  "8 sessions over 2 months",
                  "Full pivot support",
                  "Application + interview prep",
                  "Offer negotiation help",
                ],
              },
            ].map((service, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div
                  className={`card relative h-full flex flex-col ${
                    service.popular
                      ? "border-2 border-coral-500 scale-[1.02]"
                      : ""
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-coral-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-display font-semibold text-navy-800 mb-2">
                    {service.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-display font-bold text-navy-800">
                      {service.price}
                    </span>
                    <span className="text-navy-400 ml-2">
                      / {service.studentPrice} student
                    </span>
                  </div>
                  <p className="text-navy-500 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-navy-500">
                        <svg
                          className="w-5 h-5 text-forest-500 mr-2 flex-shrink-0"
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
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    className={`w-full ${
                      service.popular ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    Learn More
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="text-coral-500 font-semibold hover:text-coral-600 transition-colors"
            >
              View all services & pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-max text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Ready to make your next move?
            </h2>
            <p className="text-xl text-cream-300 mb-8 max-w-2xl mx-auto">
              Book a free 30-minute call. No pitch, no pressure &mdash; just an honest
              conversation about where you want to go.
            </p>
            <CalendlyModal
              text="Let's Talk About Your Career"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-navy-800 bg-coral-400 rounded-lg hover:bg-coral-300 transition-all duration-200 shadow-lg hover:shadow-xl"
            />
            <p className="text-navy-400 mt-4 text-sm">
              Free. 30 minutes. No commitment.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
