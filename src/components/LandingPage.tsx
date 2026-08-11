import React from 'react';
import { BookOpen, ShieldCheck, Terminal, Award, Cpu, Code2, ArrowRight, CheckCircle2, Zap, Lock, Sparkles, Layers, Building2, Crown, UserPlus, LogIn } from 'lucide-react';
import logoQuiroz from '../img/logo_quiroz_systems.png';
import { allCourses } from '../data/courses';

type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'SUPER_ADMIN';

interface LandingPageProps {
  onOpenLogin: (defaultRole?: UserRole) => void;
  onOpenRegister: (defaultRole?: 'STUDENT' | 'INSTRUCTOR') => void;
  onExploreCourses: () => void;
  theme: 'dark' | 'light';
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenLogin,
  onOpenRegister,
  onExploreCourses,
  theme,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen font-sans transition-colors ${
      isDark ? 'bg-[#0d0d0d] text-[#ededed]' : 'bg-[#f8f9fa] text-gray-900'
    }`}>
      {/* Landing Navbar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDark ? 'bg-[#181818]/90 border-[#333333]' : 'bg-white/90 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center p-1 shadow-sm ${
              isDark ? 'bg-[#0d0d0d] border-[#333333]' : 'bg-blue-50 border-blue-100'
            }`}>
              <img src={logoQuiroz} alt="Quiroz Systems Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-white">Quiroz Systems</span>
              <span className="text-[10px] text-[#1a73e8] font-mono font-bold block -mt-1 uppercase tracking-widest">
                Software & Engineering
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onOpenLogin('INSTRUCTOR')}
              className="hidden sm:flex items-center space-x-1 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-[#1a73e8] dark:hover:text-white px-3 py-2 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Docentes</span>
            </button>

            <button
              onClick={() => onOpenRegister('STUDENT')}
              className="hidden sm:flex items-center space-x-1 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-[#1a73e8] dark:hover:text-white px-3 py-2 transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Registrarse</span>
            </button>

            <button
              onClick={() => onOpenLogin('STUDENT')}
              className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-4 py-2 rounded-lg text-xs transition-all shadow-md flex items-center space-x-1.5"
            >
              <span>Iniciar Sesión</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#1a73e8]/15 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#1a73e8] text-xs font-semibold">
            <img src={logoQuiroz} alt="Quiroz Systems" className="w-4 h-4 object-contain" />
            <span>Plataforma Oficial de Formación en Desarrollo de Software</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Domina la Ingeniería de Software desde <span className="text-[#1a73e8]">Cero Absoluto</span> hasta <span className="text-[#1a73e8]">Nivel Experto</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Aprende C++, Python, JavaScript, Java, Node.js, Rust, SQL y HTML/CSS en un entorno interactivo con sandbox de compilación local en tiempo real, evaluaciones automáticas y certificados oficiales con código alfanumérico UUID persistidos en SQLite.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenRegister('STUDENT')}
              className="w-full sm:w-auto bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all shadow-lg hover:shadow-[#1a73e8]/30 flex items-center justify-center space-x-2"
            >
              <span>Crear Cuenta</span>
              <UserPlus className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenLogin('STUDENT')}
              className="w-full sm:w-auto bg-gray-100 dark:bg-[#181818] hover:bg-gray-200 dark:hover:bg-[#262626] text-gray-900 dark:text-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all border border-gray-200 dark:border-[#333333] flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4 text-[#1a73e8]" />
              <span>Iniciar Sesión</span>
            </button>

            <button
              onClick={() => onOpenLogin('INSTRUCTOR')}
              className="w-full sm:w-auto bg-gray-100 dark:bg-[#181818] hover:bg-gray-200 dark:hover:bg-[#262626] text-gray-900 dark:text-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all border border-gray-200 dark:border-[#333333] flex items-center justify-center space-x-2"
            >
              <Building2 className="w-4 h-4 text-[#1a73e8]" />
              <span>Acceso Docente / Institución</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'bg-[#181818] border-[#333333]' : 'bg-white border-gray-200 gcp-card-shadow'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#1a73e8] flex items-center justify-center mb-4 border border-blue-100 dark:border-blue-900">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Sandbox de Compilación Local</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Ejecuta código en C++, Python, Node.js y Java en menos de 50ms sin dependencias remotas mediante nuestro motor desacoplado en Express.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'bg-[#181818] border-[#333333]' : 'bg-white border-gray-200 gcp-card-shadow'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-100 dark:border-emerald-900">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Certificación UUID Verificable</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Cada certificado emitido incluye un código alfanumérico UUID con validez pública verificable en la base de datos SQLite y exportación en PDF.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'bg-[#181818] border-[#333333]' : 'bg-white border-gray-200 gcp-card-shadow'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 border border-purple-100 dark:border-purple-900">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Panel Controlador Docente</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Panel de administración para instructores que permite auditar lecciones, ver tiempos y soluciones de estudiantes y aprobar certificados.
            </p>
          </div>
        </div>
      </section>

      {/* Course Catalog Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            8 Cursos de Especialización Habilitados
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Ruta pedagógica completa compuesta por 15 lecciones estructuradas por curso desde nivel cero hasta proyecto integrador.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => onOpenLogin('STUDENT')}
              className={`p-5 rounded-xl border transition-all cursor-pointer hover:border-[#1a73e8] gcp-glow-hover flex flex-col justify-between ${
                isDark ? 'bg-[#181818] border-[#333333]' : 'bg-white border-gray-200 gcp-card-shadow'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#1a73e8] border border-blue-200 dark:border-blue-800">
                    {course.levelRange}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">{course.estimatedHours}h</span>
                </div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">{course.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{course.description}</p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-[#333333] flex items-center justify-between text-xs text-[#1a73e8] font-bold mt-4">
                <span>Explorar Lecciones</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-8 text-center text-xs font-mono transition-colors ${
        isDark ? 'bg-[#181818] border-[#333333] text-gray-400' : 'bg-white border-gray-200 text-gray-500'
      }`}>
        <p>© 2026 Quiroz Systems — Plataforma Educativa de Software e Ingeniería. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
