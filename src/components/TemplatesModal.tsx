import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, Star } from 'lucide-react';
import { AITemplate } from '../types/WordEditorTypes';
import { AI_TEMPLATES } from '../constants/editorConstants';

interface TemplatesModalProps {
  showTemplates: boolean;
  setShowTemplates: (show: boolean) => void;
  selectedTemplate: AITemplate | null;
  setSelectedTemplate: (template: AITemplate | null) => void;
  templateFields: Record<string, string>;
  setTemplateFields: (fields: Record<string, string>) => void;
  applyTemplate: (template: AITemplate) => void;
}

const TemplatesModal: React.FC<TemplatesModalProps> = ({
  showTemplates,
  setShowTemplates,
  selectedTemplate,
  setSelectedTemplate,
  templateFields,
  setTemplateFields,
  applyTemplate
}) => {
  if (!showTemplates) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setShowTemplates(false)}
    >
      {/* ... resto del JSX */}
    </motion.div>
  );
};

export default TemplatesModal;