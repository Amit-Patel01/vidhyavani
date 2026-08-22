import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ContactMessage } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const { name, mobile, email, dhoran, message } = await req.json();

    if (!name || !mobile || !message) {
      return NextResponse.json(
        { success: false, message: 'કૃપા કરીને નામ, મોબાઇલ અને સંદેશ દાખલ કરો.' },
        { status: 400 }
      );
    }

    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      mobile,
      email: email || '',
      dhoran: dhoran || 'સામાન્ય',
      message,
      createdAt: new Date().toLocaleDateString('gu-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    db.addContactMessage(newMsg);

    return NextResponse.json({
      success: true,
      message: 'તમારો સંદેશ સફળતાપૂર્વક મોકલવામાં આવ્યો છે! અમે ટૂંક સમયમાં સંપર્ક કરીશું.',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'સંદેશ મોકલવામાં સમસ્યા આવી.' },
      { status: 500 }
    );
  }
}
