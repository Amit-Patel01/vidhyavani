import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { DHORAN_LIST, SUBJECTS_LIST, CHAPTERS_LIST } from '@/lib/seed-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'all';
  const dhoran = searchParams.get('dhoran');
  const subject = searchParams.get('subject');
  const query = searchParams.get('q')?.toLowerCase();

  const dhoranNum = dhoran ? Number(dhoran) : null;

  // Return specific requested slice or all
  let videos = db.videos.filter((v) => v.status === 'approved');
  let notes = db.notes.filter((n) => n.status === 'approved');
  let quizzes = db.quizzes;
  let impQuestions = db.impQuestions;

  if (dhoranNum) {
    videos = videos.filter((v) => v.dhoranId === dhoranNum);
    notes = notes.filter((n) => n.dhoranId === dhoranNum);
    quizzes = quizzes.filter((q) => q.dhoranId === dhoranNum);
    impQuestions = impQuestions.filter((iq) => iq.dhoranId === dhoranNum);
  }

  if (subject) {
    videos = videos.filter((v) => v.subjectId === subject);
    notes = notes.filter((n) => n.subjectId === subject);
    quizzes = quizzes.filter((q) => q.subjectId === subject);
    impQuestions = impQuestions.filter((iq) => iq.subjectId === subject);
  }

  if (query) {
    videos = videos.filter(
      (v) =>
        v.title.toLowerCase().includes(query) ||
        v.chapterName.toLowerCase().includes(query) ||
        v.subjectName.toLowerCase().includes(query)
    );
    notes = notes.filter(
      (n) =>
        n.title.toLowerCase().includes(query) ||
        n.chapterName.toLowerCase().includes(query) ||
        n.subjectName.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    success: true,
    dhorans: DHORAN_LIST,
    subjects: dhoranNum
      ? SUBJECTS_LIST.filter((s) => s.dhoranId === dhoranNum)
      : SUBJECTS_LIST,
    chapters: dhoranNum
      ? CHAPTERS_LIST.filter((c) => c.dhoranId === dhoranNum)
      : CHAPTERS_LIST,
    videos: type === 'all' || type === 'videos' ? videos : [],
    notes: type === 'all' || type === 'notes' ? notes : [],
    quizzes: type === 'all' || type === 'quizzes' ? quizzes : [],
    impQuestions: type === 'all' || type === 'questions' ? impQuestions : [],
    announcements: db.announcements,
  });
}
