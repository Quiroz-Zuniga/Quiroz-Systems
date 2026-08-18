import React, { useEffect, useState } from 'react';
import { Users, Award, BookOpen, ShieldCheck, Search, RefreshCw, Building2, UserCheck, Plus, X } from 'lucide-react';
import { allCourses } from '../data/courses';
import logoQuiroz from '../img/logo_quiroz_systems.png';
import { authHeaders } from '../lib/storage';

interface InstructorDashboardProps {
  instructorEmail: string;
  instructorName: string;
}

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  studentType: string;
  institutionName: string;
  totalCoursesStarted: number;
  totalCertificates: number;
  totalLessonsCompleted: number;
  progresses: Array<{
    courseId: string;
    status: string;
    completionDate?: string;
    finalGradePercent?: number;
    certificateUuid?: string;
    passedLessonsCount: number;
  }>;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ instructorEmail, instructorName }) => {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  // Add Student Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [instName, setInstName] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [addFeedback, setAddFeedback] = useState('');
  const [adding, setAdding] = useState(false);

  // Certificate Approval Modal
  const [approvalModal, setApprovalModal] = useState<{
    open: boolean;
    student?: StudentRecord;
    courseId?: string;
    courseTitle?: string;
    gradePercent: number;
    studyHours: number;
  }>({ open: false, gradePercent: 100, studyHours: 45 });
  const [approving, setApproving] = useState(false);
  const [approvalFeedback, setApprovalFeedback] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch(`/api/institutions/users`, {
        headers: authHeaders(),
      });
      if (res.ok) {
        const users = await res.json();
        const mapped = users.map((u: any) => {
          const progresses = u.courseProgresses || [];
          const totalCertificates = progresses.filter((p: any) => p.status === 'APPROVED').length;
          return {
            id: u.id,
            name: u.name,
            email: u.email,
            studentType: u.role,
            institutionName: '',
            totalCoursesStarted: progresses.length,
            totalCertificates,
            totalLessonsCompleted: 0, // backend no guarda lecciones por separado
            progresses: progresses.map((p: any) => ({
              courseId: p.courseId,
              status: p.status,
              passedLessonsCount: p.status === 'APPROVED' ? 100 : 0 // dummy
            }))
          };
        });
        setStudents(mapped);
      } else if (res.status === 401 || res.status === 403) {
        setFetchError('Sesión expirada o no tienes permisos. Por favor, inicia sesión nuevamente.');
      } else {
        setFetchError(`El servidor respondió con error interno (${res.status}). Verifica los logs del backend.`);
      }
    } catch (e) {
      console.error(e);
      setFetchError('No se pudo conectar con el servidor. Verifica que esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;
    setAdding(true);
    setAddFeedback('');
    try {
      const res = await fetch('/api/institutions/add-user', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ name: newName, email: newEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setAddFeedback(`¡${newName} matriculado exitosamente!`);
        await fetchStudents();
        setTimeout(() => { setIsAddOpen(false); setNewName(''); setNewEmail(''); setAddFeedback(''); }, 1500);
      } else {
        setAddFeedback(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setAddFeedback(`Error de red: ${err.message}`);
    } finally {
      setAdding(false);
    }
  };

  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!approvalModal.courseId || !approvalModal.student) return;
    setApproving(true);
    setApprovalFeedback('');
    try {
      const res = await fetch('/api/institutions/emit-recognition', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          userId: approvalModal.student.id,
          courseId: approvalModal.courseId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setApprovalFeedback(`¡Certificado emitido! Código de verificación: ${data.recognition.recognitionCode}`);
        await fetchStudents();
        setTimeout(() => { setApprovalModal({ open: false, gradePercent: 100, studyHours: 45 }); setApprovalFeedback(''); }, 2000);
      } else {
        setApprovalFeedback(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setApprovalFeedback(`Error: ${err.message}`);
    } finally {
      setApproving(false);
    }
  };

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-6 sm:p-8 gcp-card-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#1a73e8] text-xs font-semibold">
            <Building2 className="w-4 h-4" />
            <span>Panel Docente — {instructorName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Gestión de Mis Alumnos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm max-w-2xl">
            Matricula nuevos estudiantes bajo tu institución, supervisa su avance en tiempo real y aprueba certificados oficiales.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button onClick={() => setIsAddOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Matricular Alumno</span>
          </button>
          <button onClick={fetchStudents} disabled={loading} className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center space-x-2 disabled:opacity-50">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {fetchError && (
        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-mono text-xs font-bold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>{fetchError}</span>
          <button onClick={fetchStudents} className="text-[11px] font-bold underline hover:no-underline">Reintentar conexión</button>
        </div>
      )}

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-5 gcp-card-shadow flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#1a73e8] flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mis Alumnos</p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{students.length}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-5 gcp-card-shadow flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lecciones Superadas</p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{students.reduce((a, s) => a + s.totalLessonsCompleted, 0)}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-5 gcp-card-shadow flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-900">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Certificados Emitidos</p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{students.reduce((a, s) => a + s.totalCertificates, 0)}</p>
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-6 gcp-card-shadow space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-gray-100 dark:border-[#333333]">
          <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#1a73e8]" />
            <span>Mis Alumnos Matriculados ({filtered.length})</span>
          </h2>
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar por nombre o email..." className="w-full bg-gray-50 dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#333333] rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#1a73e8]" />
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-[#1a73e8] font-mono font-bold animate-pulse">Cargando estudiantes...</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">No tienes alumnos matriculados aún.</p>
            <button onClick={() => setIsAddOpen(true)} className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-5 py-2 rounded-lg text-xs transition-all">
              Matricular mi Primer Alumno
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-[#262626] text-gray-700 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-[#333333]">
                <tr>
                  <th className="p-3">Estudiante</th>
                  <th className="p-3">Lecciones</th>
                  <th className="p-3">Certificados</th>
                  <th className="p-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#333333] text-gray-800 dark:text-gray-200">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-[#262626] transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-gray-900 dark:text-white">{s.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">{s.email}</p>
                    </td>
                    <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{s.totalLessonsCompleted}</td>
                    <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">{s.totalCertificates}</td>
                    <td className="p-3 text-right">
                      <button onClick={() => setSelectedStudent(s)} className="bg-gray-100 dark:bg-[#262626] hover:bg-gray-200 dark:hover:bg-[#333333] text-gray-800 dark:text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all border border-gray-200 dark:border-[#404040]">
                        Ver Expediente
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Student Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181818] border border-gray-300 dark:border-[#333333] rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-gray-800 dark:text-[#ededed]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-[#333333]">
              <div className="flex items-center space-x-2.5">
                <Building2 className="w-6 h-6 text-[#1a73e8]" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Matricular Alumno</h3>
              </div>
              <button onClick={() => setIsAddOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Nombre de tu Institución / Cátedra</label>
                <input type="text" required value={instName} onChange={(e) => setInstName(e.target.value)} placeholder="Ej: Instituto Tecnológico Quiroz" className="w-full bg-gray-50 dark:bg-[#0d0d0d] border border-gray-300 dark:border-[#333333] rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1a73e8]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Nombre del Alumno</label>
                  <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ej: Mateo Quiroz" className="w-full bg-gray-50 dark:bg-[#0d0d0d] border border-gray-300 dark:border-[#333333] rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1a73e8]" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Correo del Alumno</label>
                  <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="mateo@email.com" className="w-full bg-gray-50 dark:bg-[#0d0d0d] border border-gray-300 dark:border-[#333333] rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1a73e8]" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Asignar Cursos</label>
                <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-gray-50 dark:bg-[#0d0d0d] rounded-lg border border-gray-200 dark:border-[#333333]">
                  {allCourses.map((c) => (
                    <label key={c.id} className="flex items-center space-x-2 cursor-pointer text-xs">
                      <input type="checkbox" checked={selectedCourses.includes(c.id)} onChange={(e) => e.target.checked ? setSelectedCourses([...selectedCourses, c.id]) : setSelectedCourses(selectedCourses.filter((id) => id !== c.id))} className="rounded border-gray-300 text-[#1a73e8]" />
                      <span className="truncate">{c.languageName}</span>
                    </label>
                  ))}
                </div>
              </div>
              {addFeedback && <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#1a73e8] font-mono text-xs">{addFeedback}</div>}
              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100 dark:border-[#333333]">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-lg">Cancelar</button>
                <button type="submit" disabled={adding} className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm flex items-center space-x-1.5 disabled:opacity-50">
                  {adding ? <span>Matriculando...</span> : <><UserCheck className="w-3.5 h-3.5" /><span>Matricular Alumno</span></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Detail / Expediente Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181818] border border-gray-300 dark:border-[#333333] rounded-xl p-6 max-w-3xl w-full shadow-2xl space-y-5 text-gray-800 dark:text-[#ededed] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-[#333333]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-sm">{selectedStudent.name.charAt(0).toUpperCase()}</div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Expediente de {selectedStudent.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{selectedStudent.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-xs font-bold bg-gray-100 dark:bg-[#262626] px-3 py-1.5 rounded-lg">Cerrar</button>
            </div>

            <div className="space-y-3">
              {allCourses.map((course) => {
                const prog = selectedStudent.progresses.find((p) => p.courseId === course.id);
                const passed = prog ? prog.passedLessonsCount : 0;
                const total = course.lessons.length;
                const hasCert = Boolean(prog?.certificateUuid);

                return (
                  <div key={course.id} className="p-4 rounded-xl border border-gray-200 dark:border-[#333333] bg-gray-50 dark:bg-[#0d0d0d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-900 dark:text-white text-sm">{course.title}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${hasCert ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-gray-200 dark:bg-[#262626] text-gray-600 dark:text-gray-400'}`}>
                          {hasCert ? 'Certificado' : 'En Progreso'}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 font-mono">Lecciones: <span className="font-bold text-[#1a73e8]">{passed}/{total}</span></p>
                      {prog?.certificateUuid && <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Código: {prog.certificateUuid}</p>}
                    </div>
                    <button onClick={() => setApprovalModal({ open: true, student: selectedStudent, courseId: course.id, courseTitle: course.title, gradePercent: prog?.finalGradePercent || 100, studyHours: course.estimatedHours })} className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-4 py-2 rounded-lg transition-all shadow-sm flex items-center space-x-1.5 shrink-0">
                      <Award className="w-3.5 h-3.5" />
                      <span>Aprobar Certificado</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Approve Certificate Modal */}
      {approvalModal.open && approvalModal.student && (
        <div className="fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181818] border border-gray-300 dark:border-[#333333] rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 text-gray-800 dark:text-[#ededed]">
            <div className="flex items-center space-x-3 pb-3 border-b border-gray-100 dark:border-[#333333]">
              <img src={logoQuiroz} alt="Quiroz Systems" className="w-6 h-6 object-contain" />
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Aprobar Certificado</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{approvalModal.courseTitle}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 bg-blue-50/60 dark:bg-[#262626] p-3 rounded-lg border border-blue-100 dark:border-[#333333]">
              Estudiante: <span className="font-bold text-gray-900 dark:text-white">{approvalModal.student.name}</span> ({approvalModal.student.email})
            </p>
            <form onSubmit={handleApprove} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Nota Final (%)</label>
                <input type="number" min="0" max="100" step="0.1" required value={approvalModal.gradePercent} onChange={(e) => setApprovalModal({ ...approvalModal, gradePercent: parseFloat(e.target.value) || 100 })} className="w-full bg-white dark:bg-[#0d0d0d] border border-gray-300 dark:border-[#333333] rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1a73e8]" />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Horas de Estudio</label>
                <input type="number" required value={approvalModal.studyHours} onChange={(e) => setApprovalModal({ ...approvalModal, studyHours: parseInt(e.target.value) || 45 })} className="w-full bg-white dark:bg-[#0d0d0d] border border-gray-300 dark:border-[#333333] rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1a73e8]" />
              </div>
              {approvalFeedback && <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#1a73e8] font-mono text-xs">{approvalFeedback}</div>}
              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100 dark:border-[#333333]">
                <button type="button" onClick={() => setApprovalModal({ open: false, gradePercent: 100, studyHours: 45 })} className="px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-lg">Cancelar</button>
                <button type="submit" disabled={approving} className="px-4 py-2 text-xs font-bold bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-lg shadow-sm flex items-center space-x-1.5 disabled:opacity-50">
                  {approving ? <span>Emitiendo...</span> : <><ShieldCheck className="w-3.5 h-3.5" /><span>Emitir Certificado</span></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
