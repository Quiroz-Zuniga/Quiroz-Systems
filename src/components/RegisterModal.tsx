import React, { useState, useEffect } from 'react';
import { User, Building2, X, KeyRound, ShieldCheck, LogIn } from 'lucide-react';
import logoQuiroz from '../img/logo_quiroz_systems.png';

// Registro de cuenta de estudiante o docente. Proceso INDEPENDIENTE del inicio de sesión:
// crear una cuenta NO inicia sesión automáticamente; el usuario debe "iniciar sesión" después.
type RegisterRole = 'STUDENT' | 'INSTRUCTOR';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  theme: 'dark' | 'light';
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin, theme }) => {
  const [role, setRole] = useState<RegisterRole>('STUDENT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [institutionName, setInstitutionName] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError('');
    setSuccess('');
    setLoading(false);
  }, [role]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, name, email, password, institutionName }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message || 'Cuenta creada correctamente.');
      } else {
        setError(data.error || 'No se pudo registrar la cuenta.');
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
    { key: 'STUDENT', icon: <User className="w-3.5 h-3.5" />, label: 'Estudiante' },
    { key: 'INSTRUCTOR', icon: <Building2 className="w-3.5 h-3.5" />, label: 'Docente' },
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
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Registro de Cuenta</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Quiroz Systems Platform</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector */}
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

        {/* Info Banner */}
        <div className={`p-3 rounded-xl border flex items-start space-x-2.5 ${
          isDark ? 'bg-[#0d0d0d] border-[#333333] text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'
        }`}>
          <ShieldCheck className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            {role === 'INSTRUCTOR'
              ? 'Tu solicitud de docente quedará <strong>pendiente de aprobación</strong> por Quiroz Systems. No podrás iniciar sesión hasta que sea aprobada.'
              : 'Al crear tu cuenta podrás <strong>iniciar sesión</strong> inmediatamente con tu correo y contraseña.'}
          </p>
        </div>

        {/* Error / Success Messages */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 space-y-1">
            <p className="text-xs font-bold">Error en el registro</p>
            <p className="text-[11px] leading-relaxed">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-3">
            <p className="text-xs font-bold flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>¡Cuenta registrada!</span>
            </p>
            <p className="text-[11px] leading-relaxed">{success}</p>
            <button
              onClick={onSwitchToLogin}
              className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-2.5 rounded-lg text-xs transition-all flex items-center justify-center space-x-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Iniciar Sesión</span>
            </button>
          </div>
        )}

        {/* Form (hidden once registered) */}
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                {role === 'INSTRUCTOR' ? 'Nombre del Docente' : 'Nombre Completo'}
              </label>
              <input
                type="text" required value={name} onChange={(e) => setName(e.target.value)}
                placeholder={role === 'INSTRUCTOR' ? 'Ej: Prof. María García' : 'Ej: Juan Pérez'}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a73e8] ${
                  isDark ? 'bg-[#0d0d0d] border-[#333333] text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@quirozsystems.com"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a73e8] ${
                  isDark ? 'bg-[#0d0d0d] border-[#333333] text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            {role === 'INSTRUCTOR' && (
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Nombre de tu Institución / Cátedra</label>
                <input
                  type="text" required value={institutionName} onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="Ej: Instituto Tecnológico Quiroz"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a73e8] ${
                    isDark ? 'bg-[#0d0d0d] border-[#333333] text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            )}

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a73e8] ${
                  isDark ? 'bg-[#0d0d0d] border-[#333333] text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Confirmar Contraseña</label>
              <input
                type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a73e8] ${
                  isDark ? 'bg-[#0d0d0d] border-[#333333] text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? 'Registrando...' : role === 'INSTRUCTOR' ? 'Registrar Solicitud de Docente' : 'Crear Cuenta'}</span>
            </button>
          </form>
        )}

        {/* Switch to Login */}
        <div className="pt-1 text-center">
          <span className="text-[11px] text-gray-500 dark:text-gray-400">
            ¿Ya tienes cuenta?{' '}
          </span>
          <button
            onClick={onSwitchToLogin}
            className="text-[11px] font-bold text-[#1a73e8] hover:underline"
          >
            Inicia Sesión
          </button>
        </div>
      </div>
    </div>
  );
};