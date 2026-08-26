import { CourseProgress, StudentProfile, Certificate, CourseId } from '../types';
import { api } from './apiClient';

const STORAGE_KEYS = {
  PROFILE: 'quiroz_student_profile',
  PROGRESS: 'quiroz_course_progress_',
  CERTIFICATES: 'quiroz_issued_certificates',
};

export const defaultProfile: StudentProfile = {
  name: 'Visitante',
  email: '',
};

export function getStudentProfile(): StudentProfile {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return defaultProfile;
}

export function saveStudentProfile(profile: StudentProfile): void {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  // Sincronizar con backend (usa cookies HttpOnly automáticamente)
  api.post('/profile', profile).catch((e) =>
    console.error('Error syncing profile to SQLite:', e)
  );
}

export function clearStudentProfile(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
  } catch (e) {
    console.error(e);
  }
}

export function getCourseProgress(courseId: CourseId): CourseProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS + courseId);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return {
    courseId,
    completedLessonIds: [],
    attempts: {},
    startDate: new Date().toLocaleDateString('es-ES'),
  };
}

export function saveCourseProgress(progress: CourseProgress): void {
  localStorage.setItem(STORAGE_KEYS.PROGRESS + progress.courseId, JSON.stringify(progress));
  // Sincronizar con backend
  api.post('/progress', progress).catch((e) =>
    console.error('Error syncing progress to SQLite:', e)
  );
}

export function getAllCertificates(): Certificate[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function saveCertificate(cert: Certificate): void {
  const certs = getAllCertificates();
  const existingIdx = certs.findIndex((c) => c.uuid === cert.uuid || c.courseId === cert.courseId);
  if (existingIdx >= 0) {
    certs[existingIdx] = cert;
  } else {
    certs.push(cert);
  }
  localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certs));
}

export function resetCourseProgress(courseId: CourseId): void {
  localStorage.removeItem(STORAGE_KEYS.PROGRESS + courseId);
}
