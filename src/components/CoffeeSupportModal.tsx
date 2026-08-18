import React, { useState, useEffect } from 'react';
import { X, Coffee, Heart } from 'lucide-react';
import logoQuiroz from '../img/logo_quiroz_systems.png';

interface MonetizationConfig {
  kofiUrl: string | null;
  paypalUrl: string | null;
  subscriptionPriceDisplay: string;
}

// Botón "Invítanos un café" (Ko-fi/PayPal). La configuración se lee del
// endpoint PÚBLICO /api/monetization-config (no es una pasarela de pago, solo
// enlaces externos informativos). Se abre desde el navbar o el footer.
export const CoffeeSupportModal: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<MonetizationConfig>({
    kofiUrl: null,
    paypalUrl: null,
    subscriptionPriceDisplay: '$9.99 USD/mes',
  });

  useEffect(() => {
    const open = () => {
      fetch('/api/monetization-config')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) {
            setConfig({
              kofiUrl: data.kofiUrl || null,
              paypalUrl: data.paypalUrl || null,
              subscriptionPriceDisplay: data.subscriptionPriceDisplay || '$9.99 USD/mes',
            });
          }
        })
        .catch(() => {});
      setIsOpen(true);
    };
    window.addEventListener('quiroz:open-coffee', open);
    return () => window.removeEventListener('quiroz:open-coffee', open);
  }, []);

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`border rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 transition-all ${
        isDark ? 'bg-[#181818] border-[#333333] text-[#ededed]' : 'bg-white border-gray-200 text-gray-800'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-[#333333]">
          <div className="flex items-center space-x-3">
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center p-1 ${
              isDark ? 'bg-[#0d0d0d] border-[#333333]' : 'bg-amber-50 border-amber-200'
            }`}>
              <img src={logoQuiroz} alt="Quiroz Systems Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Invítanos un Café</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Apoyo voluntario a Quiroz Systems</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className={`p-3 rounded-xl border flex items-start space-x-2.5 ${
          isDark ? 'bg-[#0d0d0d] border-[#333333] text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'
        }`}>
          <Coffee className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            Los <strong>8 cursos son totalmente gratuitos</strong>. Si esta plataforma te ha sido útil,
            puedes apoyarnos con una donación voluntaria vía Ko-fi o PayPal. Cero obligación.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {config.kofiUrl ? (
            <a
              href={config.kofiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#ff5e5b] hover:opacity-90 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Coffee className="w-4 h-4" />
              <span>Donar vía Ko-fi</span>
            </a>
          ) : (
            <div className={`p-2.5 rounded-lg border text-center text-[11px] ${
              isDark ? 'bg-[#0d0d0d] border-[#333333] text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}>
              Enlace Ko-fi no configurado aún por Quiroz Systems.
            </div>
          )}

          {config.paypalUrl ? (
            <a
              href={config.paypalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#0070ba] hover:opacity-90 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Heart className="w-4 h-4" />
              <span>Donar vía PayPal</span>
            </a>
          ) : (
            <div className={`p-2.5 rounded-lg border text-center text-[11px] ${
              isDark ? 'bg-[#0d0d0d] border-[#333333] text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}>
              Enlace PayPal no configurado aún por Quiroz Systems.
            </div>
          )}
        </div>

        <div className={`p-3 rounded-xl border text-center ${
          isDark ? 'bg-[#0d0d0d] border-[#333333]' : 'bg-gray-50 border-gray-200'
        }`}>
          <p className="text-[11px] text-gray-600 dark:text-gray-300">
            Para instituciones y docentes: suscripción docente <span className="font-bold text-[#1a73e8]">{config.subscriptionPriceDisplay}</span> con panel de gestión de alumnos y emisión de reconocimientos.
          </p>
        </div>
      </div>
    </div>
  );
};