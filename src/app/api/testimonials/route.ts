import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const TESTIMONIALS_FILE = path.join(DATA_DIR, 'testimonials.json');
const PENDING_FILE = path.join(DATA_DIR, 'testimonials-pending.json');

function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(TESTIMONIALS_FILE)) {
    fs.writeFileSync(TESTIMONIALS_FILE, '[]');
  }
  if (!fs.existsSync(PENDING_FILE)) {
    fs.writeFileSync(PENDING_FILE, '[]');
  }
}

function readJsonFile(filePath: string): Testimonial[] {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeJsonFile(filePath: string, data: Testimonial[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET - Returns approved testimonials
export async function GET() {
  ensureDataFiles();
  const testimonials = readJsonFile(TESTIMONIALS_FILE);
  return NextResponse.json(testimonials);
}

// POST - Adds new submission to pending file
export async function POST(request: NextRequest) {
  try {
    ensureDataFiles();

    const body = await request.json();
    const { name, role, quote, rating } = body;

    // Validate required fields
    if (!name || !role || !quote || !rating) {
      return NextResponse.json(
        { error: 'All fields are required: name, role, quote, rating' },
        { status: 400 }
      );
    }

    // Validate rating
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: 'Rating must be a number between 1 and 5' },
        { status: 400 }
      );
    }

    // Create new testimonial
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: String(name).trim(),
      role: String(role).trim(),
      quote: String(quote).trim(),
      rating: ratingNum,
      createdAt: new Date().toISOString(),
    };

    // Add to pending file
    const pending = readJsonFile(PENDING_FILE);
    pending.push(newTestimonial);
    writeJsonFile(PENDING_FILE, pending);

    return NextResponse.json(
      { message: 'Thank you! Your testimonial has been submitted for review.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to save testimonial' },
      { status: 500 }
    );
  }
}
