import React, { useState, useEffect } from 'react';
import { User, X, KeyRound, ShieldCheck, LogIn, GraduationCap, Building2 } from 'lucide-react';
import logoQuiroz from '../img/logo_quiroz_systems.png';
import { api } from '../lib/apiClient';

type RegisterRole = 'USUARIO' | 'INSTITUCION';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  theme: 'dark' | 'light';
  initialRole?: RegisterRole;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
  theme,
  initialRole = 'USUARIO',
}) => {
  const [role, setRole] = useState<RegisterRole>(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [institutionName, setInstitutionName] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRole(initialRole);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setInstitutionName('');
      setError('');
      setSuccess('');
      setLoading(false);
    }
  }, [isOpen, initialRole]);

  const handleRoleChange = (newRole: RegisterRole) => {
    setRole(newRole);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setInstitutionName('');
    setError('');
    setSuccess('');
    setLoading(false);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError('Por favor ingresa tu nombre.');
      return;
    }

    if (role === 'INSTITUCION' && !institutionName.trim()) {
      setError('Por favor ingresa el nombre de la institución educativa.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      const bodyPayload: any = {
        role,
        name: trimmedName,
        email: trimmedEmail,
        password,
      };
      if (role === 'INSTITUCION' && institutionName.trim()) {
        bodyPayload.institutionName = institutionName.trim();
      }

      const { data, response: res } = await api.post<any>('/auth/register', bodyPayload, {
        skipAuthRedirect: true,
      });

      if (res.ok) {
        setSuccess(data?.message || 'Cuenta creada correctamente. Ahora puedes iniciar sesión.');
      } else {
        const issuesText = Array.isArray(data?.issues) && data.issues.length > 0
          ? data.issues.map((i: any) => i.message).join(' • ')
          : null;
        setError(data?.error ? (issuesText ? `${data.error} (${issuesText})` : data.error) : (issuesText || 'No se pudo registrar la cuenta.'));
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === 'dark';

  const roleButtons: { key: RegisterRole; icon: React.ReactNode; label: string }[] = [
    { key: 'USUARIO', icon: <User className="w-3.5 h-3.5" />, label: 'Alumno' },
    { key: 'INSTITUCION', icon: <Building2 className="w-3.5 h-3.5" />, label: 'Institución' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className={`border rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[92vh] overflow-y-auto shadow-2xl space-y-3.5 transition-all relative my-auto ${
        isDark ? 'bg-[#181818] border-[#333333] text-[#ededed]' : 'bg-white border-gray-200 text-gray-800'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-gray-200 dark:border-[#333333]">
          <div className="flex items-center space-x-2.5">
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center p-1 ${
              isDark ? 'bg-[#0d0d0d] border-[#333333]' : 'bg-blue-50 border-blue-100'
            }`}>
              <img src={logoQuiroz} alt="Quiroz Systems Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white">Registro de Cuenta</h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">Quiroz Systems Platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-1 bg-gray-100 dark:bg-[#0d0d0d] p-1 rounded-lg border border-gray-200 dark:border-[#333333]">
          {roleButtons.map((rb) => (
            <button
              key={rb.key}
              type="button"
              onClick={() => handleRoleChange(rb.key)}
              className={`py-1.5 rounded-md text-[11px] font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
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

        {/* Info Banner */}
        <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${
          isDark ? 'bg-[#0d0d0d] border-[#333333] text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'
        }`}>
          <ShieldCheck className="w-4 h-4 text-[#1a73e8] shrink-0" />
          <p className="text-[10px] sm:text-[11px] leading-tight">
            Acceso 100% gratuito a los 8 cursos. Inicia sesión tras registrarte.
          </p>
        </div>

        {/* Error / Success Messages */}
        {error && (
          <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200">
            <p className="text-[11px] font-bold">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-2.5">
            <p className="text-xs font-bold flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>¡Cuenta registrada exitosamente!</span>
            </p>
            <p className="text-[11px] leading-tight">{success}</p>
            <button
              onClick={onSwitchToLogin}
              className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-2 rounded-lg text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Iniciar Sesión Ahora</span>
            </button>
          </div>
        )}

        {/* Form (hidden once registered) */}
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
            {role === 'INSTITUCION' ? (
              <>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 text-[11px] mb-0.5">
                    Nombre del Docente <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Lic. Carlos Mendoza"
                    className={`w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#1a73e8] ${
                      isDark ? 'bg-[#0d0d0d] border-[#333333] text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 text-[11px] mb-0.5">
                    Institución Educativa <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="Ej: Universidad Tecnológica Nacional"
                    className={`w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#1a73e8] ${
                      isDark ? 'bg-[#0d0d0d] border-[#333333] text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 text-[11px] mb-0.5">
                    Correo Institucional <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="docente@universidad.edu"
                    className={`w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#1a73e8] ${
                      isDark ? 'bg-[#0d0d0d] border-[#333333] text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 text-[11px] mb-0.5">
                    Nombre Completo <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    className={`w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#1a73e8] ${
                      isDark ? 'bg-[#0d0d0d] border-[#333333] text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 text-[11px] mb-0.5">
                    Correo Electrónico <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="estudiante@correo.com"
                    className={`w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#1a73e8] ${
                      isDark ? 'bg-[#0d0d0d] border-[#333333] text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </>
            )}

            {/* Contraseñas en Grid de 2 Columnas para Ahorrar Espacio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 text-[11px] mb-0.5">
                  Contraseña <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className={`w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#1a73e8] ${
                    isDark ? 'bg-[#0d0d0d] border-[#333333] text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 text-[11px] mb-0.5">
                  Confirmar <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite contraseña"
                  className={`w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#1a73e8] ${
                    isDark ? 'bg-[#0d0d0d] border-[#333333] text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-2.5 rounded-lg text-xs transition-all shadow-md flex items-center justify-center space-x-1.5 disabled:opacity-60 cursor-pointer mt-1"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{loading ? 'Registrando...' : role === 'INSTITUCION' ? 'Registrar Institución / Docente' : 'Crear Cuenta'}</span>
            </button>
          </form>
        )}

        {/* Switch to Login */}
        <div className="pt-0.5 text-center">
          <span className="text-[10px] text-gray-500 dark:text-gray-400">
            ¿Ya tienes cuenta?{' '}
          </span>
          <button
            onClick={onSwitchToLogin}
            className="text-[10px] font-bold text-[#1a73e8] hover:underline cursor-pointer"
          >
            Inicia Sesión
          </button>
        </div>
      </div>
    </div>
  );
};