'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Video,
  FileText,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Upload,
  Sparkles,
} from 'lucide-react';
import { User, VideoLecture, StudyNote } from '@/lib/types';
import { DHORAN_LIST } from '@/lib/seed-data';

export default function ShikshakDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'add_video' | 'add_note' | 'my_content' | 'approvals'>('overview');
  const [myVideos, setMyVideos] = useState<VideoLecture[]>([]);
  const [myNotes, setMyNotes] = useState<StudyNote[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [videoForm, setVideoForm] = useState({
    title: '',
    youtubeId: '',
    dhoranId: 10,
    subjectName: 'ગુજરાતી',
    chapterName: '',
    duration: '૩૦ મિનિટ',
  });

  const [noteForm, setNoteForm] = useState({
    title: '',
    dhoranId: 10,
    subjectName: 'ગુજરાતી',
    chapterName: '',
    point1: '',
    point2: '',
    point3: '',
  });

  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchTeacherContent = async () => {
    try {
      const res = await fetch('/api/teacher/content');
      const data = await res.json();
      if (data.success) {
        setMyVideos(data.videos || []);
        setMyNotes(data.notes || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser({
            id: 'teacher-1',
            name: 'વર્ષા જાની દવે',
            mobile: '9876543211',
            email: 'teacher@vidhyavani.com',
            role: 'teacher',
            subjectSpecialty: 'શિક્ષણવિદ્ & મુખ્ય માર્ગદર્શક',
            avatar: '/images/varsha-jani-dave.png',
            isActive: true,
            joinedDate: '૧ જાન્યુઆરી ૨૦૨૪',
          });
        }
      });
    fetchTeacherContent();
  }, []);

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMessage(null);
    try {
      const res = await fetch('/api/teacher/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: 'video',
          ...videoForm,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMessage({ type: 'success', text: 'વિડિઓ સફળતાપૂર્વક અપલોડ થયો! સંચાલકની મંજૂરી માટે મોકલેલ છે.' });
        setVideoForm({
          title: '',
          youtubeId: '',
          dhoranId: 10,
          subjectName: 'ગુજરાતી',
          chapterName: '',
          duration: '૩૦ મિનિટ',
        });
        fetchTeacherContent();
        setActiveTab('my_content');
      } else {
        setFeedbackMessage({ type: 'error', text: data.message || 'વિડિઓ અપલોડ કરવામાં સમસ્યા આવી.' });
      }
    } catch {
      setFeedbackMessage({ type: 'error', text: 'સર્વર સાથે સંપર્ક નિષ્ફળ.' });
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMessage(null);
    const summaryPoints = [noteForm.point1, noteForm.point2, noteForm.point3].filter(Boolean);
    try {
      const res = await fetch('/api/teacher/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: 'note',
          title: noteForm.title,
          dhoranId: noteForm.dhoranId,
          subjectName: noteForm.subjectName,
          chapterName: noteForm.chapterName,
          summaryPoints,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMessage({ type: 'success', text: 'અભ્યાસ નોંધો સફળતાપૂર્વક અપલોડ થઈ! સંચાલકની મંજૂરી માટે મોકલેલ છે.' });
        setNoteForm({
          title: '',
          dhoranId: 10,
          subjectName: 'ગુજરાતી',
          chapterName: '',
          point1: '',
          point2: '',
          point3: '',
        });
        fetchTeacherContent();
        setActiveTab('my_content');
      } else {
        setFeedbackMessage({ type: 'error', text: data.message || 'નોંધો અપલોડ કરવામાં સમસ્યા આવી.' });
      }
    } catch {
      setFeedbackMessage({ type: 'error', text: 'સર્વર સાથે સંપર્ક નિષ્ફળ.' });
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Teacher Top Header */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <img
            src="/images/varsha-jani-dave.png"
            alt="વર્ષા જાની દવે"
            className="w-16 h-16 rounded-2xl border-2 border-amber-400 object-cover object-top shadow-sm"
          />
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200">
              શિક્ષક નિયંત્રણ કેન્દ્ર
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {user?.name || 'વર્ષા જાની દવે'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              {user?.subjectSpecialty || 'શિક્ષણવિદ્ & મુખ્ય માર્ગદર્શક'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setActiveTab('add_video'); setFeedbackMessage(null); }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            વિડિઓ અપલોડ કરો
          </button>
          <button
            onClick={() => { setActiveTab('add_note'); setFeedbackMessage(null); }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-sm transition-all"
          >
            <Upload className="w-4 h-4" />
            નોંધો (PDF) અપલોડ કરો
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'overview'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          મુખ્ય ઓવરવ્યૂ
        </button>

        <button
          onClick={() => setActiveTab('my_content')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'my_content'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          મારી શિક્ષણ સામગ્રી ({myVideos.length + myNotes.length})
        </button>

        <button
          onClick={() => setActiveTab('add_video')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'add_video'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          + નવો વિડિઓ
        </button>

        <button
          onClick={() => setActiveTab('add_note')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'add_note'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          + નવી PDF નોંધો
        </button>

        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'approvals'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          મંજૂરી સ્થિતિ
        </button>
      </div>

      {feedbackMessage && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-2 ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {feedbackMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-1 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">કુલ વિડિઓઝ અપલોડ</span>
              <p className="text-2xl font-black text-slate-900">{myVideos.length}</p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-1 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">કુલ PDF નોંધો</span>
              <p className="text-2xl font-black text-blue-600">{myNotes.length}</p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-1 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">મંજૂર થયેલ સામગ્રી</span>
              <p className="text-2xl font-black text-emerald-600">
                {myVideos.filter((v) => v.status === 'approved').length + myNotes.filter((n) => n.status === 'approved').length}
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-1 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">મંજૂરી બાકી</span>
              <p className="text-2xl font-black text-amber-600">
                {myVideos.filter((v) => v.status === 'pending').length + myNotes.filter((n) => n.status === 'pending').length}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              શિક્ષક માર્ગદર્શિકા
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              ૧. <strong className="text-amber-800 font-bold">&ldquo;+ નવો વિડિઓ&rdquo;</strong> અથવા <strong className="text-amber-800 font-bold">&ldquo;+ નવી PDF નોંધો&rdquo;</strong> પર ક્લિક કરી નવી શિક્ષણ સામગ્રી ઉમેરો.<br />
              ૨. નવી સામગ્રી સંચાલક દ્વારા ચકાસાયા બાદ લાઈવ પ્લેટફોર્મ પર વિદ્યાર્થીઓ માટે પ્રદર્શિત થશે.
            </p>
          </div>
        </div>
      )}

      {/* Tab: Add Video Form */}
      {activeTab === 'add_video' && (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Video className="w-5 h-5 text-amber-600" />
            નવો વિડિઓ લેક્ચર અપલોડ કરો
          </h2>

          <form onSubmit={handleAddVideo} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                વિડિઓનું શીર્ષક *
              </label>
              <input
                type="text"
                required
                placeholder="દા.ત. ધોરણ ૧૦ ગુજરાતી - પ્રકરણ ૩ વ્યાકરણ વિશેષ"
                value={videoForm.title}
                onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  યૂટ્યુબ વિડિઓ ID / લિંક *
                </label>
                <input
                  type="text"
                  required
                  placeholder="દા.ત. dQw4w9WgXcQ"
                  value={videoForm.youtubeId}
                  onChange={(e) => setVideoForm({ ...videoForm, youtubeId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  સમયગાળો
                </label>
                <input
                  type="text"
                  placeholder="દા.ત. ૩૫ મિનિટ"
                  value={videoForm.duration}
                  onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ધોરણ પસંદ કરો *
                </label>
                <select
                  value={videoForm.dhoranId}
                  onChange={(e) => setVideoForm({ ...videoForm, dhoranId: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                >
                  {DHORAN_LIST.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  વિષયનું નામ *
                </label>
                <input
                  type="text"
                  required
                  placeholder="દા.ત. ગુજરાતી, ગણિત, વિજ્ઞાન"
                  value={videoForm.subjectName}
                  onChange={(e) => setVideoForm({ ...videoForm, subjectName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                પ્રકરણનું નામ
              </label>
              <input
                type="text"
                placeholder="દા.ત. પ્રકરણ ૧: વાસ્તવિક સંખ્યાઓ"
                value={videoForm.chapterName}
                onChange={(e) => setVideoForm({ ...videoForm, chapterName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              સંચાલક મંજૂરી માટે મોકલો
            </button>
          </form>
        </div>
      )}

      {/* Tab: Add Note Form */}
      {activeTab === 'add_note' && (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600" />
            નવી અભ્યાસ નોંધો (PDF) અપલોડ કરો
          </h2>

          <form onSubmit={handleAddNote} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                નોંધોનું શીર્ષક *
              </label>
              <input
                type="text"
                required
                placeholder="દા.ત. ધોરણ ૧૦ વિજ્ઞાન - રાસાયણિક પ્રક્રિયાઓ સંપૂર્ણ નોંધો"
                value={noteForm.title}
                onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ધોરણ પસંદ કરો *
                </label>
                <select
                  value={noteForm.dhoranId}
                  onChange={(e) => setNoteForm({ ...noteForm, dhoranId: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                >
                  {DHORAN_LIST.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  વિષયનું નામ *
                </label>
                <input
                  type="text"
                  required
                  placeholder="દા.ત. વિજ્ઞાન"
                  value={noteForm.subjectName}
                  onChange={(e) => setNoteForm({ ...noteForm, subjectName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                પ્રકરણનું નામ
              </label>
              <input
                type="text"
                placeholder="દા.ત. પ્રકરણ ૧: રાસાયણિક પ્રક્રિયાઓ"
                value={noteForm.chapterName}
                onChange={(e) => setNoteForm({ ...noteForm, chapterName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-amber-800">
                મુખ્ય મુદ્દાઓ (સારાંશ):
              </label>
              <input
                type="text"
                placeholder="મુદ્દો ૧: મુખ્ય સૂત્રો અને નિયમો"
                value={noteForm.point1}
                onChange={(e) => setNoteForm({ ...noteForm, point1: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs"
              />
              <input
                type="text"
                placeholder="મુદ્દો ૨: બોર્ડ પરીક્ષા માટે મહત્વની વ્યાખ્યાઓ"
                value={noteForm.point2}
                onChange={(e) => setNoteForm({ ...noteForm, point2: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs"
              />
              <input
                type="text"
                placeholder="મુદ્દો ૩: ૪-ગુણના અપેક્ષિત પ્રશ્નો"
                value={noteForm.point3}
                onChange={(e) => setNoteForm({ ...noteForm, point3: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              સંચાલક મંજૂરી માટે મોકલો
            </button>
          </form>
        </div>
      )}

      {/* Tab: My Content & Approvals */}
      {(activeTab === 'my_content' || activeTab === 'approvals') && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">અપલોડ કરેલ સામગ્રી અને મંજૂરી સ્થિતિ</h2>

          <div className="overflow-x-auto p-4 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <table className="w-full text-xs text-left text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-900 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">પ્રકાર</th>
                  <th className="px-4 py-3">શીર્ષક</th>
                  <th className="px-4 py-3">ધોરણ અને વિષય</th>
                  <th className="px-4 py-3">તારીખ</th>
                  <th className="px-4 py-3">મંજૂરી સ્થિતિ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myVideos.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-bold text-amber-700 flex items-center gap-1.5">
                      <Video className="w-4 h-4" /> વિડિઓ
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900 max-w-xs truncate">{v.title}</td>
                    <td className="px-4 py-3">ધોરણ {v.dhoranId} • {v.subjectName}</td>
                    <td className="px-4 py-3">{v.uploadedDate}</td>
                    <td className="px-4 py-3">
                      {v.status === 'approved' ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3.5 h-3.5" /> મંજૂર
                        </span>
                      ) : v.status === 'rejected' ? (
                        <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold flex items-center gap-1 w-fit">
                          <XCircle className="w-3.5 h-3.5" /> નામંજૂર
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center gap-1 w-fit">
                          <Clock className="w-3.5 h-3.5" /> બાકી (Pending)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {myNotes.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-bold text-blue-700 flex items-center gap-1.5">
                      <FileText className="w-4 h-4" /> નોંધો (PDF)
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900 max-w-xs truncate">{n.title}</td>
                    <td className="px-4 py-3">ધોરણ {n.dhoranId} • {n.subjectName}</td>
                    <td className="px-4 py-3">{n.uploadedDate}</td>
                    <td className="px-4 py-3">
                      {n.status === 'approved' ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3.5 h-3.5" /> મંજૂર
                        </span>
                      ) : n.status === 'rejected' ? (
                        <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold flex items-center gap-1 w-fit">
                          <XCircle className="w-3.5 h-3.5" /> નામંજૂર
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center gap-1 w-fit">
                          <Clock className="w-3.5 h-3.5" /> બાકી (Pending)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
