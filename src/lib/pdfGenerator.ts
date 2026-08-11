import { jsPDF } from 'jspdf';
import { Certificate } from '../types';

export function generateCertificatePdf(cert: Certificate) {
  // Landscape A4: 297mm x 210mm
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // 1. Elegant Borders
  doc.setLineWidth(1.5);
  doc.setDrawColor(30, 41, 59); // Slate-800
  doc.rect(8, 8, width - 16, height - 16);

  doc.setLineWidth(0.5);
  doc.setDrawColor(217, 119, 6); // Amber-600 gold accent
  doc.rect(11, 11, width - 22, height - 22);

  // Background tint
  doc.setFillColor(248, 250, 252);
  doc.rect(12, 12, width - 24, height - 24, 'F');

  // Decorative top accent bar
  doc.setFillColor(30, 41, 59);
  doc.rect(12, 12, width - 24, 6, 'F');
  doc.setFillColor(217, 119, 6);
  doc.rect(12, 18, width - 24, 2, 'F');

  // Header Branding
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(30, 41, 59);
  doc.text('QUIROZ SYSTEMS', width / 2, 36, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('ACADEMIA DIGITAL DE SOFTWARE E INGENIERÍA', width / 2, 42, { align: 'center' });

  // Divider
  doc.setLineWidth(0.5);
  doc.setDrawColor(226, 232, 240);
  doc.line(60, 47, width - 60, 47);

  // Body Text
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(71, 85, 105);
  doc.text('Otorga el presente certificado de excelencia a:', width / 2, 57, { align: 'center' });

  // Student Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(15, 23, 42);
  doc.text(cert.studentName.toUpperCase(), width / 2, 70, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105);
  doc.text('Por haber completado satisfactoriamente y con excelencia el curso:', width / 2, 82, { align: 'center' });

  // Course Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(217, 119, 6); // Gold / Amber
  doc.text(cert.courseTitle, width / 2, 95, { align: 'center' });

  // Description
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  const descText =
    'Dominando la progresión pedagógica desde nivel cero absoluto hasta nivel experto,\ny demostrando la capacidad de construir e integrar proyectos de software reales.';
  doc.text(descText, width / 2, 108, { align: 'center' });

  // Metrics Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(width / 2 - 80, 122, 160, 22, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);

  const col1X = width / 2 - 55;
  const col2X = width / 2;
  const col3X = width / 2 + 55;

  doc.text(`Nota Final: ${cert.finalGradePercent.toFixed(1)}%`, col1X, 135, { align: 'center' });
  doc.text(`Horas de Estudio: ${cert.studyHours}h`, col2X, 135, { align: 'center' });
  doc.text(`Fecha: ${cert.issueDate}`, col3X, 135, { align: 'center' });

  // Seal & Signature Footer
  doc.setLineWidth(0.5);
  doc.setDrawColor(30, 41, 59);

  // Left Seal Box
  doc.setDrawColor(217, 119, 6);
  doc.setFillColor(254, 243, 199);
  doc.circle(50, 165, 12, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(180, 83, 9);
  doc.text('SELLO', 50, 163, { align: 'center' });
  doc.text('OFICIAL', 50, 167, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('Quiroz Systems — Certificación Oficial', 50, 183, { align: 'center' });

  // Right Signature
  doc.line(width - 90, 172, width - 30, 172);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('Dirección de Evaluación y Certificación', width - 60, 178, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Quiroz Systems Education', width - 60, 183, { align: 'center' });

  // UUID Verification Code (Plain Text as requested)
  doc.setFillColor(241, 245, 249);
  doc.rect(12, height - 18, width - 24, 6, 'F');

  doc.setFont('courier', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Código de Verificación Único: ${cert.uuid}`,
    width / 2,
    height - 14,
    { align: 'center' }
  );

  return doc;
}

export function downloadCertificatePdf(cert: Certificate) {
  const doc = generateCertificatePdf(cert);
  const fileName = `Certificado_Quiroz_Systems_${cert.courseId}_${cert.studentName.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
}
