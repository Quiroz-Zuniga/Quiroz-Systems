import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { requireRole } from '../middleware/auth';
import { validateBody, subscriptionCreateSchema } from '../validation';

export const subscriptionsRouter = Router();

// Endpoint para crear la suscripción en PayPal (inicia el flujo)
subscriptionsRouter.post(
  '/subscriptions/create',
  requireRole('PENDIENTE_INSTITUCION', 'INSTITUCION'),
  validateBody(subscriptionCreateSchema),
  async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      const { planId } = req.body; // 'BASICO' | 'ESTANDAR' | 'PREMIUM'

      const planes: Record<string, { paypalPlanId: string; maxAlumnos: number }> = {
        BASICO: { paypalPlanId: process.env.PAYPAL_PLAN_BASICO || 'P-BASICO', maxAlumnos: 50 },
        ESTANDAR: { paypalPlanId: process.env.PAYPAL_PLAN_ESTANDAR || 'P-ESTANDAR', maxAlumnos: 200 },
        PREMIUM: { paypalPlanId: process.env.PAYPAL_PLAN_PREMIUM || 'P-PREMIUM', maxAlumnos: 1000 },
      };

      const planConfig = planes[planId];
      if (!planConfig) {
        return res.status(400).json({ error: 'Plan inválido' });
      }

      // Crear registro de suscripción pendiente
      const subscription = await prisma.subscription.create({
        data: {
          institution_id: userId,
          plan: planId,
          max_alumnos: planConfig.maxAlumnos,
          estado: 'pendiente_pago',
        },
      });

      const checkoutUrl = `https://www.paypal.com/webapps/billing/subscriptions?plan_id=${planConfig.paypalPlanId}&custom_id=${userId}&subscription_id=${subscription.id}`;

      return res.json({ checkoutUrl, subscriptionId: subscription.id });
    } catch (error: any) {
      console.error('Error al crear suscripción:', error);
      return res.status(500).json({ error: 'Error interno al crear suscripción' });
    }
  }
);

// Endpoint para consultar el estado real
subscriptionsRouter.get('/subscriptions/status', requireRole('PENDIENTE_INSTITUCION', 'INSTITUCION'), async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    // Buscar suscripción activa
    const subscription = await prisma.subscription.findFirst({
      where: {
        institution_id: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!subscription) {
      return res.json({ status: 'ninguna', role: req.user!.role });
    }

    return res.json({
      status: subscription.estado,
      plan: subscription.plan,
      fecha_expiracion: subscription.fecha_expiracion,
      role: req.user!.role,
    });
  } catch (error: any) {
    console.error('Error al consultar estado:', error);
    return res.status(500).json({ error: 'Error interno' });
  }
});

// Webhook de PayPal (PÚBLICO)
export const webhooksRouter = Router();

async function verifyPayPalWebhookSignature(req: Request): Promise<boolean> {
  const transmissionId = req.headers['paypal-transmission-id'];
  const transmissionTime = req.headers['paypal-transmission-time'];
  const certUrl = req.headers['paypal-cert-url'];
  const authAlgo = req.headers['paypal-auth-algo'];
  const transmissionSig = req.headers['paypal-transmission-sig'];

  // Validación estricta de presencia de todas las cabeceras de firma
  if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
    return false;
  }

  // Prevenir SSRF: asegurar que la URL del certificado pertenece a paypal.com
  try {
    const parsedCertUrl = new URL(String(certUrl));
    if (parsedCertUrl.protocol !== 'https:' || !parsedCertUrl.hostname.endsWith('.paypal.com')) {
      return false;
    }
  } catch {
    return false;
  }

  // Si hay webhook ID y credenciales de PayPal configuradas, verificar con el endpoint de PayPal
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (webhookId && clientId && clientSecret) {
    try {
      const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      const apiHost = process.env.PAYPAL_API_HOST || 'https://api-m.sandbox.paypal.com';
      
      const verifyRes = await fetch(`${apiHost}/v1/notifications/verify-webhook-signature`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          auth_algo: authAlgo,
          cert_url: certUrl,
          transmission_id: transmissionId,
          transmission_sig: transmissionSig,
          transmission_time: transmissionTime,
          webhook_id: webhookId,
          webhook_event: req.body,
        }),
      });

      if (!verifyRes.ok) return false;
      const data = await verifyRes.json();
      return data.verification_status === 'SUCCESS';
    } catch (err) {
      console.error('Error al verificar firma con la API de PayPal:', err);
      return false;
    }
  }

  // Si se envió cabecera de simulación de prueba autorizada (para tests locales controlados)
  if (process.env.NODE_ENV === 'test' && transmissionSig === 'VALID_TEST_SIGNATURE') {
    return true;
  }

  // En cualquier otro caso sin credenciales completas para validar firma criptográfica externa
  return false;
}

webhooksRouter.post('/webhooks/paypal', async (req: Request, res: Response) => {
  try {
    // 1. [B-C-002] Rechazar con 400 cualquier request sin firma válida ANTES de tocar la base de datos
    const isValid = await verifyPayPalWebhookSignature(req);
    if (!isValid) {
      return res.status(400).json({ error: 'Firma de webhook de PayPal inválida o ausente.' });
    }

    const event = req.body;
    const eventType = event?.event_type;
    const resource = event?.resource;

    console.log(`Evento de PayPal verificado: ${eventType}`);

    if (eventType === 'BILLING.SUBSCRIPTION.ACTIVATED') {
      const institutionId = resource?.custom_id;
      if (!institutionId) {
        return res.status(200).send('OK - No custom_id for activation');
      }

      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);

      await prisma.subscription.updateMany({
        where: { institution_id: institutionId, estado: 'pendiente_pago' },
        data: {
          estado: 'activa',
          fecha_inicio: new Date(),
          fecha_expiracion: expirationDate,
          paypal_subscription_id: resource.id,
        },
      });

      await prisma.user.update({
        where: { id: institutionId },
        data: { role: 'INSTITUCION' },
      });
    } else if (eventType === 'BILLING.SUBSCRIPTION.CANCELLED' || eventType === 'BILLING.SUBSCRIPTION.EXPIRED') {
      const paypalSubId = resource?.id;
      const institutionId = resource?.custom_id;

      const sub = await prisma.subscription.findFirst({
        where: institutionId
          ? { institution_id: institutionId }
          : { paypal_subscription_id: paypalSubId },
      });

      if (sub) {
        await prisma.subscription.update({
          where: { id: sub.id },
          data: {
            estado: eventType === 'BILLING.SUBSCRIPTION.CANCELLED' ? 'cancelada' : 'vencida',
          },
        });

        await prisma.user.update({
          where: { id: sub.institution_id },
          data: { role: 'PENDIENTE_INSTITUCION' },
        });
      }
    } else if (eventType === 'PAYMENT.SALE.COMPLETED') {
      const subscriptionIdLocal = resource?.billing_agreement_id || resource?.custom_id;

      if (subscriptionIdLocal) {
        const sub = await prisma.subscription.findFirst({
          where: {
            OR: [
              { paypal_subscription_id: subscriptionIdLocal },
              { id: subscriptionIdLocal },
            ],
          },
        });

        if (sub) {
          await prisma.transaction.create({
            data: {
              subscription_id: sub.id,
              monto: parseFloat(resource.amount.total),
              moneda: resource.amount.currency,
              estado: 'completado',
              fecha: new Date(resource.create_time || Date.now()),
              referencia_paypal: resource.id,
            },
          });
        }
      }
    }

    return res.status(200).send('OK');
  } catch (error: any) {
    console.error('Error procesando webhook PayPal:', error);
    return res.status(500).send('Internal Error');
  }
});
