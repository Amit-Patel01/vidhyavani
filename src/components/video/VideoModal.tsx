'use client';

import React from 'react';
import { X, Clock, User, BookOpen, ExternalLink } from 'lucide-react';
import { VideoLecture } from '@/lib/types';

interface VideoModalProps {
  video: VideoLecture | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-modal">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
              ધોરણ {video.dhoranId} • {video.subjectName}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-md">
              {video.chapterName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full bg-black aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Video Info Details */}
        <div className="p-6 overflow-y-auto space-y-4">
          <h2 className="text-lg font-bold text-slate-900 leading-snug">
            {video.title}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
              <User className="w-3.5 h-3.5 text-amber-600" />
              શિક્ષક: <strong className="text-slate-900">{video.teacherName}</strong>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              સમયગાળો: <strong className="text-slate-900">{video.duration}</strong>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              તારીખ: <strong className="text-slate-900">{video.uploadedDate}</strong>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-900">આ પ્રકરણની હસ્તલિખિત PDF નોંધો ઉપલબ્ધ છે</p>
              <p className="text-xs text-slate-600">લેક્ચર જોયા બાદ મહત્વના મુદ્દાઓનું પુનરાવર્તન કરો.</p>
            </div>
            <a
              href="/abhyas-nondho"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all shrink-0 shadow-sm"
            >
              નોંધો વાંચો
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
