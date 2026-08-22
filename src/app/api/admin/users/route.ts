import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { User, UserRole } from '@/lib/types';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('vidhyavani_token')?.value;
  if (!token) return NextResponse.json({ success: false, message: 'અનધિકૃત' }, { status: 401 });

  const payload = verifyToken(token);
  if (!payload || (payload.role !== 'super_admin' && payload.role !== 'admin')) {
    return NextResponse.json({ success: false, message: 'અનધિકૃત ઍક્સેસ' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const role = searchParams.get('role');

  let users = db.users;
  if (role) {
    users = users.filter((u) => u.role === role);
  }

  return NextResponse.json({ success: true, users });
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('vidhyavani_token')?.value;
    if (!token) return NextResponse.json({ success: false, message: 'અનધિકૃત' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload || (payload.role !== 'super_admin' && payload.role !== 'admin')) {
      return NextResponse.json({ success: false, message: 'અનધિકૃત ઍક્સેસ' }, { status: 403 });
    }

    const { name, email, mobile, role, subjectSpecialty, dhoran } = await req.json();

    if (!name || !email || !mobile || !role) {
      return NextResponse.json({ success: false, message: 'બધી જરૂરી માહિતી ભરો.' }, { status: 400 });
    }

    if (db.findUserByEmailOrMobile(email) || db.findUserByEmailOrMobile(mobile)) {
      return NextResponse.json({ success: false, message: 'આ ઈમેલ અથવા મોબાઇલ પહેલેથી અસ્તિત્વમાં છે.' }, { status: 400 });
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      mobile,
      role: role as UserRole,
      subjectSpecialty: subjectSpecialty || undefined,
      dhoran: dhoran ? Number(dhoran) : undefined,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      isActive: true,
      joinedDate: new Date().toLocaleDateString('gu-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    db.addUser(newUser);

    return NextResponse.json({
      success: true,
      message: 'વપરાશકર્તા સફળતાપૂર્વક ઉમેરાયા!',
      user: newUser,
    });
  } catch {
    return NextResponse.json({ success: false, message: 'વપરાશકર્તા ઉમેરવામાં સમસ્યા થઈ.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get('vidhyavani_token')?.value;
    if (!token) return NextResponse.json({ success: false, message: 'અનધિકૃત' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload || (payload.role !== 'super_admin' && payload.role !== 'admin')) {
      return NextResponse.json({ success: false, message: 'અનધિકૃત ઍક્સેસ' }, { status: 403 });
    }

    const { id, isActive, name, subjectSpecialty, dhoran } = await req.json();
    const updated = db.updateUser(id, {
      ...(isActive !== undefined && { isActive }),
      ...(name && { name }),
      ...(subjectSpecialty && { subjectSpecialty }),
      ...(dhoran && { dhoran: Number(dhoran) }),
    });

    if (!updated) {
      return NextResponse.json({ success: false, message: 'વપરાશકર્તા મળ્યા નથી.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'માહિતી સફળતાપૂર્વક અપડેટ થઈ ગઈ છે!',
      user: updated,
    });
  } catch {
    return NextResponse.json({ success: false, message: 'ફેરફાર કરવામાં ભૂલ આવી.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('vidhyavani_token')?.value;
    if (!token) return NextResponse.json({ success: false, message: 'અનધિકૃત' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'super_admin') {
      return NextResponse.json({ success: false, message: 'માત્ર મુખ્ય સંચાલક જ એકાઉન્ટ દૂર કરી શકે છે.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'ID જરૂરી છે' }, { status: 400 });

    const deleted = db.deleteUser(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'વપરાશકર્તા મળ્યા નથી.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'વપરાશકર્તા સફળતાપૂર્વક દૂર કરવામાં આવ્યા છે.' });
  } catch {
    return NextResponse.json({ success: false, message: 'દૂર કરવામાં નિષ્ફળતા મળી.' }, { status: 500 });
  }
}
