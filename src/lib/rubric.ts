import { LessonAttempt } from '../types';

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
  const maxFunctional = maxScore * 0.70;
  const functionalScore = maxFunctional;

  // 2. Efficiency score (20%)
  const maxEfficiency = maxScore * 0.20;
  let efficiencyPct = 100;

  // Penalize for attempts > 3
  if (attemptsCount > 3) {
    efficiencyPct -= (attemptsCount - 3) * 5;
  }

  // Penalize for unlocked hints
  efficiencyPct -= hintsUnlockedCount * 5;

  if (efficiencyPct < 0) efficiencyPct = 0;
  const efficiencyScore = (efficiencyPct / 100) * maxEfficiency;

  // 3. Time score (10%)
  const maxTime = maxScore * 0.10;
  const timeSpentMinutes = timeSpentSeconds / 60;
  let timePct = 100;

  if (timeSpentMinutes <= estimatedMinutes) {
    timePct = 100;
  } else if (timeSpentMinutes <= estimatedMinutes * 1.5) {
    timePct = 50; // 5% of overall max score
  } else if (timeSpentMinutes <= estimatedMinutes * 2.0) {
    timePct = 5; // 0.5% of overall max score (or 5% of time component)
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
