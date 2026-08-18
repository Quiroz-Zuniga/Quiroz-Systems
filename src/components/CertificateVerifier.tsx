import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, Award, ShieldCheck, ExternalLink, RefreshCw } from 'lucide-react';
import { Certificate } from '../types';

export const CertificateVerifier: React.FC = () => {
  const [uuidInput, setUuidInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    certificate?: Certificate;
    message: string;
  } | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uuidInput.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`/api/certificates/verify/${uuidInput.trim()}`);
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setResult({
        valid: false,
        message: 'Error al conectar con la base de datos de Quiroz Systems.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#1a73e8] text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Quiroz Systems — Registro de Autenticidad Oficial</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Verificador Público de Certificados
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Ingresa el código único impreso en el certificado para comprobar su autenticidad y los registros oficiales de aprobación.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#333333] rounded-xl p-6 sm:p-8 gcp-card-shadow max-w-2xl mx-auto space-y-5 transition-colors">
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              Código de Verificación
            </label>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 dark:text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={uuidInput}
                onChange={(e) => setUuidInput(e.target.value)}
                placeholder="Ejemplo: 4F2A-89BC-10DE-FA93"
                className="w-full bg-gray-50 dark:bg-[#181818] border border-gray-300 dark:border-[#404040] rounded-lg pl-11 pr-4 py-2.5 text-sm font-mono text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#181818] focus:outline-none focus:border-[#1a73e8]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !uuidInput.trim()}
            className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-3 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Verificando certificado...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Verificar Autenticidad</span>
              </>
            )}
          </button>
        </form>

        {/* Verification Result Display */}
        {result && (
          <div
            className={`p-6 rounded-xl border space-y-4 transition-all ${
              result.valid
                ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                : 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-rose-950 dark:text-rose-100'
            }`}
          >
            <div className="flex items-start space-x-3">
              {result.valid ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h3 className="font-bold text-sm sm:text-base">
                  {result.valid ? 'Certificado Oficial Válido y Auténtico' : 'Código No Encontrado'}
                </h3>
                <p className="text-xs leading-relaxed opacity-90">{result.message}</p>
              </div>
            </div>

            {result.valid && result.certificate && (
              <div className="pt-4 border-t border-emerald-200 dark:border-emerald-800/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-sans font-semibold">Titular del Certificado:</span>
                  <p className="font-bold text-gray-900 dark:text-white font-sans text-sm">{result.certificate.studentName}</p>
                </div>

                <div>
                  <span className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-sans font-semibold">Curso de Especialización:</span>
                  <p className="font-bold text-gray-900 dark:text-white font-sans text-sm">{result.certificate.courseTitle}</p>
                </div>

                <div>
                  <span className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-sans font-semibold">Calificación Obtenida:</span>
                  <p className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">{result.certificate.finalGradePercent}% Aprobado</p>
                </div>

                <div>
                  <span className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-sans font-semibold">Fecha de Emisión:</span>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{result.certificate.issueDate}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
