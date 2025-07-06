import { useState, useRef, useEffect } from 'react';
import { ChatMessage, AITemplate } from '../types/WordEditorTypes';

export const useWordEditor = (initialContent: string, initialTitle: string) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [fontSize, setFontSize] = useState('14');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const [showCopilot, setShowCopilot] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });
  const [inlineSuggestion, setInlineSuggestion] = useState('');
  const [showInlineSuggestion, setShowInlineSuggestion] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<AITemplate | null>(null);
  const [templateFields, setTemplateFields] = useState<Record<string, string>>({});
  
  const editorRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSave = () => {
    // Lógica de guardado
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
      
      // Detectar comandos slash
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const textContent = range.startContainer.textContent || '';
        const cursorPosition = range.startOffset;
        
        if (textContent.charAt(cursorPosition - 1) === '/') {
          const rect = range.getBoundingClientRect();
          setSlashMenuPosition({ x: rect.left, y: rect.bottom });
          setShowSlashMenu(true);
        } else {
          setShowSlashMenu(false);
        }
      }
      
      // Generar sugerencias inline (simulado)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        generateInlineSuggestion();
      }, 1000);
    }
  };

  const generateInlineSuggestion = () => {
    const plainText = content.replace(/<[^>]*>/g, '');
    if (plainText.length > 10 && Math.random() > 0.7) {
      setInlineSuggestion(' y esto podría complementarse con...');
      setShowInlineSuggestion(true);
    }
  };

  const acceptInlineSuggestion = () => {
    if (editorRef.current && inlineSuggestion) {
      const newContent = content + inlineSuggestion;
      setContent(newContent);
      editorRef.current.innerHTML = newContent;
      setShowInlineSuggestion(false);
      setInlineSuggestion('');
    }
  };

  const executeSlashCommand = async (command: string) => {
    setShowSlashMenu(false);
    setIsAITyping(true);
    
    // Simular procesamiento IA
    setTimeout(() => {
      let aiResponse = '';
      const selectedText = window.getSelection()?.toString() || '';
      const documentTopic = title || 'el tema del documento';
      
      switch (command) {
        case '/esquema':
          aiResponse = `\n\n## Índice Detallado: ${documentTopic}\n\n### 1. Introducción\n   - Contexto y antecedentes\n   - Objetivos del documento\n   - Metodología\n\n### 2. Análisis Principal\n   - Marco teórico\n   - Datos y evidencias\n   - Casos de estudio\n\n### 3. Resultados y Hallazgos\n   - Principales descubrimientos\n   - Implicaciones\n   - Limitaciones\n\n### 4. Conclusiones y Recomendaciones\n   - Síntesis de resultados\n   - Acciones propuestas\n   - Próximos pasos\n\n### 5. Referencias y Anexos\n   - Fuentes consultadas\n   - Material complementario\n\n`;
          break;
        case '/resumen':
          aiResponse = `\n\n## Resumen Ejecutivo\n\n• **Punto clave 1:** Análisis del contenido seleccionado\n• **Punto clave 2:** Principales hallazgos y conclusiones identificadas\n• **Punto clave 3:** Implicaciones estratégicas y operativas\n• **Punto clave 4:** Recomendaciones accionables para implementar\n• **Punto clave 5:** Próximos pasos y seguimiento requerido\n\n*Total: 118 palabras*\n\n`;
          break;
        default:
          aiResponse = '\n\n❌ Comando no reconocido.\n\n';
      }
      
      if (editorRef.current) {
        const newContent = content + aiResponse;
        setContent(newContent);
        editorRef.current.innerHTML = newContent;
      }
      
      setIsAITyping(false);
    }, 2000);
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsAITyping(true);
    
    // Simular respuesta IA
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Basándome en tu documento "${title}", puedo ayudarte con eso. El contenido actual tiene ${content.replace(/<[^>]*>/g, '').split(' ').length} palabras.`,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setIsAITyping(false);
    }, 1500);
  };

  const applyTemplate = async (template: AITemplate) => {
    setIsAITyping(true);
    
    // Simular generación de contenido basado en plantilla
    setTimeout(() => {
      let templateContent = template.prompt;
      
      // Reemplazar campos con valores
      Object.entries(templateFields).forEach(([key, value]) => {
        templateContent = templateContent.replace(`{${key}}`, value);
      });
      
      const generatedContent = `\n\n## ${template.name}\n\n${templateContent}\n\n[Contenido generado por IA basado en la plantilla]\n\n`;
      
      if (editorRef.current) {
        const newContent = content + generatedContent;
        setContent(newContent);
        editorRef.current.innerHTML = newContent;
      }
      
      setShowTemplates(false);
      setSelectedTemplate(null);
      setTemplateFields({});
      setIsAITyping(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && showInlineSuggestion) {
      e.preventDefault();
      acceptInlineSuggestion();
    }
    if (e.key === 'Escape') {
      setShowSlashMenu(false);
      setShowInlineSuggestion(false);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);
  
  return {
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
  };
};