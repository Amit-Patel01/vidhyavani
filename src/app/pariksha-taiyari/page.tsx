'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Award,
  Sparkles,
  Download,
  HelpCircle,
} from 'lucide-react';
import { IMP_QUESTIONS_LIST } from '@/lib/seed-data';

export default function ParikshaTaiyariPage() {
  const [selectedDhoran, setSelectedDhoran] = useState<number>(10);

  const filteredQuestions = IMP_QUESTIONS_LIST.filter((q) => q.dhoranId === selectedDhoran);

  const tipsList = [
    {
      title: 'સમય વ્યવસ્થાપન (Time Management)',
      desc: '૮૦ ગુણના પેપર માટે ૧૮૦ મિનિટની ફાળવણી: વિભાગ A (૩૦ મિનિટ), વિભાગ B (૪૫ મિનિટ), વિભાગ C (૪૫ મિનિટ), વિભાગ D (૪૫ મિનિટ) અને ૧૫ મિનિટ પુનરાવર્તન માટે.',
    },
    {
      title: 'સુંદર હસ્તાક્ષર અને પેપર પ્રેઝન્ટેશન',
      desc: 'દરેક નવો વિભાગ નવા પાના પર શરૂ કરો. મુખ્ય મુદ્દાઓ, વ્યાખ્યાઓ અને સૂત્રો નીચે કાળી કે વાદળી પેનથી અંડરલાઈન કરો.',
    },
    {
      title: 'વ્યાકરણ વિભાગમાં ૧૦૦% ગુણ',
      desc: 'જોડણીના નિયમો, સમાસ, સંધિ અને છંદનું રોજેરોજ ૧૫ મિનિટ પુનરાવર્તન કરો જેથી રોકડા ગુણ મેળવી શકાય.',
    },
    {
      title: 'પરીક્ષા પૂર્વે માનસિક શાંતિ',
      desc: 'પરીક્ષાની આગલી રાત્રે પૂરતી ૭ કલાકની ઊંઘ લો. પરીક્ષા ખંડમાં શાંત ચિત્તે ૫ મિનિટ ઊંડા શ્વાસ લો.',
    },
  ];

  const modelPapers = [
    { title: 'ધોરણ ૧૦ બોર્ડ મોડેલ પ્રશ્નપત્ર ૨૦૨૬', size: '૧.૮ MB', year: '૨૦૨૬ તાજેતરનું' },
    { title: 'ધોરણ ૧૦ ગણિત બ્લૂપ્રિન્ટ અને આદર્શ ઉત્તરવહી', size: '૨.૨ MB', year: '૨૦૨૬ તાજેતરનું' },
    { title: 'ધોરણ ૧૨ વાર્ષિક બોર્ડ પરીક્ષા પ્રશ્નપત્ર સોલ્યુશન', size: '૨.૫ MB', year: '૨૦૨૫' },
    { title: 'ધોરણ ૧૨ નામાનાં મૂળતત્ત્વો IMP પ્રેક્ટિસ પેપર', size: '૩.૦ MB', year: '૨૦૨૬ તાજેતરનું' },
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase">
          બોર્ડ પરીક્ષા વિશેષ
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          પરીક્ષા તૈયારી અને ટોપર્સ માર્ગદર્શન
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          IMP પ્રશ્ન બેંક, બ્લૂપ્રિન્ટ, આદર્શ ઉત્તરવહી અને પરીક્ષામાં ૯૦%+ લાવવાની સચોટ ટિપ્સ.
        </p>
      </div>

      {/* Dhoran Selector */}
      <div className="flex justify-center gap-3 flex-wrap">
        {[10, 12, 9, 8, 7].map((num) => (
          <button
            key={num}
            onClick={() => setSelectedDhoran(num)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              selectedDhoran === num
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            ધોરણ {num} {num === 10 ? '(SSC)' : num === 12 ? '(HSC)' : ''}
          </button>
        ))}
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: IMP Questions List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              ધોરણ {selectedDhoran} મોસ્ટ IMP પ્રશ્ન બેંક
            </h2>
            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">
              બોર્ડ પરીક્ષા ૨૦૨૬
            </span>
          </div>

          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 transition-all space-y-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-amber-300">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-amber-800">
                        {q.subjectName} • {q.chapterName}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                        {q.question}
                      </h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 text-xs font-bold shrink-0 border border-slate-200">
                    {q.marks} ગુણ
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    વારંવાર પૂછાતો અગત્યનો પ્રશ્ન
                  </span>
                  <Link
                    href={`/abhyas-nondho?dhoran=${selectedDhoran}`}
                    className="text-amber-800 hover:text-amber-950 font-bold"
                  >
                    જવાબ જુઓ →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Model Papers */}
          <div className="pt-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Download className="w-5 h-5 text-amber-600" />
              પાછલા વર્ષોના પેપર્સ અને મોડેલ પ્રશ્નપત્રો
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {modelPapers.map((paper, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between hover:border-amber-400 transition-all shadow-sm"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">{paper.title}</h4>
                    <p className="text-[11px] text-slate-500">{paper.size} • {paper.year}</p>
                  </div>
                  <button
                    onClick={() => alert('મોડેલ પ્રશ્નપત્ર ડાઉનલોડ થઈ રહ્યું છે...')}
                    className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-500 text-amber-800 hover:text-slate-950 font-bold text-xs transition-all shrink-0 ml-2 border border-amber-200 shadow-sm"
                    title="પેપર ડાઉનલોડ કરો"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tips & Mock Test CTA */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Quiz Card */}
          <div className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-sm">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">લાઈવ મોક ટેસ્ટ આપો</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              લાઈવ કાઉન્ટડાઉન ટાઈમર સાથે તમારી ઝડપ અને ચોકસાઈ ચકાસો.
            </p>
            <Link
              href="/prashnottari"
              className="block w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-center font-bold text-xs shadow-sm transition-all"
            >
              ઑનલાઇન પ્રશ્નોત્તરી શરૂ કરો
            </Link>
          </div>

          {/* Exam Tips */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              શિક્ષક વર્ષા દવે ની પરીક્ષા ટિપ્સ
            </h3>

            <div className="space-y-3 text-xs">
              {tipsList.map((tip, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-bold text-amber-900">{tip.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
