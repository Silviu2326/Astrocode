import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Wand2, Brain, Save, Download, X } from 'lucide-react';

interface EditorHeaderProps {
  title: string;
  setTitle: (title: string) => void;
  showCopilot: boolean;
  setShowCopilot: (show: boolean) => void;
  setShowTemplates: (show: boolean) => void;
  onSave: () => void;
  onDownload: () => void;
  onClose: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  title,
  setTitle,
  showCopilot,
  setShowCopilot,
  setShowTemplates,
  onSave,
  onDownload,
  onClose
}) => {
  return (
    <div className="p-6 bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-slate-600/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold bg-transparent text-white border-none outline-none placeholder-slate-400"
              placeholder="Título del documento"
            />
            <p className="text-sm text-slate-400 mt-1">Editor inteligente con IA integrada</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Botones del header */}
          {/* ... resto del JSX */}
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;