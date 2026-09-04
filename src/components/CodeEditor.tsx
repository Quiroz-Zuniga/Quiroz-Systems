import React, { useState } from 'react';
import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (val: string) => void;
  height?: string;
  readOnly?: boolean;
  theme?: 'vs' | 'vs-dark' | string;
  onReset?: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  onChange,
  height = '350px',
  readOnly = false,
  theme = 'vs-dark',
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  // Normalize language for Monaco
  const normalizedLanguage =
    language === 'htmlcss' ? 'html'
    : language === 'cplusplus' ? 'cpp'
    : language.toLowerCase();

  // Appropriate tab size according to the programming language conventions
  const tabSize = ['cpp', 'cplusplus', 'java', 'python', 'rust'].includes(normalizedLanguage) ? 4 : 2;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleBeforeMount: BeforeMount = (monaco) => {
    // Definición de temas estilizados con alto contraste para operadores (<, >, <<, >>),
    // palabras clave y guías de indentación.
    monaco.editor.defineTheme('quiroz-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'delimiter', foreground: 'e2e8f0' },
        { token: 'operator', foreground: '60a5fa', fontStyle: 'bold' },
        { token: 'keyword', foreground: '38bdf8', fontStyle: 'bold' },
        { token: 'string', foreground: 'fcd34d' },
        { token: 'number', foreground: 'a7f3d0' },
        { token: 'comment', foreground: '94a3b8', fontStyle: 'italic' },
        { token: 'type', foreground: 'c084fc' },
      ],
      colors: {
        'editor.background': '#161616',
        'editor.foreground': '#f3f4f6',
        'editorLineNumber.foreground': '#52525b',
        'editorLineNumber.activeForeground': '#38bdf8',
        'editor.lineHighlightBackground': '#26262688',
        'editor.lineHighlightBorder': '#3b82f644',
        'editorCursor.foreground': '#38bdf8',
        'editorIndentGuide.background': '#27272a',
        'editorIndentGuide.activeBackground': '#38bdf8',
        'editorWhitespace.foreground': '#3f3f46',
      },
    });

    monaco.editor.defineTheme('quiroz-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'delimiter', foreground: '1e293b' },
        { token: 'operator', foreground: '1d4ed8', fontStyle: 'bold' },
        { token: 'keyword', foreground: '0284c7', fontStyle: 'bold' },
        { token: 'string', foreground: 'b45309' },
        { token: 'number', foreground: '047857' },
        { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
        { token: 'type', foreground: '7c3aed' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#0f172a',
        'editorLineNumber.foreground': '#94a3b8',
        'editorLineNumber.activeForeground': '#0284c7',
        'editor.lineHighlightBackground': '#f1f5f9aa',
        'editor.lineHighlightBorder': '#cbd5e1',
        'editorCursor.foreground': '#0284c7',
        'editorIndentGuide.background': '#e2e8f0',
        'editorIndentGuide.activeBackground': '#0284c7',
        'editorWhitespace.foreground': '#cbd5e1',
      },
    });
  };

  const handleOnMount: OnMount = (_editor, monaco) => {
    // Solución al problema de desalineación de cursor y salto de líneas:
    // Re-medir métricas de fuentes apenas JetBrains Mono/Inter estén disponibles en el DOM.
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        try {
          monaco.editor.remeasureFonts();
        } catch {
          // ignore error if unmounted
        }
      });
    }
  };

  const activeMonacoTheme =
    theme === 'vs-dark' || theme === 'dark' ? 'quiroz-dark' : 'quiroz-light';

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-[#2e2e2e] shadow-sm bg-white dark:bg-[#1a1a1a] transition-all">
      <div className="bg-gray-50 dark:bg-[#1f1f1f] border-b border-gray-200 dark:border-[#2e2e2e] px-4 py-2.5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 select-none">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
          <span className="ml-2 font-mono font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
            {language} Editor
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-gray-200 dark:bg-[#2d2d2d] text-gray-600 dark:text-gray-300 font-mono">
            Tab: {tabSize} espacios
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {onReset && !readOnly && (
            <button
              onClick={onReset}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#333333] text-gray-600 dark:text-gray-300 rounded transition-colors flex items-center space-x-1 text-[11px]"
              title="Restablecer código a plantilla inicial"
              type="button"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restablecer</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#333333] text-gray-600 dark:text-gray-300 rounded transition-colors flex items-center space-x-1 text-[11px]"
            title="Copiar código al portapapeles"
            type="button"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copiar</span>
              </>
            )}
          </button>

          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono hidden md:inline ml-2">
            {readOnly ? 'Solo lectura' : 'Auto-guardado activo'}
          </span>
        </div>
      </div>

      <Editor
        height={height}
        language={normalizedLanguage}
        value={value}
        theme={activeMonacoTheme}
        beforeMount={handleBeforeMount}
        onMount={handleOnMount}
        onChange={(val) => onChange(val ?? '')}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 13,
          lineHeight: 21,
          lineNumbers: 'on',
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, 'Courier New', monospace",
          fontLigatures: false, // Evita que << >> < > se vuelvan invisibles o generen saltos de cursor
          tabSize: tabSize,
          insertSpaces: true,
          detectIndentation: false,
          autoIndent: 'full',
          formatOnPaste: true,
          formatOnType: true,
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          autoClosingDelete: 'always',
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
            highlightActiveIndentation: true,
          },
          renderWhitespace: 'selection',
          renderLineHighlight: 'all',
          renderLineHighlightOnlyWhenFocus: false,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          cursorStyle: 'line',
          cursorWidth: 2,
          wordWrap: 'on',
          wrappingIndent: 'indent',
          quickSuggestions: true,
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          matchBrackets: 'always',
          unicodeHighlight: {
            ambiguousCharacters: false,
            invisibleCharacters: false,
          },
        }}
      />
    </div>
  );
};
