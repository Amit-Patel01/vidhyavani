import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { VideoLecture, StudyNote, ImpQuestion } from '@/lib/types';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('vidhyavani_token')?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: 'અનધિકૃત પ્રવેશ' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload || (payload.role !== 'teacher' && payload.role !== 'super_admin' && payload.role !== 'admin')) {
    return NextResponse.json({ success: false, message: 'અનધિકૃત ઍક્સેસ' }, { status: 403 });
  }

  const myVideos = db.videos.filter((v) => v.teacherId === payload.userId || payload.role === 'super_admin');
  const myNotes = db.notes.filter((n) => n.teacherId === payload.userId || payload.role === 'super_admin');

  return NextResponse.json({
    success: true,
    videos: myVideos,
    notes: myNotes,
  });
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('vidhyavani_token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'પ્રથમ પ્રવેશ કરો' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || (payload.role !== 'teacher' && payload.role !== 'super_admin' && payload.role !== 'admin')) {
      return NextResponse.json({ success: false, message: 'માત્ર શિક્ષકો જ સામગ્રી ઉમેરી શકે છે' }, { status: 403 });
    }

    const body = await req.json();
    const { contentType } = body;

    const uploadedDate = new Date().toLocaleDateString('gu-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    if (contentType === 'video') {
      const { title, youtubeId, dhoranId, subjectName, chapterName, duration } = body;
      if (!title || !youtubeId || !dhoranId || !subjectName) {
        return NextResponse.json({ success: false, message: 'બધી જરૂરી માહિતી ભરો.' }, { status: 400 });
      }

      const newVideo: VideoLecture = {
        id: `vid-${Date.now()}`,
        title,
        youtubeId,
        dhoranId: Number(dhoranId),
        subjectId: `d${dhoranId}-custom`,
        subjectName,
        chapterId: `ch-custom-${Date.now()}`,
        chapterName: chapterName || 'સામાન્ય પ્રકરણ',
        duration: duration || '૨૫ મિનિટ',
        teacherName: payload.name,
        views: 0,
        thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        uploadedDate,
        status: payload.role === 'super_admin' ? 'approved' : 'pending',
        teacherId: payload.userId,
      };

      db.addVideo(newVideo);
      return NextResponse.json({
        success: true,
        message: payload.role === 'super_admin' 
          ? 'વિડિયો સફળતાપૂર્વક પ્રકાશિત થયો છે!' 
          : 'વિડિયો સફળતાપૂર્વક અપલોડ થયો! સંચાલકની મંજૂરી બાદ વેબસાઇટ પર દેખાશે.',
        item: newVideo,
      });
    }

    if (contentType === 'note') {
      const { title, dhoranId, subjectName, chapterName, summaryPoints } = body;
      if (!title || !dhoranId || !subjectName) {
        return NextResponse.json({ success: false, message: 'બધી જરૂરી માહિતી ભરો.' }, { status: 400 });
      }

      const newNote: StudyNote = {
        id: `note-${Date.now()}`,
        title,
        dhoranId: Number(dhoranId),
        subjectId: `d${dhoranId}-custom`,
        subjectName,
        chapterId: `ch-custom-${Date.now()}`,
        chapterName: chapterName || 'પ્રકરણ ૧',
        fileUrl: '#',
        pageCount: 6,
        fileSize: '૨.૫ MB',
        teacherName: payload.name,
        uploadedDate,
        status: payload.role === 'super_admin' ? 'approved' : 'pending',
        teacherId: payload.userId,
        summaryPoints: summaryPoints && summaryPoints.length > 0 
          ? summaryPoints 
          : ['શિક્ષક દ્વારા તૈયાર કરેલ અગત્યના મુદ્દાઓ.', 'પરીક્ષાલક્ષી સંક્ષિપ્ત સારાંશ.'],
      };

      db.addNote(newNote);
      return NextResponse.json({
        success: true,
        message: payload.role === 'super_admin'
          ? 'નોંધો સફળતાપૂર્વક પ્રકાશિત થઈ છે!'
          : 'નોંધો સફળતાપૂર્વક ઉમેરાઈ! સંચાલકની મંજૂરી બાદ પ્રકાશિત થશે.',
        item: newNote,
      });
    }

    return NextResponse.json({ success: false, message: 'અમાન્ય સામગ્રી પ્રકાર' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'સામગ્રી ઉમેરવામાં સમસ્યા આવી' }, { status: 500 });
  }
}
