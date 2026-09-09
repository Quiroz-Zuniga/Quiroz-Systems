import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Course, CourseProgress, StudentProfile, Certificate, UserRole } from './types';
import { allCourses, getCourseById } from './data/courses';
import {
  getStudentProfile,
  saveStudentProfile,
  clearStudentProfile,
  defaultProfile,
  getCourseProgress,
  saveCourseProgress,
  getAllCertificates,
  saveCertificate,
} from './lib/storage';
import { api, onUnauthorized } from './lib/apiClient';
import { Navbar } from './components/Navbar';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseView } from './components/CourseView';
import { GradeReportView } from './components/GradeReportView';
import { CertificateVerifier } from './components/CertificateVerifier';
import { InstructorDashboard } from './components/InstructorDashboard';
import { InstitutionSubscriptionView } from './components/InstitutionSubscriptionView';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { LandingPage } from './components/LandingPage';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';
import { Award, Download, ExternalLink } from 'lucide-react';
import { downloadCertificatePdf } from './lib/pdfGenerator';
import { CoffeeSupportModal } from './components/CoffeeSupportModal';
import logoQuiroz from './img/logo_quiroz_systems.png';

export default function App() {
  // Flow State: 'splash' -> 'landing' -> 'app'
  const [flowStage, setFlowStage] = useState<'splash' | 'landing' | 'app'>('splash');
  const [userRole, setUserRole] = useState<UserRole>('USUARIO');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [registerRole, setRegisterRole] = useState<'USUARIO' | 'INSTITUCION'>('USUARIO');

  const restoredSessionRef = useRef<{ profile: StudentProfile; role: UserRole } | null>(null);

  const [profile, setProfile] = useState<StudentProfile>(getStudentProfile());
  const [activeTab, setActiveTab] = useState<'catalog' | 'course' | 'certificates' | 'verifier' | 'admin'>('catalog');

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentProgress, setCurrentProgress] = useState<CourseProgress | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');

  // 5-Second Splash Screen State
  const [splashProgress, setSplashProgress] = useState<number>(0);
  const [splashText, setSplashText] = useState<string>('Inicializando plataforma educativa...');

  // Theme state: defaults to 'dark'
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('quiroz_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  // 5-Second Splash Loading Animation Timer (Runs ONCE at entry)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setSplashProgress(pct);

      if (pct < 25) {
        setSplashText('Cargando Quiroz Systems...');
      } else if (pct < 55) {
        setSplashText('Preparando el entorno de aprendizaje...');
      } else if (pct < 85) {
        setSplashText('Cargando los cursos y certificados...');
      } else {
        setSplashText('¡Entorno de Software e Ingeniería 100% listo!');
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setFlowStage(restoredSessionRef.current ? 'app' : 'landing');
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const setActiveTabForRole = (role: UserRole) => {
    if (role === 'INSTITUCION' || role === 'SUPER_ADMIN') setActiveTab('admin');
    else setActiveTab('catalog');
  };

  // Restaurar sesión activa mediante cookie HttpOnly
  useEffect(() => {
    (async () => {
      try {
        const { data, response: res } = await api.get<any>('/auth/me');
        if (res.ok && data?.user) {
          const profileData: StudentProfile = { name: data.user.name, email: data.user.email };
          restoredSessionRef.current = { profile: profileData, role: data.user.role };
          setProfile(profileData);
          setUserRole(data.user.role);
          setActiveTabForRole(data.user.role);
        }
      } catch (e) {
        console.error('Error al restaurar sesión por cookie:', e);
      }
    })();
  }, []);

  // Interceptor global 401/403 para cerrar sesión automáticamente
  useEffect(() => {
    const unsubscribe = onUnauthorized(() => {
      handleLogout();
    });
    return () => unsubscribe();
  }, []);

  const [allowedCourseIds, setAllowedCourseIds] = useState<string[]>([]);
  
  useEffect(() => {
    (async () => {
      try {
        const { data, response: res } = await api.get<any[]>('/courses');
        if (res.ok && Array.isArray(data)) {
          setAllowedCourseIds(data.map((c: any) => c.id));
        }
      } catch (e) {
        console.error('Error fetching courses:', e);
      }
    })();
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('quiroz_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const [viewingReport, setViewingReport] = useState<boolean>(false);
  const [certificates, setCertificates] = useState<Certificate[]>(getAllCertificates());

  const handleUpdateProfile = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    saveStudentProfile(newProfile);
  };

  const handleSelectCourse = (course: Course) => {
    const prog = getCourseProgress(course.id);
    setSelectedCourse(course);
    setCurrentProgress(prog);
    setViewingReport(false);
    setActiveTab('course');
  };

  const handleViewReport = (course: Course) => {
    const prog = getCourseProgress(course.id);
    setSelectedCourse(course);
    setCurrentProgress(prog);
    setViewingReport(true);
    setActiveTab('course');
  };

  const handleUpdateProgress = (prog: CourseProgress) => {
    setCurrentProgress(prog);
    saveCourseProgress(prog);
  };

  const handleIssueCertificate = (cert: Certificate) => {
    saveCertificate(cert);
    setCertificates(getAllCertificates());
  };

  const handleOpenLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleOpenRegister = (defaultRole: 'USUARIO' | 'INSTITUCION' = 'USUARIO') => {
    setRegisterRole(defaultRole);
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const isLoggedIn = Boolean(
    (profile.email && profile.email !== defaultProfile.email) ||
    restoredSessionRef.current?.profile?.email
  );

  const handleLoginSuccess = async (userProfile: StudentProfile, role: UserRole) => {
    setProfile(userProfile);
    saveStudentProfile(userProfile);
    setUserRole(role);

    restoredSessionRef.current = { profile: userProfile, role };
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);

    try {
      const { data, response: res } = await api.get<any[]>('/courses');
      if (res.ok && Array.isArray(data)) {
        setAllowedCourseIds(data.map((c: any) => c.id));
      }
    } catch {
      // noop
    }

    if (role === 'USUARIO') {
      setActiveTab('catalog');
    } else {
      setActiveTab('admin');
    }

    setFlowStage('app');
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.error('Error al cerrar sesión en el servidor:', e);
    }
    clearStudentProfile();
    restoredSessionRef.current = null;
    setProfile(defaultProfile);
    setUserRole('USUARIO');
    setActiveTab('catalog');
    setFlowStage('landing');
    setSelectedCourse(null);
  };

  const isDark = theme === 'dark';

  // 1. Initial 5-Second Animated Preloader Splash Screen
  if (flowStage === 'splash') {
    return (
      <div className="fixed inset-0 z-50 bg-[#0d0d0d] flex flex-col items-center justify-center p-6 text-center select-none space-y-6">
        <div className="relative">
          <div className="absolute -inset-4 bg-[#1a73e8]/20 rounded-3xl blur-2xl animate-pulse pointer-events-none" />
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#181818] border border-[#333333] flex items-center justify-center p-4 shadow-2xl relative z-10 animate-logo-flip">
            <img src={logoQuiroz} alt="Quiroz Systems Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="space-y-1 z-10">
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Quiroz Systems</h1>
          <p className="text-xs sm:text-sm font-mono text-[#1a73e8] font-bold uppercase tracking-widest">
            Plataforma Educativa de Software e Ingeniería
          </p>
        </div>

        <div className="w-full max-w-sm space-y-3 z-10">
          <div className="w-full h-2.5 bg-[#262626] rounded-full overflow-hidden border border-[#333333]">
            <div
              className="h-full bg-[#1a73e8] rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(26,115,232,0.8)]"
              style={{ width: `${splashProgress}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-gray-400 font-medium truncate max-w-[280px]">{splashText}</span>
            <span className="text-[#1a73e8] font-extrabold">{splashProgress}%</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Landing Page Stage
  if (flowStage === 'landing') {
    return (
      <>
        <LandingPage
          onOpenLogin={handleOpenLogin}
          onOpenRegister={handleOpenRegister}
          onExploreCourses={(course?: Course) => {
            if (course) {
              const isAllowed = isLoggedIn || allowedCourseIds.includes(course.id) || course.id === 'cpp' || course.id === 'python' || allowedCourseIds.length === 0;
              if (isAllowed) {
                // Visitante entra al curso de muestra
                if (!restoredSessionRef.current) {
                  setProfile(defaultProfile);
                  setUserRole('USUARIO');
                }
                setSelectedCourse(course);
                setCurrentProgress(getCourseProgress(course.id));
                setViewingReport(false);
                setActiveTab('course');
                setFlowStage('app');
              } else {
                alert('Inicia sesión para ver todos los cursos gratuitos');
                handleOpenLogin();
              }
            } else {
              handleOpenLogin();
            }
          }}
          theme={theme}
          allowedCourseIds={allowedCourseIds}
        />
        
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={handleSwitchToRegister}
          theme={theme}
        />

        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onSwitchToLogin={handleSwitchToLogin}
          theme={theme}
          initialRole={registerRole}
        />

        <CoffeeSupportModal theme={theme} />
      </>
    );
  }

  // 3. Main Application Stage (Student Portal or Admin Controller)
  return (
    <div className={isDark ? 'dark bg-[#0d0d0d] text-[#ededed]' : 'bg-[#f8f9fa] text-gray-900'}>
      <div className={`min-h-screen font-sans flex flex-col selection:bg-blue-500/20 selection:text-[#1a73e8] transition-colors ${
        isDark ? 'bg-[#0d0d0d] text-[#ededed]' : 'bg-[#f8f9fa] text-gray-900'
      }`}>
        {/* Global Navigation Header Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'catalog') {
              setSelectedCourse(null);
              setViewingReport(false);
            }
          }}
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentCourseTitle={selectedCourse?.title}
          theme={theme}
          setTheme={setTheme}
          userRole={userRole}
          onLogout={handleLogout}
          onOpenLogin={handleOpenLogin}
          onOpenRegister={handleOpenRegister}
        />

        {/* Main Container */}
        <main className="flex-1 pb-16">
          {/* Catalog Tab */}
          {activeTab === 'catalog' && (
            <CourseCatalog
              courses={allCourses}
              onSelectCourse={(course) => {
                const isAllowed = isLoggedIn || allowedCourseIds.includes(course.id) || course.id === 'cpp' || course.id === 'python' || allowedCourseIds.length === 0;
                if (isAllowed) {
                  handleSelectCourse(course);
                } else {
                  alert('Inicia sesión para ver todos los cursos gratuitos');
                  handleOpenLogin();
                }
              }}
              onViewReport={handleViewReport}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          )}

          {/* Course / Report Workspace */}
          {activeTab === 'course' && selectedCourse && currentProgress && (
            viewingReport ? (
              <GradeReportView
                course={selectedCourse}
                progress={currentProgress}
                profile={profile}
                onBack={() => setViewingReport(false)}
                onIssueCertificate={handleIssueCertificate}
              />
            ) : (
              <CourseView
                course={selectedCourse}
                progress={currentProgress}
                onUpdateProgress={handleUpdateProgress}
                onBack={() => setActiveTab('catalog')}
                onViewReport={() => setViewingReport(true)}
                theme={theme}
              />
            )
          )}

          {/* Certificates & Reports Tab */}
          {activeTab === 'certificates' && (
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
              <div className="text-center space-y-2">
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Mis Certificados y Reportes</h1>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Consulta las certificaciones obtenidas y vuelve a descargar tus documentos oficiales en formato PDF.
                </p>
              </div>

              {certificates.length === 0 ? (
                <div className={`border rounded-xl p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto gcp-card-shadow ${
                  isDark ? 'bg-[#262626] border-[#333333]' : 'bg-white border-gray-200'
                }`}>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-[#1a73e8] mx-auto flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Aún no tienes certificados registrados</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Completa todas las lecciones de un curso para generar tu certificado en PDF con un código único de verificación.
                  </p>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-all shadow-sm"
                  >
                    Explorar Catálogo de Cursos
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certificates.map((cert) => {
                    const course = getCourseById(cert.courseId as any);

                    return (
                      <div
                        key={cert.uuid}
                        className={`border rounded-xl p-6 gcp-card-shadow space-y-4 flex flex-col justify-between ${
                          isDark ? 'bg-[#262626] border-[#333333]' : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                              Certificado Oficial
                            </span>
                            <span className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {cert.issueDate}
                            </span>
                          </div>
                          
                          <div className="flex items-start space-x-3 pt-1">
                            {course?.iconifyId && (
                              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center p-1.5 shrink-0 ${
                                isDark ? 'bg-[#181818] border-[#333333]' : 'bg-gray-50 border-gray-200'
                              }`}>
                                <Icon icon={course.iconifyId} width="24" height="24" />
                              </div>
                            )}
                            <div>
                              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{cert.courseTitle}</h3>
                              <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Estudiante: <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{profile.name}</span>
                              </p>
                              <p className="text-xs font-mono text-[#1a73e8] font-bold mt-1">
                                Código: {cert.uuid}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className={`pt-3 border-t flex items-center justify-between gap-3 ${
                          isDark ? 'border-[#333333]' : 'border-gray-100'
                        }`}>
                          {course && (
                            <button
                              onClick={() => handleViewReport(course)}
                              className={`text-xs font-bold hover:text-[#1a73e8] flex items-center space-x-1 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                              }`}
                            >
                              <span>Ver Reporte</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => downloadCertificatePdf(cert)}
                            className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center space-x-1.5 shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Descargar PDF</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Certificate Verifier Tab */}
          {activeTab === 'verifier' && <CertificateVerifier />}

          {/* Instructor Dashboard (Docente con suscripción activa) */}
          {activeTab === 'admin' && userRole === 'INSTITUCION' && (
            <InstructorDashboard instructorEmail={profile.email} instructorName={profile.name} />
          )}

          {/* Subscription Checkout & Plans (Docente pendiente de activación) */}
          {activeTab === 'admin' && userRole === 'PENDIENTE_INSTITUCION' && (
            <InstitutionSubscriptionView
              institutionName={profile.name}
              institutionEmail={profile.email}
              theme={theme}
              onStatusUpdated={async () => {
                try {
                  const { data, response: res } = await api.get<any>('/auth/me');
                  if (res.ok && data?.user) {
                    setUserRole(data.user.role);
                  }
                } catch (e) {
                  console.error('Error refreshing session:', e);
                }
              }}
            />
          )}

          {/* SuperAdmin Dashboard (Quiroz Systems only) */}
          {activeTab === 'admin' && userRole === 'SUPER_ADMIN' && (
            <SuperAdminDashboard />
          )}


        </main>

        {/* Footer */}
        <footer className={`border-t py-5 text-center text-xs font-mono transition-colors ${
          isDark ? 'bg-[#262626] border-[#333333] text-gray-400' : 'bg-white border-gray-200 text-gray-500'
        }`}>
          <p>© 2026 Quiroz Systems — Todos los derechos reservados. Plataforma Educativa de Software.</p>
          <p className="mt-1">
            Los 8 cursos son gratuitos. ¿Te sirvió la plataforma? <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('quiroz:open-coffee')); }} className="text-[#1a73e8] font-bold hover:underline">Invítanos un café ☕</a>
          </p>
        </footer>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={handleSwitchToRegister}
        theme={theme}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
        theme={theme}
        initialRole={registerRole}
      />

      <CoffeeSupportModal theme={theme} />
    </div>
  );
}
