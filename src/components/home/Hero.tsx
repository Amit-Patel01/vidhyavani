'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  Youtube,
  Award,
  CheckCircle,
  Play,
  ArrowRight,
} from 'lucide-react';
import { TEACHER_BIO } from '@/lib/seed-data';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-white border-b border-slate-200/80">
      {/* Background Soft Glow effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-blue-50/70 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Tagline, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>ગુજરાતનું અગ્રણી ડિજિટલ શિક્ષણ પ્લેટફોર્મ</span>
            </div>

            {/* Brand Title & Tagline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.18]">
              વિદ્યા વાણી એપ
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold gold-text-gradient mt-2">
                “જ્ઞાન અને નિશ્ચિત સફળતા તરફ”
              </span>
            </h1>

            {/* Main Subtitle */}
            <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              <strong className="text-slate-950 font-bold">“શીખો આસાનીથી, સફળતા મેળવો નિશ્ચિત!”</strong>
              <br />
              શિક્ષક <strong className="text-slate-950 font-bold">વર્ષા જાની દવે</strong> દ્વારા ધોરણ ૭ થી ૧૨ ના વિદ્યાર્થીઓ માટે વિડિઓ લેક્ચર્સ, હસ્તલિખિત અભ્યાસ નોંધો (PDF), ઑનલાઇન મોક ટેસ્ટ અને બોર્ડ પરીક્ષાનું સચોટ માર્ગદર્શન.
            </p>

            {/* Features check list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-slate-800 justify-center lg:justify-start font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>સચોટ વિડિઓ લેક્ચર્સ</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>હસ્તલિખિત PDF નોંધો</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>ઑનલાઇન પ્રશ્નોત્તરી ટેસ્ટ</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/dhoran"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base shadow-lg shadow-amber-500/25 hover:scale-105 transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                અભ્યાસ શરૂ કરો
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/youtube"
                className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-base border border-slate-200 hover:border-rose-300 shadow-sm transition-all duration-300 group"
              >
                <div className="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                </div>
                યૂટ્યુબ ચેનલ જુઓ
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 border-t border-slate-100">
              <div>
                <strong className="text-slate-900 text-base block font-bold">૨૫,૦૦૦+</strong>
                વિદ્યાર્થીઓ જોડાયેલા
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <strong className="text-amber-800 text-base block font-bold">૧૫+ વર્ષ</strong>
                ભવ્ય શિક્ષણ અનુભવ
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <strong className="text-slate-900 text-base block font-bold">૫૦૦+</strong>
                બોર્ડ ટોપર્સ
              </div>
            </div>

          </div>

          {/* Right Column: Teacher Portrait Card with Floating Stats */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Main Card Container */}
              <div className="relative rounded-3xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xl space-y-4">
                
                {/* Teacher Photo */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/4.8] bg-slate-100 border border-slate-200">
                  <img
                    src={TEACHER_BIO.avatarUrl}
                    alt="વર્ષા જાની દવે - વિદ્યા વાણી એપ"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Photo Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-md text-center">
                    <h3 className="text-lg font-black text-slate-900 flex items-center justify-between">
                      <span>વર્ષા જાની દવે</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-300">
                        શિક્ષક
                      </span>
                    </h3>
                  </div>
                </div>

                {/* Floating pill 1: Board Experience */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">ગુજરાત શિક્ષણ બોર્ડ શ્રેષ્ઠ શિક્ષક સન્માન</p>
                    <p className="text-[11px] text-slate-500">૧૫+ વર્ષોથી હજારો વિદ્યાર્થીઓનું સફળ માર્ગદર્શન</p>
                  </div>
                </div>

              </div>

              {/* Floating Pill Bottom-Left */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xl flex items-center gap-3 z-20">
                <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-sm">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">૫૦,૦૦૦+ સબ્સ્ક્રાઇબર્સ</p>
                  <p className="text-[10px] text-slate-500">વિદ્યા વાણી યૂટ્યુબ ચેનલ</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
