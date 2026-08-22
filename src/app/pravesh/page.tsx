'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LogIn,
  Lock,
  Phone,
} from 'lucide-react';

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

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-xl space-y-8">
        
        {/* Brand Icon Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden shadow-md shadow-amber-500/20 border border-amber-200 bg-white p-1">
            <img
              src="/images/logo.png"
              alt="વિદ્યા વાણી લોગો"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            વિદ્યા વાણી માં Login કરો
          </h1>
          <p className="text-xs text-amber-700 font-bold">
            “શીખો આસાનીથી, સફળતા મેળવો નિશ્ચિત!”
          </p>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold text-center animate-shake">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
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
                placeholder="૯૮૭૬૫ ૪૩૨૧૦ અથવા ઇમેઇલ"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                પાસવર્ડ
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="આપનો પાસવર્ડ દાખલ કરો"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 hover:scale-[1.01] transition-all disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'તપાસ થઈ રહી છે...' : 'Login'}
          </button>
        </form>

        {/* Link to Register in English */}
        <div className="pt-2 text-center text-xs text-slate-500">
          નવા વિદ્યાર્થી છો?{' '}
          <Link href="/nondhani" className="text-amber-800 hover:underline font-bold">
            Register અહીં કરો
          </Link>
        </div>

      </div>

    </div>
  );
}
