import React from 'react';
import {
  Sparkles,
  Heart,
  Target,
  CheckCircle,
} from 'lucide-react';
import { TEACHER_BIO } from '@/lib/seed-data';

export default function AmaraVishePage() {
  return (
    <div className="py-12 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase">
          અમારા વિશે
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
          વિદ્યા વાણી પરિચય અને અમારો સંકલ્પ
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          “જ્ઞાન અને નિશ્ચિત સફળતા તરફ” — ગુજરાતના દરેક વિદ્યાર્થી સુધી ગુણવત્તાસભર ડિજિટલ શિક્ષણ પહોંચાડવાનો અવિરત પ્રયાસ.
        </p>
      </div>

      {/* Teacher Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm">
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-slate-200 shadow-md max-w-sm">
            <img
              src={TEACHER_BIO.avatarUrl}
              alt={TEACHER_BIO.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-4 text-center">
              <h3 className="text-xl font-bold text-white">{TEACHER_BIO.name}</h3>
              <p className="text-xs text-amber-300 font-semibold">{TEACHER_BIO.title}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            મુખ્ય માર્ગદર્શક: {TEACHER_BIO.name}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            વર્ષા જાની દવે માધ્યમિક અને ઉચ્ચતર માધ્યમિક શિક્ષણ ક્ષેત્રે સમર્પિત સેવા આપી રહ્યા છે. તેમની સરળ, રસપ્રદ અને સંકલ્પનાત્મક શિક્ષણ પદ્ધતિ દ્વારા વિદ્યાર્થીઓ બોર્ડ પરીક્ષાઓમાં શ્રેષ્ઠ પરિણામ મેળવીને ઉત્કૃષ્ટ સફળતા હાંસલ કરે છે.
          </p>

          <div className="space-y-2">
            <p className="text-xs font-bold text-amber-800 uppercase">મુખ્ય સિદ્ધિઓ:</p>
            <ul className="space-y-2 text-sm text-slate-700">
              {TEACHER_BIO.achievements.map((a, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">અમારું લક્ષ્ય</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            ગુજરાતના ખૂણે ખૂણે પહોંચીને દરેક વિદ્યાર્થીને સરળ ગુજરાતી ભાષામાં શ્રેષ્ઠ શિક્ષણ અને બોર્ડ પરીક્ષાનું સચોટ માર્ગદર્શન આપવું.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">અમારો સંકલ્પ</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            ગોખણપટ્ટી મુક્ત સંકલ્પનાત્મક શિક્ષણ આપી વિદ્યાર્થીઓમાં આત્મવિશ્વાસ વધારવો અને ટોપર્સ બનાવવાનો માર્ગ સરળ કરવો.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">અમારા મૂલ્યો</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            સમર્પણ, પ્રામાણિકતા, ગુણવત્તા અને વિદ્યાર્થી-કેન્દ્રી અભિગમ સાથે ઉત્કૃષ્ટ શિક્ષણનું નિર્માણ.
          </p>
        </div>
      </div>

    </div>
  );
}
