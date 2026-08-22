'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  Trophy,
  Bell,
  Clock,
  Sparkles,
} from 'lucide-react';
import { User, VideoLecture, StudyNote } from '@/lib/types';
import { VIDEOS_LIST, STUDY_NOTES_LIST, QUIZZES_LIST, ANNOUNCEMENTS_LIST } from '@/lib/seed-data';
import VideoModal from '@/components/video/VideoModal';
import PdfViewerModal from '@/components/pdf/PdfViewerModal';

export default function VidyarthiDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'notes' | 'quizzes' | 'results' | 'notices'>('overview');
  
  const [activeVideo, setActiveVideo] = useState<VideoLecture | null>(null);
  const [activeNote, setActiveNote] = useState<StudyNote | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser({
            id: 'student-demo',
            name: 'આરવ પટેલ',
            mobile: '9876543212',
            email: 'student@vidhyavani.com',
            role: 'student',
            dhoran: 10,
            avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Aarav',
            isActive: true,
            joinedDate: '૧૦ જાન્યુઆરી ૨૦૨૬',
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const dhoranId = user?.dhoran || 10;
  const userVideos = VIDEOS_LIST.filter((v) => v.dhoranId === dhoranId);
  const userNotes = STUDY_NOTES_LIST.filter((n) => n.dhoranId === dhoranId);

  if (loading) {
    return (
      <div className="py-24 text-center text-amber-700 font-bold">
        વિદ્યાર્થી ડેશબોર્ડ લોડ થઈ રહ્યું છે...
      </div>
    );
  }

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Student Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <img
            src={user?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=Aarav'}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl border-2 border-amber-400 p-0.5 bg-slate-50"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                ધોરણ {dhoranId} ના વિદ્યાર્થી
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              નમસ્તે, {user?.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              આજનો લક્ષ્યાંક: ધોરણ {dhoranId} નું નવું લેક્ચર જુઓ અને પ્રશ્નોત્તરી ટેસ્ટ આપો.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href={`/dhoran/${dhoranId}`}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
          >
            મારો સંપૂર્ણ અભ્યાસક્રમ
          </Link>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'overview'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          મુખ્ય ઓવરવ્યૂ
        </button>

        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'videos'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          મારા વિડિઓઝ ({userVideos.length})
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'notes'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          અભ્યાસ નોંધો ({userNotes.length})
        </button>

        <button
          onClick={() => setActiveTab('quizzes')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'quizzes'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          ઑનલાઇન પ્રશ્નોત્તરી
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'results'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          પરીક્ષા પરિણામો
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'notices'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          સૂચનાઓ
        </button>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Progress Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-1 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">જોયેલા વિડિઓઝ</span>
              <p className="text-2xl font-black text-slate-900">૮ / ૧૨</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-500 h-full w-2/3" />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-1 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">વાંચેલી PDF નોંધો</span>
              <p className="text-2xl font-black text-blue-600">૪ પ્રકરણ</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-500 h-full w-1/2" />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-1 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">આપેલી કસોટીઓ</span>
              <p className="text-2xl font-black text-emerald-600">૩ ટેસ્ટ</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full w-3/4" />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-1 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">સરેરાશ સ્કોર</span>
              <p className="text-2xl font-black text-amber-700">૮૮%</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-500 h-full w-[88%]" />
              </div>
            </div>
          </div>

          {/* Quick Resume Learning Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Video className="w-5 h-5 text-amber-600" />
                અભ્યાસ ચાલુ રાખો (ધોરણ {dhoranId})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userVideos.slice(0, 2).map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all cursor-pointer space-y-3 shadow-sm hover:shadow-md"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                      <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px]">
                        {vid.duration}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-amber-800 font-bold">{vid.subjectName}</span>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mt-0.5">{vid.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements side */}
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-600" />
                તાજા સમાચાર અને સૂચનાઓ
              </h2>

              <div className="space-y-3">
                {ANNOUNCEMENTS_LIST.map((ann) => (
                  <div key={ann.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-sm">
                    <span className="text-[10px] text-amber-800 font-bold">{ann.date}</span>
                    <h4 className="text-xs font-bold text-slate-900">{ann.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{ann.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Videos */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 transition-all cursor-pointer space-y-3 shadow-sm hover:shadow-lg"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900">
                <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover" />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px]">
                  {vid.duration}
                </span>
              </div>
              <span className="text-xs text-amber-800 font-bold">{vid.subjectName}</span>
              <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{vid.title}</h4>
              <p className="text-xs text-slate-500">{vid.chapterName}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Notes */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveNote(note)}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 transition-all cursor-pointer space-y-3 shadow-sm hover:shadow-lg"
            >
              <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
                {note.subjectName}
              </span>
              <h4 className="text-base font-bold text-slate-900 line-clamp-2">{note.title}</h4>
              <p className="text-xs text-slate-500">{note.fileSize} • {note.pageCount} પાના</p>
              <button className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs mt-2 shadow-sm">
                PDF વાંચો
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Quizzes */}
      {activeTab === 'quizzes' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">તમારી તૈયારીનું મૂલ્યાંકન કરવા આ ટેસ્ટ આપો:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUIZZES_LIST.map((q) => (
              <div key={q.id} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-sm">
                <span className="text-xs font-bold text-amber-800">{q.subjectName}</span>
                <h4 className="text-base font-bold text-slate-900">{q.title}</h4>
                <p className="text-xs text-slate-500">સમય: {q.durationMinutes} મિનિટ • કુલ પ્રશ્નો: {q.totalQuestions}</p>
                <Link
                  href={`/prashnottari?quizId=${q.id}`}
                  className="inline-block px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm"
                >
                  ટેસ્ટ શરૂ કરો →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Results */}
      {activeTab === 'results' && (
        <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">આપના તાજેતરના ટેસ્ટ પરિણામો</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-800 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">વિષય / પ્રકરણ</th>
                  <th className="px-4 py-3">તારીખ</th>
                  <th className="px-4 py-3">મેળવેલ ગુણ</th>
                  <th className="px-4 py-3">ટકાવારી</th>
                  <th className="px-4 py-3">પરિણામ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-bold text-slate-900">ધોરણ ૧૦ ગુજરાતી - પ્રકરણ ૧ વૈષ્ણવજન</td>
                  <td className="px-4 py-3">૧૫ ફેબ્રુઆરી ૨૦૨૬</td>
                  <td className="px-4 py-3 text-amber-700 font-bold">૮૦ / ૧૦૦</td>
                  <td className="px-4 py-3">૮૦%</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">સફળ (પાસ)</span></td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-bold text-slate-900">ધોરણ ૧૦ ગણિત - પ્રકરણ ૧ વાસ્તવિક સંખ્યાઓ</td>
                  <td className="px-4 py-3">૧૮ ફેબ્રુઆરી ૨૦૨૬</td>
                  <td className="px-4 py-3 text-amber-700 font-bold">૧૦૦ / ૧૦૦</td>
                  <td className="px-4 py-3">૧૦૦%</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">૧૦૦% ટોપર</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Notices */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          {ANNOUNCEMENTS_LIST.map((ann) => (
            <div key={ann.id} className="p-6 rounded-3xl bg-white border border-amber-200 space-y-2 shadow-sm">
              <span className="text-xs font-bold text-amber-800">{ann.date}</span>
              <h4 className="text-base font-bold text-slate-900">{ann.title}</h4>
              <p className="text-sm text-slate-600">{ann.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      <PdfViewerModal note={activeNote} onClose={() => setActiveNote(null)} />

    </div>
  );
}
