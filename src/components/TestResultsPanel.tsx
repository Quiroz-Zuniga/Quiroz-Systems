import React from 'react';
import { ExecutionResult } from '../types';
import { CheckCircle2, XCircle, Terminal, Clock, AlertTriangle } from 'lucide-react';

interface TestResultsPanelProps {
  execution: ExecutionResult | null;
  isRunning: boolean;
}

export const TestResultsPanel: React.FC<TestResultsPanelProps> = ({ execution, isRunning }) => {
  if (isRunning) {
    return (
      <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#333333] rounded-xl p-6 text-center shadow-sm">
        <div className="inline-flex items-center space-x-3 text-[#1a73e8] font-mono text-xs font-semibold">
          <div className="w-4 h-4 border-2 border-[#1a73e8] border-t-transparent rounded-full animate-spin" />
          <span>Ejecutando tu código y evaluando los casos de prueba...</span>
        </div>
      </div>
    );
  }

  if (!execution) {
    return (
      <div className="bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#333333] rounded-xl p-5 text-center text-gray-500 dark:text-gray-400 text-xs font-mono">
        Haz clic en "Ejecutar Código" para compilar y validar contra la batería de pruebas oficial.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#333333] rounded-xl p-5 gcp-card-shadow space-y-4 transition-colors">
      {/* Status Banner */}
      <div
        className={`flex items-center justify-between p-3.5 rounded-lg border ${
          execution.passed
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200'
        }`}
      >
        <div className="flex items-center space-x-2.5">
          {execution.passed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
          )}
          <span className="font-bold text-xs sm:text-sm">
            {execution.passed
              ? '¡Excelente! Todos los casos de prueba fueron superados con éxito.'
              : 'Se encontraron fallos en la ejecución de los casos de prueba.'}
          </span>
        </div>

        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>{execution.timeMs}ms</span>
        </div>
      </div>

      {/* Test Cases List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-800 dark:text-white uppercase tracking-wider flex items-center space-x-1.5">
          <Terminal className="w-4 h-4 text-[#1a73e8]" />
          <span>Resultados de Casos de Prueba ({execution.results.filter((r) => r.passed).length}/{execution.results.length})</span>
        </h4>

        {execution.results.map((res, idx) => (
          <div
            key={res.testCaseId || idx}
            className={`rounded-lg border p-3.5 text-xs font-mono transition-all ${
              res.passed
                ? 'bg-gray-50 dark:bg-[#181818] border-emerald-200 dark:border-emerald-900/60'
                : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                {res.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
                <span>Caso #{idx + 1} {res.description ? `- ${res.description}` : ''}</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  res.passed
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                }`}
              >
                {res.passed ? 'Aprobado' : 'Fallado'}
              </span>
            </div>

            {res.input && (
              <div className="mb-2">
                <span className="text-gray-500 dark:text-gray-400 block text-[10px] uppercase font-sans font-semibold">Entrada (stdin):</span>
                <pre className="bg-white dark:bg-[#181818] p-2 rounded border border-gray-200 dark:border-[#333333] text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono mt-0.5">
                  {res.input}
                </pre>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <div>
                <span className="text-gray-500 dark:text-gray-400 block text-[10px] uppercase font-sans font-semibold">Salida Esperada:</span>
                <pre className="bg-white dark:bg-[#181818] p-2 rounded border border-gray-200 dark:border-[#333333] text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono mt-0.5">
                  {res.expectedOutput || '(Vacio)'}
                </pre>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 block text-[10px] uppercase font-sans font-semibold">Salida Obtenida:</span>
                <pre
                  className={`p-2 rounded whitespace-pre-wrap font-mono mt-0.5 border ${
                    res.passed
                      ? 'bg-white dark:bg-[#181818] text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                      : 'bg-white dark:bg-[#181818] text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900'
                  }`}
                >
                  {res.actualOutput || '(Sin salida)'}
                </pre>
              </div>
            </div>

            {res.error && (
              <div className="mt-2.5 p-2 rounded bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-900 text-rose-900 dark:text-rose-200 flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span className="whitespace-pre-wrap">{res.error}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stdout / Consola Logs */}
      {execution.logs && (
        <div className="pt-2 border-t border-gray-100 dark:border-[#333333]">
          <span className="text-gray-500 dark:text-gray-400 block text-[10px] uppercase font-sans font-semibold mb-1">
            Logs de Compilación / Consola:
          </span>
          <pre className="bg-gray-900 dark:bg-[#181818] p-3 rounded-lg text-[11px] text-gray-300 dark:text-blue-400 font-mono whitespace-pre-wrap max-h-32 overflow-y-auto border border-gray-800 dark:border-[#333333]">
            {execution.logs}
          </pre>
        </div>
      )}
    </div>
  );
};
