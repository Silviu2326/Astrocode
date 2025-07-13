import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Clock, CheckCircle, AlertCircle, Copy, ChevronDown, ChevronUp, Check, GitCommit, Download } from 'lucide-react';
import { UserStory, AppPage } from '../types';

interface PopupExecutePromptsProps {
  isOpen: boolean;
  onClose: () => void;
  page: AppPage | null;
  userStories: UserStory[];
  selectedUserStoryIds?: string[]; // Nueva prop para IDs seleccionados
  onExecuteStory: (storyId: string) => void;
  onExecuteAll: () => void;
}

const PopupExecutePrompts: React.FC<PopupExecutePromptsProps> = ({
  isOpen,
  onClose,
  page,
  userStories,
  selectedUserStoryIds = [], // Valor por defecto
  onExecuteStory,
  onExecuteAll
}) => {
  const [expandedStories, setExpandedStories] = useState<Set<string>>(new Set());
  const [copiedStories, setCopiedStories] = useState<Set<string>>(new Set());

  const [copiedGitCommands, setCopiedGitCommands] = useState<Map<string, Set<string>>>(new Map());

  if (!isOpen || !page) return null;

  // Filtrar user stories para mostrar solo las seleccionadas
  const filteredUserStories = selectedUserStoryIds.length > 0 
    ? userStories.filter(story => selectedUserStoryIds.includes(story.id))
    : userStories;

  const toggleExpanded = (storyId: string) => {
    const newExpanded = new Set(expandedStories);
    if (newExpanded.has(storyId)) {
      newExpanded.delete(storyId);
    } else {
      newExpanded.add(storyId);
    }
    setExpandedStories(newExpanded);
  };

  const generateCommitMessage = (story: UserStory) => {
    // Generar mensaje de commit basado en el título de la user story
    const commitMessage = `feat: ${story.title}`;
    return commitMessage;
  };

  const copyGitCommand = async (story: UserStory, commandType: 'add' | 'commit' | 'push') => {
    try {
      let command = '';
      switch (commandType) {
        case 'add':
          command = 'git add .';
          break;
        case 'commit':
          command = `git commit -m "${generateCommitMessage(story)}"`;
          break;
        case 'push':
          command = 'git push origin main';
          break;
      }
      
      await navigator.clipboard.writeText(command);
      
      // Mostrar feedback visual
      setCopiedGitCommands(prev => {
        const newMap = new Map(prev);
        const storyCommands = newMap.get(story.id) || new Set();
        storyCommands.add(commandType);
        newMap.set(story.id, storyCommands);
        return newMap;
      });
      
      setTimeout(() => {
        setCopiedGitCommands(prev => {
          const newMap = new Map(prev);
          const storyCommands = newMap.get(story.id) || new Set();
          storyCommands.delete(commandType);
          if (storyCommands.size === 0) {
            newMap.delete(story.id);
          } else {
            newMap.set(story.id, storyCommands);
          }
          return newMap;
        });
      }, 2000);
    } catch (error) {
      console.error('Error al copiar comando git al portapapeles:', error);
      // Fallback para navegadores que no soportan clipboard API
      let command = '';
      switch (commandType) {
        case 'add':
          command = 'git add .';
          break;
        case 'commit':
          command = `git commit -m "${generateCommitMessage(story)}"`;
          break;
        case 'push':
          command = 'git push origin main';
          break;
      }
      
      const textArea = document.createElement('textarea');
      textArea.value = command;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  const generateJsonData = () => {
    const messages: any[] = [];
    
    filteredUserStories.forEach((story) => {
      // Agregar el prompt de la user story
      messages.push({
        type: 'prompt',
        storyId: story.id,
        storyTitle: story.title,
        content: generatePrompt(story)
      });
      
      // Agregar los 3 comandos Git
      messages.push({
        type: 'git_command',
        storyId: story.id,
        command: 'add',
        content: 'git add .'
      });
      
      messages.push({
        type: 'git_command',
        storyId: story.id,
        command: 'commit',
        content: `git commit -m "${generateCommitMessage(story)}"`
      });
      
      messages.push({
        type: 'git_command',
        storyId: story.id,
        command: 'push',
        content: 'git push origin main'
      });
    });
    
    return {
      page: {
        title: page?.title || 'Sin nombre',
        id: page?.id
      },
      totalStories: filteredUserStories.length,
      generatedAt: new Date().toISOString(),
      messages
    };
  };

  const downloadJson = () => {
    try {
      // Generar array de prompts en formato bash con ANSI-C quoting
      const prompts = filteredUserStories.map(story => {
        const prompt = generatePrompt(story);
        // Escapar caracteres especiales para formato ANSI-C quoting
        const escapedPrompt = prompt
          .replace(/\\/g, '\\\\')
          .replace(/'/g, "\\'") 
          .replace(/\n/g, '\\n')
          .replace(/\t/g, '\\t')
          .replace(/\r/g, '\\r');
        return `   $'${escapedPrompt} Cuando termines, escribe: TAREA COMPLETADA.'`;
      });
      
      // Crear el contenido del archivo en formato bash
      const fileContent = `prompts=(
${prompts.join('\n')}
)`;
      
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `prompts-${page?.title?.toLowerCase().replace(/\s+/g, '-') || 'page'}-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al generar el archivo TXT:', error);
    }
  };

  const generatePrompt = (story: UserStory) => {
      let prompt = `# User Story: ${story.title}\n\n`;
      prompt += `## Descripción\n${story.description}\n\n`;
      
      if (story.pageContext) {
        prompt += `## Contexto de la Página\n${story.pageContext}\n\n`;
      }
      
      if (story.affectedFiles && story.affectedFiles.length > 0) {
        prompt += `## Archivos Afectados\n`;
        story.affectedFiles.forEach(file => {
          prompt += `- @${file}\n`;
        });
        prompt += `\n`;
      }
      
      if (story.componentsModules) {
        if (story.componentsModules.create && story.componentsModules.create.length > 0) {
          prompt += `## Componentes a Crear\n`;
          story.componentsModules.create.forEach(comp => {
            prompt += `- ${comp.name} (${comp.type})\n`;
          });
          
          // Agregar información sobre la carpeta de destino
          const pageName = story.pageContext ? story.pageContext.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : 'pagina';
          prompt += `\n los Componentes a crear se deben crear en la carpeta src/features/${pageName}/components\n\n`;
        }
        
        if (story.componentsModules.import && story.componentsModules.import.length > 0) {
          prompt += `## Módulos a Importar\n`;
          story.componentsModules.import.forEach(imp => {
            prompt += `- ${imp.name} from ${imp.from}\n`;
          });
          prompt += `\n`;
        }
      }
      
      if (story.logicData) {
        prompt += `## Lógica y Datos\n${story.logicData}\n\n`;
      }
      
      if (story.styling) {
        prompt += `## Estilos\n`;
        prompt += `IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.\n\n`;
      }
      
      if (story.acceptanceCriteria && story.acceptanceCriteria.length > 0) {
        prompt += `## Criterios de Aceptación\n`;
        story.acceptanceCriteria.forEach((criteria, index) => {
          prompt += `${index + 1}. ${criteria}\n`;
        });
        prompt += `\n`;
      }
      
      if (story.additionalSuggestions && story.additionalSuggestions.length > 0) {
        prompt += `## Sugerencias Adicionales\n`;
        story.additionalSuggestions.forEach(suggestion => {
          prompt += `- ${suggestion}\n`;
        });
        prompt += `\n`;
      }
      
      if (story.aiEditorTask) {
        prompt += `## Tarea para Editor IA\n${story.aiEditorTask}\n\n`;
      }
      
      // Agregar restricción de carpeta al final
      if (story.affectedFiles && story.affectedFiles.length > 0) {
        // Extraer la carpeta del primer archivo afectado
        const firstFile = story.affectedFiles[0];
        const folderMatch = firstFile.match(/^(.*\/[^\/]+)\//); 
        
        if (folderMatch) {
          const folderPath = folderMatch[1];
          prompt += `\n## RESTRICCIÓN IMPORTANTE\n`;
          prompt += `PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @${folderPath}\n`;
        }
      }
      
      // Agregar instrucciones adicionales al final
      prompt += `\n## INSTRUCCIONES ADICIONALES\n`;
      prompt += `NO HAGAS TEST, NO EJECUTES NPM RUN DEV, SOLO CREA EL COMPONENTE Y INTEGRALO EN LA PAGINA\n`;
      
      return prompt;
    };

  const copyPrompt = async (story: UserStory) => {
    try {
      const prompt = generatePrompt(story);
      await navigator.clipboard.writeText(prompt);
      
      // Mostrar feedback visual
      setCopiedStories(prev => new Set([...prev, story.id]));
      setTimeout(() => {
        setCopiedStories(prev => {
          const newSet = new Set(prev);
          newSet.delete(story.id);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error('Error al copiar al portapapeles:', error);
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = generatePrompt(story);
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'done':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-900 rounded-xl border border-slate-700 w-full max-w-6xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Ejecutar User Stories
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Página: {page.title || 'Sin nombre'} • {filteredUserStories.length} historias {selectedUserStoryIds.length > 0 ? 'seleccionadas' : 'disponibles'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {filteredUserStories.length > 0 && (
                <>
                  <button
                    onClick={generateSimpleJson}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    JSON Simple
                  </button>
                  <button
                    onClick={downloadJson}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Descargar JSON
                  </button>
                  <button
                    onClick={onExecuteAll}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Ejecutar {selectedUserStoryIds.length > 0 ? 'Seleccionadas' : 'Todas'}
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[75vh]">
            {filteredUserStories.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-300 mb-2">
                  {selectedUserStoryIds.length > 0 ? 'No hay user stories seleccionadas' : 'No hay user stories disponibles'}
                </h3>
                <p className="text-slate-400">
                  {selectedUserStoryIds.length > 0 
                    ? 'Selecciona algunas user stories para ejecutar sus prompts.'
                    : 'Esta página no tiene user stories para ejecutar.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUserStories.map((story) => {
                  const isExpanded = expandedStories.has(story.id);
                  const isCopied = copiedStories.has(story.id);

                  
                  return (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      {/* Story Header */}
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getStatusIcon(story.status)}
                              <h3 className="font-medium text-white">{story.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(story.priority)}`}>
                                {story.priority}
                              </span>
                            </div>
                            
                            <p className="text-sm text-slate-300 mb-3">
                              {story.description}
                            </p>
                            
                            {/* Sección de Commit */}
                            <div className="bg-slate-900/50 rounded-lg p-3 mb-3 border border-slate-600">
                              <div className="flex items-center gap-2 mb-3">
                                <GitCommit className="w-4 h-4 text-purple-400" />
                                <span className="text-sm font-medium text-purple-400">Comandos Git:</span>
                              </div>
                              
                              <div className="space-y-2">
                                {/* Git Add */}
                                <div className="flex items-center justify-between bg-slate-800/50 rounded p-2">
                                  <code className="text-xs text-slate-300 font-mono">
                                    git add .
                                  </code>
                                  <button
                                    onClick={() => copyGitCommand(story, 'add')}
                                    className={`px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                                      copiedGitCommands.get(story.id)?.has('add')
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                                    }`}
                                  >
                                    {copiedGitCommands.get(story.id)?.has('add') ? (
                                      <>
                                        <Check className="w-3 h-3" />
                                        Copiado
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        Copiar
                                      </>
                                    )}
                                  </button>
                                </div>
                                
                                {/* Git Commit */}
                                <div className="flex items-center justify-between bg-slate-800/50 rounded p-2">
                                  <code className="text-xs text-slate-300 font-mono flex-1 mr-2">
                                    git commit -m "{generateCommitMessage(story)}"
                                  </code>
                                  <button
                                    onClick={() => copyGitCommand(story, 'commit')}
                                    className={`px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                                      copiedGitCommands.get(story.id)?.has('commit')
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                                    }`}
                                  >
                                    {copiedGitCommands.get(story.id)?.has('commit') ? (
                                      <>
                                        <Check className="w-3 h-3" />
                                        Copiado
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        Copiar
                                      </>
                                    )}
                                  </button>
                                </div>
                                
                                {/* Git Push */}
                                <div className="flex items-center justify-between bg-slate-800/50 rounded p-2">
                                  <code className="text-xs text-slate-300 font-mono">
                                    git push origin main
                                  </code>
                                  <button
                                    onClick={() => copyGitCommand(story, 'push')}
                                    className={`px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                                      copiedGitCommands.get(story.id)?.has('push')
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                                    }`}
                                  >
                                    {copiedGitCommands.get(story.id)?.has('push') ? (
                                      <>
                                        <Check className="w-3 h-3" />
                                        Copiado
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        Copiar
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-xs text-slate-400">
                              <span>Estado: {story.status}</span>
                              {story.estimatedHours && (
                                <span>Estimado: {story.estimatedHours}h</span>
                              )}
                              {story.aiEditorTask && (
                                <span className="text-blue-400">IA: Sí</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => copyPrompt(story)}
                              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                                isCopied 
                                  ? 'bg-green-600 text-white' 
                                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                              }`}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-4 h-4" />
                                  Copiado
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  Copiar Prompt
                                </>
                              )}
                            </button>
                            
                            <button
                              onClick={() => toggleExpanded(story.id)}
                              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors flex items-center gap-2 text-sm"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-4 h-4" />
                                  Ocultar
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4" />
                                  Ver Prompt
                                </>
                              )}
                            </button>
                            
                            <button
                              onClick={() => onExecuteStory(story.id)}
                              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
                            >
                              <Play className="w-4 h-4" />
                              Ejecutar
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-slate-700 overflow-hidden"
                          >
                            <div className="p-4">
                              <h4 className="text-sm font-medium text-slate-300 mb-3">Prompt Completo:</h4>
                              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                                <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                                  {generatePrompt(story)}
                                </pre>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupExecutePrompts;



  const generateSimpleJson = () => {
    try {
      const prompts = filteredUserStories.map(story => {
        const prompt = generatePrompt(story);
        // Convertir a una sola línea escapando comillas y eliminando saltos de línea
        const singleLinePrompt = prompt.replace(/\n/g, '\\n').replace(/"/g, '\\"');
        return `"${singleLinePrompt}"`;
      });
      
      const jsonString = `[${prompts.join(',')}]`;
      
      // Copiar al portapapeles
      navigator.clipboard.writeText(jsonString).then(() => {
        console.log('JSON simple copiado al portapapeles');
      }).catch(error => {
        console.error('Error al copiar al portapapeles:', error);
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = jsonString;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      });
    } catch (error) {
      console.error('Error al generar JSON simple:', error);
    }
  };