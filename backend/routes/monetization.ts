import { Router, Request, Response } from 'express';
import { prisma } from '../db';


// Configuración de monetización (pública): datos informativos del botón de café
// (Ko-fi/PayPal) y del precio de la suscripción docente. NO es una pasarela de
// pago — solo enlaces externos. La edición es exclusiva del SuperAdmin
// (POST /api/admin/monetization-config en admin.ts).
export const monetizationRouter = Router();

async function getOrCreateConfig() {
  let config = await prisma.monetizationConfig.findUnique({ where: { id: 'default' } });
  if (!config) {
    config = await prisma.monetizationConfig.create({
      data: { id: 'default', kofiUrl: null, paypalUrl: null, subscriptionPriceDisplay: '$9.99 USD/mes' },
    });
  }
  return config;
}

// GET /api/monetization-config — Público, sin autenticación.
monetizationRouter.get('/monetization-config', async (_req: Request, res: Response) => {
  try {
    const config = await getOrCreateConfig();
    res.json({
      kofiUrl: config.kofiUrl,
      paypalUrl: config.paypalUrl,
      subscriptionPriceDisplay: config.subscriptionPriceDisplay,
    });
  } catch (error: any) {
    console.error('Error al consultar monetización:', error);
    res.status(500).json({ error: 'Error interno al consultar la configuración de monetización.' });
  }
});