'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Youtube,
  Play,
  ExternalLink,
  Sparkles,
  Flame,
} from 'lucide-react';
import { VIDEOS_LIST } from '@/lib/seed-data';
import VideoModal from '@/components/video/VideoModal';
import { VideoLecture } from '@/lib/types';

export default function YoutubeSection() {
  const [activeVideo, setActiveVideo] = useState<VideoLecture | null>(null);

  const popularVideos = VIDEOS_LIST.slice(0, 3);

  return (
    <section className="py-20 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with YouTube branding */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 p-8 rounded-3xl bg-white border border-rose-200 shadow-md">
          <div className="flex items-center space-x-5 text-center lg:text-left">
            <div className="w-16 h-16 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30 shrink-0">
              <Youtube className="w-10 h-10" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-rose-700 font-bold uppercase mb-1">
                <Flame className="w-3.5 h-3.5" />
                ઓફિશિયલ યૂટ્યુબ ચેનલ
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                વિદ્યા વાણી યૂટ્યુબ ચેનલ
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                મફત વિડિઓ લેક્ચર્સ અને માર્ગદર્શન સત્રો દ્વારા સરળતાથી અભ્યાસ કરો.
              </p>
            </div>
          </div>

          {/* Subscribe Action */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-md shadow-rose-600/30 transition-all duration-300 group"
            >
              <Youtube className="w-5 h-5" />
              ચેનલ જુઓ & સબ્સ્ક્રાઇબ કરો
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Popular Videos Showcase */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              વિડિઓ લેક્ચર્સ
            </h3>
            <Link
              href="/video-lecture"
              className="text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-950 transition-colors"
            >
              બધા વિડિઓ જુઓ →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="group rounded-2xl bg-white border border-slate-200 hover:border-rose-300 p-4 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer space-y-3"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-bold">
                    {video.duration}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-amber-800 font-bold">
                    ધોરણ {video.dhoranId} • {video.subjectName}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-700 transition-colors line-clamp-2 mt-1">
                    {video.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    શિક્ષક: {video.teacherName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
