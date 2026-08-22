'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  Menu,
  X,
  LogOut,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
  Briefcase,
  ChevronDown,
} from 'lucide-react';
import { User } from '@/lib/types';
import { getRoleDisplayName, getRoleHomeRoute } from '@/lib/auth';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setUserDropdownOpen(false);
    router.push('/pravesh');
    router.refresh();
  };

  const navLinks = [
    { name: 'મુખ્ય પૃષ્ઠ', href: '/' },
    { name: 'અમારા વિશે', href: '/amara-vishe' },
    { name: 'ધોરણ ૭ થી ૧૨', href: '/dhoran' },
    { name: 'વિષયો', href: '/vishayo' },
    { name: 'વિડિઓ લેક્ચર્સ', href: '/video-lecture' },
    { name: 'અભ્યાસ નોંધો (PDF)', href: '/abhyas-nondho' },
    { name: 'પરીક્ષા તૈયારી', href: '/pariksha-taiyari' },
    { name: 'પ્રશ્નોત્તરી', href: '/prashnottari' },
    { name: 'યૂટ્યુબ', href: '/youtube' },
    { name: 'સંપર્ક', href: '/sampark' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300 border border-amber-200 bg-white p-0.5 shrink-0">
              <img
                src="/images/logo.png"
                alt="વિદ્યા વાણી એપ લોગો"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                વિદ્યા વાણી
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  એપ
                </span>
              </span>
              <span className="text-[11px] text-amber-700 font-bold">
                શિક્ષક: વર્ષા જાની દવે
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Gujarati) */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'text-amber-800 bg-amber-50 border border-amber-200'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Login / Register Buttons in English */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-3 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all text-left shadow-sm"
                >
                  <img
                    src={user.avatar || '/images/varsha-jani-dave.png'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-amber-400 bg-white object-cover object-top"
                  />
                  <div className="hidden lg:block">
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{user.name}</p>
                    <p className="text-[11px] text-amber-700 font-semibold">{getRoleDisplayName(user.role)}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-modal">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">લોગ ઇન:</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                      <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold border border-amber-200">
                        {getRoleDisplayName(user.role)}
                      </span>
                    </div>

                    <Link
                      href={getRoleHomeRoute(user.role)}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-amber-600" />
                      મુખ્ય પેનલ
                    </Link>

                    {user.role === 'super_admin' && (
                      <Link
                        href="/sanchalak"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        સંચાલક પેનલ
                      </Link>
                    )}

                    {user.role === 'teacher' && (
                      <Link
                        href="/shikshak"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                      >
                        <Briefcase className="w-4 h-4 text-sky-600" />
                        શિક્ષક પેનલ
                      </Link>
                    )}

                    {user.role === 'student' && (
                      <Link
                        href="/vidyarthi"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                      >
                        <GraduationCap className="w-4 h-4 text-amber-600" />
                        વિદ્યાર્થી પેનલ
                      </Link>
                    )}

                    <div className="border-t border-slate-100 mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        બહાર નીકળો (Logout)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2.5">
                <Link
                  href="/pravesh"
                  className="px-4 py-2 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all shadow-sm"
                >
                  Login
                </Link>
                <Link
                  href="/nondhani"
                  className="px-4 py-2 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center space-x-2">
            {user && (
              <Link
                href={getRoleHomeRoute(user.role)}
                className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1"
              >
                <LayoutDashboard className="w-4 h-4" />
                પેનલ
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 focus:outline-none"
              aria-label="મુખ્ય મેનૂ"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 max-h-[80vh] overflow-y-auto shadow-xl">
          {user ? (
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar || '/images/varsha-jani-dave.png'}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border border-amber-400 bg-white object-cover object-top"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">{user.name}</p>
                  <p className="text-xs text-amber-700 font-semibold">{getRoleDisplayName(user.role)}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg"
              >
                બહાર નીકળો
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Link
                href="/pravesh"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-xl text-sm font-bold text-slate-800 bg-slate-100 border border-slate-200"
              >
                Login
              </Link>
              <Link
                href="/nondhani"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 shadow-md"
              >
                Register
              </Link>
            </div>
          )}

          {/* Nav Items */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {user && (
            <div className="pt-3 border-t border-slate-100">
              <Link
                href={getRoleHomeRoute(user.role)}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-md"
              >
                <LayoutDashboard className="w-5 h-5" />
                મુખ્ય ડેશબોર્ડ પર જાઓ
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
