import { PrismaClient } from '@prisma/client';
import { allCourses } from '../src/data/courses/index';
import { hashPassword } from '../backend/password';

const prisma = new PrismaClient();

export async function seedCoursesAndLessons(client: PrismaClient = prisma) {
  console.log('Seeding courses and lessons...');

  for (let cIdx = 0; cIdx < allCourses.length; cIdx++) {
    const courseData = allCourses[cIdx];
    const course = await client.course.upsert({
      where: { id: courseData.id },
      create: {
        id: courseData.id,
        title: courseData.title,
        languageName: courseData.languageName,
        monacoLanguage: courseData.monacoLanguage,
        description: courseData.description,
        levelRange: courseData.levelRange,
        estimatedHours: courseData.estimatedHours,
        iconName: courseData.iconName,
        iconifyId: courseData.iconifyId || null,
        color: courseData.color,
        es_muestra: cIdx < 2,
        order: cIdx,
      },
      update: {
        title: courseData.title,
        languageName: courseData.languageName,
        monacoLanguage: courseData.monacoLanguage,
        description: courseData.description,
        levelRange: courseData.levelRange,
        estimatedHours: courseData.estimatedHours,
        iconName: courseData.iconName,
        iconifyId: courseData.iconifyId || null,
        color: courseData.color,
        order: cIdx,
      },
    });

    for (let lIdx = 0; lIdx < courseData.lessons.length; lIdx++) {
      const lessonData = courseData.lessons[lIdx];
      await client.lesson.upsert({
        where: { id: lessonData.id },
        create: {
          id: lessonData.id,
          courseId: course.id,
          title: lessonData.title,
          level: lessonData.level,
          order: lIdx,
          estimatedMinutes: lessonData.estimatedMinutes,
          maxScore: lessonData.maxScore,
          approvalCriteria: lessonData.approvalCriteria || null,
          theory: lessonData.theory || null,
          objectives: JSON.stringify(lessonData.objectives || []),
          examples: JSON.stringify(lessonData.examples || []),
          exercise: JSON.stringify(lessonData.exercise || {}),
        },
        update: {
          courseId: course.id,
          title: lessonData.title,
          level: lessonData.level,
          order: lIdx,
          estimatedMinutes: lessonData.estimatedMinutes,
          maxScore: lessonData.maxScore,
          approvalCriteria: lessonData.approvalCriteria || null,
          theory: lessonData.theory || null,
          objectives: JSON.stringify(lessonData.objectives || []),
          examples: JSON.stringify(lessonData.examples || []),
          exercise: JSON.stringify(lessonData.exercise || {}),
        },
      });
    }
  }

  console.log(`Seeded ${allCourses.length} courses and their lessons successfully.`);
}

export async function seedSuperAdmin(client: PrismaClient = prisma) {
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'AdminSecret123!';
  const passwordHash = await hashPassword(adminPassword);

  const superAdminEmails = [
    { email: 'quirozsystems@gmail.com', name: 'Rubén Quiroz (SuperAdmin)' },
    { email: 'superadmin@quirozsystems.com', name: 'Quiroz Systems Admin' },
  ];

  for (const admin of superAdminEmails) {
    await client.user.upsert({
      where: { email: admin.email },
      create: {
        name: admin.name,
        email: admin.email,
        password: passwordHash,
        role: 'SUPER_ADMIN',
      },
      update: {
        role: 'SUPER_ADMIN',
      },
    });
  }
  console.log('Superadmin users seeded.');
}

export async function seedMonetizationConfig(client: PrismaClient = prisma) {
  await client.monetizationConfig.upsert({
    where: { id: 'default' },
    create: {
      id: 'default',
      kofiUrl: 'https://ko-fi.com/rubenisaiquiroz',
      paypalUrl: null,
      subscriptionPriceDisplay: '$9.99 USD/mes',
    },
    update: {
      kofiUrl: 'https://ko-fi.com/rubenisaiquiroz',
    },
  });
  console.log('Monetization config seeded.');
}

export async function seedInstitutionsAndStudents(client: PrismaClient = prisma) {
  const teacherPasswordHash = await hashPassword('Docente2026!');
  const studentPasswordHash = await hashPassword('Alumno2026!');

  // --- INSTITUCIÓN 1: UTN (10 alumnos) ---
  const teacher1 = await client.user.upsert({
    where: { email: 'carlos.mendoza@utn.edu' },
    create: {
      name: 'Lic. Carlos Mendoza',
      email: 'carlos.mendoza@utn.edu',
      password: teacherPasswordHash,
      role: 'INSTITUCION',
    },
    update: {
      role: 'INSTITUCION',
    },
  });

  const inst1 = await client.institution.upsert({
    where: { id: teacher1.id },
    create: {
      id: teacher1.id,
      nombre: 'Universidad Tecnológica Nacional (UTN)',
      nombre_docente_responsable: 'Lic. Carlos Mendoza',
    },
    update: {
      nombre: 'Universidad Tecnológica Nacional (UTN)',
      nombre_docente_responsable: 'Lic. Carlos Mendoza',
    },
  });

  await client.subscription.upsert({
    where: { id: `sub-${inst1.id}` },
    create: {
      id: `sub-${inst1.id}`,
      institution_id: inst1.id,
      plan: 'PREMIUM',
      max_alumnos: 100,
      estado: 'activa',
      paypal_subscription_id: 'I-SUB-UTN-2026-99',
      fecha_inicio: new Date(),
      fecha_expiracion: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
    update: {
      estado: 'activa',
      paypal_subscription_id: 'I-SUB-UTN-2026-99',
    },
  });

  await client.transaction.upsert({
    where: { id: `tx-utn-01` },
    create: {
      id: `tx-utn-01`,
      subscription_id: `sub-${inst1.id}`,
      monto: 299.0,
      moneda: 'USD',
      estado: 'completado',
      fecha: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      referencia_paypal: 'PAYID-UTN-78901234',
    },
    update: {},
  });

  const studentsInst1 = [
    { email: 'ana.garcia@utn.edu', name: 'Ana García' },
    { email: 'bruno.diaz@utn.edu', name: 'Bruno Díaz' },
    { email: 'carla.morales@utn.edu', name: 'Carla Morales' },
    { email: 'diego.torres@utn.edu', name: 'Diego Torres' },
    { email: 'elena.vargas@utn.edu', name: 'Elena Vargas' },
    { email: 'fernando.ruiz@utn.edu', name: 'Fernando Ruiz' },
    { email: 'gabriela.castro@utn.edu', name: 'Gabriela Castro' },
    { email: 'hector.navarro@utn.edu', name: 'Héctor Navarro' },
    { email: 'isabel.mendez@utn.edu', name: 'Isabel Méndez' },
    { email: 'javier.ortiz@utn.edu', name: 'Javier Ortiz' },
  ];

  for (const s of studentsInst1) {
    const studentUser = await client.user.upsert({
      where: { email: s.email },
      create: {
        name: s.name,
        email: s.email,
        password: studentPasswordHash,
        role: 'USUARIO',
      },
      update: {},
    });

    await client.institutionStudent.upsert({
      where: {
        institutionId_userId: {
          institutionId: inst1.id,
          userId: studentUser.id,
        },
      },
      create: {
        institutionId: inst1.id,
        userId: studentUser.id,
      },
      update: {},
    });
  }

  // --- INSTITUCIÓN 2: IPC (5 alumnos) ---
  const teacher2 = await client.user.upsert({
    where: { email: 'maria.gomez@ipc.edu' },
    create: {
      name: 'Ing. María Fernanda Gómez',
      email: 'maria.gomez@ipc.edu',
      password: teacherPasswordHash,
      role: 'INSTITUCION',
    },
    update: {
      role: 'INSTITUCION',
    },
  });

  const inst2 = await client.institution.upsert({
    where: { id: teacher2.id },
    create: {
      id: teacher2.id,
      nombre: 'Instituto Politécnico Central (IPC)',
      nombre_docente_responsable: 'Ing. María Fernanda Gómez',
    },
    update: {
      nombre: 'Instituto Politécnico Central (IPC)',
      nombre_docente_responsable: 'Ing. María Fernanda Gómez',
    },
  });

  await client.subscription.upsert({
    where: { id: `sub-${inst2.id}` },
    create: {
      id: `sub-${inst2.id}`,
      institution_id: inst2.id,
      plan: 'ESTANDAR',
      max_alumnos: 50,
      estado: 'activa',
      paypal_subscription_id: 'I-SUB-IPC-2026-44',
      fecha_inicio: new Date(),
      fecha_expiracion: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
    update: {
      estado: 'activa',
      paypal_subscription_id: 'I-SUB-IPC-2026-44',
    },
  });

  await client.transaction.upsert({
    where: { id: `tx-ipc-01` },
    create: {
      id: `tx-ipc-01`,
      subscription_id: `sub-${inst2.id}`,
      monto: 149.0,
      moneda: 'USD',
      estado: 'completado',
      fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      referencia_paypal: 'PAYID-IPC-56789012',
    },
    update: {},
  });

  const studentsInst2 = [
    { email: 'kevin.flores@ipc.edu', name: 'Kevin Flores' },
    { email: 'laura.paredes@ipc.edu', name: 'Laura Paredes' },
    { email: 'manuel.rios@ipc.edu', name: 'Manuel Ríos' },
    { email: 'natalia.salinas@ipc.edu', name: 'Natalia Salinas' },
    { email: 'oscar.benitez@ipc.edu', name: 'Óscar Benítez' },
  ];

  for (const s of studentsInst2) {
    const studentUser = await client.user.upsert({
      where: { email: s.email },
      create: {
        name: s.name,
        email: s.email,
        password: studentPasswordHash,
        role: 'USUARIO',
      },
      update: {},
    });

    await client.institutionStudent.upsert({
      where: {
        institutionId_userId: {
          institutionId: inst2.id,
          userId: studentUser.id,
        },
      },
      create: {
        institutionId: inst2.id,
        userId: studentUser.id,
      },
      update: {},
    });
  }

  console.log('Seeded 2 institutions, 2 teachers, and 15 students successfully.');
}

async function main() {
  await seedCoursesAndLessons(prisma);
  await seedSuperAdmin(prisma);
  await seedMonetizationConfig(prisma);
  await seedInstitutionsAndStudents(prisma);
}

if (process.argv[1]?.endsWith('seed.ts')) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
