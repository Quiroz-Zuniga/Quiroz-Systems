import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Course, Lesson, CourseProgress, ExecutionResult } from '../types';
import { CodeEditor } from './CodeEditor';
import { TestResultsPanel } from './TestResultsPanel';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  BookOpen,
  Play,
  Lightbulb,
  Clock,
  ChevronRight,
  ChevronDown,
  Trophy,
  AlertCircle,
  Code2,
} from 'lucide-react';

interface CourseViewProps {
  course: Course;
  progress: CourseProgress;
  onUpdateProgress: (progress: CourseProgress) => void;
  onBack: () => void;
  onViewReport: () => void;
  theme?: 'dark' | 'light';
  sessionToken?: string | null;
}

function renderFormattedText(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: React.ReactNode[] } | null = null;

  const parseInline = (line: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*.*?\*\*|`.*?`)/g;
    let lastIndex = 0;
    let match;
    let keyIdx = 0;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      const str = match[0];
      if (str.startsWith('**') && str.endsWith('**')) {
        parts.push(
          <strong key={keyIdx++} className="font-bold text-gray-900 dark:text-white">
            {str.slice(2, -2)}
          </strong>
        );
      } else if (str.startsWith('`') && str.endsWith('`')) {
        parts.push(
          <code key={keyIdx++} className="bg-blue-50 dark:bg-blue-950/60 text-[#1a73e8] dark:text-blue-400 px-1.5 py-0.5 rounded font-mono text-[11px] border border-blue-200 dark:border-blue-800">
            {str.slice(1, -1)}
          </code>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return parts;
  };

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === 'ul') {
      elements.push(
        <ul key={elements.length} className="list-disc list-inside space-y-1.5 my-2 pl-2 text-gray-700 dark:text-gray-300">
          {currentList.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={elements.length} className="list-decimal list-inside space-y-1.5 my-2 pl-2 text-gray-700 dark:text-gray-300">
          {currentList.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h4 key={index} className="text-sm font-bold text-gray-900 dark:text-white mt-4 mb-2">
          {parseInline(trimmed.slice(4))}
        </h4>
      );
      return;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const itemContent = parseInline(trimmed.slice(2));
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [itemContent] };
      } else {
        currentList.items.push(itemContent);
      }
      return;
    }

    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      const itemContent = parseInline(numMatch[2]);
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [itemContent] };
      } else {
        currentList.items.push(itemContent);
      }
      return;
    }

    flushList();

    if (trimmed === '') {
      elements.push(<div key={index} className="h-2" />);
    } else {
      elements.push(
        <p key={index} className="my-1 text-gray-700 dark:text-gray-300 leading-relaxed">
          {parseInline(line)}
        </p>
      );
    }
  });

  flushList();
  return elements;
}

export const CourseView: React.FC<CourseViewProps> = ({
  course,
  progress,
  onUpdateProgress,
  onBack,
  onViewReport,
  theme = 'dark',
  sessionToken,
}) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const currentLesson: Lesson = course.lessons[currentLessonIndex] || course.lessons[0];

  const existingAttempt = progress.attempts[currentLesson.id];

  const [userCode, setUserCode] = useState<string>(
    existingAttempt?.submittedCode || currentLesson.exercise.initialCode
  );

  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showExamples, setShowExamples] = useState<boolean>(false);

  const [hintsUnlockedCount, setHintsUnlockedCount] = useState<number>(
    existingAttempt?.hintsUnlockedCount || 0
  );
  const [attemptsCount, setAttemptsCount] = useState<number>(
    existingAttempt?.attemptsCount || 0
  );
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(
    existingAttempt?.timeSpentSeconds || 0
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const att = progress.attempts[currentLesson.id];
    setUserCode(att?.submittedCode || currentLesson.exercise.initialCode);
    setHintsUnlockedCount(att?.hintsUnlockedCount || 0);
    setAttemptsCount(att?.attemptsCount || 0);
    setElapsedSeconds(att?.timeSpentSeconds || 0);
    setExecutionResult(null);
  }, [currentLessonIndex, course, progress]);

  const setCurrentLesson = (lesson: Lesson) => {
    const idx = course.lessons.findIndex((l) => l.id === lesson.id);
    if (idx !== -1) setCurrentLessonIndex(idx);
  };

  const isLessonUnlocked = (index: number): boolean => {
    if (index === 0) return true;
    const prevLesson = course.lessons[index - 1];
    return progress.completedLessonIds.includes(prevLesson.id);
  };

  const handleUnlockHint = () => {
    if (hintsUnlockedCount < currentLesson.exercise.hints.length) {
      setHintsUnlockedCount((prev) => prev + 1);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setExecutionResult(null);

    const testCases = currentLesson.exercise.testCases;

    try {
      const language = course.type === 'sql' ? 'sql'
        : course.type === 'htmlcss' ? 'htmlcss'
        : course.type;

      const response = await fetch('/api/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}),
        },
        body: JSON.stringify({
          courseId: course.id,
          lessonId: currentLesson.id,
          language,
          code: userCode,
          schemaSql: currentLesson.exercise.schemaSql,
          testCases,
          attemptsCount: attemptsCount + 1,
          hintsUnlockedCount,
          timeSpentSeconds: elapsedSeconds,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const status = response.status;
        if (status === 401) {
          throw new Error('Tu sesión expiró. Inicia sesión de nuevo.');
        }
        throw new Error(errData.error || `Error HTTP ${status}`);
      }

      const execRes = await response.json();
      setExecutionResult(execRes);
      if (execRes.grade?.passed) {
        applyServerGrade(execRes.grade);
      }
    } catch (err: any) {
      setExecutionResult({
        passed: false,
        results: testCases.map((tc) => ({
          testCaseId: tc.id,
          expectedOutput: tc.output,
          actualOutput: 'Error de ejecución: ' + err.message,
          passed: false,
          error: err.message,
        })),
        logs: 'Error de servidor: ' + err.message,
        timeMs: 0,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Progreso marcado con la nota CALCULADA POR EL SERVIDOR (Zero Trust):
  // el cliente ya no ejecuta la rúbrica 70/20/10.
  const applyServerGrade = (grade: any) => {
    const updatedCompletedIds = Array.from(
      new Set([...progress.completedLessonIds, currentLesson.id])
    );

    const updatedProgress: CourseProgress = {
      ...progress,
      completedLessonIds: updatedCompletedIds,
      attempts: {
        ...progress.attempts,
        [currentLesson.id]: grade,
      },
    };

    onUpdateProgress(updatedProgress);
  };

  const checkAndSaveApproval = applyServerGrade;

  const nextLesson = course.lessons[currentLessonIndex + 1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#262626] p-4 rounded-xl border border-gray-200 dark:border-[#333333] gcp-card-shadow transition-colors">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 bg-gray-100 dark:bg-[#333333] hover:bg-gray-200 dark:hover:bg-[#404040] text-gray-700 dark:text-gray-200 rounded-lg text-xs font-bold transition-all border border-gray-200 dark:border-[#404040] flex items-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Catálogo</span>
          </button>

          <div className="h-6 w-[1px] bg-gray-200 dark:bg-[#333333]" />

          <div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="font-semibold text-[#1a73e8]">
                {course.title}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 dark:text-gray-400 font-mono">
                Lección {currentLessonIndex + 1} de {course.lessons.length}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{currentLesson.title}</h2>
          </div>
        </div>

        {progress.completedLessonIds.length > 0 && (
          <button
            onClick={onViewReport}
            className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-[#1a73e8] border border-blue-200 dark:border-blue-800 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            <Trophy className="w-4 h-4 text-[#1a73e8]" />
            <span>Ver Reporte de Notas</span>
          </button>
        )}
      </div>

      {/* Main Grid: Left Lesson Content + Right Fixed Navigation Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Workspace */}
        <div className="lg:col-span-8 space-y-6">
          {/* Objectives Card */}
          <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#333333] rounded-xl p-5 gcp-card-shadow space-y-2 transition-colors">
            <h3 className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider flex items-center space-x-2">
              <span>Objetivos de Aprendizaje</span>
            </h3>
            <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
              {currentLesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-[#1a73e8] font-bold">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Theory Section */}
          <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#333333] rounded-xl p-6 gcp-card-shadow space-y-4 text-gray-800 dark:text-gray-200 text-sm leading-relaxed transition-colors">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-2 pb-3 border-b border-gray-100 dark:border-[#333333]">
              <BookOpen className="w-4 h-4 text-[#1a73e8]" />
              <span>Fundamentación Teórica</span>
            </h3>
            <div className="space-y-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              {renderFormattedText(currentLesson.theory)}
            </div>
          </div>

          {/* Code Examples Accordion */}
          <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#333333] rounded-xl gcp-card-shadow overflow-hidden transition-colors">
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="w-full p-4 bg-gray-50 dark:bg-[#181818] hover:bg-gray-100 dark:hover:bg-[#333333] flex items-center justify-between text-xs font-bold text-gray-800 dark:text-gray-200 transition-colors border-b border-gray-100 dark:border-[#333333]"
            >
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-[#1a73e8]" />
                <span>Ejemplos Demostrativos ({currentLesson.examples.length})</span>
              </div>
              {showExamples ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
            </button>

            {showExamples && (
              <div className="p-4 space-y-4">
                {currentLesson.examples.map((ex, idx) => (
                  <div key={idx} className="space-y-2 border border-gray-200 dark:border-[#333333] rounded-lg p-3 bg-gray-50/50 dark:bg-[#181818]">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{ex.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{ex.explanation}</p>
                    <CodeEditor
                      language={course.monacoLanguage}
                      value={ex.code}
                      onChange={() => {}}
                      readOnly={true}
                      height="180px"
                      theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Workspace / Practical Exercise */}
          <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#333333] rounded-xl p-6 gcp-card-shadow space-y-4 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#333333]">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Play className="w-4 h-4 text-[#1a73e8]" />
                <span>Ejercicio Práctico Evaluado</span>
              </h3>
              <span className="text-xs font-mono font-bold text-[#1a73e8] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                {currentLesson.title}
              </span>
            </div>

            <div className="bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-lg p-4 text-xs text-gray-800 dark:text-gray-200 leading-relaxed">
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Enunciado:</h4>
              <h3 className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                {currentLesson.exercise.statement}
              </h3>
            </div>

            {/* Monaco Editor Component */}
            <div className="border border-gray-300 dark:border-[#333333] rounded-xl overflow-hidden shadow-sm">
              <CodeEditor
                language={course.monacoLanguage}
                value={userCode}
                onChange={(val) => setUserCode(val)}
                height="380px"
                theme={theme === 'dark' ? 'vs-dark' : 'vs'}
              />
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-5 py-2 rounded-lg text-xs transition-all shadow-sm flex items-center space-x-2 disabled:opacity-50"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isRunning ? 'Ejecutando Sandbox...' : 'Ejecutar Código'}</span>
                </button>

                <button
                  onClick={handleUnlockHint}
                  disabled={hintsUnlockedCount >= currentLesson.exercise.hints.length}
                  className="bg-gray-100 dark:bg-[#333333] hover:bg-gray-200 dark:hover:bg-[#404040] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-[#404040] px-3 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-40 flex items-center space-x-1.5"
                  title="Desbloquear pista (-5% puntaje por pista)"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    Pistas ({hintsUnlockedCount}/{currentLesson.exercise.hints.length})
                  </span>
                </button>
              </div>

              <div className="flex items-center space-x-4 text-xs font-mono text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1" title="Intentos realizados">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Intentos: {attemptsCount}</span>
                </div>
                <div className="flex items-center space-x-1" title="Tiempo transcurrido">
                  <Clock className="w-3.5 h-3.5 text-[#1a73e8]" />
                  <span>
                    {Math.floor(elapsedSeconds / 60)}m {elapsedSeconds % 60}s
                  </span>
                </div>
              </div>
            </div>

            {/* Unlocked Hints Box */}
            {hintsUnlockedCount > 0 && (
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 text-xs space-y-1.5">
                <h5 className="font-bold flex items-center space-x-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Pistas Desbloqueadas:</span>
                </h5>
                <ul className="space-y-1 list-disc list-inside">
                  {currentLesson.exercise.hints.slice(0, hintsUnlockedCount).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Test Results Output */}
            <TestResultsPanel execution={executionResult} isRunning={isRunning} />

            {/* Lesson Passed Banner */}
            {executionResult?.passed && (
              <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">¡Lección Aprobada con Éxito!</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Has cumplido el 100% de las pruebas requeridas.
                    </p>
                  </div>
                </div>

                {nextLesson ? (
                  <button
                    onClick={() => setCurrentLesson(nextLesson)}
                    className="w-full sm:w-auto bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-4 py-2 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <span>Siguiente Lección</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                ) : (
                  <button
                    onClick={onViewReport}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Ver Reporte Final y Certificado</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Fixed Navigation Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-4">
          <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#333333] rounded-xl p-4 gcp-card-shadow space-y-4 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#333333]">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#1a73e8]" />
                <span>Lecciones ({course.lessons.length})</span>
              </h3>
              <span className="text-xs font-bold font-mono text-[#1a73e8] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                {progress.completedLessonIds.length} / {course.lessons.length}
              </span>
            </div>

            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {course.lessons.map((lesson, idx) => {
                const isPassed = progress.completedLessonIds.includes(lesson.id);
                const isUnlocked = isLessonUnlocked(idx);
                const isCurrent = currentLesson.id === lesson.id;
                const attempt = progress.attempts[lesson.id];

                return (
                  <button
                    key={lesson.id}
                    disabled={!isUnlocked}
                    onClick={() => setCurrentLesson(lesson)}
                    className={`w-full text-left p-2.5 rounded-lg transition-all border flex items-center justify-between ${
                      isCurrent
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-[#1a73e8] text-[#1a73e8] font-bold'
                        : isPassed
                        ? 'bg-white dark:bg-[#181818] border-gray-200 dark:border-[#333333] hover:bg-gray-50 dark:hover:bg-[#333333] text-gray-800 dark:text-gray-200'
                        : isUnlocked
                        ? 'bg-white dark:bg-[#181818] border-gray-200 dark:border-[#333333] hover:bg-gray-50 dark:hover:bg-[#333333] text-gray-700 dark:text-gray-300'
                        : 'bg-gray-50 dark:bg-[#181818] border-gray-200 dark:border-[#333333] opacity-40 cursor-not-allowed text-gray-400'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <div className="shrink-0">
                        {isPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        ) : isUnlocked ? (
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] font-bold ${
                              isCurrent
                                ? 'border-[#1a73e8] text-[#1a73e8] bg-blue-100 dark:bg-blue-950'
                                : 'border-gray-400 text-gray-500'
                            }`}
                          >
                            {idx + 1}
                          </div>
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </div>

                      <div className="truncate">
                        <p className="text-xs truncate">{lesson.title}</p>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 block truncate font-mono">
                          {lesson.level} • {lesson.estimatedMinutes}m
                        </span>
                      </div>
                    </div>

                    {isPassed && attempt && (
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0 ml-2">
                        {attempt.scoreObtained} pts
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
