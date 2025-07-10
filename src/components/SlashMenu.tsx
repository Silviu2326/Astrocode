import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';
import { SLASH_COMMANDS } from '../constants/editorConstants';

interface SlashMenuProps {
  showSlashMenu: boolean;
  slashMenuPosition: { x: number; y: number };
  executeSlashCommand: (command: string) => void;
}

const SlashMenu: React.FC<SlashMenuProps> = ({
  showSlashMenu,
  slashMenuPosition,
  executeSlashCommand
}) => {
  if (!showSlashMenu) return null;

  return (
    <motion.div
      className="fixed bg-gradient-to-br from-slate-800/95 to-slate-700/95 backdrop-blur-xl border border-slate-600/50 rounded-xl shadow-2xl z-60 min-w-80"
      style={{ left: slashMenuPosition.x, top: slashMenuPosition.y }}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      {/* ... resto del JSX */}
    </motion.div>
  );
};

export default SlashMenu;