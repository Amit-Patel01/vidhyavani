import React from 'react';
import { Users, GraduationCap, Video, Trophy } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    { label: 'સક્રિય વિદ્યાર્થીઓ', value: '૨૫,૦૦૦+', icon: <Users className="w-6 h-6 text-amber-600" /> },
    { label: 'વિડિઓ લેક્ચર્સ', value: '૫૦૦+', icon: <Video className="w-6 h-6 text-blue-600" /> },
    { label: 'બોર્ડ ટોપર્સ', value: '૫૦૦+', icon: <Trophy className="w-6 h-6 text-emerald-600" /> },
    { label: 'સંતોષકારક પરિણામ', value: '૧૦૦%', icon: <GraduationCap className="w-6 h-6 text-purple-600" /> },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 hover:border-amber-400 transition-all shadow-sm"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                {s.icon}
              </div>
              <h4 className="text-2xl sm:text-3xl font-black text-slate-900">
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
