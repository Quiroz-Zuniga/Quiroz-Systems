import { Course, CourseId } from '../../types';
import { cppCourse } from './cpp';
import { pythonCourse } from './python';
import { javascriptCourse } from './javascript';
import { javaCourse } from './java';
import { nodejsCourse } from './nodejs';
import { rustCourse } from './rust';
import { sqlCourse } from './sql';
import { htmlcssCourse } from './htmlcss';

const iconifyMap: Record<CourseId, string> = {
  cpp: 'logos:c-plusplus',
  python: 'logos:python',
  javascript: 'logos:javascript',
  java: 'logos:java',
  nodejs: 'logos:nodejs-icon',
  rust: 'logos:rust',
  sql: 'logos:sqlite',
  htmlcss: 'logos:html-5',
};

export const allCourses: Course[] = [
  cppCourse,
  pythonCourse,
  javascriptCourse,
  javaCourse,
  nodejsCourse,
  rustCourse,
  sqlCourse,
  htmlcssCourse,
].map((c) => ({
  ...c,
  iconifyId: iconifyMap[c.id] || 'vscode-icons:file-type-code',
}));

// Courses freely accessible to independent students (no institution / docente)
export const freeCourseIdsForIndependent: CourseId[] = ['python', 'javascript'];

export const coursesMap: Record<CourseId, Course> = allCourses.reduce(
  (acc, c) => ({ ...acc, [c.id]: c }),
  {} as Record<CourseId, Course>
);

export function getCourseById(id: CourseId): Course | undefined {
  return coursesMap[id];
}
