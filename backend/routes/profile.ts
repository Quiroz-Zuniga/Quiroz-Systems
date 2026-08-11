import { Router } from 'express';
import { prisma } from '../db';

export const profileRouter = Router();

// GET /api/profile — solo devuelve el perfil del usuario autenticado (no findFirst).
profileRouter.get('/profile', async (req, res) => {
  try {
    const user = await prisma.student.findUnique({ where: { id: req.user!.id } });
    if (!user) {
      return res.status(404).json({ error: 'Perfil no encontrado.' });
    }
    return res.json({ name: user.name, email: user.email });
  } catch (error: any) {
    console.error('Error al obtener perfil:', error);
    return res.status(500).json({ error: 'Error al consultar perfil de estudiante.' });
  }
});

profileRouter.post('/profile', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Faltan campos (name, email).' });
    }

    // Upsert a real student record keyed by email so every logged-in student
    // (including brand-new ones) is registered and shows up in the admin panel.
    const existing = await prisma.student.findUnique({ where: { email } });
    let student;
    if (existing) {
      student = await prisma.student.update({
        where: { email },
        data: { name },
      });
    } else {
      student = await prisma.student.create({
        data: { name, email, role: 'STUDENT', studentType: 'INDEPENDENT' },
      });
    }

    return res.json({ name: student.name, email: student.email });
  } catch (error: any) {
    console.error('Error al guardar perfil:', error);
    return res.status(500).json({ error: 'Error al actualizar perfil de estudiante.' });
  }
});