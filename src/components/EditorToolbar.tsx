import React from 'react';
import { motion } from 'framer-motion';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Palette, Sparkles } from 'lucide-react';
import { FONT_SIZES, FONT_FAMILIES } from '../constants/editorConstants';

interface EditorToolbarProps {
  fontFamily: string;
  setFontFamily: (font: string) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  formatText: (command: string, value?: string) => void;
  isAITyping: boolean;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  textColor,
  setTextColor,
  formatText,
  isAITyping
}) => {
  return (
    <div className="p-4 bg-gradient-to-r from-slate-800/60 to-slate-700/60 border-b border-slate-600/30">
      <div className="flex flex-wrap items-center gap-4">
        {/* Font Controls */}
        {/* Format Buttons */}
        {/* Alignment */}
        {/* Lists */}
        {/* AI Indicator */}
        {/* ... resto del JSX */}
      </div>
    </div>
  );
};

export default EditorToolbar;