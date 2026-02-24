import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { notifyNewInquiry } from '@/lib/email';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

const DATA_DIR = path.join(process.cwd(), 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(INQUIRIES_FILE)) {
    fs.writeFileSync(INQUIRIES_FILE, '[]');
  }
}

function readInquiries(): Inquiry[] {
  try {
    const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeInquiries(data: Inquiry[]) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(data, null, 2));
}

// GET - Returns all inquiries (for admin)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('x-admin-key');
  if (authHeader !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  ensureDataFile();
  const inquiries = readInquiries();
  return NextResponse.json(inquiries);
}

// POST - Submit new inquiry
export async function POST(request: NextRequest) {
  try {
    ensureDataFile();

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Validate input lengths
    if (String(name).length > 100) {
      return NextResponse.json(
        { error: 'Name must be 100 characters or less' },
        { status: 400 }
      );
    }
    if (String(subject).length > 200) {
      return NextResponse.json(
        { error: 'Subject must be 200 characters or less' },
        { status: 400 }
      );
    }
    if (String(message).length > 5000) {
      return NextResponse.json(
        { error: 'Message must be 5000 characters or less' },
        { status: 400 }
      );
    }

    // Create new inquiry
    const newInquiry: Inquiry = {
      id: Date.now().toString(),
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      subject: String(subject || 'General Inquiry').trim(),
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    // Add to inquiries file
    const inquiries = readInquiries();
    inquiries.unshift(newInquiry);
    writeInquiries(inquiries);

    // Send email notification
    await notifyNewInquiry(newInquiry);

    return NextResponse.json(
      { message: 'Thank you! Your message has been sent. I\'ll get back to you soon.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
