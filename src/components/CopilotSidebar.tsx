import React from 'react';
import { motion } from 'framer-motion';
import { Brain, User, Bot, Send } from 'lucide-react';
import { ChatMessage } from '../types/WordEditorTypes';

interface CopilotSidebarProps {
  showCopilot: boolean;
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (input: string) => void;
  isAITyping: boolean;
  sendChatMessage: () => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
}

const CopilotSidebar: React.FC<CopilotSidebarProps> = ({
  showCopilot,
  chatMessages,
  chatInput,
  setChatInput,
  isAITyping,
  sendChatMessage,
  chatEndRef
}) => {
  if (!showCopilot) return null;

  return (
    <motion.div
      className="w-80 border-l border-slate-700/50 bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl flex flex-col"
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      {/* Header */}
      {/* Messages */}
      {/* Input */}
      {/* ... resto del JSX */}
    </motion.div>
  );
};

export default CopilotSidebar;