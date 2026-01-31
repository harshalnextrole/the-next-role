"use client";

import { useState } from "react";
import Link from "next/link";
import CalendlyModal from "./CalendlyModal";

const questions = [
  {
    question: "Where are you in your career right now?",
    options: [
      { label: "Working in a different field, want to switch to PM", value: "switcher" },
      { label: "Already a PM, looking to level up", value: "pm" },
      { label: "Student or recent grad", value: "student" },
      { label: "New to Canada with international experience", value: "newcomer" },
    ],
  },
  {
    question: "What's your biggest challenge right now?",
    options: [
      { label: "My resume isn't getting callbacks", value: "resume" },
      { label: "I get interviews but can't convert them", value: "interview" },
      { label: "I don't know where to start", value: "lost" },
      { label: "I need a complete career strategy", value: "strategy" },
    ],
  },
  {
    question: "How much support do you need?",
    options: [
      { label: "Just a quick review or one-time advice", value: "light" },
      { label: "A few weeks of focused help", value: "medium" },
      { label: "Full transformation — I want the whole thing", value: "heavy" },
    ],
  },
];

interface Recommendation {
  service: string;
  price: string;
  studentPrice: string;
  reason: string;
}

function getRecommendation(answers: string[]): Recommendation {
  const support = answers[2];
  const challenge = answers[1];

  if (support === "light" && challenge === "resume") {
    return {
      service: "Resume/LinkedIn Review",
      price: "$50",
      studentPrice: "$25",
      reason: "Quick, focused feedback to get your resume converting.",
    };
  }
  if (support === "light") {
    return {
      service: "Single Session",
      price: "$150",
      studentPrice: "$100",
      reason: "One focused hour to tackle your specific challenge.",
    };
  }
  if (support === "medium") {
    return {
      service: "Job Search Sprint",
      price: "$400",
      studentPrice: "$300",
      reason: "4 weeks to overhaul your entire approach. Our most popular option.",
    };
  }
  return {
    service: "Career Transformation",
    price: "$800",
    studentPrice: "$500",
    reason: "2 months of comprehensive support for a full career pivot.",
  };
}

export default function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setStarted(false);
  };

  if (!started) {
    return (
      <div className="text-center">
        <h3 className="font-display text-2xl font-bold text-navy-800 mb-3">
          Not sure what you need?
        </h3>
        <p className="text-navy-500 mb-6">
          Answer 3 quick questions and I&apos;ll recommend the right service for you.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="btn-primary text-lg px-8 py-4"
        >
          Take the Quiz
        </button>
      </div>
    );
  }

  if (showResult) {
    const recommendation = getRecommendation(answers);
    return (
      <div className="text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-forest-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-navy-800 mb-2">
          My recommendation for you:
        </h3>
        <div className="bg-white border-2 border-coral-500 rounded-2xl p-6 mt-4 mb-6 shadow-md">
          <h4 className="font-display text-xl font-bold text-navy-800">
            {recommendation.service}
          </h4>
          <div className="flex items-center justify-center gap-2 mt-2 mb-3">
            <span className="text-2xl font-bold text-navy-800">{recommendation.price}</span>
            <span className="text-navy-400">|</span>
            <span className="text-coral-600 font-medium">{recommendation.studentPrice} student</span>
          </div>
          <p className="text-navy-500">{recommendation.reason}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <CalendlyModal
            text="Book Free Intro Call"
            className="btn-primary"
          />
          <Link href="/services" className="btn-secondary">
            View All Services
          </Link>
        </div>
        <button
          onClick={reset}
          className="mt-4 text-navy-400 hover:text-coral-500 text-sm transition-colors"
        >
          Retake quiz
        </button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="flex gap-2 mb-6">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i <= currentQuestion ? "bg-coral-500" : "bg-cream-300"
            }`}
          />
        ))}
      </div>

      <p className="text-sm text-navy-400 mb-2">
        Question {currentQuestion + 1} of {questions.length}
      </p>
      <h3 className="font-display text-xl font-bold text-navy-800 mb-6">
        {q.question}
      </h3>

      <div className="space-y-3">
        {q.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option.value)}
            className="w-full text-left p-4 bg-white border-2 border-cream-300 rounded-xl hover:border-coral-400 hover:bg-coral-50 transition-all duration-200 text-navy-700 font-medium"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
