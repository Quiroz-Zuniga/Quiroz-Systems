import React, { useEffect, useState } from 'react';
import { BookOpen, ShieldCheck, Terminal, Award, Cpu, Code2, ArrowRight, CheckCircle2, Zap, Lock, Sparkles, Layers, Building2, Crown, UserPlus, LogIn, GraduationCap, Coffee, Users, MapPin, Mail, Phone } from 'lucide-react';
import logoQuiroz from '../img/logo_quiroz_systems.png';
import { allCourses } from '../data/courses';
import { Icon } from '@iconify/react';

import { StudentProfile, UserRole } from '../types';

interface LandingPageProps {
  onOpenLogin: () => void;
  onOpenRegister: (defaultRole?: 'USUARIO' | 'INSTITUCION') => void;
  onExploreCourses: (course?: any) => void;
  theme: 'dark' | 'light';
  allowedCourseIds?: string[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenLogin,
  onOpenRegister,
  onExploreCourses,
  theme,
  allowedCourseIds = [],
}) => {
  const isDark = theme === 'dark';
  const [typedCode, setTypedCode] = useState('');
  
  const fullCode = `def quiroz_systems():
    print("Bienvenidos a Quiroz Systems")
    skills = ["Python", "C++", "JavaScript", "SQL"]
    for skill in skills:
        print(f"Mastering {skill}")
    return "Developer Ready"

# Ejecutando la plataforma...
quiroz_systems()`;

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullCode.length) {
        setTypedCode(fullCode.slice(0, i + 1));
        i++;
      } else {
        setTimeout(() => { i = 0; setTypedCode(''); }, 2000);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

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

          <div className="hidden md:flex items-center space-x-6 text-sm font-bold text-gray-700 dark:text-gray-300">
            <button onClick={() => onOpenRegister('USUARIO')} className="hover:text-[#1a73e8] transition-colors cursor-pointer">Registrarse</button>
            <button onClick={() => onOpenLogin()} className="hover:text-[#1a73e8] transition-colors cursor-pointer">Iniciar Sesión</button>
            <a href="#cursos" className="hover:text-[#1a73e8] transition-colors">Cursos</a>
            <a href="#suscripciones" className="hover:text-[#1a73e8] transition-colors">Suscripciones</a>
            <a href="#contacto" className="hover:text-[#1a73e8] transition-colors">Contacto</a>
          </div>
          
          <div className="md:hidden flex items-center">
             <button onClick={() => onOpenLogin()} className="text-[#1a73e8] font-bold cursor-pointer">Entrar</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[300px] bg-[#1a73e8]/15 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-left space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#1a73e8] text-xs font-semibold">
              <img src={logoQuiroz} alt="Quiroz Systems" className="w-4 h-4 object-contain" />
              <span>Plataforma Oficial de Formación en Desarrollo de Software</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              Domina la Ingeniería de Software desde <span className="text-[#1a73e8]">Cero Absoluto</span> hasta <span className="text-[#1a73e8]">Nivel Experto</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Aprende C++, Python, JavaScript, Java, Node.js, Rust, SQL y HTML/CSS en un entorno interactivo con ejercicios prácticos, evaluaciones automáticas y certificados oficiales con código único de verificación.
            </p>
          </div>
          
          <div className={`p-6 rounded-xl border font-mono text-sm shadow-2xl ${isDark ? 'bg-[#1e1e1e] border-[#333] text-green-400' : 'bg-gray-900 border-gray-800 text-green-400'}`}>
             <div className="flex space-x-2 mb-4">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
             </div>
             <pre className="whitespace-pre-wrap h-48 overflow-hidden">
               {typedCode}<span className="animate-pulse">_</span>
             </pre>
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
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Práctica Interactiva en el Editor</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Escribe y ejecuta tu código directamente en el curso, con resultados inmediatos y guía paso a paso en C++, Python, JavaScript y Java.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'bg-[#181818] border-[#333333]' : 'bg-white border-gray-200 gcp-card-shadow'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-100 dark:border-emerald-900">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Certificación Oficial Verificable</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Cada curso entrega un certificado oficial en PDF con un código único de verificación que instituciones y empleadores pueden validar en línea.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'bg-[#181818] border-[#333333]' : 'bg-white border-gray-200 gcp-card-shadow'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 border border-purple-100 dark:border-purple-900">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Panel de Administración</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Los instructores vinculan sus alumnos, monitorean el progreso y emiten reconocimientos oficiales al completar cada curso.
            </p>
          </div>
        </div>
      </section>

      {/* Course Catalog Showcase */}
      <section id="cursos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
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
              onClick={() => onExploreCourses(course)}
              className={`p-5 rounded-xl border transition-all cursor-pointer hover:border-[#1a73e8] gcp-glow-hover flex flex-col justify-between group ${
                isDark ? 'bg-[#181818] border-[#333333]' : 'bg-white border-gray-200 gcp-card-shadow'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-50 dark:bg-[#0d0d0d] border border-blue-100 dark:border-[#333333] rounded-full group-hover:animate-[spin_3s_linear_infinite] transition-transform duration-700 ease-in-out">
                      <Icon icon={course.iconifyId || ''} className="w-6 h-6 text-[#1a73e8]" />
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#1a73e8] border border-blue-200 dark:border-blue-800">
                      {course.levelRange}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{course.estimatedHours}h</span>
                </div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white mt-2">{course.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{course.description}</p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-[#333333] flex items-center justify-between text-xs text-[#1a73e8] font-bold mt-4">
                <span>Explorar Lecciones</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suscripciones */}
      <section id="suscripciones" className={`border-y py-14 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-[#111111] border-[#333333]' : 'bg-white border-gray-200'}`}>
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <Award className="w-4 h-4" />
            <span>Suscripciones y Acceso</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Cursos 100% Gratuitos
          </h2>
          
          <div className={`p-6 rounded-xl border text-left space-y-4 ${isDark ? 'bg-[#181818] border-[#333333]' : 'bg-gray-50 border-gray-200'}`}>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong>Mensaje oficial:</strong> Todos los cursos y el certificado final de QuirozSystems son completamente <strong className="text-emerald-600 dark:text-emerald-400">gratuitos</strong> para cualquier entusiasta que desee aprender a programar.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
               <Coffee className="w-5 h-5 text-amber-500" />
               <p>
                 <strong>Donación Voluntaria:</strong> Si la plataforma te ha sido útil, puedes <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('quiroz:open-coffee')); }} className="text-[#1a73e8] font-bold hover:underline">invitarnos un café</a>.
               </p>
            </div>
            <div className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400 pt-2">
               <Building2 className="w-5 h-5 text-purple-500 shrink-0 mt-1" />
               <p>
                 <strong>Suscripción de pago:</strong> Contamos con una suscripción dirigida a docentes, instituciones, colegios y universidades para monitorear alumnos, impartir clases de programación y gestionar el progreso de sus grupos. Contáctanos para más información.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Contacto
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
             <div className={`p-6 rounded-xl border flex flex-col items-center text-center space-y-3 ${isDark ? 'bg-[#181818] border-[#333333]' : 'bg-white border-gray-200 gcp-card-shadow'}`}>
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center text-[#1a73e8]">
                   <Mail className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">Correo</h4>
                <a href="mailto:quirozsystems@gmail.com" className="text-sm text-[#1a73e8] hover:underline">quirozsystems@gmail.com</a>
             </div>
             <div className={`p-6 rounded-xl border flex flex-col items-center text-center space-y-3 ${isDark ? 'bg-[#181818] border-[#333333]' : 'bg-white border-gray-200 gcp-card-shadow'}`}>
                <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900 flex items-center justify-center text-green-600">
                   <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">Teléfono</h4>
                <a href="tel:+50494936900" className="text-sm text-green-600 hover:underline">+504 9493-6900</a>
             </div>
             <div className={`p-6 rounded-xl border flex flex-col items-center text-center space-y-3 ${isDark ? 'bg-[#181818] border-[#333333]' : 'bg-white border-gray-200 gcp-card-shadow'}`}>
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900 flex items-center justify-center text-red-600">
                   <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">Ubicación</h4>
                <span className="text-sm text-gray-600 dark:text-gray-400">La Paz, La Paz, Honduras</span>
             </div>
          </div>
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
