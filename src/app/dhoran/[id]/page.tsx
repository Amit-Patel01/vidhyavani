'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  ArrowLeft,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { DHORAN_LIST, SUBJECTS_LIST, CHAPTERS_LIST, VIDEOS_LIST, STUDY_NOTES_LIST, QUIZZES_LIST } from '@/lib/seed-data';
import VideoModal from '@/components/video/VideoModal';
import PdfViewerModal from '@/components/pdf/PdfViewerModal';
import VideoCard from '@/components/video/VideoCard';
import NotesCard from '@/components/pdf/NotesCard';
import { VideoLecture, StudyNote } from '@/lib/types';

export default function DhoranDetailPage() {
  const params = useParams();
  const dhoranId = Number(params.id);

  const [activeTab, setActiveTab] = useState<'subjects' | 'videos' | 'notes' | 'quizzes'>('subjects');
  const [selectedVideo, setSelectedVideo] = useState<VideoLecture | null>(null);
  const [selectedNote, setSelectedNote] = useState<StudyNote | null>(null);

  const dhoran = DHORAN_LIST.find((d) => d.id === dhoranId) || DHORAN_LIST[3];
  const subjects = SUBJECTS_LIST.filter((s) => s.dhoranId === dhoranId);
  const chapters = CHAPTERS_LIST.filter((c) => c.dhoranId === dhoranId);
  const videos = VIDEOS_LIST.filter((v) => v.dhoranId === dhoranId);
  const notes = STUDY_NOTES_LIST.filter((n) => n.dhoranId === dhoranId);
  const quizzes = QUIZZES_LIST.filter((q) => q.dhoranId === dhoranId);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Breadcrumb & Title */}
      <div className="space-y-4">
        <Link
          href="/dhoran"
          className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-950 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          તમામ ધોરણ પર પાછા જાઓ
        </Link>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              {dhoran.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              {dhoran.name} : {dhoran.title}
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              {dhoran.description}
            </p>
          </div>

          <div className="flex gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="block text-xl font-bold text-slate-900">{subjects.length || 5}</span>
              <span className="text-[11px] text-slate-500 font-semibold">વિષયો</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="block text-xl font-bold text-amber-700">{videos.length || 10}+</span>
              <span className="text-[11px] text-slate-500 font-semibold">વિડિઓઝ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shrink-0 ${
            activeTab === 'subjects'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          વિષયો અને પ્રકરણો ({subjects.length})
        </button>

        <button
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shrink-0 ${
            activeTab === 'videos'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Video className="w-4 h-4" />
          વિડિઓ લેક્ચર્સ ({videos.length})
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shrink-0 ${
            activeTab === 'notes'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          અભ્યાસ નોંધો / PDF ({notes.length})
        </button>

        <button
          onClick={() => setActiveTab('quizzes')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shrink-0 ${
            activeTab === 'quizzes'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          ઑનલાઇન કસોટીઓ ({quizzes.length})
        </button>
      </div>

      {/* Tab Content 1: Subjects & Chapters */}
      {activeTab === 'subjects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((sub) => (
              <div
                key={sub.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 transition-all shadow-sm hover:shadow-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-lg border border-amber-200">
                    {sub.name.charAt(0)}
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">
                    {sub.totalChapters} પ્રકરણો
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">{sub.name}</h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{sub.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-amber-800 font-bold">{sub.totalVideos} વિડિઓ • {sub.totalNotes} નોંધો</span>
                  <Link
                    href={`/video-lecture?dhoran=${dhoranId}&subject=${sub.id}`}
                    className="text-slate-900 hover:text-amber-800 font-bold flex items-center gap-1"
                  >
                    અભ્યાસ શરૂ કરો <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Chapters List */}
          {chapters.length > 0 && (
            <div className="mt-10 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                પ્રકરણવાર અનુક્રમણિકા
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapters.map((ch) => (
                  <div key={ch.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{ch.title}</h4>
                      <p className="text-xs text-slate-500">{ch.description}</p>
                    </div>
                    <Link
                      href={`/video-lecture?dhoran=${dhoranId}`}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold hover:bg-amber-500 hover:text-slate-950 transition-all shrink-0 ml-2 border border-amber-200"
                    >
                      જુઓ
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: Videos */}
      {activeTab === 'videos' && (
        <div>
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid) => (
                <VideoCard key={vid.id} video={vid} onPlay={(v) => setSelectedVideo(v)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 p-8 rounded-3xl bg-white border border-slate-200 text-slate-500">
              આ ધોરણ માટે નવા વિડિઓ લેક્ચર્સ ટૂંક સમયમાં ઉમેરવામાં આવશે.
            </div>
          )}
        </div>
      )}

      {/* Tab Content 3: Notes */}
      {activeTab === 'notes' && (
        <div>
          {notes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NotesCard key={note.id} note={note} onView={(n) => setSelectedNote(n)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 p-8 rounded-3xl bg-white border border-slate-200 text-slate-500">
              આ ધોરણ માટે અભ્યાસ નોંધો ટૂંક સમયમાં ઉમેરવામાં આવશે.
            </div>
          )}
        </div>
      )}

      {/* Tab Content 4: Quizzes */}
      {activeTab === 'quizzes' && (
        <div className="space-y-6">
          {quizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-700">{quiz.subjectName}</span>
                    <span className="text-xs text-slate-500">{quiz.durationMinutes} મિનિટ</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{quiz.title}</h3>
                  <p className="text-xs text-slate-600">કુલ પ્રશ્નો: {quiz.totalQuestions} • પાસિંગ ગુણ: {quiz.passingMarks}%</p>
                  <Link
                    href={`/prashnottari?quizId=${quiz.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
                  >
                    ટેસ્ટ શરૂ કરો
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 p-8 rounded-3xl bg-white border border-slate-200 text-slate-500">
              આ ધોરણ માટે મોક કસોટીઓ ટૂંક સમયમાં ઉપલબ્ધ થશે.
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      <PdfViewerModal note={selectedNote} onClose={() => setSelectedNote(null)} />

    </div>
  );
}
