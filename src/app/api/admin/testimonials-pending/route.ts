import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PENDING_FILE = path.join(DATA_DIR, 'testimonials-pending.json');

function verifyAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('x-admin-key');
  return authHeader === process.env.ADMIN_SECRET_KEY;
}

export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!fs.existsSync(PENDING_FILE)) {
      return NextResponse.json([]);
    }
    const data = fs.readFileSync(PENDING_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([]);
  }
}
