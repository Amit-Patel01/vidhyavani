import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('vidhyavani_token')?.value;
  if (!token) return NextResponse.json({ success: false, message: 'અનધિકૃત' }, { status: 401 });

  const payload = verifyToken(token);
  if (!payload || (payload.role !== 'super_admin' && payload.role !== 'admin')) {
    return NextResponse.json({ success: false, message: 'અનધિકૃત ઍક્સેસ' }, { status: 403 });
  }

  const allVideos = db.videos;
  const allNotes = db.notes;

  return NextResponse.json({
    success: true,
    videos: allVideos,
    notes: allNotes,
  });
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('vidhyavani_token')?.value;
    if (!token) return NextResponse.json({ success: false, message: 'અનધિકૃત' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload || (payload.role !== 'super_admin' && payload.role !== 'admin')) {
      return NextResponse.json({ success: false, message: 'અનધિકૃત ઍક્સેસ' }, { status: 403 });
    }

    const { type, id, action } = await req.json(); // action: 'approve' | 'reject' | 'delete'
    const newStatus = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : null;

    if (type === 'video') {
      if (action === 'delete') {
        db.deleteVideo(id);
        return NextResponse.json({ success: true, message: 'વિડિયો સફળતાપૂર્વક દૂર કરવામાં આવ્યો છે.' });
      }
      if (newStatus) {
        db.updateVideoStatus(id, newStatus);
        return NextResponse.json({
          success: true,
          message: action === 'approve' ? 'વિડિયો સફળતાપૂર્વક મંજૂર કરવામાં આવ્યો છે.' : 'વિડિયો નામંજૂર કરવામાં આવ્યો છે.',
        });
      }
    }

    if (type === 'note') {
      if (action === 'delete') {
        db.deleteNote(id);
        return NextResponse.json({ success: true, message: 'નોંધો સફળતાપૂર્વક દૂર કરવામાં આવી છે.' });
      }
      if (newStatus) {
        db.updateNoteStatus(id, newStatus);
        return NextResponse.json({
          success: true,
          message: action === 'approve' ? 'નોંધો સફળતાપૂર્વક મંજૂર કરવામાં આવી છે.' : 'નોંધો નામંજૂર કરવામાં આવી છે.',
        });
      }
    }

    return NextResponse.json({ success: false, message: 'અમાન્ય વિનંતી' }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, message: 'ક્રિયા પૂર્ણ કરવામાં સમસ્યા થઈ.' }, { status: 500 });
  }
}
