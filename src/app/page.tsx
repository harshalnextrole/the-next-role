import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container-max section-padding relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 rounded-full text-primary-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Now accepting new clients for 2026
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Land Your Dream{" "}
              <span className="gradient-text">Product Manager</span> Role
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Bridging the gap between where you are and where you belong in
              your career. Get personalized coaching from an active Microsoft PM
              who just navigated the job market successfully.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-8 py-4"
              >
                Book Your Free Consultation
              </a>
              <Link href="/services" className="btn-secondary text-lg px-8 py-4">
                View Services & Pricing
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-slate-400">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">25+</div>
                <div className="text-sm">Interviews Landed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">3</div>
                <div className="text-sm">Job Offers Received</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">36%</div>
                <div className="text-sm">Interview Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Is This For You?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              I work with ambitious individuals ready to break into or level up
              in product management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🔄",
                title: "Career Switchers",
                description:
                  "Engineers, designers, consultants, or MBAs looking to transition into product management.",
              },
              {
                icon: "📈",
                title: "Junior/Mid PMs",
                description:
                  "Current PMs seeking to level up to Senior PM or break into big tech companies.",
              },
              {
                icon: "🎓",
                title: "Students & New Grads",
                description:
                  "Bootcamp grads, undergrad/grad students, and co-op students preparing for PM roles.",
              },
              {
                icon: "🌍",
                title: "Newcomers to Canada",
                description:
                  "International professionals with tech/business experience looking to break into Canadian PM roles.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="card text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Work With Me?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real experience. Recent success. Relevant guidance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8"
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
                ),
                title: "Active Microsoft PM",
                description:
                  "Not a former practitioner—I'm currently shipping features to 320M+ users and working on AI agents. Real-time industry knowledge.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                ),
                title: "Fresh Job Search Success",
                description:
                  "3 offers from 70 applications, 25 interviews at companies like Docebo, Thinkific, Loopio, PagerDuty. I know what works in 2025/2026.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Immigrant Journey",
                description:
                  "India → Dubai → Canada. I understand navigating Canadian professional culture and breaking into tech as a newcomer.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Startup + Big Tech",
                description:
                  "Founded MyCart, worked at Microsoft. I can speak authentically to both paths and help you decide what's right for you.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                ),
                title: "AI & Future-Focused",
                description:
                  "Master's in AI Management & Policy from Purdue. I can help you position for AI-first companies reshaping every PM role.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
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
                ),
                title: "GTA Market Expert",
                description:
                  "Deep knowledge of Shopify, Wealthsimple, 1Password, Cohere, plus Canadian offices of Google, Meta, Microsoft. CAD vs USD dynamics.",
              },
            ].map((item, index) => (
              <div key={index} className="card">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Services That Fit Your Journey
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From quick resume reviews to comprehensive career transformations.
              Student rates available.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Single Session",
                price: "$150",
                studentPrice: "$100",
                description:
                  "60-min deep dive into your specific challenge—resume, interview prep, or career strategy.",
                features: [
                  "60-minute session",
                  "Personalized feedback",
                  "Action items",
                ],
              },
              {
                name: "Job Search Sprint",
                price: "$400",
                studentPrice: "$300",
                description:
                  "4 sessions over 4 weeks to overhaul your entire job search approach.",
                features: [
                  "4 sessions over 4 weeks",
                  "Resume overhaul",
                  "LinkedIn optimization",
                  "Mock interviews",
                ],
                popular: true,
              },
              {
                name: "Career Transformation",
                price: "$800",
                studentPrice: "$500",
                description:
                  "8 sessions over 2 months for complete career pivot support.",
                features: [
                  "8 sessions over 2 months",
                  "Full pivot support",
                  "Application prep",
                  "Interview coaching",
                ],
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`card relative ${
                  service.popular
                    ? "ring-2 ring-primary-500 scale-105"
                    : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {service.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-slate-900">
                    {service.price}
                  </span>
                  <span className="text-slate-500 ml-2">
                    / {service.studentPrice} student
                  </span>
                </div>
                <p className="text-slate-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-slate-600">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
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
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              View all services & pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What Clients Say
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real results from real people.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The resume feedback was incredibly detailed. I started getting callbacks within a week of implementing the changes.",
                name: "Coming Soon",
                role: "Career Switcher",
              },
              {
                quote:
                  "Finally someone who understands the Canadian tech market and could give me specific, actionable advice.",
                name: "Coming Soon",
                role: "Newcomer to Canada",
              },
              {
                quote:
                  "The mock interviews were game-changing. I felt so much more confident going into my actual interviews.",
                name: "Coming Soon",
                role: "Recent Graduate",
              },
            ].map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 italic mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-slate-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Land Your Next Role?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Book a free 30-minute consultation to discuss your career goals and
            see if we&apos;re a good fit.
          </p>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white rounded-lg hover:bg-primary-50 transition-colors duration-200 shadow-lg"
          >
            Book Your Free Consultation
          </a>
          <p className="text-primary-200 mt-4 text-sm">
            No commitment required. Let&apos;s see how I can help.
          </p>
        </div>
      </section>
    </>
  );
}
