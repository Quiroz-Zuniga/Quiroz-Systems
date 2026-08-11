import React from 'react';
import { Icon } from '@iconify/react';
import { CreditCard, X, Lock, Sparkles } from 'lucide-react';
import logoQuiroz from '../img/logo_quiroz_systems.png';
import { Course } from '../types';

interface PaymentModalProps {
  course: Course;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ course, onClose, theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`border rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 transition-all ${
        isDark ? 'bg-[#181818] border-[#333333] text-[#ededed]' : 'bg-white border-gray-200 text-gray-800'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-[#333333]">
          <div className="flex items-center space-x-3">
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center p-1 ${
              isDark ? 'bg-[#0d0d0d] border-[#333333]' : 'bg-amber-50 border-amber-200'
            }`}>
              <img src={logoQuiroz} alt="Quiroz Systems Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Acceso Completo Requerido</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Modalidad por Cuenta Propia</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Course badge */}
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#333333]">
          {course.iconifyId ? (
            <div className={`w-10 h-10 rounded-lg border flex items-center justify-center p-1.5 shrink-0 ${
              isDark ? 'bg-[#181818] border-[#333333]' : 'bg-white border-gray-200'
            }`}>
              <Icon icon={course.iconifyId} width="24" height="24" />
            </div>
          ) : null}
          <div>
            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{course.title}</p>
            <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{course.levelRange} · {course.lessons.length} lecciones</p>
          </div>
        </div>

        {/* Locked notice */}
        <div className={`p-4 rounded-xl border space-y-3 ${
          isDark ? 'bg-amber-950/40 border-amber-800' : 'bg-amber-50 border-amber-200'
        }`}>
          <div className="flex items-center space-x-2 font-bold text-sm text-amber-700 dark:text-amber-300">
            <Lock className="w-4 h-4 shrink-0" />
            <span>Curso Bloqueado por Licencia</span>
          </div>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-amber-200/90' : 'text-amber-800/90'}`}>
            Estás en la modalidad <strong>Curso por Cuenta Propia</strong>, que incluye acceso gratuito a{' '}
            <strong>2 cursos</strong>. Para habilitar <strong>todos los cursos</strong> del catálogo
            (incluido {course.languageName}) realiza el pago de tu membresía o licencia completa de la plataforma.
          </p>
        </div>

        {/* Actions */}
        <button
          onClick={onClose}
          className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2"
        >
          <CreditCard className="w-4 h-4" />
          <span>Continuar Explorando Catálogo</span>
        </button>
        <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Comuníquese con Quiroz Systems para obtener acceso completo.</span>
        </p>
      </div>
    </div>
  );
};