'use client';

import React from 'react';
import { Eye, BookOpen, Sparkles } from 'lucide-react';
import { StudyNote } from '@/lib/types';

interface NotesCardProps {
  note: StudyNote;
  onView: (note: StudyNote) => void;
}

export default function NotesCard({ note, onView }: NotesCardProps) {
  return (
    <div className="group rounded-3xl bg-white border border-slate-200 hover:border-amber-400 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl flex flex-col justify-between p-6">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
            ધોરણ {note.dhoranId} • {note.subjectName}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {note.fileSize} • {note.pageCount} પાના
          </span>
        </div>

        {/* Note Title */}
        <h3
          onClick={() => onView(note)}
          className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
        >
          {note.title}
        </h3>

        {/* Chapter Name */}
        <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {note.chapterName}
        </p>

        {/* Key Highlights */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-1.5 mb-4">
          <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            મુખ્ય મુદ્દાઓ:
          </p>
          <ul className="text-xs text-slate-600 space-y-1">
            {note.summaryPoints.slice(0, 2).map((pt, i) => (
              <li key={i} className="line-clamp-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
          <span className="text-amber-600">✍</span> {note.teacherName}
        </div>

        <button
          onClick={() => onView(note)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-500 text-amber-800 hover:text-slate-950 font-bold text-xs border border-amber-200 transition-all shadow-sm"
        >
          <Eye className="w-3.5 h-3.5" />
          નોંધો વાંચો
        </button>
      </div>
    </div>
  );
}
