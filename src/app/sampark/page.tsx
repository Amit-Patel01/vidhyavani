'use client';

import React, { useState } from 'react';
import {
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  HelpCircle,
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
          message: 'આપનો સંદેશ સફળતાપૂર્વક મોકલાઈ ગયો છે!',
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
        message: 'સંદેશ મોકલવામાં સમસ્યા આવી.',
      });
    }
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase">
          સંપર્ક
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          સંપર્ક કેન્દ્ર
        </h1>
        <p className="text-sm text-slate-600">
          અધિકૃત સંપર્ક વિગતો ટૂંક સમયમાં અહીં ઉપલબ્ધ થશે. આપ નીચે આપેલા ફોર્મ દ્વારા સંદેશ મોકલી શકો છો.
        </p>
      </div>

      {/* Clean Contact Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Status Card */}
        <div className="md:col-span-5 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">સંપર્ક માહિતી</h2>
            <p className="text-xs text-slate-500 mt-1">Coming Soon / ટૂંક સમયમાં</p>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            સત્તાવાર હેલ્પલાઇન અને કાર્યાલયનું સરનામું ટૂંક સમયમાં અહીં દર્શાવવામાં આવશે.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span className="text-xs text-slate-700 font-semibold">
              વિદ્યાર્થીઓ માટે ઑનલાઇન સહાય ૨૪x૭ ઉપલબ્ધ
            </span>
          </div>
        </div>

        {/* Right Side: Message Box */}
        <div className="md:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            ઓનલાઇન પૂછપરછ ફોર્મ
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
                નામ *
              </label>
              <input
                type="text"
                required
                placeholder="આપનું નામ"
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
                  placeholder="મોબાઇલ નંબર"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ધોરણ
                </label>
                <select
                  value={formData.dhoran}
                  onChange={(e) => setFormData({ ...formData, dhoran: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                >
                  {DHORAN_LIST.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                  <option value="સામાન્ય પૂછપરછ">સામાન્ય પૂછપરછ</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                સંદેશ / પ્રશ્ન *
              </label>
              <textarea
                required
                rows={3}
                placeholder="આપનો પ્રશ્ન અહીં લખો..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={status.submitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {status.submitting ? 'સંદેશ મોકલાઈ રહ્યો છે...' : 'સંદેશ મોકલો'}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
