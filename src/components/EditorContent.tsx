import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface EditorContentProps {
  editorRef: React.RefObject<HTMLDivElement>;
  content: string;
  fontFamily: string;
  fontSize: string;
  onContentChange: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  showInlineSuggestion: boolean;
  inlineSuggestion: string;
  acceptInlineSuggestion: () => void;
  setShowInlineSuggestion: (show: boolean) => void;
}

const EditorContent: React.FC<EditorContentProps> = ({
  editorRef,
  content,
  fontFamily,
  fontSize,
  onContentChange,
  onKeyDown,
  showInlineSuggestion,
  inlineSuggestion,
  acceptInlineSuggestion,
  setShowInlineSuggestion
}) => {
  return (
    <div className="flex-1 overflow-hidden relative bg-gradient-to-br from-white to-slate-50">
      <div
        ref={editorRef}
        contentEditable
        onInput={onContentChange}
        onKeyDown={onKeyDown}
        className="w-full h-full p-8 text-slate-800 overflow-y-auto focus:outline-none selection:bg-blue-200"
        style={{
          fontFamily: fontFamily,
          fontSize: `${fontSize}px`,
          lineHeight: '1.7',
          minHeight: '500px'
        }}
        dangerouslySetInnerHTML={{ __html: content }}
        suppressContentEditableWarning={true}
      />
      
      {/* Sugerencia Inline */}
      {/* ... resto del JSX */}
    </div>
  );
};

export default EditorContent;