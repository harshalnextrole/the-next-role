"use client";

import { useState, useEffect, useCallback } from "react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  createdAt: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "replied";
}

interface Stats {
  testimonials: {
    approved: number;
    pending: number;
  };
  inquiries: {
    total: number;
    new: number;
  };
  blog: {
    posts: number;
  };
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "testimonials" | "inquiries">("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [pendingTestimonials, setPendingTestimonials] = useState<Testimonial[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch stats
      const statsRes = await fetch("/api/admin", {
        headers: { "x-admin-key": adminKey },
      });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch pending testimonials
      const pendingRes = await fetch("/api/admin/testimonials-pending", {
        headers: { "x-admin-key": adminKey },
      });
      if (pendingRes.ok) {
        const pendingData = await pendingRes.json();
        setPendingTestimonials(pendingData);
      }

      // Fetch inquiries
      const inquiriesRes = await fetch("/api/contact", {
        headers: { "x-admin-key": adminKey },
      });
      if (inquiriesRes.ok) {
        const inquiriesData = await inquiriesRes.json();
        setInquiries(inquiriesData);
      }
    } catch {
      setError("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin", {
        headers: { "x-admin-key": adminKey },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("admin_key", adminKey);
      } else {
        setError("Invalid admin key");
      }
    } catch {
      setError("Failed to authenticate");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (action: string, id: string) => {
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ action, id }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch {
      setError("Action failed");
    }
  };

  // Check for saved admin key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("admin_key");
    if (savedKey) {
      setAdminKey(savedKey);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-navy-300">Enter your admin key to continue</p>
          </div>

          <div className="bg-navy-800 rounded-2xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="adminKey"
                  className="block text-sm font-medium text-navy-300 mb-2"
                >
                  Admin Key
                </label>
                <input
                  type="password"
                  id="adminKey"
                  required
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter admin key"
                />
              </div>

              {error && (
                <div className="bg-red-500/20 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-4 disabled:opacity-50"
              >
                {isLoading ? "Authenticating..." : "Access Dashboard"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <header className="bg-navy-800 text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              localStorage.removeItem("admin_key");
            }}
            className="text-navy-300 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-navy-500 text-sm">Pending Testimonials</p>
              <p className="text-3xl font-display font-bold text-coral-500">
                {stats.testimonials.pending}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-navy-500 text-sm">Approved Testimonials</p>
              <p className="text-3xl font-display font-bold text-forest-500">
                {stats.testimonials.approved}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-navy-500 text-sm">New Inquiries</p>
              <p className="text-3xl font-display font-bold text-coral-500">
                {stats.inquiries.new}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-navy-500 text-sm">Blog Posts</p>
              <p className="text-3xl font-display font-bold text-navy-800">
                {stats.blog.posts}
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {(["overview", "testimonials", "inquiries"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? "bg-navy-800 text-white"
                  : "bg-white text-navy-600 hover:bg-cream-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-coral-500 border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : activeTab === "overview" ? (
            <div className="text-center py-12">
              <h2 className="font-display text-2xl font-bold text-navy-800 mb-4">
                Welcome to Admin Dashboard
              </h2>
              <p className="text-navy-500">
                Use the tabs above to manage testimonials and inquiries.
              </p>
            </div>
          ) : activeTab === "testimonials" ? (
            <div>
              <h2 className="font-display text-xl font-semibold text-navy-800 mb-6">
                Pending Testimonials
              </h2>
              {pendingTestimonials.length === 0 ? (
                <p className="text-navy-500 text-center py-8">
                  No pending testimonials
                </p>
              ) : (
                <div className="space-y-4">
                  {pendingTestimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="border border-cream-200 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-navy-800">
                              {testimonial.name}
                            </span>
                            <span className="text-navy-400">·</span>
                            <span className="text-navy-500">
                              {testimonial.role}
                            </span>
                            <span className="text-navy-400">·</span>
                            <div className="flex">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="w-4 h-4 text-coral-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-navy-600 italic">
                            &ldquo;{testimonial.quote}&rdquo;
                          </p>
                          <p className="text-navy-400 text-sm mt-2">
                            Submitted{" "}
                            {new Date(testimonial.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleAction("approve_testimonial", testimonial.id)
                            }
                            className="px-4 py-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleAction("reject_testimonial", testimonial.id)
                            }
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="font-display text-xl font-semibold text-navy-800 mb-6">
                Contact Inquiries
              </h2>
              {inquiries.length === 0 ? (
                <p className="text-navy-500 text-center py-8">No inquiries</p>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className={`border rounded-lg p-6 ${
                        inquiry.status === "new"
                          ? "border-coral-300 bg-coral-50"
                          : "border-cream-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-navy-800">
                              {inquiry.name}
                            </span>
                            <span className="text-navy-400">·</span>
                            <a
                              href={`mailto:${inquiry.email}`}
                              className="text-coral-500 hover:text-coral-600"
                            >
                              {inquiry.email}
                            </a>
                            {inquiry.status === "new" && (
                              <span className="px-2 py-0.5 bg-coral-500 text-white text-xs rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          {inquiry.subject && (
                            <p className="text-navy-700 font-medium mb-1">
                              {inquiry.subject}
                            </p>
                          )}
                          <p className="text-navy-600">{inquiry.message}</p>
                          <p className="text-navy-400 text-sm mt-2">
                            Received{" "}
                            {new Date(inquiry.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {inquiry.status === "new" && (
                            <button
                              onClick={() =>
                                handleAction("mark_inquiry_read", inquiry.id)
                              }
                              className="px-4 py-2 bg-navy-500 text-white rounded-lg hover:bg-navy-600 transition-colors"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleAction("delete_inquiry", inquiry.id)
                            }
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
