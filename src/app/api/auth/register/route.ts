import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateToken, getRoleHomeRoute } from '@/lib/auth';
import { User, UserRole } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const { name, mobile, email, password, dhoran, role } = await req.json();

    if (!name || !mobile || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'કૃપા કરીને બધી જરૂરી માહિતી ભરો.' },
        { status: 400 }
      );
    }

    if (db.findUserByEmailOrMobile(email) || db.findUserByEmailOrMobile(mobile)) {
      return NextResponse.json(
        { success: false, message: 'આ મોબાઇલ નંબર અથવા ઈમેલ પહેલેથી નોંધાયેલ છે.' },
        { status: 400 }
      );
    }

    const assignedRole: UserRole = role === 'teacher' ? 'teacher' : 'student';

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      mobile,
      email,
      role: assignedRole,
      dhoran: dhoran ? Number(dhoran) : 10,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      isActive: true,
      joinedDate: new Date().toLocaleDateString('gu-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    db.addUser(newUser);

    const token = generateToken(newUser);
    const res = NextResponse.json({
      success: true,
      message: 'તમારી નોંધણી સફળતાપૂર્વક પૂર્ણ થઈ ગઈ છે!',
      user: newUser,
      redirectTo: getRoleHomeRoute(newUser.role),
    });

    res.cookies.set('vidhyavani_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'નોંધણી કરવામાં ભૂલ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.' },
      { status: 500 }
    );
  }
}
