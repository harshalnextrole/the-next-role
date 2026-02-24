import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-cream-300">
      <div className="container-max section-padding !py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-navy-700 rounded-lg flex items-center justify-center">
                <span className="text-coral-400 font-display font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-display font-bold text-white">
                The Next Role
              </span>
            </Link>
            <p className="text-cream-400 max-w-md">
              I coach people into PM roles. I also happen to be one.
              Real experience, recent success, relevant guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-coral-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-coral-400 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-coral-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-coral-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-coral-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/portal"
                  className="hover:text-coral-400 transition-colors"
                >
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-display font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coral-400 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coral-400 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coral-400 transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@thenextrole.com"
                  className="hover:text-coral-400 transition-colors"
                >
                  hello@thenextrole.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-8 pt-8 text-center text-navy-400">
          <p>
            &copy; {new Date().getFullYear()} The Next Role. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
