import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Send,
  Sparkles,
  MessageCircle,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md shadow-amber-500/20 border border-amber-200 bg-white p-0.5 shrink-0">
                <img
                  src="/images/logo.png"
                  alt="વિદ્યા વાણી લોગો"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  વિદ્યા વાણી એપ
                </span>
                <p className="text-xs text-amber-700 font-bold">
                  શિક્ષક: વર્ષા જાની દવે
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>“શીખો આસાનીથી, સફળતા મેળવો નિશ્ચિત!”</strong>
              <br />
              ધોરણ ૭ થી ૧૨ ના વિદ્યાર્થીઓ માટે વિડિઓ લેક્ચર્સ, હસ્તલિખિત અભ્યાસ નોંધો (PDF), ઑનલાઇન મોક ટેસ્ટ અને બોર્ડ પરીક્ષાનું સંપૂર્ણ ડિજિટલ શિક્ષણ પ્લેટફોર્મ.
            </p>

            {/* Social Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-all duration-300 border border-rose-200"
                title="વિદ્યા વાણી યૂટ્યુબ ચેનલ"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all duration-300 border border-emerald-200"
                title="વોટ્સએપ સપોર્ટ"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <Link
                href="/sampark"
                className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-all duration-300 border border-amber-200"
                title="સંપર્ક કરો"
              >
                <Phone className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-slate-900 font-bold text-base border-b border-slate-200 pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              મુખ્ય લિંક્સ
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-800 transition-colors">
                  • મુખ્ય પૃષ્ઠ (Home)
                </Link>
              </li>
              <li>
                <Link href="/amara-vishe" className="hover:text-amber-800 transition-colors">
                  • અમારા વિશે (About Us)
                </Link>
              </li>
              <li>
                <Link href="/dhoran" className="hover:text-amber-800 transition-colors">
                  • ધોરણ ૭ થી ૧૨
                </Link>
              </li>
              <li>
                <Link href="/vishayo" className="hover:text-amber-800 transition-colors">
                  • તમામ વિષયો
                </Link>
              </li>
              <li>
                <Link href="/video-lecture" className="hover:text-amber-800 transition-colors">
                  • વિડિઓ લેક્ચર્સ
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational Resources */}
          <div className="space-y-4">
            <h3 className="text-slate-900 font-bold text-base border-b border-slate-200 pb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              શૈક્ષણિક સામગ્રી
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/abhyas-nondho" className="hover:text-amber-800 transition-colors">
                  • અભ્યાસ નોંધો (PDF)
                </Link>
              </li>
              <li>
                <Link href="/pariksha-taiyari" className="hover:text-amber-800 transition-colors">
                  • બોર્ડ IMP પ્રશ્નો
                </Link>
              </li>
              <li>
                <Link href="/prashnottari" className="hover:text-amber-800 transition-colors">
                  • ઑનલાઇન મોક ટેસ્ટ
                </Link>
              </li>
              <li>
                <Link href="/youtube" className="hover:text-amber-800 transition-colors">
                  • યૂટ્યુબ ક્લાસ
                </Link>
              </li>
              <li>
                <Link href="/pravesh" className="hover:text-amber-800 transition-colors">
                  • Login પેજ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-slate-900 font-bold text-base border-b border-slate-200 pb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-600" />
              સંપર્ક કેન્દ્ર
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              અધિકૃત સંપર્ક વિગતો ટૂંક સમયમાં અહીં ઉપલબ્ધ થશે.
            </p>
            <div className="pt-2">
              <Link
                href="/sampark"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition-all border border-amber-200 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                સંદેશ / પૂછપરછ મોકલો
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© ૨૦૨૬ વિદ્યા વાણી એપ. સર્વાધિકાર સુરક્ષિત.</p>
          <p className="flex items-center gap-1 font-semibold text-slate-700">
            મુખ્ય માર્ગદર્શક: <span className="text-amber-800 font-bold">વર્ષા જાની દવે</span> | સમર્પિત ડિજિટલ શિક્ષણ
          </p>
        </div>
      </div>
    </footer>
  );
}
