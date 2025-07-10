import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordEditorProps } from '../../types/WordEditorTypes';
import { useWordEditor } from './useWordEditor';
import EditorHeader from './EditorHeader';
import EditorToolbar from './EditorToolbar';
import EditorContent from './EditorContent';
import CopilotSidebar from './CopilotSidebar';
import SlashMenu from './SlashMenu';
import TemplatesModal from './TemplatesModal';
import EditorFooter from './EditorFooter';

const WordEditor: React.FC<WordEditorProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialContent = '', 
  initialTitle = 'Nuevo Documento' 
}) => {
  const {
    // Estado
    title, setTitle,
    content, setContent,
    fontSize, setFontSize,
    fontFamily, setFontFamily,
    textColor, setTextColor,
    showCopilot, setShowCopilot,
    chatMessages, setChatMessages,
    chatInput, setChatInput,
    isAITyping, setIsAITyping,
    showSlashMenu, setShowSlashMenu,
    slashMenuPosition, setSlashMenuPosition,
    inlineSuggestion, setInlineSuggestion,
    showInlineSuggestion, setShowInlineSuggestion,
    showTemplates, setShowTemplates,
    selectedTemplate, setSelectedTemplate,
    templateFields, setTemplateFields,
    
    // Referencias
    editorRef,
    chatEndRef,
    typingTimeoutRef,
    
    // Funciones
    handleSave,
    handleDownload,
    formatText,
    handleContentChange,
    generateInlineSuggestion,
    acceptInlineSuggestion,
    executeSlashCommand,
    sendChatMessage,
    applyTemplate,
    handleKeyDown
  } = useWordEditor(initialContent, initialTitle);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Editor Principal */}
          <div className="flex-1 flex flex-col">
            <EditorHeader
              title={title}
              setTitle={setTitle}
              showCopilot={showCopilot}
              setShowCopilot={setShowCopilot}
              setShowTemplates={setShowTemplates}
              onSave={handleSave}
              onDownload={handleDownload}
              onClose={onClose}
            />
            
            <EditorToolbar
              fontFamily={fontFamily}
              setFontFamily={setFontFamily}
              fontSize={fontSize}
              setFontSize={setFontSize}
              textColor={textColor}
              setTextColor={setTextColor}
              formatText={formatText}
              isAITyping={isAITyping}
            />
            
            <EditorContent
              editorRef={editorRef}
              content={content}
              fontFamily={fontFamily}
              fontSize={fontSize}
              onContentChange={handleContentChange}
              onKeyDown={handleKeyDown}
              showInlineSuggestion={showInlineSuggestion}
              inlineSuggestion={inlineSuggestion}
              acceptInlineSuggestion={acceptInlineSuggestion}
              setShowInlineSuggestion={setShowInlineSuggestion}
            />
            
            <EditorFooter content={content} />
          </div>

          <CopilotSidebar
            showCopilot={showCopilot}
            chatMessages={chatMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            isAITyping={isAITyping}
            sendChatMessage={sendChatMessage}
            chatEndRef={chatEndRef}
          />
        </motion.div>

        <SlashMenu
          showSlashMenu={showSlashMenu}
          slashMenuPosition={slashMenuPosition}
          executeSlashCommand={executeSlashCommand}
        />

        <TemplatesModal
          showTemplates={showTemplates}
          setShowTemplates={setShowTemplates}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          templateFields={templateFields}
          setTemplateFields={setTemplateFields}
          applyTemplate={applyTemplate}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default WordEditor;