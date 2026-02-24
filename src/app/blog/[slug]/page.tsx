"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readTime: number;
  featured: boolean;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog?slug=${slug}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          setError("Post not found");
        }
      } catch {
        setError("Failed to load post");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-coral-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-navy-800 mb-4">
            {error || "Post not found"}
          </h1>
          <Link href="/blog" className="btn-primary inline-block">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 py-16 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-navy-600 hover:text-coral-500 mb-8 group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-coral-100 text-coral-600 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-navy-500">
            <span className="font-medium text-navy-700">{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
        </header>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy-800 prose-p:text-navy-600 prose-a:text-coral-500 hover:prose-a:text-coral-600 prose-strong:text-navy-700 prose-ul:text-navy-600 prose-ol:text-navy-600">
            {post.content.split("\n\n").map((paragraph, index) => {
              // Handle headers
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="text-2xl font-bold mt-8 mb-4 text-navy-800"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              // Handle lists
              if (paragraph.startsWith("- ") || paragraph.startsWith("1. ")) {
                const items = paragraph.split("\n");
                const isOrdered = paragraph.startsWith("1.");
                const ListTag = isOrdered ? "ol" : "ul";
                return (
                  <ListTag
                    key={index}
                    className={`my-4 ${isOrdered ? "list-decimal" : "list-disc"} pl-6`}
                  >
                    {items.map((item, i) => (
                      <li key={i} className="text-navy-600 mb-2">
                        {item.replace(/^[-\d.]\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                      </li>
                    ))}
                  </ListTag>
                );
              }
              // Handle bold text and links in paragraphs
              const formattedText = paragraph
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(
                  /\[(.*?)\]\((.*?)\)/g,
                  '<a href="$2" class="text-coral-500 hover:text-coral-600 underline">$1</a>'
                );
              return (
                <p
                  key={index}
                  className="text-navy-600 mb-4 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formattedText }}
                />
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-navy-800 rounded-2xl p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Ready to accelerate your PM career?
          </h2>
          <p className="text-cream-300 mb-6">
            Get personalized coaching from someone who&apos;s been in your shoes.
          </p>
          <Link href="/services" className="btn-primary inline-block">
            View Coaching Services
          </Link>
        </div>
      </article>
    </div>
  );
}
