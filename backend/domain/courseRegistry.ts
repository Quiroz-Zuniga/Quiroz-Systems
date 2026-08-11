// Registro de contenido curricular accesible desde el backend.
// Fuente de verdad única: el backend calcula el 100% de un curso a partir de
// estas lecciones, sin confiar en datos enviados por el cliente (Zero Trust).
import { allCourses } from '../../src/data/courses';
import type { Course } from '../../src/types';

export interface CourseMeta {
  courseId: string;
  lessonCount: number;
  totalMaxScore: number;
  lessonIds: string[];
  lessonMaxScores: Record<string, number>;
  lessonEstimatedMinutes: Record<string, number>;
}

const registry = new Map<string, CourseMeta>();

function buildMeta(course: Course): CourseMeta {
  const lessonIds = course.lessons.map((l) => l.id);
  let totalMaxScore = 0;
  const lessonMaxScores: Record<string, number> = {};
  const lessonEstimatedMinutes: Record<string, number> = {};

  for (const lesson of course.lessons) {
    totalMaxScore += lesson.maxScore;
    lessonMaxScores[lesson.id] = lesson.maxScore;
    lessonEstimatedMinutes[lesson.id] = lesson.estimatedMinutes;
  }

  return {
    courseId: course.id,
    lessonCount: lessonIds.length,
    totalMaxScore,
    lessonIds,
    lessonMaxScores,
    lessonEstimatedMinutes,
  };
}

for (const course of allCourses) {
  registry.set(course.id, buildMeta(course));
}

export function getCourseMeta(courseId: string): CourseMeta | undefined {
  return registry.get(courseId);
}

export function getTotalMaxScore(courseId: string): number {
  return getCourseMeta(courseId)?.totalMaxScore ?? 0;
}

// Devuelve true solo si se aprobaron TODAS las lecciones del curso.
export function isCourseCompleted(completedLessonIds: string[], courseId: string): boolean {
  const meta = getCourseMeta(courseId);
  if (!meta || meta.lessonCount === 0) return false;
  return meta.lessonIds.every((id) => completedLessonIds.includes(id));
}