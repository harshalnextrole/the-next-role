import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyPreload from "@/components/CalendlyPreload";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata: Metadata = {
  title: "The Next Role | PM Career Coaching",
  description:
    "Expert career coaching for aspiring and current Product Managers. From resume reviews to interview prep, get personalized guidance from an active Microsoft PM.",
  keywords: [
    "product manager coaching",
    "PM career coaching",
    "tech career coaching",
    "resume review",
    "mock interviews",
    "career transition",
    "Toronto PM jobs",
    "GTA tech careers",
  ],
  openGraph: {
    title: "The Next Role | PM Career Coaching",
    description:
      "Bridge the gap between where you are and where you belong in your career.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload Calendly resources for faster popup */}
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link
          rel="preload"
          href="https://assets.calendly.com/assets/external/widget.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream-100">
        <CalendlyPreload />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
