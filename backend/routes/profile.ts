import { Router } from 'express';
import { prisma } from '../db';
import { validateBody, profileSchema } from '../validation';

export const profileRouter = Router();

// GET /api/profile — solo devuelve el perfil del usuario autenticado (no findFirst).
profileRouter.get('/profile', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user) {
      return res.status(404).json({ error: 'Perfil no encontrado.' });
    }
    return res.json({ name: user.name, email: user.email });
  } catch (error: any) {
    console.error('Error al obtener perfil:', error);
    return res.status(500).json({ error: 'Error al consultar perfil de estudiante.' });
  }
});

profileRouter.post('/profile', validateBody(profileSchema), async (req, res) => {
  try {
    const { name, email } = req.body;

    // A4 — Zero Trust: el estudiante se resuelve SIEMPRE desde la sesión
    // (req.user.id), nunca desde datos enviados en el body (no findFirst/email).
    const existing = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!existing) {
      return res.status(404).json({ error: 'Estudiante no encontrado en la sesión.' });
    }

    const updated = await prisma.user.update({
      where: { id: existing.id },
      data: { name, email },
    });

    return res.json({ name: updated.name, email: updated.email });
  } catch (error: any) {
    // Email duplicado (unique de User[email]).
    if (error?.code === 'P2002') {
      return res.status(409).json({ error: 'Ese correo ya está en uso por otra cuenta.' });
    }
    console.error('Error al guardar perfil:', error);
    return res.status(500).json({ error: 'Error al actualizar perfil de estudiante.' });
  }
});