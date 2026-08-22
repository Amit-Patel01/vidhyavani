import React from 'react';
import { BookOpen, Video, FileText, HelpCircle } from 'lucide-react';

export default function StatsSection() {
  const highlights = [
    { label: 'ધોરણ ૭ થી ૧૨ અભ્યાસક્રમ', value: 'ધોરણ ૭-૧૨', icon: <BookOpen className="w-6 h-6 text-amber-600" /> },
    { label: 'વિષયવાર વિડિઓ લેક્ચર્સ', value: 'વિડિઓઝ', icon: <Video className="w-6 h-6 text-blue-600" /> },
    { label: 'હસ્તલિખિત અભ્યાસ નોંધો', value: 'PDF નોંધો', icon: <FileText className="w-6 h-6 text-emerald-600" /> },
    { label: 'સ્વ-મૂલ્યાંકન મોક કસોટીઓ', value: 'પ્રશ્નોત્તરી', icon: <HelpCircle className="w-6 h-6 text-purple-600" /> },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 hover:border-amber-400 transition-all shadow-xs"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                {s.icon}
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                {s.value}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
