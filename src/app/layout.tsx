import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <body className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
