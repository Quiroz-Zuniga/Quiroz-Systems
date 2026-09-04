import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, RefreshCw, AlertCircle, CreditCard, Sparkles, Building2, HelpCircle } from 'lucide-react';
import { api } from '../lib/apiClient';

interface Props {
  institutionName: string;
  institutionEmail: string;
  theme: 'dark' | 'light';
  onStatusUpdated?: () => void;
}

interface PlanInfo {
  id: 'BASICO' | 'ESTANDAR' | 'PREMIUM';
  title: string;
  price: string;
  period: string;
  popular?: boolean;
  maxStudents: number;
  features: string[];
  description: string;
}

const PLANS: PlanInfo[] = [
  {
    id: 'BASICO',
    title: 'Plan Básico',
    price: '$19.99',
    period: 'USD / mes',
    maxStudents: 50,
    description: 'Ideal para grupos pequeños, tutores independientes y laboratorios iniciales.',
    features: [
      'Hasta 50 estudiantes registrados',
      'Emisión de Reconocimientos Institucionales',
      'Panel de seguimiento de avances y notas',
      'Acceso al catálogo completo de 8 cursos',
      'Soporte técnico por correo',
    ],
  },
  {
    id: 'ESTANDAR',
    title: 'Plan Estándar',
    price: '$49.99',
    period: 'USD / mes',
    popular: true,
    maxStudents: 200,
    description: 'La opción recomendada para colegios, academias y departamentos universitarios.',
    features: [
      'Hasta 200 estudiantes registrados',
      'Emisión ilimitada de reconocimientos',
      'Gestión de matrículas y grupos',
      'Métricas detalladas de desempeño y tiempo',
      'Descarga de reportes en PDF',
      'Soporte prioritario',
    ],
  },
  {
    id: 'PREMIUM',
    title: 'Plan Institución Plus',
    price: '$99.99',
    period: 'USD / mes',
    maxStudents: 1000,
    description: 'Para universidades, facultades y organizaciones con alto volumen de alumnos.',
    features: [
      'Hasta 1,000 estudiantes registrados',
      'Branding institucional personalizado con logotipo',
      'Auditoría y trazabilidad completa de código',
      'Múltiples docentes y coordinadores',
      'Acceso prioritario a nuevas rutas de formación',
      'Atención personalizada vía videollamada',
    ],
  },
];

export const InstitutionSubscriptionView: React.FC<Props> = ({
  institutionName,
  institutionEmail,
  theme,
  onStatusUpdated,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'BASICO' | 'ESTANDAR' | 'PREMIUM'>('ESTANDAR');
  const [subscribing, setSubscribing] = useState(false);
  const [checking, setChecking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [currentStatus, setCurrentStatus] = useState<string>('pendiente_pago');

  const isDark = theme === 'dark';

  const checkStatus = async () => {
    setChecking(true);
    setErrorMsg('');
    try {
      const { data, response: res } = await api.get<{ status: string; role: string }>('/subscriptions/status');
      if (res.ok && data) {
        setCurrentStatus(data.status || 'pendiente_pago');
        if (data.role === 'INSTITUCION' && onStatusUpdated) {
          onStatusUpdated();
        }
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('No se pudo verificar el estado en este momento.');
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleSubscribe = async (planId: 'BASICO' | 'ESTANDAR' | 'PREMIUM') => {
    setSubscribing(true);
    setErrorMsg('');
    try {
      const { data, response: res } = await api.post<{ checkoutUrl: string; subscriptionId: string }>(
        '/subscriptions/create',
        { planId }
      );

      if (res.ok && data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setErrorMsg('Error al generar la orden de suscripción con PayPal.');
      }
    } catch (e: any) {
      console.error(e);
      setErrorMsg('Error de conexión con el servicio de pagos.');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 space-y-8 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Header Banner */}
      <div className={`p-8 rounded-2xl border text-center space-y-4 relative overflow-hidden ${
        isDark ? 'bg-gradient-to-b from-[#1e2330] to-[#121620] border-[#2d3748]' : 'bg-gradient-to-b from-blue-50/70 to-white border-blue-100 shadow-sm'
      }`}>
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-amber-500/10 text-amber-500 border border-amber-500/30">
          <Building2 className="w-3.5 h-3.5" />
          <span>Suscripción Institucional Requerida</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Activa tu Plan para Docentes e Instituciones
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400">
          Bienvenido(a), <span className="font-semibold text-white">{institutionName}</span> ({institutionEmail}).
          Selecciona el plan que mejor se adapte al tamaño de tu grupo para desbloquear el panel de gestión de alumnos, métricas y emisión de reconocimientos.
        </p>

        {errorMsg && (
          <div className="max-w-md mx-auto p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={checkStatus}
            disabled={checking}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all border ${
              isDark
                ? 'bg-[#181818] border-[#333333] hover:bg-[#252525] text-gray-200'
                : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
            <span>{checking ? 'Comprobando...' : 'Comprobar Estado de Activación'}</span>
          </button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative rounded-2xl border p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                plan.popular
                  ? isDark
                    ? 'border-[#1a73e8] bg-[#171e2e] shadow-lg shadow-blue-500/10'
                    : 'border-[#1a73e8] bg-blue-50/40 shadow-md ring-1 ring-[#1a73e8]'
                  : isDark
                  ? 'border-[#2e2e2e] bg-[#1a1a1a] hover:border-gray-600'
                  : 'border-gray-200 bg-white hover:border-gray-400 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#1a73e8] text-white shadow-md flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Más popular</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{plan.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline space-x-1 border-b pb-4 border-gray-700/40">
                  <span className="text-3xl font-extrabold text-[#1a73e8]">{plan.price}</span>
                  <span className="text-xs text-gray-400">{plan.period}</span>
                </div>

                <div className="space-y-2.5 pt-2">
                  <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Incluye:</p>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-700/40">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubscribe(plan.id);
                  }}
                  disabled={subscribing}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md ${
                    plan.popular
                      ? 'bg-[#1a73e8] hover:bg-[#1557b0] text-white'
                      : isDark
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{subscribing && selectedPlan === plan.id ? 'Generando orden...' : `Suscribirme a ${plan.title}`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ / Zero Risk Note */}
      <div className={`p-6 rounded-2xl border text-xs space-y-2 ${
        isDark ? 'bg-[#151515] border-[#2a2a2a] text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'
      }`}>
        <div className="flex items-center space-x-2 font-bold text-sm text-gray-200">
          <HelpCircle className="w-4 h-4 text-[#1a73e8]" />
          <span>Información sobre facturación y cancelación</span>
        </div>
        <p>
          Las suscripciones se gestionan de forma segura a través de <strong>PayPal Billing Subscriptions</strong>. Puedes cancelar o modificar tu plan en cualquier momento directamente desde tu panel o tu cuenta de PayPal sin cargos adicionales ni penalizaciones.
        </p>
      </div>
    </div>
  );
};
