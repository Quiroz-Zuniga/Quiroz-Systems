import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Course } from '../types';
import { getCourseProgress } from '../lib/storage';
import { BookOpen, Clock, Award, ChevronRight, CheckCircle2, Search, X, Filter } from 'lucide-react';
import logoQuiroz from '../img/logo_quiroz_systems.png';

interface CourseCatalogProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onViewReport: (course: Course) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  onSelectCourse,
  onViewReport,
  searchQuery = '',
  onClearSearch,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Filter courses by search query and level
  const filteredCourses = courses.filter((course) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      course.title.toLowerCase().includes(query) ||
      course.languageName.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.levelRange.toLowerCase().includes(query);

    const matchesLevel =
      selectedLevel === 'all' || course.levelRange.toLowerCase().includes(selectedLevel.toLowerCase());

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner Quiroz Systems */}
      <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#333333] rounded-xl p-6 sm:p-8 gcp-card-shadow relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/60 dark:bg-blue-950/20 rounded-full blur-3xl pointer-events-none -mt-20 -mr-20" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#1a73e8] text-xs font-semibold">
            <img src={logoQuiroz} alt="Quiroz Systems" className="w-4 h-4 object-contain" />
            <span>Quiroz Systems — Academia de Software e Ingeniería</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Catálogo de Cursos de Programación
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Aprende lenguajes y tecnologías clave desde nivel básico hasta nivel experto.
            Cada curso incluye lecciones guiadas, ejercicios interactivos, evaluaciones automáticas y certificado oficial en PDF.
          </p>
        </div>
      </div>

      {/* Filter & Search Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#262626] p-4 rounded-xl border border-gray-200 dark:border-[#333333] gcp-card-shadow transition-colors">
        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mr-1 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5 text-[#1a73e8]" />
            <span>Nivel:</span>
          </span>
          {[
            { id: 'all', label: 'Todos' },
            { id: 'Básico', label: 'Básico' },
            { id: 'Intermedio', label: 'Intermedio' },
            { id: 'Avanzado', label: 'Avanzado' },
            { id: 'Experto', label: 'Experto' },
          ].map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedLevel === lvl.id
                  ? 'bg-[#1a73e8] text-white shadow-sm font-bold'
                  : 'bg-gray-100 dark:bg-[#333333] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#404040] border border-gray-200 dark:border-[#404040]'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono self-end sm:self-center">
          Mostrando <span className="font-bold text-gray-900 dark:text-white">{filteredCourses.length}</span> de <span className="font-bold text-gray-900 dark:text-white">{courses.length}</span> cursos
        </div>
      </div>

      {/* Empty State when no courses match */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#333333] rounded-xl p-10 sm:p-14 text-center space-y-4 max-w-lg mx-auto gcp-card-shadow">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#1a73e8] mx-auto flex items-center justify-center border border-blue-100 dark:border-blue-900">
            <Search className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">No se encontraron cursos coincidentes</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              No hay ningún curso que coincida con el término de búsqueda{' '}
              {searchQuery && <span className="font-bold text-[#1a73e8]">"{searchQuery}"</span>}
              {selectedLevel !== 'all' && <span> en nivel <span className="font-bold text-[#1a73e8]">"{selectedLevel}"</span></span>}.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedLevel('all');
              if (onClearSearch) onClearSearch();
            }}
            className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-all shadow-sm inline-flex items-center space-x-1.5"
          >
            <X className="w-4 h-4" />
            <span>Limpiar Filtros y Búsqueda</span>
          </button>
        </div>
      ) : (
        /* Grid of Resource Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const progress = getCourseProgress(course.id);
            const completedCount = progress.completedLessonIds.length;
            const totalCount = course.lessons.length;
            const pct = Math.round((completedCount / totalCount) * 100);
            const isCompleted = completedCount === totalCount;

            return (
              <div
                key={course.id}
                className={`bg-white dark:bg-[#262626] border rounded-xl p-6 gcp-card-shadow transition-all flex flex-col justify-between relative overflow-hidden border-gray-200 dark:border-[#333333] gcp-glow-hover hover:border-[#1a73e8]`}
              >
                <div>
                  {/* Course Header with Real Iconify Logo */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#333333] flex items-center justify-center p-2.5 shadow-sm">
                      {course.iconifyId ? (
                        <Icon icon={course.iconifyId} width="36" height="36" />
                      ) : (
                        <span className="font-bold text-gray-700 dark:text-gray-300 text-lg">
                          {course.languageName.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800">
                        100% Gratuito
                      </span>
                    </div>
                  </div>

                  {/* Course Title & Description */}
                  <h3 className="text-base font-bold text-gray-900 dark:text-white hover:text-[#1a73e8] transition-colors mb-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 mb-5 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Metadata Badge Bar */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-5 font-medium">
                    <div className="flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#1a73e8]" />
                      <span>{totalCount} Lecciones</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{course.estimatedHours}h Estimadas</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 mb-6 bg-gray-50 dark:bg-[#181818] p-3 rounded-lg border border-gray-100 dark:border-[#333333]">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-gray-600 dark:text-gray-400">Progreso</span>
                      <span className="text-[#1a73e8] font-bold">{pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-[#333333] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1a73e8] rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-gray-500 dark:text-gray-400 pt-0.5">
                      <span>{completedCount} de {totalCount} completadas</span>
                      {isCompleted && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completado</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-gray-100 dark:border-[#333333] flex items-center space-x-2">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="flex-1 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <span>{completedCount > 0 ? 'Continuar Curso' : 'Iniciar Curso'}</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>

                  {isCompleted && (
                    <button
                      onClick={() => onViewReport(course)}
                      className="bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 p-2.5 rounded-lg text-xs font-bold transition-all"
                      title="Ver Reporte y Certificado"
                    >
                      <Award className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
