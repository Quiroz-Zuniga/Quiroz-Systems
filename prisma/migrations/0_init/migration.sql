-- CreateTable
CREATE TABLE "Institution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "logo_url" TEXT,
    "nombre_docente_responsable" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USUARIO',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InstitutionStudent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "institutionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "InstitutionStudent_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "InstitutionStudent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "languageName" TEXT NOT NULL,
    "monacoLanguage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "levelRange" TEXT NOT NULL,
    "estimatedHours" INTEGER NOT NULL,
    "iconName" TEXT NOT NULL,
    "iconifyId" TEXT,
    "color" TEXT NOT NULL,
    "es_muestra" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "estimatedMinutes" INTEGER NOT NULL DEFAULT 15,
    "maxScore" REAL NOT NULL DEFAULT 100,
    "approvalCriteria" TEXT,
    "theory" TEXT,
    "objectives" TEXT,
    "examples" TEXT,
    "exercise" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MonetizationConfig" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "kofiUrl" TEXT,
    "paypalUrl" TEXT,
    "subscriptionPriceDisplay" TEXT NOT NULL DEFAULT '$9.99 USD/mes',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Recognition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recognitionCode" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "curso_id" TEXT NOT NULL,
    "institucion_id" TEXT,
    "logo_institucion" TEXT,
    "nombre_docente" TEXT,
    "fecha_emision" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Recognition_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Recognition_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Recognition_institucion_id_fkey" FOREIGN KEY ("institucion_id") REFERENCES "Institution" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CourseProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completionDate" DATETIME,
    "finalGradePercent" REAL,
    "certificateUuid" TEXT,
    "approvedBy" TEXT,
    "approvalDate" DATETIME,
    CONSTRAINT "CourseProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CourseProgress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LessonAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseProgressId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "attemptsCount" INTEGER NOT NULL DEFAULT 1,
    "hintsUnlockedCount" INTEGER NOT NULL DEFAULT 0,
    "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
    "scoreObtained" REAL NOT NULL DEFAULT 0,
    "functionalScore" REAL NOT NULL DEFAULT 0,
    "efficiencyScore" REAL NOT NULL DEFAULT 0,
    "timeScore" REAL NOT NULL DEFAULT 0,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" DATETIME,
    "submittedCode" TEXT NOT NULL,
    CONSTRAINT "LessonAttempt_courseProgressId_fkey" FOREIGN KEY ("courseProgressId") REFERENCES "CourseProgress" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LessonAttempt_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Certificate" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "studentName" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "courseTitle" TEXT NOT NULL,
    "finalGradePercent" REAL NOT NULL,
    "studyHours" INTEGER NOT NULL,
    "issueDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedBy" TEXT DEFAULT 'Quiroz Systems Admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Certificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Certificate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "institution_id" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "max_alumnos" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "fecha_inicio" DATETIME,
    "fecha_expiracion" DATETIME,
    "paypal_subscription_id" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Subscription_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subscription_id" TEXT NOT NULL,
    "monto" REAL NOT NULL,
    "moneda" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referencia_paypal" TEXT,
    CONSTRAINT "Transaction_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "Subscription" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionStudent_institutionId_userId_key" ON "InstitutionStudent"("institutionId", "userId");

-- CreateIndex
CREATE INDEX "Lesson_courseId_idx" ON "Lesson"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Session_expiresAt_idx" ON "Session"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "Recognition_recognitionCode_key" ON "Recognition"("recognitionCode");

-- CreateIndex
CREATE INDEX "Recognition_usuario_id_idx" ON "Recognition"("usuario_id");

-- CreateIndex
CREATE INDEX "Recognition_curso_id_idx" ON "Recognition"("curso_id");

-- CreateIndex
CREATE INDEX "Recognition_institucion_id_idx" ON "Recognition"("institucion_id");

-- CreateIndex
CREATE INDEX "CourseProgress_courseId_idx" ON "CourseProgress"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseProgress_userId_courseId_key" ON "CourseProgress"("userId", "courseId");

-- CreateIndex
CREATE INDEX "LessonAttempt_lessonId_idx" ON "LessonAttempt"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "LessonAttempt_courseProgressId_lessonId_key" ON "LessonAttempt"("courseProgressId", "lessonId");

-- CreateIndex
CREATE INDEX "Certificate_userId_idx" ON "Certificate"("userId");

-- CreateIndex
CREATE INDEX "Certificate_courseId_idx" ON "Certificate"("courseId");

-- CreateIndex
CREATE INDEX "Subscription_institution_id_idx" ON "Subscription"("institution_id");

-- CreateIndex
CREATE INDEX "Transaction_subscription_id_idx" ON "Transaction"("subscription_id");

