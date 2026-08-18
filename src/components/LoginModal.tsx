import React, { useState, useEffect } from 'react';
import { User, ArrowRight, X, KeyRound, Crown, LogIn, ShieldCheck, GraduationCap } from 'lucide-react';
import logoQuiroz from '../img/logo_quiroz_systems.png';
import { StudentProfile } from '../types';

type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'SUPER_ADMIN';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: StudentProfile, role: UserRole, token?: string) => void;
  onSwitchToRegister: () => void;
  initialRole?: UserRole;
  theme: 'dark' | 'light';
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSwitchToRegister,
  initialRole = 'STUDENT',
  theme,
}) => {
  const [role, setRole] = useState<UserRole>(initialRole === 'SUPER_ADMIN' ? 'STUDENT' : initialRole);
  const [adminMode, setAdminMode] = useState(initialRole === 'SUPER_ADMIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [instructorPending, setInstructorPending] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset fields when role changes
  useEffect(() => {
    if (adminMode) {
      setEmail('superadmin@quirozsystems.com');
      setPassword('no_password_needed');
    } else {
      setEmail('');
      setPassword('');
    }
    setInstructorPending(false);
    setAuthError('');
    setLoading(false);
  }, [role, adminMode]);

  if (!isOpen) return null;

  const isSuperAdmin = adminMode;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setInstructorPending(false);

    setLoading(true);
    const currentRole = isSuperAdmin ? 'SUPER_ADMIN' : role;
    
    try {
      const endpoint = '/api/auth/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: currentRole }),
      });
      const data = await res.json();

      if (res.ok) {
        onLoginSuccess(
          { name: data.user?.name || email, email: data.user?.email || email },
          currentRole,
          data.token
        );
      } else if (res.status === 403 && data.approvalStatus) {
        setInstructorPending(true);
        setAuthError(data.error || 'Tu solicitud de docente aún no ha sido aprobada.');
      } else {
        setAuthError(data.error || 'No se pudo iniciar sesión.');
      }
    } catch (err) {
      console.error(err);
      setAuthError('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === 'dark';

  const roleButtons: { key: UserRole; icon: React.ReactNode; label: string }[] = [
    { key: 'STUDENT', icon: <User className="w-3.5 h-3.5" />, label: 'Alumno' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`border rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 transition-all ${
        isDark ? 'bg-[#181818] border-[#333333] text-[#ededed]' : 'bg-white border-gray-200 text-gray-800'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-[#333333]">
          <div className="flex items-center space-x-3">
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center p-1 ${
              isDark ? 'bg-[#0d0d0d] border-[#333333]' : 'bg-blue-50 border-blue-100'
            }`}>
              <img src={logoQuiroz} alt="Quiroz Systems Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Inicio de Sesión</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Quiroz Systems Platform</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector */}
        {!adminMode && (
          <div className="grid grid-cols-2 gap-1.5 bg-gray-100 dark:bg-[#0d0d0d] p-1.5 rounded-xl border border-gray-200 dark:border-[#333333]">
            {roleButtons.map((rb) => (
              <button
                key={rb.key}
                type="button"
                onClick={() => setRole(rb.key)}
                className={`py-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center space-x-1 ${
                  role === rb.key
                    ? 'bg-[#1a73e8] text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {rb.icon}
                <span>{rb.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Admin Header */}
        {adminMode && (
          <div className="p-3 rounded-xl bg-gray-100 dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#333333] flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center space-x-1.5">
              <Crown className="w-4 h-4 text-[#1a73e8]" />
              <span>Acceso de Administración</span>
            </span>
            <button
              type="button"
              onClick={() => { setAdminMode(false); setRole(initialRole === 'SUPER_ADMIN' ? 'STUDENT' : initialRole); }}
              className="text-[11px] font-bold text-[#1a73e8] hover:underline"
            >
              Volver
            </button>
          </div>
        )}

        {/* Instructor Pending Banner */}
        {instructorPending && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 space-y-1.5">
            <p className="text-xs font-bold flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Solicitud Pendiente de Aprobación</span>
            </p>
            <p className="text-[11px] leading-relaxed">{authError}</p>
          </div>
        )}



        {/* Auth Error Banner */}
        {authError && !instructorPending && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 space-y-1.5">
            <p className="text-xs font-bold flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
              <span>No se pudo iniciar sesión</span>
            </p>
            <p className="text-[11px] leading-relaxed">{authError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@quirozsystems.com"
              disabled={isSuperAdmin}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a73e8] ${
                isDark ? 'bg-[#0d0d0d] border-[#333333] text-white' : 'bg-white border-gray-300 text-gray-900'
              } disabled:opacity-60`}
            />
          </div>

          {!isSuperAdmin && (
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña de acceso"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a73e8] ${
                  isDark ? 'bg-[#0d0d0d] border-[#333333] text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          )}

          {isSuperAdmin && (
            <div className={`p-3 rounded-xl border flex items-center space-x-2.5 ${
              isDark ? 'bg-[#0d0d0d] border-[#333333]' : 'bg-gray-50 border-gray-200'
            }`}>
              <KeyRound className="w-4 h-4 text-[#1a73e8] shrink-0" />
              <p className="text-[11px] text-gray-600 dark:text-gray-300">
                Acceso exclusivo de la plataforma Quiroz Systems (sin contraseña).
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-60"
          >
            <LogIn className="w-4 h-4" />
            <span>{isSuperAdmin ? 'Entrar al Panel SuperAdmin' : loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch to Register */}
        {!isSuperAdmin && (
          <div className="pt-1 text-center">
            <span className="text-[11px] text-gray-500 dark:text-gray-400">¿No tienes cuenta?{' '}</span>
            <button onClick={onSwitchToRegister} className="text-[11px] font-bold text-[#1a73e8] hover:underline">
              Regístrate aquí
            </button>
          </div>
        )}

        {/* Separate Admin Access */}
        {!isSuperAdmin && (
          <div className="pt-2 text-center border-t border-gray-100 dark:border-[#333333]">
            <button
              type="button"
              onClick={() => setAdminMode(true)}
              className="text-[11px] font-medium text-gray-500 dark:text-gray-400 hover:text-[#1a73e8] hover:underline flex items-center justify-center space-x-1"
            >
              <Crown className="w-3 h-3" />
              <span>Acceso de administración (separado)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};