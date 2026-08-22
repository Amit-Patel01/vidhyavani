'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LogIn,
  BookOpen,
  Lock,
  Phone,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { UserRole } from '@/lib/types';

export default function PraveshPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push(data.redirectTo || '/vidyarthi');
        router.refresh();
      } else {
        setErrorMessage(data.message || 'પ્રવેશ નિષ્ફળ રહ્યો. કૃપા કરીને વિગતો તપાસો.');
      }
    } catch {
      setErrorMessage('સર્વર સાથે સંપર્ક થઈ શક્યો નથી.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (role: UserRole) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ demoRole: role }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(data.redirectTo || '/vidyarthi');
        router.refresh();
      } else {
        setErrorMessage(data.message || 'ડેમો પ્રવેશ નિષ્ફળ.');
      }
    } catch {
      setErrorMessage('ડેમો પ્રવેશ નિષ્ફળ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-14 max-w-md mx-auto px-4 sm:px-6 space-y-8">
      
      {/* Brand Icon Header */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 mx-auto rounded-3xl overflow-hidden shadow-lg shadow-amber-500/20 border border-amber-200 bg-white p-1">
          <img
            src="/images/logo.png"
            alt="વિદ્યા વાણી લોગો"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          વિદ્યા વાણી માં Login કરો
        </h1>
        <p className="text-xs text-amber-700 font-bold">
          “શીખો આસાનીથી, સફળતા મેળવો નિશ્ચિત!”
        </p>
      </div>

      {/* Main Login Card */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              મોબાઇલ નંબર અથવા ઇમેઇલ
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="દા.ત. 9876543212 અથવા student@vidhyavani.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              પાસવર્ડ
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Primary Login Button in English as requested */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Quick Demo Test Logins */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              ૧-ક્લિક ડેમો પરીક્ષણ પ્રવેશ:
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student')}
              className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-slate-700 flex items-center gap-2 transition-all text-left"
            >
              <GraduationCap className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-900 text-xs">વિદ્યાર્થી</p>
                <p className="text-[10px] text-slate-500">ધોરણ ૧૦ ડેમો</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('teacher')}
              className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-400 text-slate-700 flex items-center gap-2 transition-all text-left"
            >
              <Briefcase className="w-4 h-4 text-sky-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-900 text-xs">શિક્ષક</p>
                <p className="text-[10px] text-slate-500">વર્ષા દવે</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('super_admin')}
              className="col-span-2 p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 text-slate-700 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-slate-900 text-xs">મુખ્ય સંચાલક</p>
                  <p className="text-[10px] text-slate-500">સંપૂર્ણ કંટ્રોલ પેનલ</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Link to Register in English */}
        <div className="pt-2 text-center text-xs text-slate-500">
          ખાતું નથી?{' '}
          <Link href="/nondhani" className="text-amber-800 hover:underline font-bold">
            Register અહીં કરો
          </Link>
        </div>

      </div>

    </div>
  );
}
