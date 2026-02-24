import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

const DATA_DIR = path.join(process.cwd(), 'data');
const BLOG_FILE = path.join(DATA_DIR, 'blog-posts.json');

function readPosts(): BlogPost[] {
  try {
    const data = fs.readFileSync(BLOG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// GET - Returns all published blog posts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const tag = searchParams.get('tag');
  const featured = searchParams.get('featured');

  const posts = readPosts();

  // If slug is provided, return single post
  if (slug) {
    const post = posts.find(p => p.slug === slug);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  }

  // Filter by tag if provided
  let filteredPosts = posts;
  if (tag) {
    filteredPosts = filteredPosts.filter(p => p.tags.includes(tag));
  }

  // Filter by featured if provided
  if (featured === 'true') {
    filteredPosts = filteredPosts.filter(p => p.featured);
  }

  // Sort by date (newest first)
  filteredPosts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Return posts without full content for listing
  const postsForListing = filteredPosts.map(({ content, ...rest }) => rest);

  return NextResponse.json(postsForListing);
}
