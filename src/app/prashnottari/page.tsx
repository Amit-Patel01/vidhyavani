'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { HelpCircle, Clock, ChevronRight } from 'lucide-react';
import { QUIZZES_LIST, DHORAN_LIST } from '@/lib/seed-data';
import InteractiveQuiz from '@/components/quiz/InteractiveQuiz';
import { QuizInfo } from '@/lib/types';

function PrashnottariContent() {
  const searchParams = useSearchParams();
  const requestedQuizId = searchParams.get('quizId');

  const defaultQuiz = requestedQuizId
    ? QUIZZES_LIST.find((q) => q.id === requestedQuizId) || QUIZZES_LIST[0]
    : null;

  const [activeQuiz, setActiveQuiz] = useState<QuizInfo | null>(defaultQuiz);
  const [selectedDhoran, setSelectedDhoran] = useState<number | null>(null);

  const filteredQuizzes = selectedDhoran
    ? QUIZZES_LIST.filter((q) => q.dhoranId === selectedDhoran)
    : QUIZZES_LIST;

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase">
          સ્વ-મૂલ્યાંકન પદ્ધતિ
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          ઑનલાઇન પ્રશ્નોત્તરી & મોક ટેસ્ટ
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          બહુવિકલ્પ પ્રશ્નો (MCQ), લાઈવ ટાઈમર અને તાત્કાલિક સ્કોર સાથે વિશ્લેષણ.
        </p>
      </div>

      {/* If a quiz is active, render interactive quiz engine */}
      {activeQuiz ? (
        <div className="space-y-4">
          <button
            onClick={() => setActiveQuiz(null)}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            ← બધી પ્રશ્નોત્તરીની યાદી પર પાછા જાઓ
          </button>
          <InteractiveQuiz quiz={activeQuiz} onFinish={() => {}} />
        </div>
      ) : (
        /* Quiz Selection Grid */
        <div className="space-y-8">
          
          {/* Dhoran filter */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedDhoran(null)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedDhoran === null
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              બધી પ્રશ્નોત્તરી
            </button>
            {DHORAN_LIST.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDhoran(d.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedDhoran === d.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
                      ધોરણ {quiz.dhoranId} • {quiz.subjectName}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-800 font-bold bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                      <Clock className="w-3.5 h-3.5" />
                      {quiz.durationMinutes} મિનિટ
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-slate-600">
                    {quiz.chapterName} માટેની મહત્ત્વની પ્રેક્ટિસ કસોટી.
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-500">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      કુલ પ્રશ્નો: <strong className="text-slate-900">{quiz.totalQuestions}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      પાસિંગ ગુણ: <strong className="text-slate-900">{quiz.passingMarks}%</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveQuiz(quiz)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-sm transition-all"
                >
                  <HelpCircle className="w-4 h-4" />
                  આ ટેસ્ટ શરૂ કરો
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}

export default function PrashnottariPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-amber-700 font-bold">
          પ્રશ્નોત્તરી પેજ લોડ થઈ રહ્યું છે...
        </div>
      }
    >
      <PrashnottariContent />
    </Suspense>
  );
}
