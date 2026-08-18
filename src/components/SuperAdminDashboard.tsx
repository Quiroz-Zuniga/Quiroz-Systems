import React, { useEffect, useState } from 'react';
import { Users, Award, BookOpen, ShieldCheck, Search, RefreshCw, Building2, UserCheck, CheckCircle2, Clock, Plus, X, Ban, Save, GraduationCap, Coffee, Heart, CalendarClock, Zap } from 'lucide-react';
import logoQuiroz from '../img/logo_quiroz_systems.png';
import { authHeaders } from '../lib/storage';

interface OverviewStats {
  totalStudents: number;
  totalInstructors: number;
  pendingInstructors: number;
  totalProgresses: number;
  totalCertificates: number;
  averageGradePercent: number;
}

interface InstructorRecord {
  id: string;
  name: string;
  email: string;
  approvalStatus: string;
  institution: { name: string; status: string } | null;
  createdAt: string;
}

interface InstitutionRecord {
  id: string;
  name: string;
  code: string;
  adminEmail: string;
  status: string;
  createdAt: string;
  _count: { students: number; instructors: number };
}



interface MonetizationConfig {
  kofiUrl: string | null;
  paypalUrl: string | null;
  subscriptionPriceDisplay: string;
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
  createdAt: string;
}

export const SuperAdminDashboard: React.FC = () => {
  const [overview, setOverview] = useState<OverviewStats | null>(null);
  const [instructors, setInstructors] = useState<InstructorRecord[]>([]);
  const [institutions, setInstitutions] = useState<InstitutionRecord[]>([]);
  const [students, setStudents] = useState<StudentRecord[]>([]);

  const [monetization, setMonetization] = useState<MonetizationConfig>({
    kofiUrl: null,
    paypalUrl: null,
    subscriptionPriceDisplay: '$9.99 USD/mes',
  });
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [instructorSearch, setInstructorSearch] = useState('');
  const [institutionSearch, setInstitutionSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');

  const [actionFeedback, setActionFeedback] = useState('');

  // Add instructor/institution modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newInstName, setNewInstName] = useState('');
  const [adding, setAdding] = useState(false);
  const [addFeedback, setAddFeedback] = useState('');



  const fetchAll = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const [resO, resI, resS, resSt] = await Promise.all([
        fetch('/api/admin/overview', { headers: authHeaders() }),
        fetch('/api/admin/instructors', { headers: authHeaders() }),
        fetch('/api/admin/institutions', { headers: authHeaders() }),
        fetch('/api/admin/students', { headers: authHeaders() }),
      ]);
      if (resO.ok) setOverview(await resO.json());
      if (resI.ok) setInstructors(await resI.json());
      if (resS.ok) setInstitutions((await resS.json()).institutions);
      if (resSt.ok) setStudents((await resSt.json()).students);
      if (!resO.ok || !resI.ok || !resS.ok || !resSt.ok) {
        if (resO.status === 401 || resO.status === 403) {
          setFetchError('Sesión expirada o no tienes permisos. Por favor, inicia sesión nuevamente.');
        } else {
          setFetchError('El servidor respondió con error interno. Verifica los logs del backend.');
        }
      }
    } catch (e) {
      console.error(e);
      setFetchError('No se pudo conectar con el servidor. Verifica que el backend (puerto 4000) esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const fetchMonetization = async () => {
    try {
      const res = await fetch('/api/monetization-config', { headers: authHeaders() });
      if (res.ok) {
        const data = await res.json();
        setMonetization({
          kofiUrl: data.kofiUrl || null,
          paypalUrl: data.paypalUrl || null,
          subscriptionPriceDisplay: data.subscriptionPriceDisplay || '$9.99 USD/mes',
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchMonetization(); }, []);

  const handleInstructorAction = async (instructorId: string, status: 'APPROVED' | 'REJECTED') => {
    setActionFeedback('');
    try {
      const res = await fetch('/api/admin/approve-instructor', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ instructorId, status }),
      });
      const data = await res.json();
      if (res.ok) {
        setActionFeedback(data.message);
        await fetchAll();
        setTimeout(() => setActionFeedback(''), 3000);
      }
    } catch (e: any) {
      setActionFeedback(`Error: ${e.message}`);
    }
  };

  const handleInstitutionAction = async (institutionId: string, status: 'APPROVED' | 'REJECTED') => {
    setActionFeedback('');
    try {
      const res = await fetch('/api/admin/update-institution', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ institutionId, status }),
      });
      const data = await res.json();
      if (res.ok) {
        setActionFeedback(data.message);
        await fetchAll();
        setTimeout(() => setActionFeedback(''), 3000);
      }
    } catch (e: any) {
      setActionFeedback(`Error: ${e.message}`);
    }
  };

  const handleAddInstructor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim() || !newInstName.trim()) return;
    setAdding(true);
    setAddFeedback('');
    try {
      const res = await fetch('/api/admin/add-instructor', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ name: newName, email: newEmail, institutionName: newInstName }),
      });
      const data = await res.json();
      if (res.ok) {
        setAddFeedback(`Docente ${data.instructor.name} agregado y habilitado.`);
        await fetchAll();
        setTimeout(() => { setIsAddOpen(false); setNewName(''); setNewEmail(''); setNewInstName(''); setAddFeedback(''); }, 1500);
      } else {
        setAddFeedback(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setAddFeedback(`Error de red: ${err.message}`);
    } finally {
      setAdding(false);
    }
  };


  const handleSaveMonetization = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/monetization-config', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(monetization),
      });
      const data = await res.json();
      if (res.ok) {
        setActionFeedback(data.message);
        setTimeout(() => setActionFeedback(''), 3000);
      } else {
        setActionFeedback(`Error: ${data.error || 'No se pudo guardar la configuración.'}`);
      }
    } catch (e: any) {
      setActionFeedback(`Error: ${e.message}`);
    }
  };

  const filteredInstructors = instructors.filter(
    (i) => i.name.toLowerCase().includes(instructorSearch.toLowerCase()) || i.email.toLowerCase().includes(instructorSearch.toLowerCase())
  );

  const filteredInstitutions = institutions.filter(
    (i) => i.name.toLowerCase().includes(institutionSearch.toLowerCase()) || i.code.toLowerCase().includes(institutionSearch.toLowerCase())
  );


  const filteredStudents = students
    .filter((s) => s.email !== 'superadmin@quirozsystems.com')
    .filter(
      (s) =>
        s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.institutionName.toLowerCase().includes(studentSearch.toLowerCase())
    );

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      PENDING: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      APPROVED: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      REJECTED: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    };
    return map[status] || map['PENDING'];
  };

  const statusLabel = (status: string) =>
    status === 'APPROVED' ? 'Aprobado' : status === 'REJECTED' ? 'Bloqueado' : 'Pendiente';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-6 sm:p-8 gcp-card-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Quiroz Systems — SuperAdmin Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Control de Docentes, Instituciones y Suscripciones
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm max-w-2xl">
            Los 8 cursos son gratuitos. Aprueba o bloquea docentes e instituciones, activa la suscripción mensual de los docentes premium y configura las donaciones Ko-fi/PayPal.
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button onClick={() => setIsAddOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Agregar Docente</span>
          </button>
          <button onClick={() => { fetchAll(); fetchMonetization(); }} disabled={loading} className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center space-x-2 disabled:opacity-50">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar Todo</span>
          </button>
        </div>
      </div>

      {actionFeedback && (
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#1a73e8] font-mono text-xs font-bold">{actionFeedback}</div>
      )}

      {fetchError && (
        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-mono text-xs font-bold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>{fetchError}</span>
          <button onClick={() => { fetchAll(); fetchMonetization(); }} className="text-[11px] font-bold underline hover:no-underline">Reintentar conexión</button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Instituciones', value: institutions.length, icon: Building2, color: 'blue' },
          { label: 'Docentes', value: overview?.totalInstructors || 0, icon: UserCheck, color: 'purple' },
          { label: 'Pendientes', value: overview?.pendingInstructors || 0, icon: Clock, color: 'amber' },
          { label: 'Estudiantes', value: overview?.totalStudents || 0, icon: Users, color: 'emerald' },
          { label: 'Certificados', value: overview?.totalCertificates || 0, icon: Award, color: 'amber' },
          { label: 'Cursos Activos', value: overview?.totalProgresses || 0, icon: BookOpen, color: 'blue' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-4 gcp-card-shadow text-center space-y-1">
            <kpi.icon className={`w-5 h-5 mx-auto text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
            <p className="text-xl font-extrabold text-gray-900 dark:text-white">{kpi.value}</p>
            <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Docentes Management */}
      <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-6 gcp-card-shadow space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-gray-100 dark:border-[#333333]">
          <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>Docentes Registrados ({filteredInstructors.length})</span>
          </h2>
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input type="text" value={instructorSearch} onChange={(e) => setInstructorSearch(e.target.value)} placeholder="Buscar docente..." className="w-full bg-gray-50 dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#333333] rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#1a73e8]" />
          </div>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-[#1a73e8] font-mono font-bold animate-pulse">Cargando docentes...</div>
        ) : filteredInstructors.length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-500 dark:text-gray-400 font-mono">No hay docentes registrados.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-[#262626] text-gray-700 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-[#333333]">
                <tr>
                  <th className="p-3">Docente</th>
                  <th className="p-3">Institución</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#333333] text-gray-800 dark:text-gray-200">
                {filteredInstructors.map((inst) => (
                  <tr key={inst.id} className="hover:bg-gray-50 dark:hover:bg-[#262626] transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-gray-900 dark:text-white">{inst.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">{inst.email}</p>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1.5 font-medium text-gray-900 dark:text-white">
                        <Building2 className="w-3.5 h-3.5 text-[#1a73e8]" />
                        <span>{inst.institution?.name || 'Sin Institución'}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${statusBadge(inst.approvalStatus)}`}>
                        {statusLabel(inst.approvalStatus)}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      {inst.approvalStatus !== 'APPROVED' && (
                        <button onClick={() => handleInstructorAction(inst.id, 'APPROVED')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-md text-xs transition-all inline-flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Aprobar</span>
                        </button>
                      )}
                      {inst.approvalStatus !== 'REJECTED' && (
                        <button onClick={() => handleInstructorAction(inst.id, 'REJECTED')} className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-md text-xs transition-all inline-flex items-center space-x-1">
                          <Ban className="w-3.5 h-3.5" />
                          <span>Bloquear</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Instituciones Management */}
      <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-6 gcp-card-shadow space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-gray-100 dark:border-[#333333]">
          <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Instituciones Educativas ({filteredInstitutions.length})</span>
          </h2>
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input type="text" value={institutionSearch} onChange={(e) => setInstitutionSearch(e.target.value)} placeholder="Buscar institución o código..." className="w-full bg-gray-50 dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#333333] rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#1a73e8]" />
          </div>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-[#1a73e8] font-mono font-bold animate-pulse">Cargando instituciones...</div>
        ) : filteredInstitutions.length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-500 dark:text-gray-400 font-mono">No hay instituciones registradas.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-[#262626] text-gray-700 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-[#333333]">
                <tr>
                  <th className="p-3">Institución</th>
                  <th className="p-3">Código</th>
                  <th className="p-3">Docentes</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#333333] text-gray-800 dark:text-gray-200">
                {filteredInstitutions.map((inst) => {
                  const docentes = inst._count.instructors;
                  return (
                    <tr key={inst.id} className="hover:bg-gray-50 dark:hover:bg-[#262626] transition-colors">
                      <td className="p-3">
                        <p className="font-bold text-gray-900 dark:text-white">{inst.name}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">{inst.adminEmail}</p>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-gray-500 dark:text-gray-400">{inst.code}</td>
                      <td className="p-3 font-mono font-bold text-[#1a73e8]">{docentes}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${statusBadge(inst.status)}`}>
                          {statusLabel(inst.status)}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        {inst.status !== 'APPROVED' && (
                          <button onClick={() => handleInstitutionAction(inst.id, 'APPROVED')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-md text-xs transition-all inline-flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Aprobar</span>
                          </button>
                        )}
                        {inst.status !== 'REJECTED' && (
                          <button onClick={() => handleInstitutionAction(inst.id, 'REJECTED')} className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-md text-xs transition-all inline-flex items-center space-x-1">
                            <Ban className="w-3.5 h-3.5" />
                            <span>Bloquear</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Todos los Estudiantes */}
      <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-6 gcp-card-shadow space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-gray-100 dark:border-[#333333]">
          <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#1a73e8]" />
            <span>Estudiantes ({filteredStudents.length})</span>
          </h2>
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input type="text" value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} placeholder="Buscar estudiante, correo o institución..." className="w-full bg-gray-50 dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#333333] rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#1a73e8]" />
          </div>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-[#1a73e8] font-mono font-bold animate-pulse">Cargando estudiantes...</div>
        ) : filteredStudents.length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-500 dark:text-gray-400 font-mono">No hay estudiantes registrados.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-[#262626] text-gray-700 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-[#333333]">
                <tr>
                  <th className="p-3">Estudiante</th>
                  <th className="p-3">Docente / Institución</th>
                  <th className="p-3">Modalidad</th>
                  <th className="p-3">Acceso</th>
                  <th className="p-3">Lecciones</th>
                  <th className="p-3">Certificados</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#333333] text-gray-800 dark:text-gray-200">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-[#262626] transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-gray-900 dark:text-white">{s.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">{s.email}</p>
                    </td>
                    <td className="p-3">
                      {s.studentType === 'INSTITUTIONAL' ? (
                        <span className="inline-flex items-center space-x-1.5 font-medium text-gray-900 dark:text-white">
                          <Building2 className="w-3.5 h-3.5 text-[#1a73e8]" />
                          <span>{s.institutionName}</span>
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 italic">Estudiante Autónomo (sin docente)</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        s.studentType === 'INSTITUTIONAL'
                          ? 'bg-blue-100 dark:bg-blue-950 text-[#1a73e8] border-blue-200 dark:border-blue-800'
                          : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      }`}>
                        {s.studentType === 'INSTITUTIONAL' ? 'Institución / Docente' : 'Cuenta Propia'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase border bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                        100% Gratuito
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{s.totalLessonsCompleted}</td>
                    <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">{s.totalCertificates}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


      {/* Monetización: Donaciones Ko-fi/PayPal + precio de suscripción */}
      <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-6 gcp-card-shadow space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-[#333333]">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-100 dark:border-amber-900">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Donaciones y Suscripción (Ko-fi / PayPal)</h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Los 8 cursos son gratuitos; la plataforma se sostiene con donaciones voluntarias y la suscripción docente. Aquí configuras los enlaces y el precio informativo.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveMonetization} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
              <Coffee className="w-3.5 h-3.5 text-[#ff5e5b]" />
              <span>Enlace de Ko-fi</span>
            </label>
            <input type="url" value={monetization.kofiUrl || ''} onChange={(e) => setMonetization({ ...monetization, kofiUrl: e.target.value })} placeholder="https://ko-fi.com/tu_usuario" className="w-full bg-gray-50 dark:bg-[#0d0d0d] border border-gray-300 dark:border-[#333333] rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1a73e8]" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
              <Heart className="w-3.5 h-3.5 text-[#0070ba]" />
              <span>Enlace de PayPal</span>
            </label>
            <input type="url" value={monetization.paypalUrl || ''} onChange={(e) => setMonetization({ ...monetization, paypalUrl: e.target.value })} placeholder="https://paypal.me/tu_usuario" className="w-full bg-gray-50 dark:bg-[#0d0d0d] border border-gray-300 dark:border-[#333333] rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1a73e8]" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
              <CalendarClock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Precio informativo de la suscripción docente</span>
            </label>
            <input type="text" value={monetization.subscriptionPriceDisplay} onChange={(e) => setMonetization({ ...monetization, subscriptionPriceDisplay: e.target.value })} placeholder="$9.99 USD/mes" className="w-full bg-gray-50 dark:bg-[#0d0d0d] border border-gray-300 dark:border-[#333333] rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1a73e8]" />
          </div>

          <div className="flex items-end justify-end sm:col-span-2">
            <button type="submit" className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-4 py-2 rounded-lg text-xs transition-all shadow-sm flex items-center space-x-1.5">
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Monetización</span>
            </button>
          </div>
        </form>
      </div>

      {/* Add Instructor / Institution Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181818] border border-gray-300 dark:border-[#333333] rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 text-gray-800 dark:text-[#ededed]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-[#333333]">
              <div className="flex items-center space-x-2.5">
                <UserCheck className="w-6 h-6 text-[#1a73e8]" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Agregar Docente / Institución</h3>
              </div>
              <button onClick={() => setIsAddOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddInstructor} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Nombre de la Institución / Cátedra</label>
                <input type="text" required value={newInstName} onChange={(e) => setNewInstName(e.target.value)} placeholder="Ej: Instituto Tecnológico Quiroz" className="w-full bg-gray-50 dark:bg-[#0d0d0d] border border-gray-300 dark:border-[#333333] rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1a73e8]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Nombre del Docente</label>
                  <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ej: Prof. María García" className="w-full bg-gray-50 dark:bg-[#0d0d0d] border border-gray-300 dark:border-[#333333] rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1a73e8]" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Correo del Docente</label>
                  <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="profe@instituto.edu" className="w-full bg-gray-50 dark:bg-[#0d0d0d] border border-gray-300 dark:border-[#333333] rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1a73e8]" />
                </div>
              </div>
              {addFeedback && <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#1a73e8] font-mono text-xs">{addFeedback}</div>}
              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100 dark:border-[#333333]">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-lg">Cancelar</button>
                <button type="submit" disabled={adding} className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm flex items-center space-x-1.5 disabled:opacity-50">
                  {adding ? <span>Agregando...</span> : <><UserCheck className="w-3.5 h-3.5" /><span>Agregar y Habilitar</span></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
