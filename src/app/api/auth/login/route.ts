import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateToken, getRoleHomeRoute } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { identifier, password, demoRole } = await req.json();

    // Support quick demo switcher
    if (demoRole) {
      const demoUser = db.users.find((u) => u.role === demoRole);
      if (!demoUser) {
        return NextResponse.json(
          { success: false, message: 'ડેમો વપરાશકર્તા મળ્યો નથી.' },
          { status: 404 }
        );
      }
      const token = generateToken(demoUser);
      const res = NextResponse.json({
        success: true,
        message: 'સફળતાપૂર્વક પ્રવેશ કર્યો!',
        user: demoUser,
        redirectTo: getRoleHomeRoute(demoUser.role),
      });
      res.cookies.set('vidhyavani_token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });
      return res;
    }

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: 'કૃપા કરીને મોબાઇલ નંબર/ઈમેલ અને પાસવર્ડ દાખલ કરો.' },
        { status: 400 }
      );
    }

    const user = db.findUserByEmailOrMobile(identifier);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'આ મોબાઇલ નંબર અથવા ઈમેલ સાથે કોઈ ખાતું મળ્યું નથી.' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: 'આ ખાતું હાલમાં નિષ્ક્રિય છે. કૃપા કરીને સંચાલકનો સંપર્ક કરો.' },
        { status: 403 }
      );
    }

    // Generate JWT token
    const token = generateToken(user);
    const res = NextResponse.json({
      success: true,
      message: 'સફળતાપૂર્વક પ્રવેશ કર્યો!',
      user,
      redirectTo: getRoleHomeRoute(user.role),
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
      { success: false, message: 'પ્રવેશ કરવામાં તકલીફ થઈ. ફરી પ્રયત્ન કરો.' },
      { status: 500 }
    );
  }
}
