'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Trophy,
  GraduationCap,
  Award,
  TrendingUp,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { DHORAN_LIST } from '@/lib/seed-data';

export default function DhoranSection() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Trophy':
        return <Trophy className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6" />;
      case 'Compass':
        return <Compass className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-16 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            ધોરણ પસંદગી
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            તમારું ધોરણ પસંદ કરો અને અભ્યાસ શરૂ કરો
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            ધોરણ ૭ થી ૧૨ ના દરેક વિષય માટે વિડિઓ લેક્ચર્સ, હસ્તલિખિત અભ્યાસ નોંધો (PDF) અને પ્રશ્નોત્તરી ટેસ્ટ.
          </p>
        </div>

        {/* 6 Cards Grid (Classes 7 to 12) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DHORAN_LIST.map((dhoran) => (
            <Link
              key={dhoran.id}
              href={`/dhoran/${dhoran.id}`}
              className="group relative rounded-3xl bg-white border border-slate-200 hover:border-amber-400 p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="relative z-10 space-y-4">
                {/* Top Badge and Icon */}
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${dhoran.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {getIcon(dhoran.iconName)}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                    {dhoran.badge}
                  </span>
                </div>

                {/* Class Title */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {dhoran.name}
                  </h3>
                  <p className="text-xs text-amber-700 font-bold mt-0.5">
                    {dhoran.title}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {dhoran.description}
                </p>

                {/* Subject inclusions */}
                <div className="pt-2 flex items-center gap-4 text-xs text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-slate-800 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    {dhoran.subjectsCount}+ મુખ્ય વિષયો
                  </span>
                  <span>•</span>
                  <span>વિડિઓ અને નોંધો</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="relative z-10 pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-amber-800 group-hover:text-amber-900">
                <span>વિષયો અને પ્રકરણો જુઓ</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
