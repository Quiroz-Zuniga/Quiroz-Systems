import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle2, ShieldCheck, User, Search, Bell, Settings, ChevronDown, Code2, X, Play, Trash2, Check, Sun, Moon, LogOut, Coffee } from 'lucide-react';
import { StudentProfile } from '../types';
import { CodeEditor } from './CodeEditor';
import { authHeaders } from '../lib/storage';
import logoQuiroz from '../img/logo_quiroz_systems.png';

interface NavbarProps {
  activeTab: 'catalog' | 'course' | 'certificates' | 'verifier' | 'admin';
  setActiveTab: (tab: 'catalog' | 'certificates' | 'verifier' | 'admin') => void;
  profile: StudentProfile;
  onUpdateProfile: (profile: StudentProfile) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentCourseTitle?: string;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  userRole: 'STUDENT' | 'INSTRUCTOR' | 'SUPER_ADMIN';
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onUpdateProfile,
  searchQuery,
  setSearchQuery,
  currentCourseTitle,
  theme,
  setTheme,
  userRole,
  onLogout,
}) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShellOpen, setIsShellOpen] = useState(false);

  // Scratch Shell state
  const [shellLang, setShellLang] = useState<'python' | 'javascript' | 'cpp' | 'java'>('python');
  const [shellCode, setShellCode] = useState<string>('print("¡Hola desde Quiroz Systems Shell!")');
  const [shellOutput, setShellOutput] = useState<string>('');
  const [isExecutingShell, setIsExecutingShell] = useState(false);

  const [tempName, setTempName] = useState(profile.name);
  const [tempEmail, setTempEmail] = useState(profile.email);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Verificación de Certificados Activa',
      detail: 'Los certificados generados cuentan con validación oficial.',
      time: 'Hace 5 min',
      unread: true,
    },
    {
      id: 2,
      title: 'Práctica Interactiva Disponible',
      detail: 'Ejecuta tu código directamente en los cursos de Python, C++, Node.js y Java.',
      time: 'Hace 1 hora',
      unread: true,
    },
    {
      id: 3,
      title: '8 Cursos de Especialización Habilitados',
      detail: 'Accede a la progresión completa desde Nivel Cero hasta un Proyecto Final.',
      time: 'Ayer',
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name: tempName, email: tempEmail });
    setIsEditProfileOpen(false);
  };

  const handleRunScratchShell = async () => {
    setIsExecutingShell(true);
    setShellOutput('Ejecutando tu código...');
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          language: shellLang,
          code: shellCode,
          testCases: [{ id: '1', output: '' }],
        }),
      });
      const data = await res.json();
      const firstResult = data.results && data.results[0] ? data.results[0].actualOutput : '';
      setShellOutput(firstResult || data.logs || 'Ejecución finalizada.');
    } catch (e: any) {
      setShellOutput('Error de ejecución: ' + e.message);
    } finally {
      setIsExecutingShell(false);
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const handleClearCache = () => {
    if (confirm('¿Estás seguro de que deseas limpiar la caché local de datos?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const isDark = theme === 'dark';
  const isAdminRole = userRole === 'INSTRUCTOR' || userRole === 'SUPER_ADMIN';
  const isTeacherRole = false; // Left as false to avoid breaking conditions
  const goHome = () => {
    if (isAdminRole) setActiveTab('admin');
    else setActiveTab('catalog');
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors ${
      isDark ? 'bg-[#181818] text-[#ededed]' : 'bg-white text-gray-800'
    } gcp-card-shadow`}>
      {/* Top Header Bar */}
      <div className="px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand Logo Image & Course Selector */}
        <div className="flex items-center space-x-4">
          <div
            onClick={goHome}
            className="flex items-center space-x-3 cursor-pointer select-none group"
          >
            <div className={`w-9 h-9 rounded-lg border flex items-center justify-center p-1 shadow-sm group-hover:border-[#1a73e8] transition-colors ${
              isDark ? 'bg-[#0d0d0d] border-[#333333]' : 'bg-blue-50/50 border-blue-100'
            }`}>
              <img src={logoQuiroz} alt="Quiroz Systems Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-gray-900 dark:text-white group-hover:text-[#1a73e8] transition-colors flex items-center space-x-1.5">
                <span>Quiroz Systems</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  isDark ? 'bg-blue-950/60 text-[#1a73e8] border border-blue-800' : 'bg-blue-50 text-[#1a73e8] border border-blue-200'
                }`}>
                  PRO
                </span>
              </div>
            </div>
          </div>

          <div className={`h-5 w-[1px] hidden md:block ${isDark ? 'bg-[#333333]' : 'bg-gray-200'}`} />

          {/* Active Course Selector Chip (students only) */}
          {!isAdminRole && !isTeacherRole && (
            <div
              onClick={() => setActiveTab('catalog')}
              className={`hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors border ${
                isDark
                  ? 'bg-[#262626] hover:bg-[#333333] text-gray-200 border-[#333333]'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
              }`}
            >
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Curso:</span>
              <span className="font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">
                {currentCourseTitle || 'Catálogo General'}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          )}
        </div>

        {/* Center: Search Bar (students only) */}
        {!isAdminRole && !isTeacherRole && (
          <div className="flex-1 max-w-xl hidden lg:block">
            <div className="relative">
              <Search className={`w-4 h-4 absolute left-3 top-2.5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'catalog' && activeTab !== 'course') {
                    setActiveTab('catalog');
                  }
                }}
                placeholder="Buscar cursos por lenguaje (C++, Python, JS, SQL...), nivel o descripción..."
                className={`w-full border rounded-lg pl-9 pr-8 py-1.5 text-xs focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all ${
                  isDark
                    ? 'bg-[#0d0d0d] border-[#333333] text-white placeholder-gray-500'
                    : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:bg-white'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Right: Theme Toggle, Profile & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Global Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? 'Cambiar a Tema Claro' : 'Cambiar a Modo Oscuro Preloader'}
            className={`p-2 rounded-full transition-colors ${
              isDark ? 'text-gray-300 hover:bg-[#262626]' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#1a73e8]" />
            )}
          </button>

          {/* Quick Scratch Shell Button */}
          <button
            onClick={() => setIsShellOpen(true)}
            title="Abrir Consola de Ejecución"
            className={`p-2 rounded-full transition-colors relative ${
              isDark ? 'text-gray-300 hover:bg-[#262626]' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Code2 className="w-4 h-4 text-[#1a73e8]" />
          </button>

          {/* Support / Coffee Button (Ko-fi / PayPal) */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('quiroz:open-coffee'))}
            title="Invítanos un café (donación voluntaria)"
            className={`px-3 py-2 rounded-full transition-colors flex items-center space-x-1.5 text-xs font-bold border ${
              isDark
                ? 'text-amber-400 hover:bg-amber-950/40 border-[#333333]'
                : 'text-amber-600 hover:bg-amber-50 border-gray-200'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span className="hidden lg:inline">Apóyanos</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            title="Notificaciones de la Plataforma"
            className={`p-2 rounded-full transition-colors relative ${
              isDark ? 'text-gray-300 hover:bg-[#262626]' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#1a73e8] rounded-full animate-pulse" />
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            title="Configuración de la Plataforma"
            className={`p-2 rounded-full transition-colors ${
              isDark ? 'text-gray-300 hover:bg-[#262626]' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>

          <div className={`h-5 w-[1px] hidden sm:block ${isDark ? 'bg-[#333333]' : 'bg-gray-200'}`} />

          {/* User Profile Button */}
          <button
            onClick={() => setIsEditProfileOpen(true)}
            className={`flex items-center space-x-2 border px-2.5 py-1 rounded-full transition-colors text-left ${
              isDark ? 'bg-[#262626] hover:bg-[#333333] border-[#333333]' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-[#1a73e8] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block text-xs pr-1">
              <p className="font-semibold text-gray-800 dark:text-white truncate max-w-[100px]">
                {profile.name}
              </p>
              <p className="text-[10px] text-[#1a73e8] font-medium font-mono uppercase">
                {userRole === 'SUPER_ADMIN' ? 'Administrador' : userRole === 'INSTRUCTOR' ? 'Docente' : 'Estudiante'}
              </p>
            </div>
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            title="Cerrar Sesión (Volver al Inicio)"
            className={`p-2 rounded-full transition-colors ${
              isDark ? 'text-rose-400 hover:bg-rose-950/40' : 'text-rose-600 hover:bg-rose-50'
            }`}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className={`px-4 sm:px-6 flex items-center space-x-1 overflow-x-auto text-xs font-medium ${
        isDark ? 'bg-[#181818]' : 'bg-gray-50/70'
      }`}>
        {!isAdminRole && !isTeacherRole && (
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'catalog' || activeTab === 'course'
              ? 'border-[#1a73e8] text-[#1a73e8] font-semibold ' + (isDark ? 'bg-[#262626]' : 'bg-white')
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white ' + (isDark ? 'hover:bg-[#262626]' : 'hover:bg-gray-100')
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Catálogo de Cursos</span>
        </button>
        )}

        {!isAdminRole && !isTeacherRole && (
        <button
          onClick={() => setActiveTab('certificates')}
          className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'certificates'
              ? 'border-[#1a73e8] text-[#1a73e8] font-semibold ' + (isDark ? 'bg-[#262626]' : 'bg-white')
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white ' + (isDark ? 'hover:bg-[#262626]' : 'hover:bg-gray-100')
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certificados y Reportes</span>
        </button>
        )}

        <button
          onClick={() => setActiveTab('verifier')}
          className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'verifier'
              ? 'border-[#1a73e8] text-[#1a73e8] font-semibold ' + (isDark ? 'bg-[#262626]' : 'bg-white')
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white ' + (isDark ? 'hover:bg-[#262626]' : 'hover:bg-gray-100')
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Verificador de Certificados</span>
        </button>



        {isAdminRole && (
        <button
          onClick={() => setActiveTab('admin')}
          className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'admin'
              ? 'border-[#1a73e8] text-[#1a73e8] font-semibold ' + (isDark ? 'bg-[#262626]' : 'bg-white')
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white ' + (isDark ? 'hover:bg-[#262626]' : 'hover:bg-gray-100')
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#1a73e8]" />
          <span>{userRole === 'SUPER_ADMIN' ? 'SuperAdmin Quiroz Systems' : 'Panel Docente'}</span>
        </button>
        )}
      </div>

      {/* Quick Scratch Shell Modal */}
      {isShellOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-xl p-6 max-w-2xl w-full shadow-2xl space-y-4 ${
            isDark ? 'bg-[#181818] border-[#333333] text-[#ededed]' : 'bg-white border-gray-200 text-gray-800'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-[#333333]' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-2.5">
                <img src={logoQuiroz} alt="Quiroz Systems" className="w-6 h-6 object-contain" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Consola de Práctica (Quiroz Systems)</h3>
              </div>
              <button onClick={() => setIsShellOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {(['python', 'javascript', 'cpp', 'java'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setShellLang(lang);
                      if (lang === 'python') setShellCode('print("¡Hola desde Python en Quiroz Systems!")');
                      if (lang === 'javascript') setShellCode('console.log("¡Hola desde JavaScript!")');
                      if (lang === 'cpp') setShellCode('#include <iostream>\nint main() {\n  std::cout << "Hola C++" << std::endl;\n  return 0;\n}');
                      if (lang === 'java') setShellCode('public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hola Java");\n  }\n}');
                    }}
                    className={`px-3 py-1 rounded text-xs font-semibold capitalize border ${
                      shellLang === lang
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-[#1a73e8] text-[#1a73e8]'
                        : (isDark ? 'bg-[#262626] border-[#333333] text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600')
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button
                onClick={handleRunScratchShell}
                disabled={isExecutingShell}
                className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isExecutingShell ? 'Ejecutando...' : 'Ejecutar'}</span>
              </button>
            </div>

            <CodeEditor
              language={shellLang}
              value={shellCode}
              onChange={(v) => setShellCode(v)}
              height="220px"
              theme={theme === 'dark' ? 'vs-dark' : 'vs'}
            />

            {shellOutput && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 font-mono">Resultado:</span>
                <pre className={`p-3 rounded-lg text-xs font-mono whitespace-pre-wrap max-h-40 overflow-y-auto border ${
                  isDark ? 'bg-[#0d0d0d] text-[#1a73e8] border-[#333333]' : 'bg-gray-900 text-green-400 border-gray-800'
                }`}>
                  {shellOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notifications Dropdown */}
      {isNotificationsOpen && (
        <div className={`absolute right-4 top-16 z-50 w-80 border rounded-xl shadow-2xl p-4 space-y-3 ${
          isDark ? 'bg-[#181818] border-[#333333]' : 'bg-white border-gray-200'
        }`}>
          <div className={`flex items-center justify-between pb-2 border-b ${isDark ? 'border-[#333333]' : 'border-gray-100'}`}>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Notificaciones</h4>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="text-[10px] text-[#1a73e8] hover:underline font-medium"
              >
                Marcar leídas
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-2.5 rounded-lg text-xs border ${
                  n.unread
                    ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60'
                    : (isDark ? 'bg-[#262626] border-[#333333]' : 'bg-gray-50 border-gray-100')
                }`}
              >
                <div className="flex justify-between items-start">
                  <p className="font-bold text-gray-900 dark:text-white text-xs">{n.title}</p>
                  <span className="text-[9px] text-gray-400">{n.time}</span>
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-1 leading-normal">{n.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-xl p-6 max-w-md w-full shadow-2xl space-y-5 ${
            isDark ? 'bg-[#181818] border-[#333333] text-[#ededed]' : 'bg-white border-gray-200 text-gray-800'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-[#333333]' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-2.5">
                <img src={logoQuiroz} alt="Quiroz Systems" className="w-6 h-6 object-contain" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Configuración de la Plataforma</h3>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-2">Tema Global de la Interfaz</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-2.5 rounded-lg border text-center font-bold flex items-center justify-center space-x-2 transition-all ${
                      theme === 'light'
                        ? 'bg-blue-50 border-[#1a73e8] text-[#1a73e8]'
                        : (isDark ? 'bg-[#262626] border-[#333333] text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700')
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Tema Claro</span>
                    {theme === 'light' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-2.5 rounded-lg border text-center font-bold flex items-center justify-center space-x-2 transition-all ${
                      theme === 'dark'
                        ? 'bg-blue-950/60 border-[#1a73e8] text-[#1a73e8]'
                        : (isDark ? 'bg-[#262626] border-[#333333] text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700')
                    }`}
                  >
                    <Moon className="w-4 h-4 text-[#1a73e8]" />
                    <span>Modo Oscuro Preloader</span>
                    {theme === 'dark' && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className={`pt-3 border-t space-y-2 ${isDark ? 'border-[#333333]' : 'border-gray-100'}`}>
                <label className="block font-semibold text-gray-700 dark:text-gray-300">Mantenimiento y Caché</label>
                <button
                  onClick={handleClearCache}
                  className="w-full bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 p-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Limpiar Caché Local de Datos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-xl p-6 max-w-md w-full shadow-2xl ${
            isDark ? 'bg-[#181818] border-[#333333] text-[#ededed]' : 'bg-white border-gray-200 text-gray-800'
          }`}>
            <div className={`flex items-center space-x-3 mb-3 pb-3 border-b ${isDark ? 'border-[#333333]' : 'border-gray-100'}`}>
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center p-1 ${
                isDark ? 'bg-[#0d0d0d] border-[#333333]' : 'bg-gray-50 border-gray-200'
              }`}>
                <img src={logoQuiroz} alt="Quiroz Systems Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Perfil del Estudiante — Quiroz Systems</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Credenciales de certificación oficial</p>
              </div>
            </div>

            <p className={`text-xs mb-4 p-3 rounded-lg border ${
              isDark ? 'bg-[#262626] border-[#333333] text-gray-300' : 'bg-blue-50/60 border-blue-100 text-gray-600'
            }`}>
              El nombre completo especificado en este formulario se registrará oficialmente en los certificados emitidos por Quiroz Systems.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Nombre Completo del Titular
                </label>
                <input
                  type="text"
                  required
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1a73e8] ${
                    isDark ? 'bg-[#0d0d0d] border-[#333333] text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1a73e8] ${
                    isDark ? 'bg-[#0d0d0d] border-[#333333] text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div className={`flex justify-end space-x-2 pt-3 border-t ${isDark ? 'border-[#333333]' : 'border-gray-100'}`}>
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg ${
                    isDark ? 'text-gray-400 hover:bg-[#262626]' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-lg shadow-sm transition-all"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
