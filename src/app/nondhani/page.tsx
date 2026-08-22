'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  UserPlus,
  BookOpen,
  Lock,
  Phone,
  Mail,
  User,
  GraduationCap,
} from 'lucide-react';
import { DHORAN_LIST } from '@/lib/seed-data';

export default function NondhaniPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    dhoran: 10,
    password: '',
    role: 'student',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        router.push(data.redirectTo || '/vidyarthi');
        router.refresh();
      } else {
        setErrorMessage(data.message || 'નોંધણી નિષ્ફળ રહી.');
      }
    } catch {
      setErrorMessage('સર્વર સાથે સંપર્ક થઈ શક્યો નથી.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-14 max-w-md mx-auto px-4 sm:px-6 space-y-8">
      
      {/* Brand Icon Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20">
          <BookOpen className="w-8 h-8 text-slate-950 font-bold" />
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          નવું વિદ્યાર્થી ખાતું બનાવો
        </h1>
        <p className="text-xs text-amber-700 font-bold">
          વિદ્યા વાણી એપ સાથે અભ્યાસની શરૂઆત કરો
        </p>
      </div>

      {/* Main Registration Card */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              વિદ્યાર્થીનું પૂરું નામ *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="દા.ત. આરવ પટેલ"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              મોબાઇલ નંબર *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                placeholder="દા.ત. 9876543210"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              ઇમેઇલ સરનામું *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              ધોરણ પસંદ કરો *
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={formData.dhoran}
                onChange={(e) => setFormData({ ...formData, dhoran: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              >
                {DHORAN_LIST.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.title})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              પાસવર્ડ બનાવો *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="ઓછામાં ઓછા ૬ અક્ષરો"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Primary Register Button in English as requested */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          પહેલેથી ખાતું છે?{' '}
          <Link href="/pravesh" className="text-amber-800 hover:underline font-bold">
            Login અહીં કરો
          </Link>
        </div>

      </div>

    </div>
  );
}
