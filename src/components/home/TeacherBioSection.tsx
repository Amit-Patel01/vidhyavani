'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle,
  Sparkles,
  Quote,
} from 'lucide-react';
import { TEACHER_BIO } from '@/lib/seed-data';

export default function TeacherBioSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Teacher Image & Badge on Left */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative rounded-3xl bg-slate-50 border border-slate-200 p-4 shadow-xl overflow-hidden">
                <img
                  src={TEACHER_BIO.avatarUrl}
                  alt={TEACHER_BIO.name}
                  className="w-full rounded-2xl aspect-[4/5] object-cover object-top"
                />
                
                <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 space-y-1 text-center shadow-sm">
                  <h3 className="text-xl font-black text-slate-900">{TEACHER_BIO.name}</h3>
                  <p className="text-xs text-amber-800 font-bold">{TEACHER_BIO.title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Details & Message on Right */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              મુખ્ય માર્ગદર્શક પરિચય
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              શિક્ષક: {TEACHER_BIO.name}
            </h2>

            {/* Quote Block */}
            <div className="relative p-6 rounded-2xl bg-amber-50/60 border-l-4 border-amber-500 shadow-sm">
              <Quote className="w-8 h-8 text-amber-300 absolute top-4 right-4" />
              <p className="text-sm sm:text-base text-amber-950 italic font-medium leading-relaxed">
                {TEACHER_BIO.message}
              </p>
              <span className="block text-xs text-slate-600 mt-2 font-bold">
                — વર્ષા જાની દવે (વિદ્યા વાણી એપ)
              </span>
            </div>

            {/* Achievements List */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                શૈક્ષણિક સિદ્ધિઓ અને સન્માન:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TEACHER_BIO.achievements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700"
                  >
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/video-lecture"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all"
              >
                વિડિઓ લેક્ચર્સ જુઓ
              </Link>
              <Link
                href="/sampark"
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-sm transition-all"
              >
                શિક્ષકનો સંપર્ક કરો
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
