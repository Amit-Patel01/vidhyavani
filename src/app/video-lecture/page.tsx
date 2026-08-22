'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Video, Search } from 'lucide-react';
import { DHORAN_LIST, SUBJECTS_LIST, VIDEOS_LIST } from '@/lib/seed-data';
import VideoCard from '@/components/video/VideoCard';
import VideoModal from '@/components/video/VideoModal';
import { VideoLecture } from '@/lib/types';

function VideoLectureContent() {
  const searchParams = useSearchParams();
  const initialDhoran = searchParams.get('dhoran');
  const initialSubject = searchParams.get('subject');

  const [selectedDhoran, setSelectedDhoran] = useState<number | null>(
    initialDhoran ? Number(initialDhoran) : null
  );
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<VideoLecture | null>(null);

  const availableSubjects = selectedDhoran
    ? SUBJECTS_LIST.filter((s) => s.dhoranId === selectedDhoran)
    : SUBJECTS_LIST;

  const filteredVideos = VIDEOS_LIST.filter((v) => {
    const matchesDhoran = selectedDhoran ? v.dhoranId === selectedDhoran : true;
    const matchesSubject = selectedSubject ? v.subjectId === selectedSubject || v.subjectName.includes(selectedSubject) : true;
    const matchesQuery = searchQuery
      ? v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.chapterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesDhoran && matchesSubject && matchesQuery;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase">
          ડિજિટલ વિડિઓ લાઇબ્રેરી
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          વિડિઓ લેક્ચર્સ સંગ્રહ
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          શિક્ષક વર્ષા જાની દવે દ્વારા તૈયાર કરેલ દરેક પ્રકરણના ઊંડાણપૂર્વકના સરળ વિડિઓઝ.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="વિડિઓ, વિષય અથવા પ્રકરણનું નામ શોધો..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          {/* Dhoran Select */}
          <div className="sm:col-span-3">
            <select
              value={selectedDhoran || ''}
              onChange={(e) => {
                setSelectedDhoran(e.target.value ? Number(e.target.value) : null);
                setSelectedSubject('');
              }}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
            >
              <option value="">બધા ધોરણ (૭ થી ૧૨)</option>
              {DHORAN_LIST.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Select */}
          <div className="sm:col-span-3">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
            >
              <option value="">તમામ વિષયો</option>
              {availableSubjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.dhoranId ? `ધોરણ ${s.dhoranId}` : ''})
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Videos List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-600 font-semibold">
            કુલ <strong className="text-amber-800">{filteredVideos.length}</strong> વિડિઓ લેક્ચર્સ મળ્યા
          </p>
          {(selectedDhoran || selectedSubject || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDhoran(null);
                setSelectedSubject('');
                setSearchQuery('');
              }}
              className="text-xs text-rose-600 hover:underline font-bold"
            >
              ફિલ્ટર્સ સાફ કરો
            </button>
          )}
        </div>

        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onPlay={(v) => setActiveVideo(v)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 p-8 rounded-3xl bg-white border border-slate-200 space-y-3">
            <Video className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">કોઈ વિડિઓ મળ્યા નથી</h3>
            <p className="text-xs text-slate-500">
              કૃપા કરીને અન્ય ધોરણ અથવા વિષય પસંદ કરો.
            </p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />

    </div>
  );
}

export default function VideoLecturePage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-amber-700 font-bold">
          વિડિઓ લેક્ચર્સ લોડ થઈ રહ્યા છે...
        </div>
      }
    >
      <VideoLectureContent />
    </Suspense>
  );
}
