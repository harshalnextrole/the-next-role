import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

interface AdminStats {
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

function readJsonFile(filePath: string): unknown[] {
  try {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeJsonFile(filePath: string, data: unknown[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Verify admin authentication
function verifyAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('x-admin-key');
  return authHeader === process.env.ADMIN_SECRET_KEY;
}

// GET - Get admin dashboard stats
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const testimonials = readJsonFile(path.join(DATA_DIR, 'testimonials.json'));
  const pendingTestimonials = readJsonFile(path.join(DATA_DIR, 'testimonials-pending.json'));
  const inquiries = readJsonFile(path.join(DATA_DIR, 'inquiries.json')) as { status?: string }[];
  const blogPosts = readJsonFile(path.join(DATA_DIR, 'blog-posts.json'));

  const stats: AdminStats = {
    testimonials: {
      approved: testimonials.length,
      pending: pendingTestimonials.length,
    },
    inquiries: {
      total: inquiries.length,
      new: inquiries.filter(i => i.status === 'new').length,
    },
    blog: {
      posts: blogPosts.length,
    },
  };

  return NextResponse.json(stats);
}

// POST - Perform admin actions
export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, id } = body;

    switch (action) {
      case 'approve_testimonial': {
        const pendingFile = path.join(DATA_DIR, 'testimonials-pending.json');
        const approvedFile = path.join(DATA_DIR, 'testimonials.json');

        const pending = readJsonFile(pendingFile) as { id: string }[];
        const approved = readJsonFile(approvedFile) as { id: string }[];

        const testimonialIndex = pending.findIndex(t => t.id === id);
        if (testimonialIndex === -1) {
          return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        const [testimonial] = pending.splice(testimonialIndex, 1);
        approved.push(testimonial);

        writeJsonFile(pendingFile, pending);
        writeJsonFile(approvedFile, approved);

        return NextResponse.json({ message: 'Testimonial approved' });
      }

      case 'reject_testimonial': {
        const pendingFile = path.join(DATA_DIR, 'testimonials-pending.json');
        const pending = readJsonFile(pendingFile) as { id: string }[];

        const testimonialIndex = pending.findIndex(t => t.id === id);
        if (testimonialIndex === -1) {
          return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        pending.splice(testimonialIndex, 1);
        writeJsonFile(pendingFile, pending);

        return NextResponse.json({ message: 'Testimonial rejected' });
      }

      case 'mark_inquiry_read': {
        const inquiriesFile = path.join(DATA_DIR, 'inquiries.json');
        const inquiries = readJsonFile(inquiriesFile) as { id: string; status: string }[];

        const inquiry = inquiries.find(i => i.id === id);
        if (!inquiry) {
          return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
        }

        inquiry.status = 'read';
        writeJsonFile(inquiriesFile, inquiries);

        return NextResponse.json({ message: 'Inquiry marked as read' });
      }

      case 'delete_inquiry': {
        const inquiriesFile = path.join(DATA_DIR, 'inquiries.json');
        const inquiries = readJsonFile(inquiriesFile) as { id: string }[];

        const inquiryIndex = inquiries.findIndex(i => i.id === id);
        if (inquiryIndex === -1) {
          return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
        }

        inquiries.splice(inquiryIndex, 1);
        writeJsonFile(inquiriesFile, inquiries);

        return NextResponse.json({ message: 'Inquiry deleted' });
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Admin action error:', error);
    return NextResponse.json({ error: 'Failed to perform action' }, { status: 500 });
  }
}
