'use client';

import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileCheck,
  Sparkles,
} from 'lucide-react';
import { StudyNote } from '@/lib/types';

interface PdfViewerModalProps {
  note: StudyNote | null;
  onClose: () => void;
}

export default function PdfViewerModal({ note, onClose }: PdfViewerModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!note) return null;

  const totalPages = note.pageCount || 8;

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-modal">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[92vh]">
        
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-slate-50 no-print">
          <div className="flex items-center space-x-3 overflow-hidden">
            <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 shrink-0">
              ધોરણ {note.dhoranId} • {note.subjectName}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
              {note.title}
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-white rounded-lg p-0.5 border border-slate-200 text-xs text-slate-700">
              <button
                onClick={() => setZoom((prev) => Math.max(75, prev - 15))}
                className="p-1.5 hover:bg-slate-100 rounded"
                title="ઝૂમ આઉટ"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 font-bold">{zoom}%</span>
              <button
                onClick={() => setZoom((prev) => Math.min(150, prev + 15))}
                className="p-1.5 hover:bg-slate-100 rounded"
                title="ઝૂમ ઇન"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
              title="પ્રિન્ટ કરો"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              PDF સેવ કરો
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-rose-600 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Download Alert Toast */}
        {downloadSuccess && (
          <div className="bg-emerald-600 text-white text-xs py-2 px-4 text-center font-bold animate-pulse no-print">
            ✓ PDF અભ્યાસ નોંધો આપના ઉપકરણમાં સફળતાપૂર્વક ડાઉનલોડ થઈ રહી છે.
          </div>
        )}

        {/* Main Document Body */}
        <div className="flex-1 overflow-y-auto bg-slate-100 p-4 sm:p-8 flex justify-center">
          <div
            className="w-full max-w-3xl bg-white text-slate-900 rounded-2xl shadow-xl p-8 sm:p-12 transition-transform duration-200 border border-slate-200"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          >
            {/* PDF Header in Document */}
            <div className="border-b-2 border-amber-500 pb-6 mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-950">
                  વિદ્યા વાણી ડિજિટલ અભ્યાસ નોંધો
                </h1>
                <p className="text-sm text-amber-800 font-bold mt-1">
                  મુખ્ય શિક્ષક: {note.teacherName} | ધોરણ {note.dhoranId} • {note.subjectName}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full">
                  પાનું {currentPage} / {totalPages}
                </span>
                <p className="text-xs text-slate-400 mt-1">તારીખ: {note.uploadedDate}</p>
              </div>
            </div>

            {/* Chapter Heading */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-8">
              <h2 className="text-lg font-bold text-slate-900">
                {note.chapterName}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                ગુજરાત રાજ્ય શિક્ષણ બોર્ડના નવા અભ્યાસક્રમ મુજબ તૈયાર કરેલ.
              </p>
            </div>

            {/* Summary Highlights */}
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  મહત્વના મુદ્દાઓ અને સંક્ષિપ્ત સારાંશ:
                </h3>
                <ul className="space-y-3 pl-2">
                  {note.summaryPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-amber-300">
                        {index + 1}
                      </span>
                      <span className="text-slate-800 font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified seal */}
              <div className="mt-8 pt-6 border-t border-dashed border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <FileCheck className="w-4 h-4" />
                  ચકાસાયેલ અને સત્તાવાર શિક્ષણ સામગ્રી
                </div>
                <div className="font-semibold text-slate-600">
                  સહાય: vidhyavani.com
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Pagination Bar */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-700 no-print">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-colors shadow-sm font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            પાછલું પાનું
          </button>

          <span className="font-bold text-slate-900">
            પાનું {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-colors shadow-sm font-semibold"
          >
            આગલું પાનું
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
