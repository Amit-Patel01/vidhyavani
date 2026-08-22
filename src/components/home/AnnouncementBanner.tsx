'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, ChevronRight } from 'lucide-react';
import { Announcement } from '@/lib/types';

interface AnnouncementBannerProps {
  announcements: Announcement[];
}

export default function AnnouncementBanner({ announcements }: AnnouncementBannerProps) {
  if (!announcements || announcements.length === 0) return null;
  const latest = announcements[0];

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-amber-900 font-semibold truncate">
          <span className="p-1 rounded-md bg-amber-200 text-amber-900 animate-pulse">
            <Bell className="w-4 h-4" />
          </span>
          <span className="font-bold text-slate-900">{latest.title}</span>
          <span className="hidden md:inline text-slate-600 font-normal">
            — {latest.message}
          </span>
        </div>

        <Link
          href="/pariksha-taiyari"
          className="flex items-center gap-1 text-amber-800 hover:text-amber-950 font-bold transition-colors shrink-0"
        >
          વિગત જુઓ
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
