import { Metadata } from "next";
import ResumeAnalyzer from "./ResumeAnalyzer";

export const metadata: Metadata = {
  title: "AI Resume Analyzer | The Next Role",
  description:
    "Get instant AI-powered feedback on your resume. See how well you match a job description with our free resume analysis tool.",
};

export default function ResumeAnalyzerPage() {
  return (
    <main className="min-h-screen bg-cream-50">
      <section className="container-max section-padding pt-12 pb-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-coral-100 text-coral-600 rounded-full text-sm font-semibold mb-4">
            Free Tool
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-navy-800 mb-4">
            AI Resume Analyzer
          </h1>
          <p className="text-lg text-navy-500 max-w-2xl mx-auto">
            Paste your resume and a job description to get instant feedback on
            how well you match — plus actionable tips to improve your chances.
          </p>
        </div>
        <ResumeAnalyzer />
      </section>
    </main>
  );
}
