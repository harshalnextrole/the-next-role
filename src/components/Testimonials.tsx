"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const placeholderTestimonials = [
  {
    id: "placeholder-1",
    quote:
      "The resume feedback was incredibly detailed. I started getting callbacks within a week of implementing the changes.",
    name: "Coming Soon",
    role: "Career Switcher",
    rating: 5,
  },
  {
    id: "placeholder-2",
    quote:
      "Finally someone who understands the Canadian tech market and could give me specific, actionable advice.",
    name: "Coming Soon",
    role: "Newcomer to Canada",
    rating: 5,
  },
  {
    id: "placeholder-3",
    quote:
      "The mock interviews were game-changing. I felt so much more confident going into my actual interviews.",
    name: "Coming Soon",
    role: "Recent Graduate",
    rating: 5,
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials");
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data.length > 0 ? data : placeholderTestimonials);
        } else {
          setTestimonials(placeholderTestimonials);
        }
      } catch {
        setTestimonials(placeholderTestimonials);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const displayTestimonials = isLoading ? placeholderTestimonials : testimonials;

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              What clients say
            </h2>
            <p className="text-xl text-navy-500 max-w-2xl mx-auto">
              Real feedback from real people.{" "}
              {testimonials.length === 0 || testimonials === placeholderTestimonials
                ? "More coming soon."
                : ""}
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.slice(0, 3).map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 100}>
              <div className="card h-full">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-coral-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <svg
                      key={`empty-${i}`}
                      className="w-5 h-5 text-cream-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-navy-600 italic mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-display font-semibold text-navy-800">
                    {testimonial.name}
                  </p>
                  <p className="text-navy-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
