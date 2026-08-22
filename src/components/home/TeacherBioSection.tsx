import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { TEACHER_BIO } from '@/lib/seed-data';

export default function TeacherBioSection() {
  const highlights = [
    'ધોરણ ૭ થી ૧૨ ના અભ્યાસક્રમનું સરળ ગુજરાતી માધ્યમમાં ઊંડાણપૂર્વક શિક્ષણ',
    'પરીક્ષા પદ્ધતિ અનુસાર આઈએમપી પ્રશ્નો અને પેપર સોલ્યુશન માર્ગદર્શન',
    'પ્રકરણવાર હસ્તલિખિત અભ્યાસ નોંધો (PDF) અને ઝડપી પુનરાવર્તન સામગ્રી',
    'સ્વ-મૂલ્યાંકન માટે ઑનલાઇન મોક ટેસ્ટ અને પ્રશ્નોત્તરી',
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="rounded-3xl bg-white border border-slate-200 p-4 sm:p-5 shadow-lg">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 border border-slate-200">
                  <img
                    src={TEACHER_BIO.avatarUrl}
                    alt={TEACHER_BIO.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-center">
                    <h3 className="text-xl font-bold text-white">{TEACHER_BIO.name}</h3>
                    <p className="text-xs text-amber-300 font-semibold mt-0.5">{TEACHER_BIO.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Info */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase mb-3">
                <Sparkles className="w-4 h-4 text-amber-600" />
                શિક્ષક પરિચય
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {TEACHER_BIO.name}
              </h2>
              <p className="text-sm font-bold text-amber-700 mt-1">
                {TEACHER_BIO.title}
              </p>
            </div>

            <blockquote className="p-4 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 text-xs sm:text-sm text-slate-800 italic leading-relaxed">
              {TEACHER_BIO.message}
            </blockquote>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase">મુખ્ય શૈક્ષણિક વિશેષતાઓ:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/amara-vishe"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all duration-300"
              >
                અમારા વિશે વધુ જાણો
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dhoran"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-xs transition-all"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                અભ્યાસક્રમ જુઓ
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
