'use client';

import React from 'react';
import {
  Video,
  FileText,
  HelpCircle,
  Trophy,
  Sparkles,
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      title: 'સચોટ વિડિઓ લેક્ચર્સ',
      description: 'દરેક પ્રકરણની સરળ, રસપ્રદ અને સંકલ્પનાત્મક સમજૂતી આપતા ઉચ્ચ ગુણવત્તાવાળા વિડિઓઝ.',
      icon: <Video className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-200',
    },
    {
      title: 'હસ્તલિખિત અભ્યાસ નોંધો (PDF)',
      description: 'પરીક્ષા લક્ષી રિવિઝન માટે હાથથી લખેલી ટૂંકી નોંધો, IMP પ્રશ્નો અને ડાઉનલોડ કરી શકાય તેવી PDF.',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50 border-blue-200',
    },
    {
      title: 'ઑનલાઇન મોક પ્રશ્નોત્તરી',
      description: 'સમય મર્યાદા સાથે MCQ કસોટીઓ, ત્વરિત ગુણ અને સાચા જવાબોની વિસ્તૃત સમજૂતી.',
      icon: <HelpCircle className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-200',
    },
    {
      title: 'બોર્ડ પરીક્ષા વિશેષ માર્ગદર્શન',
      description: 'ગત વર્ષોના પ્રશ્નપત્રો, બ્લૂપ્રિન્ટ આધારિત તૈયારી અને બોર્ડમાં ૯૦%+ લાવવાની સચોટ રણનીતિ.',
      icon: <Trophy className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-50 border-purple-200',
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            મુખ્ય વિશેષતાઓ
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            વિદ્યા વાણી એપ શા માટે શ્રેષ્ઠ છે?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            ગુજરાતી માધ્યમના વિદ્યાર્થીઓ માટે સૌથી સરળ અને પરિણામલક્ષી ડિજિટલ શિક્ષણ વ્યવસ્થા.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-lg space-y-4 group"
            >
              <div className={`w-14 h-14 rounded-2xl border ${f.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                {f.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
