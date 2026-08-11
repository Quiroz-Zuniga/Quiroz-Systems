import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (val: string) => void;
  height?: string;
  readOnly?: boolean;
  theme?: 'vs' | 'vs-dark';
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  onChange,
  height = '350px',
  readOnly = false,
  theme = 'vs-dark',
}) => {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-[#2e2e2e] shadow-sm bg-white dark:bg-[#1a1a1a]">
      <div className="bg-gray-50 dark:bg-[#1f1f1f] border-b border-gray-200 dark:border-[#2e2e2e] px-4 py-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
          <span className="ml-2 font-mono font-semibold text-gray-700 dark:text-gray-300 capitalize">
            {language} Editor
          </span>
        </div>
        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
          {readOnly ? 'Lectura únicamente' : 'Auto-guardado activo'}
        </span>
      </div>
      <Editor
        height={height}
        language={language === 'htmlcss' ? 'html' : language}
        value={value}
        theme={theme}
        onChange={(val) => onChange(val || '')}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          fontFamily: 'JetBrains Mono, Consolas, "Fira Code", Monaco, monospace',
          tabSize: 2,
        }}
      />
    </div>
  );
};
