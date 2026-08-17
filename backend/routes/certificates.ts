import { Router } from 'express';
import { prisma } from '../db';
import { issueCertificateForStudent } from '../use-cases/issueCertificate';
import { validateBody, certificateIssueSchema } from '../validation';

export const certificatesRouter = Router();

// Emisión segura: valida 100% en el backend y genera el UUID internamente.
// El frontend ya NO envía studentName, ni finalGradePercent, ni el uuid.
certificatesRouter.post('/certificates/issue', validateBody(certificateIssueSchema), async (req, res) => {
  const { courseId, courseTitle, studyHours } = req.body;

  const user = req.user!;
  const profile = await prisma.student.findUnique({ where: { id: user.id } });

  const result = await issueCertificateForStudent({
    studentId: user.id,
    studentName: profile?.name || user.name,
    courseId,
    courseTitle,
    studyHours,
  });

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  return res.json({ success: true, certificate: result.certificate });
});

certificatesRouter.get('/certificates/verify/:uuid', async (req, res) => {
  try {
    const uuid = req.params.uuid.toUpperCase().trim();
    const cert = await prisma.certificate.findUnique({ where: { uuid } });

    if (!cert) {
      return res.status(404).json({
        valid: false,
        message: `Código de verificación '${uuid}' no encontrado en los registros de Quiroz Systems.`,
      });
    }

    return res.json({ valid: true, certificate: cert, message: 'Certificado de Quiroz Systems verificado y auténtico.' });
  } catch (error: any) {
    console.error('Error al verificar certificado:', error);
    return res.status(500).json({ valid: false, message: 'Error interno de base de datos.' });
  }
});

certificatesRouter.get('/certificates', async (req, res) => {
  try {
    const user = req.user!;
    const certificates = await prisma.certificate.findMany({
      where: { studentId: user.id },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(certificates);
  } catch (error: any) {
    console.error('Error al listar certificados:', error);
    return res.status(500).json({ error: 'Error al consultar certificados.' });
  }
});