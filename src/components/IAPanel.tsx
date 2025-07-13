import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, Zap, Command, Search, Settings, Mic, MicOff } from 'lucide-react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';
import { createProjectListCommands, ProjectListCommand } from '../utils/projectListCommands';
import { createProjectEditCommands, ProjectEditCommand } from '../utils/projectEditCommands';

interface IAPanelProps {
  className?: string;
  // Props específicos para ProjectList
  dispatch?: any;
  openModal?: () => void;
  // Props específicos para ProjectEdit
  projectEditSetters?: any;
  currentProject?: any;
  viewMode?: string;
}

const IAPanel: React.FC<IAPanelProps> = ({ 
  className = '',
  dispatch,
  openModal,
  projectEditSetters,
  currentProject,
  viewMode
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp: Date }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');
  const [isExecutorMode, setIsExecutorMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const location = useLocation();
  useEffect(() => {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'es-ES'; // Español por defecto
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      setIsListening(false);
    };
    
    recognition.onerror = (event) => {
      console.error('Error en reconocimiento de voz:', event.error);
      setIsListening(false);
      
      // Mostrar mensaje de error al usuario
      const errorMessage = {
        text: `❌ Error en reconocimiento de voz: ${event.error === 'not-allowed' ? 'Permisos de micrófono denegados' : 'Error de conexión'}`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    setSpeechRecognition(recognition);
  }
}, []);

// Función para iniciar/detener reconocimiento de voz - MOVER DENTRO DEL COMPONENTE
const toggleVoiceInput = () => {
  if (!speechRecognition) {
    const errorMessage = {
      text: '❌ Reconocimiento de voz no disponible en este navegador',
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, errorMessage]);
    return;
  }

  if (isListening) {
    speechRecognition.stop();
  } else {
    speechRecognition.start();
  }
};
  // Detectar en qué página estamos
  const isProjectList = location.pathname === '/listadodeproyectos';
  const isProjectEdit = location.pathname.includes('/project/');
  
  // Obtener comandos según la página actual
  const getAvailableCommands = (): (ProjectListCommand | ProjectEditCommand)[] => {
    if (isProjectList && dispatch && openModal) {
      const projectListCommands = createProjectListCommands(dispatch, openModal);
      return projectListCommands.getAllCommands();
    } else if (isProjectEdit && projectEditSetters && currentProject) {
      const projectEditCommands = createProjectEditCommands(projectEditSetters, currentProject, viewMode || 'kanban');
      return projectEditCommands.getAllCommands();
    }
    return [];
  };
  
  const availableCommands = getAvailableCommands();
  
  // Filtrar comandos según búsqueda
  const filteredCommands = availableCommands.filter(cmd => 
    cmd.name.toLowerCase().includes(commandSearch.toLowerCase()) ||
    cmd.description.toLowerCase().includes(commandSearch.toLowerCase())
  );

  useEffect(() => {
    if (buttonRef.current) {
      // Animación inicial del botón flotante
      gsap.fromTo(buttonRef.current, 
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
      
      // Animación de pulso continuo
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      // Animación de apertura del panel
      gsap.fromTo(panelRef.current,
        { scale: 0, opacity: 0, y: 50, rotationY: -90 },
        { scale: 1, opacity: 1, y: 0, rotationY: 0, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesRef.current) {
      const messageElements = messagesRef.current.children;
      if (messageElements.length > 0) {
        const lastMessage = messageElements[messageElements.length - 1];
        gsap.fromTo(lastMessage,
          { opacity: 0, y: 20, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Animación del input al enviar
    if (inputRef.current) {
      gsap.to(inputRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    }

    // Simular respuesta de IA con contexto de la página
    setTimeout(() => {
      let contextualResponse = '';
      
      if (isProjectList) {
        contextualResponse = `✨ Estás en la lista de proyectos. Puedo ayudarte con: crear nuevos proyectos, filtrar y ordenar, cambiar vistas, o buscar proyectos específicos. `;
      } else if (isProjectEdit) {
        contextualResponse = `🚀 Estás editando un proyecto. Puedo ayudarte con: crear páginas y historias de usuario, gestionar archivos, cambiar vistas, configurar el proyecto, o usar herramientas de IA. `;
      } else {
        contextualResponse = `💡 `;
      }
      
      const aiResponse = {
        text: `${contextualResponse}Sobre tu mensaje: "${userMessage.text}". ¿En qué puedo asistirte específicamente?`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClose = () => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        scale: 0,
        opacity: 0,
        y: 50,
        rotationY: 90,
        duration: 0.4,
        ease: "back.in(1.7)",
        onComplete: () => {
          setIsOpen(false);
          setShowCommands(false);
        }
      });
    } else {
      setIsOpen(false);
      setShowCommands(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0,
        rotation: 180,
        duration: 0.3,
        ease: "back.in(1.7)"
      });
    }
  };

  const executeCommand = (command: ProjectListCommand | ProjectEditCommand) => {
    try {
      command.action();
      // Agregar mensaje de confirmación
      const confirmationMessage = {
        text: `✅ Comando ejecutado: ${command.name}`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, confirmationMessage]);
      setShowCommands(false);
    } catch (error) {
      console.error('Error ejecutando comando:', error);
      const errorMessage = {
        text: `❌ Error al ejecutar: ${command.name}`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const getContextualSuggestions = () => {
    if (isProjectList) {
      return ['➕ Crear proyecto', '🔍 Buscar proyectos', '🔄 Cambiar vista'];
    } else if (isProjectEdit) {
      return ['📄 Nueva página', '📝 Nueva historia', '🤖 Generar con IA'];
    }
    return ['💡 Ideas de proyecto', '🚀 Optimizar código', '📊 Análisis de datos'];
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Botón flotante con tema oscuro */}
      {!isOpen && (
        <button
          ref={buttonRef}
          onClick={handleOpen}
          className={`relative ${isExecutorMode 
            ? 'bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700' 
            : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700'
          } text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:shadow-purple-500/30 group overflow-hidden border border-gray-700/50`}
          title={isExecutorMode ? "Modo Ejecutor IA" : "Asistente IA Avanzado"}
        >
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Partículas flotantes */}
          <div className={`absolute -top-1 -right-1 w-3 h-3 ${isExecutorMode ? 'bg-orange-400' : 'bg-cyan-400'} rounded-full animate-ping`}></div>
          <div className={`absolute -bottom-1 -left-1 w-2 h-2 ${isExecutorMode ? 'bg-red-400' : 'bg-pink-400'} rounded-full animate-pulse`}></div>
          
          {isExecutorMode ? <Settings className="w-7 h-7 relative z-10" /> : <Bot className="w-7 h-7 relative z-10" />}
        </button>
      )}

      {/* Panel del chat con tema oscuro */}
      {isOpen && (
        <div 
          ref={panelRef}
          className="bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 w-[500px] h-[80vh] flex flex-col overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(31,41,55,0.95) 100%)'
          }}
        >
          {/* Header con tema oscuro */}
          <div className={`${isExecutorMode 
            ? 'bg-gradient-to-r from-orange-600 via-red-600 to-pink-600' 
            : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
          } text-white p-5 flex items-center justify-between relative overflow-hidden`}>
            {/* Efecto de ondas en el header */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            </div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                {isExecutorMode ? <Settings className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-cyan-300 animate-spin" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{isExecutorMode ? 'Ejecutor IA' : 'Asistente IA'}</h3>
                <p className="text-xs opacity-90">
                  {isProjectList ? 'Lista de Proyectos' : isProjectEdit ? 'Editor de Proyecto' : 'Powered by Advanced AI'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 relative z-10">
              {/* Switch de modo */}
              <div className="flex items-center gap-2 mr-2">
                <span className="text-xs font-medium">Asistente</span>
                <button
                  onClick={() => setIsExecutorMode(!isExecutorMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                    isExecutorMode ? 'bg-orange-600' : 'bg-gray-600'
                  }`}
                  title="Cambiar modo"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      isExecutorMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-xs font-medium">Ejecutor</span>
              </div>
              
              {/* Botón de comandos */}
              {availableCommands.length > 0 && (
                <button
                  onClick={() => setShowCommands(!showCommands)}
                  className={`hover:bg-white/20 rounded-full p-2 transition-all duration-200 ${
                    showCommands ? 'bg-white/20 rotate-180' : ''
                  }`}
                  title="Comandos disponibles"
                >
                  <Command className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={handleClose}
                className="hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Panel de comandos */}
          {showCommands && (
            <div className="bg-gray-800/80 border-b border-gray-700/50 p-4 max-h-48 overflow-y-auto">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar comandos..."
                  value={commandSearch}
                  onChange={(e) => setCommandSearch(e.target.value)}
                  className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-1 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                />
              </div>
            </div>
          )}

          {/* Área de mensajes con tema oscuro - Solo se muestra cuando NO están los comandos */}
          {!showCommands && (
            <div 
              ref={messagesRef}
              className="flex-1 p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-800/30 to-gray-900/50"
            >
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-full mb-4 border border-gray-700/50">
                    <Zap className="w-8 h-8 text-purple-400" />
                  </div>
                  <p className="text-gray-300 font-medium mb-2">¡Hola! Soy tu Asistente IA</p>
                  <p className="text-gray-400 text-sm mb-3">
                    {isProjectList 
                      ? 'Te ayudo a gestionar tus proyectos' 
                      : isProjectEdit 
                      ? 'Te ayudo a desarrollar tu proyecto' 
                      : 'Estoy aquí para ayudarte con cualquier consulta'
                    }
                  </p>
                  {availableCommands.length > 0 && (
                    <p className="text-gray-500 text-xs">
                      💡 Usa el botón <Command className="w-3 h-3 inline" /> para ver comandos disponibles
                    </p>
                  )}
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-lg ${
                        msg.isUser
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md border border-indigo-500/30'
                          : 'bg-gray-800/80 border border-gray-700/50 text-gray-200 rounded-bl-md shadow-md backdrop-blur-sm'
                      }`}
                    >
                      {!msg.isUser && (
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="w-4 h-4 text-purple-400" />
                          <span className="text-xs font-semibold text-purple-400">Asistente IA</span>
                        </div>
                      )}
                      <p className="leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-2 opacity-70 ${
                        msg.isUser ? 'text-white/70' : 'text-gray-400'
                      }`}>
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/80 border border-gray-700/50 p-4 rounded-2xl rounded-bl-md shadow-md backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-semibold text-purple-400">Asistente IA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-400">Pensando...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Lista de comandos - Solo se muestra cuando showCommands es true */}
          {showCommands && (
            <div className="flex-1 p-5 overflow-y-auto space-y-2 bg-gradient-to-b from-gray-800/30 to-gray-900/50">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command) => (
                  <button
                    key={command.id}
                    onClick={() => executeCommand(command)}
                    className="w-full text-left p-4 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 group border border-gray-700/30 hover:border-purple-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{command.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-base font-medium text-gray-200 group-hover:text-white">
                            {command.name}
                          </span>
                          {command.shortcut && (
                            <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">
                              {command.shortcut}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 mt-1">
                          {command.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-full mb-4 border border-gray-600/50">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-lg font-medium mb-2">No se encontraron comandos</p>
                  <p className="text-gray-500 text-sm">Intenta con una búsqueda diferente</p>
                </div>
              )}
            </div>
          )}

          {/* Input con tema oscuro - Solo se muestra cuando NO están los comandos */}
          {!showCommands && (
            <div className="p-5 border-t border-gray-700/50 bg-gray-800/50 backdrop-blur-sm">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isListening ? "Escuchando..." : "Escribe tu mensaje aquí..."}
                    className={`w-full resize-none border-2 ${isListening ? 'border-red-500/50 bg-red-900/20' : 'border-gray-600/50'} focus:border-purple-500/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-200 bg-gray-800/80 backdrop-blur-sm text-gray-200 placeholder-gray-400`}
                    rows={1}
                    disabled={isLoading || isListening}
                  />
                  {/* Indicador de escritura */}
                  <div className="absolute bottom-1 right-1 text-xs text-gray-500">
                    {message.length}/500
                  </div>
                  
                  {/* Indicador de escucha activa */}
                  {isListening && (
                    <div className="absolute top-1 right-1 flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-red-400">Escuchando</span>
                    </div>
                  )}
                </div>
                
                {/* Botón de voz */}
                <button
                  onClick={toggleVoiceInput}
                  disabled={isLoading}
                  className={`${isListening 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 animate-pulse' 
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                  } disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl p-3 transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:hover:scale-100 disabled:hover:shadow-none group border border-green-500/30`}
                  title={isListening ? "Detener grabación" : "Iniciar grabación de voz"}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  ) : (
                    <Mic className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  )}
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading || isListening}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl p-3 transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:hover:scale-100 disabled:hover:shadow-none group border border-indigo-500/30"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </div>
              
              {/* Sugerencias rápidas contextuales */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {getContextualSuggestions().map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(suggestion.split(' ').slice(1).join(' '))}
                    className="flex-shrink-0 text-xs bg-gradient-to-r from-gray-700/50 to-gray-600/50 hover:from-indigo-800/50 hover:to-purple-800/50 text-gray-300 hover:text-white px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 border border-gray-600/30 hover:border-purple-500/30"
                    disabled={isListening}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              
              {/* Información sobre reconocimiento de voz */}
              {speechRecognition && (
                <div className="mt-2 text-xs text-gray-500 text-center">
                  💡 Tip: Usa el botón de micrófono para dictar tu mensaje
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IAPanel;


// Inicializar reconocimiento de voz - MOVER DENTRO DEL COMPONENTE
