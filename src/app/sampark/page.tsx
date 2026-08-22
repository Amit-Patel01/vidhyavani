'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { DHORAN_LIST } from '@/lib/seed-data';

export default function SamparkPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    dhoran: 'ધોરણ ૧૦',
    message: '',
  });

  const [status, setStatus] = useState<{
    submitting: boolean;
    success: boolean;
    message: string;
  }>({
    submitting: false,
    success: false,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus({
          submitting: false,
          success: true,
          message: 'આપનો સંદેશ સફળતાપૂર્વક મોકલાઈ ગયો છે! અમારી ટીમ ટૂંક સમયમાં સંપર્ક કરશે.',
        });
        setFormData({
          name: '',
          mobile: '',
          email: '',
          dhoran: 'ધોરણ ૧૦',
          message: '',
        });
      } else {
        setStatus({
          submitting: false,
          success: false,
          message: data.message || 'કૃપા કરીને બધી જરૂરી વિગતો ભરો.',
        });
      }
    } catch {
      setStatus({
        submitting: false,
        success: false,
        message: 'સંદેશ મોકલવામાં સમસ્યા આવી. કૃપા કરીને ફરી પ્રયાસ કરો.',
      });
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase">
          સહાય અને માર્ગદર્શન
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          અમારો સંપર્ક કરો
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          અભ્યાસક્રમ, વિડિઓ લેક્ચર્સ અથવા નોંધો અંગે કોઈ પણ પ્રશ્ન હોય તો વિના સંકોચે સંપર્ક કરો.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Information & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              સંપર્ક વિગતો
            </h2>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">સરનામું:</strong>
                  <span>વિદ્યા વાણી એકેડેમી, સેટેલાઇટ રોડ, અમદાવાદ, ગુજરાત - ૩૮૦૦૧૫.</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Phone className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-bold">હેલ્પલાઇન:</strong>
                  <span>+૯૧ ૯૮૭૬૫ ૪૩૨૧૦</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Mail className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-bold">ઇમેઇલ:</strong>
                  <span>contact@vidhyavani.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-bold">સમય:</strong>
                  <span>સોમવાર થી શનિવાર: સવારે ૯:૦૦ થી સાંજે ૭:૦૦</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="pt-4 border-t border-slate-100">
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-sm transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                વોટ્સએપ પર સીધી વાતચીત કરો
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">
              સંદેશ મોકલો
            </h2>

            {status.message && (
              <div
                className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                  status.success
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {status.success && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  વિદ્યાર્થી / વાલીનું નામ *
                </label>
                <input
                  type="text"
                  required
                  placeholder="દા.ત. રમેશભાઈ પટેલ"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    મોબાઇલ નંબર *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="દા.ત. 9876543210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ઇમેઇલ (મરજિયાત)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ધોરણ પસંદ કરો
                </label>
                <select
                  value={formData.dhoran}
                  onChange={(e) => setFormData({ ...formData, dhoran: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                >
                  {DHORAN_LIST.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.title})
                    </option>
                  ))}
                  <option value="વાલી / સામાન્ય પૂછપરછ">વાલી / સામાન્ય પૂછપરછ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  આપનો પ્રશ્ન અથવા સંદેશ *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="અહીં આપનો સંદેશ લખો..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={status.submitting}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {status.submitting ? 'સંદેશ મોકલાઈ રહ્યો છે...' : 'સંદેશ મોકલો'}
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
