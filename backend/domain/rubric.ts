import type { LessonAttempt } from '../../shared/contracts';

// Fase B3 — LessonAttempt proviene del contrato compartido (shared/contracts.ts).

export type { LessonAttempt };

// Reglas de negocio de la plataforma: rúbrica 70/20/10.
// El backend es la ÚNICA fuente de verdad para la calificación. El frontend
// jamás debe calcular puntajes (Zero Trust). Funciones puras y testeables.

export function calculateLessonScore(params: {
  lessonId: string;
  maxScore: number;
  estimatedMinutes: number;
  passed: boolean;
  attemptsCount: number;
  hintsUnlockedCount: number;
  timeSpentSeconds: number;
  submittedCode: string;
}): LessonAttempt {
  const {
    lessonId,
    maxScore,
    estimatedMinutes,
    passed,
    attemptsCount,
    hintsUnlockedCount,
    timeSpentSeconds,
    submittedCode,
  } = params;

  if (!passed) {
    return {
      lessonId,
      attemptsCount,
      hintsUnlockedCount,
      timeSpentSeconds,
      scoreObtained: 0,
      functionalScore: 0,
      efficiencyScore: 0,
      timeScore: 0,
      passed: false,
      submittedCode,
    };
  }

  // 1. Functional score (70%)
  const maxFunctional = maxScore * 0.7;
  const functionalScore = maxFunctional;

  // 2. Efficiency score (20%)
  const maxEfficiency = maxScore * 0.2;
  let efficiencyPct = 100;

  if (attemptsCount > 3) {
    efficiencyPct -= (attemptsCount - 3) * 5;
  }
  efficiencyPct -= hintsUnlockedCount * 5;

  if (efficiencyPct < 0) efficiencyPct = 0;
  const efficiencyScore = (efficiencyPct / 100) * maxEfficiency;

  // 3. Time score (10%)
  const maxTime = maxScore * 0.1;
  const timeSpentMinutes = timeSpentSeconds / 60;
  let timePct = 100;

  if (timeSpentMinutes <= estimatedMinutes) {
    timePct = 100;
  } else if (timeSpentMinutes <= estimatedMinutes * 1.5) {
    timePct = 50;
  } else if (timeSpentMinutes <= estimatedMinutes * 2.0) {
    timePct = 5;
  } else {
    timePct = 0;
  }
  const timeScore = (timePct / 100) * maxTime;

  const scoreObtained = Math.round((functionalScore + efficiencyScore + timeScore) * 10) / 10;

  return {
    lessonId,
    attemptsCount,
    hintsUnlockedCount,
    timeSpentSeconds,
    scoreObtained,
    functionalScore: Math.round(functionalScore * 10) / 10,
    efficiencyScore: Math.round(efficiencyScore * 10) / 10,
    timeScore: Math.round(timeScore * 10) / 10,
    passed: true,
    completedAt: new Date().toISOString(),
    submittedCode,
  };
}

export function calculateCourseGrade(
  completedAttempts: LessonAttempt[],
  totalMaxScore: number
): number {
  if (completedAttempts.length === 0 || totalMaxScore <= 0) return 0;
  const sumObtained = completedAttempts.reduce((acc, curr) => acc + curr.scoreObtained, 0);
  const gradePct = (sumObtained / totalMaxScore) * 100;
  return Math.min(100, Math.round(gradePct * 10) / 10);
}