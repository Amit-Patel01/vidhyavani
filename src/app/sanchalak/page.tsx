'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Trash2,
  UserPlus,
  Sparkles,
  Video,
  FileText,
  X,
} from 'lucide-react';
import { User, VideoLecture, StudyNote } from '@/lib/types';

export default function SanchalakDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'teachers' | 'students' | 'approvals'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [videos, setVideos] = useState<VideoLecture[]>([]);
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [loading, setLoading] = useState(true);

  // New Teacher Modal Form State
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [newTeacherData, setNewTeacherData] = useState({
    name: '',
    email: '',
    mobile: '',
    subjectSpecialty: 'શિક્ષણવિદ્ & સાહિત્ય માર્ગદર્શક',
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadAdminData = async () => {
    try {
      const statsRes = await fetch('/api/admin/overview');
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.stats);
      }

      const usersRes = await fetch('/api/admin/users');
      const usersData = await usersRes.json();
      if (usersData.success) {
        setUsers(usersData.users || []);
      }

      const approvalsRes = await fetch('/api/admin/approvals');
      const approvalsData = await approvalsRes.json();
      if (approvalsData.success) {
        setVideos(approvalsData.videos || []);
        setNotes(approvalsData.notes || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleToggleUserActive = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, isActive: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('સ્થિતિ સફળતાપૂર્વક અપડેટ થઈ.');
        loadAdminData();
      }
    } catch {
      showToast('સ્થિતિ અપડેટ કરવામાં નિષ્ફળતા.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('શું આપ ખરેખર આ વપરાશકર્તાને દૂર કરવા માંગો છો?')) return;
    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('વપરાશકર્તા દૂર કરવામાં આવ્યો.');
        loadAdminData();
      }
    } catch {
      showToast('દૂર કરવામાં નિષ્ફળતા.');
    }
  };

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newTeacherData,
          role: 'teacher',
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('નવા શિક્ષક સફળતાપૂર્વક ઉમેરાયા!');
        setShowAddTeacherModal(false);
        setNewTeacherData({
          name: '',
          email: '',
          mobile: '',
          subjectSpecialty: 'શિક્ષણવિદ્ & સાહિત્ય માર્ગદર્શક',
        });
        loadAdminData();
      } else {
        showToast(data.message || 'શિક્ષક ઉમેરવામાં સમસ્યા આવી.');
      }
    } catch {
      showToast('સર્વર સાથે સંપર્ક નિષ્ફળ.');
    }
  };

  const handleModerateContent = async (type: 'video' | 'note', id: string, action: 'approve' | 'reject' | 'delete') => {
    try {
      const res = await fetch('/api/admin/approvals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, action }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(action === 'approve' ? 'સામગ્રી મંજૂર કરવામાં આવી!' : action === 'reject' ? 'સામગ્રી નામંજૂર કરવામાં આવી.' : 'સામગ્રી હટાવવામાં આવી.');
        loadAdminData();
      }
    } catch {
      showToast('ક્રિયા નિષ્ફળ રહી.');
    }
  };

  const teachers = users.filter((u) => u.role === 'teacher');
  const students = users.filter((u) => u.role === 'student');

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 p-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-xl animate-modal">
          {toastMessage}
        </div>
      )}

      {/* Admin Top Header */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
            <ShieldCheck className="w-9 h-9 font-black" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              મુખ્ય વહીવટી નિયંત્રણ
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              સંચાલક કંટ્રોલ સેન્ટર
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              શિક્ષકો, વિદ્યાર્થીઓ અને શિક્ષણ સામગ્રીનું કેન્દ્રીય વ્યવસ્થાપન.
            </p>
          </div>
        </div>

        {/* Add teacher action */}
        <button
          onClick={() => setShowAddTeacherModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition-all"
        >
          <UserPlus className="w-4 h-4" />
          નવા શિક્ષક ઉમેરો
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'overview'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          કુલ આંકડાકીય વિગત
        </button>

        <button
          onClick={() => setActiveTab('approvals')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'approvals'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          સામગ્રી મંજૂરી
          {(videos.filter((v) => v.status === 'pending').length + notes.filter((n) => n.status === 'pending').length > 0) && (
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-black">
              {videos.filter((v) => v.status === 'pending').length + notes.filter((n) => n.status === 'pending').length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('teachers')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'teachers'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          શિક્ષકો ({teachers.length})
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 ${
            activeTab === 'students'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          વિદ્યાર્થીઓની યાદી ({students.length})
        </button>
      </div>

      {/* Tab: Overview (Statistics) */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* 6 Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold">કુલ વિદ્યાર્થીઓ</p>
              <h3 className="text-2xl font-black text-slate-900">{stats?.totalStudents || '૧,૨૫૦+'}</h3>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold">કુલ શિક્ષકો</p>
              <h3 className="text-2xl font-black text-amber-700">{stats?.totalTeachers || '૧૮'}</h3>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold">કુલ વિડિઓઝ</p>
              <h3 className="text-2xl font-black text-blue-600">{stats?.totalVideos || videos.length}</h3>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold">કુલ PDF નોંધો</p>
              <h3 className="text-2xl font-black text-emerald-600">{stats?.totalNotes || notes.length}</h3>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold">કુલ વિષયો</p>
              <h3 className="text-2xl font-black text-purple-600">{stats?.totalSubjects || '૧૪'}</h3>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold">કુલ પ્રશ્નો</p>
              <h3 className="text-2xl font-black text-rose-600">{stats?.totalQuestions || '૩૫૦+'}</h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              પ્લેટફોર્મ સ્થિતિ
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              વિદ્યા વાણી એપ સંપૂર્ણ સક્રિય અને કાર્યરત છે. શિક્ષકો દ્વારા અપલોડ કરાયેલ સામગ્રીને <strong className="text-amber-800 font-bold">&ldquo;સામગ્રી મંજૂરી&rdquo;</strong> ટેબમાં જઈને મંજૂર કરી શકો છો.
            </p>
          </div>
        </div>
      )}

      {/* Tab: Approvals Moderation */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">શિક્ષણ સામગ્રી ચકાસણી અને મંજૂરી કતાર</h2>

          <div className="overflow-x-auto p-4 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <table className="w-full text-xs text-left text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-900 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">પ્રકાર</th>
                  <th className="px-4 py-3">શીર્ષક</th>
                  <th className="px-4 py-3">શિક્ષક</th>
                  <th className="px-4 py-3">ધોરણ/વિષય</th>
                  <th className="px-4 py-3">સ્થિતિ</th>
                  <th className="px-4 py-3 text-right">ક્રિયા</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {videos.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-bold text-amber-700">વિડિઓ</td>
                    <td className="px-4 py-3 font-semibold text-slate-900 max-w-xs truncate">{v.title}</td>
                    <td className="px-4 py-3">{v.teacherName}</td>
                    <td className="px-4 py-3">ધોરણ {v.dhoranId} • {v.subjectName}</td>
                    <td className="px-4 py-3">
                      {v.status === 'approved' ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">મંજૂર</span>
                      ) : v.status === 'rejected' ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">નામંજૂર</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">બાકી</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right space-x-1">
                      {v.status !== 'approved' && (
                        <button
                          onClick={() => handleModerateContent('video', v.id, 'approve')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                        >
                          મંજૂર કરો
                        </button>
                      )}
                      {v.status !== 'rejected' && (
                        <button
                          onClick={() => handleModerateContent('video', v.id, 'reject')}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold"
                        >
                          નામંજૂર
                        </button>
                      )}
                      <button
                        onClick={() => handleModerateContent('video', v.id, 'delete')}
                        className="p-1 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600"
                        title="હટાવો"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {notes.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-bold text-blue-700">નોંધો (PDF)</td>
                    <td className="px-4 py-3 font-semibold text-slate-900 max-w-xs truncate">{n.title}</td>
                    <td className="px-4 py-3">{n.teacherName}</td>
                    <td className="px-4 py-3">ધોરણ {n.dhoranId} • {n.subjectName}</td>
                    <td className="px-4 py-3">
                      {n.status === 'approved' ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">મંજૂર</span>
                      ) : n.status === 'rejected' ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">નામંજૂર</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">બાકી</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right space-x-1">
                      {n.status !== 'approved' && (
                        <button
                          onClick={() => handleModerateContent('note', n.id, 'approve')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                        >
                          મંજૂર કરો
                        </button>
                      )}
                      {n.status !== 'rejected' && (
                        <button
                          onClick={() => handleModerateContent('note', n.id, 'reject')}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold"
                        >
                          નામંજૂર
                        </button>
                      )}
                      <button
                        onClick={() => handleModerateContent('note', n.id, 'delete')}
                        className="p-1 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600"
                        title="હટાવો"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Teacher Management */}
      {activeTab === 'teachers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">નોંધાયેલા શિક્ષકો</h2>
            <button
              onClick={() => setShowAddTeacherModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
            >
              <UserPlus className="w-4 h-4" />
              નવા શિક્ષક ઉમેરો
            </button>
          </div>

          <div className="overflow-x-auto p-4 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <table className="w-full text-xs text-left text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-900 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">શિક્ષકનું નામ</th>
                  <th className="px-4 py-3">મોબાઇલ / ઇમેઇલ</th>
                  <th className="px-4 py-3">વિષય વિશેષતા</th>
                  <th className="px-4 py-3">સ્થિતિ</th>
                  <th className="px-4 py-3 text-right">ક્રિયા</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teachers.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-2">
                      <img src={t.avatar || '/images/varsha-jani-dave.png'} alt={t.name} className="w-7 h-7 rounded-full bg-slate-100 object-cover object-top" />
                      <span>{t.name}</span>
                    </td>
                    <td className="px-4 py-3">{t.mobile} • {t.email}</td>
                    <td className="px-4 py-3">{t.subjectSpecialty || 'સાહિત્ય'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleUserActive(t.id, t.isActive)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          t.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {t.isActive ? 'સક્રિય' : 'નિષ્ક્રિય'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDeleteUser(t.id)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600"
                        title="હટાવો"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Students Management */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">નોંધાયેલા વિદ્યાર્થીઓ</h2>

          <div className="overflow-x-auto p-4 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <table className="w-full text-xs text-left text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-900 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">વિદ્યાર્થીનું નામ</th>
                  <th className="px-4 py-3">મોબાઇલ / ઇમેઇલ</th>
                  <th className="px-4 py-3">ધોરણ</th>
                  <th className="px-4 py-3">જોડાયા તારીખ</th>
                  <th className="px-4 py-3">સ્થિતિ</th>
                  <th className="px-4 py-3 text-right">ક્રિયા</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-2">
                      <img src={s.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=user'} alt={s.name} className="w-7 h-7 rounded-full bg-slate-100" />
                      <span>{s.name}</span>
                    </td>
                    <td className="px-4 py-3">{s.mobile} • {s.email}</td>
                    <td className="px-4 py-3 font-bold text-amber-700">ધોરણ {s.dhoran || 10}</td>
                    <td className="px-4 py-3">{s.joinedDate}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleUserActive(s.id, s.isActive)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          s.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {s.isActive ? 'સક્રિય' : 'નિષ્ક્રિય'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDeleteUser(s.id)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600"
                        title="હટાવો"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-modal">
          <div className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">નવા શિક્ષક ઉમેરો</h3>
              <button
                onClick={() => setShowAddTeacherModal(false)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTeacher} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">પૂરું નામ *</label>
                <input
                  type="text"
                  required
                  placeholder="દા.ત. વર્ષા જાની દવે"
                  value={newTeacherData.name}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">મોબાઇલ નંબર *</label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={newTeacherData.mobile}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, mobile: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ઇમેઇલ *</label>
                <input
                  type="email"
                  required
                  placeholder="teacher@vidhyavani.com"
                  value={newTeacherData.email}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">વિષય વિશેષતા *</label>
                <input
                  type="text"
                  required
                  placeholder="દા.ત. ગુજરાતી, ગણિત અથવા વિજ્ઞાન"
                  value={newTeacherData.subjectSpecialty}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, subjectSpecialty: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
              >
                શિક્ષક સેવ કરો
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
