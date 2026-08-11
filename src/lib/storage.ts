import { CourseProgress, StudentProfile, Certificate, CourseId } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'quiroz_student_profile',
  PROGRESS: 'quiroz_course_progress_',
  CERTIFICATES: 'quiroz_issued_certificates',
  SESSION_TOKEN: 'quiroz_session_token',
};

export function authHeaders(): Record<string, string> {
  const token = getSessionToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const defaultProfile: StudentProfile = {
  name: 'Rubén Quiroz',
  email: 'elquiroz08@gmail.com',
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
  // Sync with SQLite backend
  fetch('/api/profile', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(profile),
  }).catch((e) => console.error('Error syncing profile to SQLite:', e));
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
  // Sync with SQLite backend
  fetch('/api/progress', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(progress),
  }).catch((e) => console.error('Error syncing progress to SQLite:', e));
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

export function getSessionToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.SESSION_TOKEN);
}

export function saveSessionToken(token: string): void {
  localStorage.setItem(STORAGE_KEYS.SESSION_TOKEN, token);
}

export function clearSessionToken(): void {
  localStorage.removeItem(STORAGE_KEYS.SESSION_TOKEN);
}
