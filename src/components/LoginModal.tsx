import React, { useState } from 'react';
import { ArrowRight, X, LogIn, ShieldCheck, Mail, Lock } from 'lucide-react';
import logoQuiroz from '../img/logo_quiroz_systems.png';
import { StudentProfile, UserRole } from '../types';
import { api } from '../lib/apiClient';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: StudentProfile, role: UserRole, token?: string) => void;
  onSwitchToRegister: () => void;
  theme: 'dark' | 'light';
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSwitchToRegister,
  theme,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);

    try {
      const { data, response: res } = await api.post<any>(
        '/auth/login',
        { email: email.trim(), password },
        { skipAuthRedirect: true }
      );

      if (res.ok && data?.user) {
        onLoginSuccess(
          { name: data.user.name || email, email: data.user.email || email },
          data.user.role,
          data.token
        );
      } else {
        setAuthError(data?.error || 'Credenciales incorrectas. Revisa tu correo y contraseña.');
      }
    } catch (err) {
      console.error(err);
      setAuthError('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`border rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 transition-all ${
          isDark ? 'bg-[#181818] border-[#333333] text-[#ededed]' : 'bg-white border-gray-200 text-gray-800'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-[#333333]">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-xl border flex items-center justify-center p-1.5 ${
                isDark ? 'bg-[#0d0d0d] border-[#333333]' : 'bg-blue-50 border-blue-100'
              }`}
            >
              <img src={logoQuiroz} alt="Quiroz Systems Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Iniciar Sesión</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Plataforma Quiroz Systems</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Error Banner */}
        {authError && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 space-y-1">
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
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu-correo@ejemplo.com"
                className={`w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1a73e8] transition-colors ${
                  isDark
                    ? 'bg-[#0d0d0d] border-[#333333] text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1a73e8] transition-colors ${
                isDark
                  ? 'bg-[#0d0d0d] border-[#333333] text-white placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email.trim() || !password}
            className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Validando credenciales...' : 'Entrar a la Plataforma'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch to Register */}
        <div className="pt-2 text-center border-t border-gray-100 dark:border-[#333333]">
          <span className="text-[11px] text-gray-500 dark:text-gray-400">¿Aún no tienes cuenta? </span>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-[11px] font-bold text-[#1a73e8] hover:underline cursor-pointer"
          >
            Crear cuenta gratuita
          </button>
        </div>
      </div>
    </div>
  );
};