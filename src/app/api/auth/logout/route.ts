import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({
    success: true,
    message: 'સફળતાપૂર્વક બહાર નીકળી ગયા છો.',
  });

  res.cookies.set('vidhyavani_token', '', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });

  return res;
}
