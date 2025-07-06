import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Type, Clock } from 'lucide-react';

interface EditorFooterProps {
  content: string;
}

const EditorFooter: React.FC<EditorFooterProps> = ({ content }) => {
  // Calcular estadísticas del documento
  const plainText = content.replace(/<[^>]*>/g, '').trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;
  const charCount = plainText.length;
  const charCountWithSpaces = content.replace(/<[^>]*>/g, '').length;
  const paragraphCount = content.split(/<\/p>|<br\s*\/?>/i).filter(p => p.trim()).length;
  
  // Estimación de tiempo de lectura (promedio 200 palabras por minuto)
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <motion.div 
      className="px-6 py-3 bg-gradient-to-r from-slate-800/40 to-slate-700/40 border-t border-slate-600/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between text-sm text-slate-400">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <span>{wordCount} palabras</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>{charCount} caracteres</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>•</span>
            <span>{charCountWithSpaces} con espacios</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>•</span>
            <span>{paragraphCount} párrafos</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-slate-500">
          <Clock className="w-4 h-4" />
          <span>~{readingTime} min de lectura</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EditorFooter;