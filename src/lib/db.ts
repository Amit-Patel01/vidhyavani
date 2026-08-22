import {
  User,
  VideoLecture,
  StudyNote,
  QuizInfo,
  QuizSubmission,
  ImpQuestion,
  Announcement,
  ContactMessage,
} from './types';
import {
  DEMO_USERS,
  VIDEOS_LIST,
  STUDY_NOTES_LIST,
  QUIZZES_LIST,
  IMP_QUESTIONS_LIST,
  ANNOUNCEMENTS_LIST,
} from './seed-data';

// Dual store - in-memory reactive database singleton
class DatabaseStore {
  private static instance: DatabaseStore;

  public users: User[] = [];
  public videos: VideoLecture[] = [];
  public notes: StudyNote[] = [];
  public quizzes: QuizInfo[] = [];
  public submissions: QuizSubmission[] = [];
  public impQuestions: ImpQuestion[] = [];
  public announcements: Announcement[] = [];
  public contactMessages: ContactMessage[] = [];

  private constructor() {
    this.seedDefaults();
  }

  public static getInstance(): DatabaseStore {
    if (!DatabaseStore.instance) {
      DatabaseStore.instance = new DatabaseStore();
    }
    return DatabaseStore.instance;
  }

  private seedDefaults() {
    this.users = [...DEMO_USERS];
    this.videos = [...VIDEOS_LIST];
    this.notes = [...STUDY_NOTES_LIST];
    this.quizzes = [...QUIZZES_LIST];
    this.impQuestions = [...IMP_QUESTIONS_LIST];
    this.announcements = [...ANNOUNCEMENTS_LIST];
  }

  // Helper Methods
  public findUserByEmailOrMobile(identifier: string): User | undefined {
    return this.users.find(
      (u) => u.email.toLowerCase() === identifier.toLowerCase() || u.mobile === identifier
    );
  }

  public findUserById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  public addUser(user: User): User {
    this.users.push(user);
    return user;
  }

  public updateUser(id: string, update: Partial<User>): User | undefined {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx !== -1) {
      this.users[idx] = { ...this.users[idx], ...update };
      return this.users[idx];
    }
    return undefined;
  }

  public deleteUser(id: string): boolean {
    const initialLen = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    return this.users.length < initialLen;
  }

  // Videos
  public addVideo(video: VideoLecture): VideoLecture {
    this.videos.unshift(video);
    return video;
  }

  public updateVideoStatus(id: string, status: 'approved' | 'pending' | 'rejected'): VideoLecture | undefined {
    const video = this.videos.find((v) => v.id === id);
    if (video) {
      video.status = status;
      return video;
    }
    return undefined;
  }

  public deleteVideo(id: string): boolean {
    const initialLen = this.videos.length;
    this.videos = this.videos.filter((v) => v.id !== id);
    return this.videos.length < initialLen;
  }

  // Notes
  public addNote(note: StudyNote): StudyNote {
    this.notes.unshift(note);
    return note;
  }

  public updateNoteStatus(id: string, status: 'approved' | 'pending' | 'rejected'): StudyNote | undefined {
    const note = this.notes.find((n) => n.id === id);
    if (note) {
      note.status = status;
      return note;
    }
    return undefined;
  }

  public deleteNote(id: string): boolean {
    const initialLen = this.notes.length;
    this.notes = this.notes.filter((n) => n.id !== id);
    return this.notes.length < initialLen;
  }

  // Quizzes & Submissions
  public addSubmission(submission: QuizSubmission): QuizSubmission {
    this.submissions.unshift(submission);
    return submission;
  }

  // Announcements
  public addAnnouncement(ann: Announcement): Announcement {
    this.announcements.unshift(ann);
    return ann;
  }

  public deleteAnnouncement(id: string): boolean {
    const initialLen = this.announcements.length;
    this.announcements = this.announcements.filter((a) => a.id !== id);
    return this.announcements.length < initialLen;
  }

  // Contact
  public addContactMessage(msg: ContactMessage): ContactMessage {
    this.contactMessages.unshift(msg);
    return msg;
  }
}

export const db = DatabaseStore.getInstance();
