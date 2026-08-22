'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Video, FileText, ChevronRight } from 'lucide-react';
import { DHORAN_LIST, SUBJECTS_LIST } from '@/lib/seed-data';

export default function VishayoPage() {
  const [selectedDhoran, setSelectedDhoran] = useState<number | null>(null);

  const filteredSubjects = selectedDhoran
    ? SUBJECTS_LIST.filter((s) => s.dhoranId === selectedDhoran)
    : SUBJECTS_LIST;

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase">
          વિષય નિર્દેશિકા
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          ધોરણ ૭ થી ૧૨ ના તમામ વિષયો
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          વિડિઓ લેક્ચર્સ, હસ્તલિખિત નોંધો અને પ્રશ્નોત્તરી માટે આપનો વિષય પસંદ કરો.
        </p>
      </div>

      {/* Dhoran Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
        <button
          onClick={() => setSelectedDhoran(null)}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            selectedDhoran === null
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          બધા ધોરણ
        </button>
        {DHORAN_LIST.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDhoran(d.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedDhoran === d.id
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((sub) => (
          <div
            key={sub.id}
            className="group p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
                  ધોરણ {sub.dhoranId}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{sub.totalChapters} પ્રકરણો</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                {sub.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {sub.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-amber-800 font-bold">
                <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" /> {sub.totalVideos}</span>
                <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {sub.totalNotes}</span>
              </div>

              <Link
                href={`/video-lecture?dhoran=${sub.dhoranId}&subject=${sub.id}`}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-500 text-amber-800 hover:text-slate-950 font-bold text-xs transition-all border border-amber-200 shadow-sm"
              >
                અભ્યાસ શરૂ કરો
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
