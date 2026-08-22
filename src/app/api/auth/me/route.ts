import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('vidhyavani_token')?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const user = db.findUserById(payload.userId);
    if (!user || !user.isActive) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    return NextResponse.json({ authenticated: true, user });
  } catch {
    return NextResponse.json({ authenticated: false, user: null });
  }
}
