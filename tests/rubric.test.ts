import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateLessonScore, calculateCourseGrade } from '../backend/domain/rubric';

// SDD-3 — Tests unitarios de la rúbrica oficial 70/20/10 (misma fuente de
// verdad que el servidor). Si una regla cambia, estos tests la fijan.

describe('calculateLessonScore — rúbrica 70/20/10', () => {
  const base = {
    lessonId: 'py-01',
    maxScore: 100,
    estimatedMinutes: 30,
    submittedCode: 'print(1)',
  };

  test('lección no aprobada -> 0 en todo', () => {
    const grade = calculateLessonScore({ ...base, passed: false, attemptsCount: 1, hintsUnlockedCount: 0, timeSpentSeconds: 60 });
    assert.equal(grade.passed, false);
    assert.equal(grade.scoreObtained, 0);
    assert.equal(grade.functionalScore, 0);
    assert.equal(grade.efficiencyScore, 0);
    assert.equal(grade.timeScore, 0);
  });

  test('aprobada con tiempos ideales -> 70/20/10 completos', () => {
    const grade = calculateLessonScore({ ...base, passed: true, attemptsCount: 1, hintsUnlockedCount: 0, timeSpentSeconds: 30 * 60 });
    assert.equal(grade.passed, true);
    assert.equal(grade.functionalScore, 70);
    assert.equal(grade.efficiencyScore, 20);
    assert.equal(grade.timeScore, 10);
    assert.equal(grade.scoreObtained, 100);
  });

  test('aprobada con 4 intentos y 2 pistas -> descuentos de eficiencia', () => {
    const grade = calculateLessonScore({ ...base, passed: true, attemptsCount: 4, hintsUnlockedCount: 2, timeSpentSeconds: 30 * 60 });
    // eficiencia = 100 - (4-3)*5 - 2*5 = 85% de 20 = 17
    assert.equal(grade.efficiencyScore, 17);
    // tiempo ideal (<= est. 30min) -> time 10
    assert.equal(grade.timeScore, 10);
    assert.equal(grade.scoreObtained, 97);
  });

  test('tiempo hasta 1.5x estimado -> 50% de la parte temporal', () => {
    const grade = calculateLessonScore({ ...base, passed: true, attemptsCount: 1, hintsUnlockedCount: 0, timeSpentSeconds: 45 * 60 });
    assert.equal(grade.functionalScore, 70);
    assert.equal(grade.efficiencyScore, 20);
    assert.equal(grade.timeScore, 5); // 50% de 10
    assert.equal(grade.scoreObtained, 95);
  });

  test('tiempo > 2x estimado -> 0% temporal', () => {
    const grade = calculateLessonScore({ ...base, passed: true, attemptsCount: 1, hintsUnlockedCount: 0, timeSpentSeconds: 80 * 60 });
    assert.equal(grade.timeScore, 0);
    assert.equal(grade.scoreObtained, 90);
  });
});

describe('calculateCourseGrade — nota final del curso', () => {
  test('sin intentos -> 0', () => {
    assert.equal(calculateCourseGrade([], 1900), 0);
  });

  test('todas las lecciones al máximo -> 100%', () => {
    // maxScores reales del curso python (total 1900, py-15 vale 500).
    const maxScores = [100,100,100,100,100,100,100,100,100,100,100,100,100,100,500];
    const attempts = maxScores.map((maxScore, i) => ({
      lessonId: `py-${String(i + 1).padStart(2, '0')}`,
      attemptsCount: 1,
      hintsUnlockedCount: 0,
      timeSpentSeconds: 1200,
      scoreObtained: maxScore,
      functionalScore: maxScore * 0.7,
      efficiencyScore: maxScore * 0.2,
      timeScore: maxScore * 0.1,
      passed: true,
      submittedCode: '',
    }));
    assert.equal(calculateCourseGrade(attempts, 1900), 100);
  });

  test('nota parcial: algunas lecciones aprobadas', () => {
    // 1 lección de 100 de 1900 -> 100/1900 = 5.3%
    const attempts = [
      { lessonId: 'py-01', attemptsCount: 1, hintsUnlockedCount: 0, timeSpentSeconds: 1, scoreObtained: 100, functionalScore: 70, efficiencyScore: 20, timeScore: 10, passed: true, submittedCode: '' },
    ];
    assert.equal(calculateCourseGrade(attempts, 1900), 5.3);
  });

  test('satura a 100 si el obtenido superara el total', () => {
    const attempts = [
      { lessonId: 'a', attemptsCount: 1, hintsUnlockedCount: 0, timeSpentSeconds: 1, scoreObtained: 200, functionalScore: 70, efficiencyScore: 20, timeScore: 10, passed: true, submittedCode: '' },
    ];
    assert.equal(calculateCourseGrade(attempts, 100), 100);
  });
});