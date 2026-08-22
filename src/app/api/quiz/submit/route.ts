import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { QuizSubmission } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const {
      quizId,
      userId,
      userName,
      answers, // { [questionId: string]: number }
    } = await req.json();

    const quiz = db.quizzes.find((q) => q.id === quizId);
    if (!quiz) {
      return NextResponse.json(
        { success: false, message: 'ક્વિઝ મળી નથી.' },
        { status: 404 }
      );
    }

    let correctCount = 0;
    let wrongCount = 0;
    let obtainedMarks = 0;
    const totalMarks = quiz.questions.reduce((sum, q) => sum + q.points, 0);

    const questionResults = quiz.questions.map((q) => {
      const selectedOptionIndex = answers[q.id];
      const isCorrect = selectedOptionIndex === q.correctAnswerIndex;
      if (isCorrect) {
        correctCount++;
        obtainedMarks += q.points;
      } else {
        wrongCount++;
      }
      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        selectedOptionIndex,
        correctAnswerIndex: q.correctAnswerIndex,
        isCorrect,
        explanation: q.explanation,
        points: isCorrect ? q.points : 0,
      };
    });

    const percentage = Math.round((obtainedMarks / (totalMarks || 100)) * 100);

    const submission: QuizSubmission = {
      id: `sub-${Date.now()}`,
      quizId,
      userId: userId || 'guest',
      userName: userName || 'વિદ્યાર્થી',
      dhoranId: quiz.dhoranId,
      subjectName: quiz.subjectName,
      chapterName: quiz.chapterName,
      totalQuestions: quiz.totalQuestions,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      obtainedMarks,
      totalMarks,
      percentage,
      submittedAt: new Date().toLocaleDateString('gu-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    db.addSubmission(submission);

    return NextResponse.json({
      success: true,
      message: 'પ્રશ્નોત્તરી સફળતાપૂર્વક પૂર્ણ થઈ!',
      submission,
      questionResults,
      isPassed: percentage >= quiz.passingMarks,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'પરિણામ ગણવામાં ભૂલ થઈ.' },
      { status: 500 }
    );
  }
}
