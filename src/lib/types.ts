export type UserRole = 'super_admin' | 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  role: UserRole;
  dhoran?: number; // 7 to 12 (for students)
  subjectSpecialty?: string; // (for teachers)
  avatar?: string;
  isActive: boolean;
  joinedDate: string;
}

export interface DhoranInfo {
  id: number;
  name: string; // e.g. "ધોરણ ૧૦"
  title: string;
  description: string;
  badge: string;
  subjectsCount: number;
  iconName: string;
  color: string;
}

export interface SubjectInfo {
  id: string;
  dhoranId: number;
  name: string; // e.g. "ગણિત", "વિજ્ઞાન", "ગુજરાતી"
  description: string;
  icon: string;
  totalChapters: number;
  totalVideos: number;
  totalNotes: number;
}

export interface ChapterInfo {
  id: string;
  subjectId: string;
  dhoranId: number;
  chapterNumber: number;
  title: string; // e.g. "પ્રકરણ ૧: વાસ્તવિક સંખ્યાઓ"
  description: string;
  totalVideos: number;
  totalNotes: number;
  totalQuestions: number;
}

export interface VideoLecture {
  id: string;
  title: string;
  youtubeId: string;
  dhoranId: number;
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterName: string;
  duration: string;
  teacherName: string;
  views: number;
  thumbnailUrl: string;
  uploadedDate: string;
  status: 'approved' | 'pending' | 'rejected';
  teacherId: string;
}

export interface StudyNote {
  id: string;
  title: string;
  dhoranId: number;
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterName: string;
  fileUrl: string;
  pageCount: number;
  fileSize: string;
  teacherName: string;
  uploadedDate: string;
  status: 'approved' | 'pending' | 'rejected';
  teacherId: string;
  summaryPoints: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswerIndex: number; // 0 to 3
  explanation: string;
  points: number;
}

export interface QuizInfo {
  id: string;
  title: string;
  dhoranId: number;
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterName: string;
  totalQuestions: number;
  durationMinutes: number;
  passingMarks: number;
  questions: QuizQuestion[];
}

export interface QuizSubmission {
  id: string;
  quizId: string;
  userId: string;
  userName: string;
  dhoranId: number;
  subjectName: string;
  chapterName: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  obtainedMarks: number;
  totalMarks: number;
  percentage: number;
  submittedAt: string;
}

export interface ImpQuestion {
  id: string;
  dhoranId: number;
  subjectId: string;
  subjectName: string;
  chapterName: string;
  question: string;
  marks: number; // 1, 2, 3, 4, 5
  type: 'mcq' | 'short' | 'long' | 'paper';
  isImportant: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'alert' | 'success';
  targetRole?: UserRole | 'all';
}

export interface ContactMessage {
  id: string;
  name: string;
  mobile: string;
  email: string;
  dhoran: string;
  message: string;
  createdAt: string;
}
