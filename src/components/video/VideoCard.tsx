'use client';

import React from 'react';
import { Play, Clock, BookOpen } from 'lucide-react';
import { VideoLecture } from '@/lib/types';

interface VideoCardProps {
  video: VideoLecture;
  onPlay: (video: VideoLecture) => void;
}

export default function VideoCard({ video, onPlay }: VideoCardProps) {
  return (
    <div className="group rounded-3xl bg-white border border-slate-200 hover:border-amber-400 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl flex flex-col justify-between">
      <div>
        {/* Thumbnail with overlay & Play button */}
        <div
          className="relative aspect-video w-full overflow-hidden cursor-pointer bg-slate-900"
          onClick={() => onPlay(video)}
        >
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-13 h-13 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-300 p-3">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
          </div>

          {/* Dhoran Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-md bg-white/90 text-slate-900 text-xs font-extrabold border border-slate-200 shadow-sm">
              ધોરણ {video.dhoranId}
            </span>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-bold">
            <Clock className="w-3 h-3 text-amber-400" />
            {video.duration}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-amber-800 font-bold">
            <span>{video.subjectName}</span>
            <span className="text-slate-400 font-medium">{video.uploadedDate}</span>
          </div>

          <h3
            onClick={() => onPlay(video)}
            className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {video.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-1 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {video.chapterName}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/images/varsha-jani-dave.png"
            alt={video.teacherName}
            className="w-6 h-6 rounded-full border border-amber-400 object-cover object-top"
          />
          <span className="text-xs text-slate-700 font-bold truncate max-w-[120px]">
            {video.teacherName}
          </span>
        </div>

        <button
          onClick={() => onPlay(video)}
          className="px-3.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-500 text-amber-800 hover:text-slate-950 border border-amber-200 text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
        >
          વિડિઓ જુઓ
        </button>
      </div>
    </div>
  );
}
