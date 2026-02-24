"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readTime: number;
  featured: boolean;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const url = selectedTag
          ? `/api/blog?tag=${selectedTag}`
          : "/api/blog";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, [selectedTag]);

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags))
  ).sort();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-cream-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-navy-800 mb-4">
            Career Insights
          </h1>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto">
            Tips, strategies, and lessons learned from navigating the PM job
            market.
          </p>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTag === null
                  ? "bg-coral-500 text-white"
                  : "bg-white text-navy-600 hover:bg-cream-200"
              }`}
            >
              All Posts
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? "bg-coral-500 text-white"
                    : "bg-white text-navy-600 hover:bg-cream-200"
                }`}
              >
                {tag.replace(/-/g, " ")}
              </button>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-coral-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-navy-500 mt-4">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <p className="text-navy-500">No posts found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {post.featured && (
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-coral-100 text-coral-600 rounded mb-2">
                        Featured
                      </span>
                    )}
                    <h2 className="font-display text-xl font-semibold text-navy-800 group-hover:text-coral-500 transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-navy-600 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-navy-500">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>·</span>
                      <span>{post.readTime} min read</span>
                      <span>·</span>
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-cream-200 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 text-coral-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
