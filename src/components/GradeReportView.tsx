import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Course, CourseProgress, Certificate, StudentProfile, LessonAttempt } from '../types';
import { downloadCertificatePdf } from '../lib/pdfGenerator';
import { Award, Download, CheckCircle2, Clock, Zap, Target, ArrowLeft, BarChart3, GitPullRequest } from 'lucide-react';

interface GradeReportViewProps {
  course: Course;
  progress: CourseProgress;
  profile: StudentProfile;
  onBack: () => void;
  onIssueCertificate: (cert: Certificate) => void;
  sessionToken?: string | null;
}

export const GradeReportView: React.FC<GradeReportViewProps> = ({
  course,
  progress,
  profile,
  onBack,
  onIssueCertificate,
  sessionToken,
}) => {
  const attemptsList: LessonAttempt[] = Object.values(progress.attempts || {});
  const completedAttempts: LessonAttempt[] = attemptsList.filter((a) => a.passed);

  // B1 — Nota final calculada SIEMPRE por el backend (rúbrica 70/20/10).
  // El cliente ya no suma puntajes: consulta /api/progress/:courseId que
  // recalcula la nota a partir de los intentos persistidos en el servidor.
  const [finalGradePercent, setFinalGradePercent] = useState<number>(
    typeof progress.finalGradePercent === 'number' ? progress.finalGradePercent : 0
  );

  useEffect(() => {
    (async () => {
      if (!sessionToken || progress.courseId === undefined) return;
      try {
        const res = await fetch(`/api/progress/${encodeURIComponent(String(progress.courseId))}`, {
          headers: { Authorization: `Bearer ${sessionToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.finalGradePercent === 'number') {
            setFinalGradePercent(data.finalGradePercent);
          }
        }
      } catch (e) {
        console.error('Error al consultar la nota final en el servidor:', e);
      }
    })();
  }, [sessionToken, progress.courseId]);

  const totalTimeSeconds = completedAttempts.reduce((acc, curr) => acc + curr.timeSpentSeconds, 0);

  const averageAttempts =
    completedAttempts.length > 0
      ? (
          completedAttempts.reduce((acc, curr) => acc + curr.attemptsCount, 0) /
          completedAttempts.length
        ).toFixed(1)
      : '1.0';

  const totalHints = completedAttempts.reduce((acc, curr) => acc + curr.hintsUnlockedCount, 0);

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (finalGradePercent >= 90) {
    strengths.push('Excelente dominio conceptual y resolución algorítmica de nivel sénior.');
  }
  if (parseFloat(averageAttempts) <= 2) {
    strengths.push('Alta precisión sintáctica y resolución limpia en los primeros intentos.');
  }
  if (totalHints === 0) {
    strengths.push('Independencia técnica absoluta sin necesidad de desbloquear pistas.');
  } else {
    improvements.push('Reducir la dependencia de pistas progresivas para elevar el puntaje de eficiencia.');
  }
  if (parseFloat(averageAttempts) > 3) {
    improvements.push('Practicar más ejercicios de la misma lección antes de volver a intentar la evaluación.');
  }

  if (strengths.length === 0) strengths.push('Perseverancia comprobada para superar todos los ejercicios.');
  if (improvements.length === 0) improvements.push('Continuar explorando patrones avanzados y arquitectura de producción.');

  const certUuid = progress.certificateUuid;

  const handleDownloadPdf = async () => {
    try {
      // Emisión segura: el backend valida el 100% y genera el UUID. El cliente
      // ya NO envía ni studentName ni finalGradePercent ni el uuid (Zero Trust).
      const res = await fetch('/api/certificates/issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}),
        },
        body: JSON.stringify({
          courseId: course.id,
          courseTitle: course.title,
          studyHours: course.estimatedHours,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Error HTTP ${res.status}`);
      }

      const data = await res.json();
      onIssueCertificate(data.certificate);
      downloadCertificatePdf(data.certificate);
    } catch (e: any) {
      console.error(e);
      alert(e?.message || 'No se pudo emitir el certificado. Completa el 100% del curso.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#262626] hover:bg-gray-100 dark:hover:bg-[#333333] px-3.5 py-2 rounded-lg transition-colors border border-gray-200 dark:border-[#333333] gcp-card-shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </button>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#1a73e8]">
          Reporte de Evaluación Oficial
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#333333] rounded-xl p-6 sm:p-10 gcp-card-shadow space-y-8 text-gray-800 dark:text-[#ededed] transition-colors">
        {/* Header Showcase */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-200 dark:border-[#333333]">
          <div className="flex items-start space-x-4">
            {course.iconifyId && (
              <div className="w-14 h-14 rounded-xl bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#333333] flex items-center justify-center p-2.5 shrink-0 shadow-sm">
                <Icon icon={course.iconifyId} width="36" height="36" />
              </div>
            )}
            <div>
              <div className="flex items-center space-x-2 text-[#1a73e8] text-xs font-bold mb-1">
                <Award className="w-4 h-4" />
                <span>{course.title}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Reporte de Nota y Rendimiento
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                Estudiante: <span className="font-semibold text-gray-900 dark:text-gray-200">{profile.name}</span> ({profile.email})
              </p>
            </div>
          </div>

          <div className="bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 rounded-xl p-5 text-center min-w-[200px]">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 block uppercase tracking-wider mb-1">
              Nota Final Ponderada
            </span>
            <span className="text-4xl font-extrabold text-[#1a73e8]">
              {finalGradePercent.toFixed(1)}%
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
              {finalGradePercent >= 70 ? 'APROBADO CON EXCELENCIA' : 'EN PROGRESO'}
            </span>
          </div>
        </div>

        {/* Rubric Rules & Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 text-[#1a73e8] flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Resolución de ejercicios</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">70% de tu calificación</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Uso eficiente de intentos y pistas</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">20% de tu calificación</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Tiempo de resolución</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">10% de tu calificación</p>
            </div>
          </div>
        </div>

        {/* Analytical Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center space-x-2 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Fortalezas Identificadas</span>
            </h3>
            <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
              {strengths.map((s, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center space-x-2 uppercase tracking-wider">
              <GitPullRequest className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Áreas de Mejora Recomendadas</span>
            </h3>
            <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
              {improvements.map((imp, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Table Breakdown */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-gray-800 dark:text-white uppercase tracking-wider flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-[#1a73e8]" />
            <span>Desglose por Lección</span>
          </h3>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-[#333333] bg-white dark:bg-[#181818]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-gray-100 dark:bg-[#262626] text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-[#333333] font-sans font-semibold">
                <tr>
                  <th className="p-3"># Lección</th>
                  <th className="p-3">Título</th>
                  <th className="p-3">Nivel</th>
                  <th className="p-3">Intentos</th>
                  <th className="p-3">Tiempo</th>
                  <th className="p-3">Puntaje Obt.</th>
                  <th className="p-3 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#333333] text-gray-800 dark:text-gray-200">
                {course.lessons.map((lesson) => {
                  const attempt = progress.attempts[lesson.id];
                  const isPassed = attempt?.passed;

                  return (
                    <tr key={lesson.id} className="hover:bg-gray-50 dark:hover:bg-[#262626] transition-colors">
                      <td className="p-3 font-bold text-gray-500 dark:text-gray-400">{lesson.id}</td>
                      <td className="p-3 font-semibold text-gray-900 dark:text-white">{lesson.title}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-400">{lesson.level}</td>
                      <td className="p-3">{attempt ? attempt.attemptsCount : 0}</td>
                      <td className="p-3">
                        {attempt ? `${Math.round(attempt.timeSpentSeconds / 60)}m` : '0m'}
                      </td>
                      <td className="p-3 font-bold text-[#1a73e8]">
                        {attempt ? `${attempt.scoreObtained} / ${lesson.maxScore}` : `0 / ${lesson.maxScore}`}
                      </td>
                      <td className="p-3 text-right">
                        {isPassed ? (
                          <span className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Aprobado</span>
                          </span>
                        ) : (
                          <span className="text-gray-400 font-bold">Pendiente</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Certificate Action Footer */}
        <div className="p-6 rounded-xl bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <span>Certificación Oficial Quiroz Systems</span>
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {certUuid ? (
                <>
                  Código de verificación: <span className="font-mono text-[#1a73e8] font-bold">{certUuid}</span>
                </>
              ) : (
                'El código de verificación se genera automáticamente al descargar tu certificado.'
              )}
            </p>
          </div>

          <button
            onClick={handleDownloadPdf}
            className="w-full sm:w-auto bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-2.5 px-5 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Certificado PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
