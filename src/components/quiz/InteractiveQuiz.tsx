'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { QuizInfo } from '@/lib/types';

interface InteractiveQuizProps {
  quiz: QuizInfo;
  onFinish?: () => void;
}

export default function InteractiveQuiz({ quiz, onFinish }: InteractiveQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(quiz.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const currentQ = quiz.questions[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round((answeredCount / quiz.questions.length) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: index,
    }));
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: quiz.id,
          answers: selectedAnswers,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResultData(data);
        setIsSubmitted(true);
        if (data.isPassed) {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
    } catch {
      alert('પ્રશ્નોત્તરી સબમિટ કરવામાં સમસ્યા આવી.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeft(quiz.durationMinutes * 60);
    setIsSubmitted(false);
    setResultData(null);
  };

  // Result View
  if (isSubmitted && resultData) {
    const sub = resultData.submission;
    const isPassed = resultData.isPassed;

    return (
      <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl space-y-8 animate-modal">
        {/* Result Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600">
            {isPassed ? <Trophy className="w-12 h-12 text-amber-500" /> : <Award className="w-12 h-12 text-slate-400" />}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isPassed ? 'અભિનંદન! આપ સફળતાપૂર્વક પાસ થયા છો 🎉' : 'સારો પ્રયાસ! વધુ મહેનત કરો 💪'}
          </h2>
          <p className="text-sm text-slate-600 font-semibold">{quiz.title}</p>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <p className="text-xs text-slate-500 mb-1 font-semibold">કુલ ગુણ</p>
            <p className="text-2xl font-black text-slate-900">{sub.totalMarks}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <p className="text-xs text-slate-500 mb-1 font-semibold">મેળવેલ ગુણ</p>
            <p className="text-2xl font-black text-amber-600">{sub.obtainedMarks}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <p className="text-xs text-slate-500 mb-1 font-semibold">સાચા જવાબો</p>
            <p className="text-2xl font-black text-emerald-600">{sub.correctAnswers}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <p className="text-xs text-slate-500 mb-1 font-semibold">ટકાવારી</p>
            <p className="text-2xl font-black text-blue-600">{sub.percentage}%</p>
          </div>
        </div>

        {/* Question Review Section */}
        <div className="space-y-6 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            પ્રશ્નવાર ઉત્તર સમીક્ષા અને સાચી સમજૂતી
          </h3>

          <div className="space-y-4">
            {resultData.questionResults?.map((qr: any, idx: number) => (
              <div
                key={qr.questionId}
                className={`p-5 rounded-2xl border transition-all ${
                  qr.isCorrect
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-rose-50/50 border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      {qr.question}
                    </h4>
                  </div>
                  {qr.isCorrect ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> સાચો જવાબ
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold flex items-center gap-1 shrink-0">
                      <XCircle className="w-3.5 h-3.5" /> ખોટો જવાબ
                    </span>
                  )}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3 pl-8">
                  {qr.options.map((opt: string, oIdx: number) => {
                    const isUserChoice = qr.selectedOptionIndex === oIdx;
                    const isCorrectAnswer = qr.correctAnswerIndex === oIdx;

                    let optClass = 'bg-white border-slate-200 text-slate-700';
                    if (isCorrectAnswer) {
                      optClass = 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold';
                    } else if (isUserChoice && !qr.isCorrect) {
                      optClass = 'bg-rose-100 border-rose-300 text-rose-900 font-bold';
                    }

                    return (
                      <div key={oIdx} className={`p-2.5 rounded-xl border flex items-center gap-2 ${optClass}`}>
                        <span className="w-4 h-4 rounded-full bg-slate-100 text-[10px] flex items-center justify-center font-bold">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                        {isCorrectAnswer && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {qr.explanation && (
                  <div className="ml-8 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <strong className="text-amber-800">સમજૂતી: </strong>
                    {qr.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            ફરીથી ટેસ્ટ આપો
          </button>
          
          <a
            href="/pariksha-taiyari"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
          >
            પરીક્ષા તૈયારી જુઓ
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // Active Quiz View
  return (
    <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl space-y-6">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="px-3 py-1 rounded-md bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
            ધોરણ {quiz.dhoranId} • {quiz.subjectName}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1.5 truncate max-w-sm sm:max-w-md">
            {quiz.title}
          </h2>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm border ${
          timeLeft <= 120 ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse' : 'bg-slate-50 text-amber-800 border-slate-200'
        }`}>
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-500 font-semibold">
          <span>પ્રશ્ન {currentQuestionIndex + 1} / {quiz.questions.length}</span>
          <span>પૂર્ણ: {progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 text-sm font-black flex items-center justify-center shrink-0">
            {currentQuestionIndex + 1}
          </span>
          <h3 className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQ.id] === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl text-left text-sm font-semibold transition-all duration-200 flex items-center gap-3 border ${
                  isSelected
                    ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs disabled:opacity-40 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          પાછલો પ્રશ્ન
        </button>

        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.min(quiz.questions.length - 1, prev + 1))}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
          >
            આગલો પ્રશ્ન
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmitQuiz}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 px-7 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
          >
            {isSubmitting ? 'પરિણામ તૈયાર થઈ રહ્યું છે...' : 'ટેસ્ટ પૂર્ણ કરો અને સબમિટ કરો'}
          </button>
        )}
      </div>
    </div>
  );
}
