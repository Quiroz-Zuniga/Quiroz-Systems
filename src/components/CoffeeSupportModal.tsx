import React, { useState, useEffect } from 'react';
import { X, Coffee, Heart, Sparkles, ExternalLink } from 'lucide-react';
import logoQuiroz from '../img/logo_quiroz_systems.png';
import { api } from '../lib/apiClient';

interface MonetizationConfig {
  kofiUrl: string | null;
}

export const CoffeeSupportModal: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [kofiUrl, setKofiUrl] = useState<string>('https://ko-fi.com/rubenisaiquiroz');

  useEffect(() => {
    const open = async () => {
      try {
        const { data, response: res } = await api.get<any>('/monetization-config');
        if (res.ok && data?.kofiUrl) {
          setKofiUrl(data.kofiUrl);
        }
      } catch (e) {
        console.error('Error al cargar configuración de monetización:', e);
      }
      setIsOpen(true);
    };
    window.addEventListener('quiroz:open-coffee', open);
    return () => window.removeEventListener('quiroz:open-coffee', open);
  }, []);

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className={`border rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 transition-all relative overflow-hidden ${
        isDark ? 'bg-[#181818] border-[#333333] text-[#ededed]' : 'bg-white border-gray-200 text-gray-800'
      }`}>
        {/* Glow ambient background */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#1a73e8]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#333333]">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center p-1.5 shadow-sm ${
              isDark ? 'bg-[#0d0d0d] border-[#333333]' : 'bg-amber-50 border-amber-200'
            }`}>
              <img src={logoQuiroz} alt="Quiroz Systems Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900 dark:text-white flex items-center space-x-1.5">
                <span>Invítanos un Café</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Comunidad Quiroz Systems</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Card */}
        <div className={`p-5 rounded-2xl border flex flex-col items-center text-center space-y-3 ${
          isDark ? 'bg-[#0d0d0d] border-[#333333]' : 'bg-gradient-to-b from-amber-50/70 to-orange-50/40 border-amber-100'
        }`}>
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shadow-inner">
            <Coffee className="w-8 h-8 animate-bounce" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">
              Aprende sin límites y 100% gratis
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs mx-auto">
              Los <strong>8 cursos de ingeniería y software son totalmente libres y gratuitos</strong>. Tu donación voluntaria nos ayuda a mantener los servidores y crear más contenido interactivo.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <a
            href={kofiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-[#ff5e5b] to-[#ff424d] hover:brightness-105 text-white font-extrabold py-3.5 px-5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Coffee className="w-4 h-4" />
            <span>Invitar un Café en Ko-fi</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          <div className="flex items-center justify-center space-x-1.5 text-[11px] text-gray-500 dark:text-gray-400">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Aporte 100% voluntario y seguro. ¡Muchas gracias por tu apoyo!</span>
          </div>
        </div>
      </div>
    </div>
  );
};