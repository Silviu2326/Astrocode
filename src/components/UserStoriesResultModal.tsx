import React, { useState } from 'react';
import { X, CheckCircle, Clock, User, Code, Palette, Target, Save } from 'lucide-react';
import { projectService } from '../services/api';

interface GeneratedUserStory {
  id: string;
  title: string;
  description: string;
  pageContext: string;
  affectedFiles: string[];
  componentsModules: {
    create: Array<{
      name: string;
      type: string;
      description: string;
    }>;
    import: any[];
  };
  logicData: string;
  styling: {
    framework: string;
    classes: string;
    colorCoding: string;
  };
  acceptanceCriteria: string[];
  additionalSuggestions: string[];
  aiEditorTask: string;
  priority: string;
  status: string;
  estimatedHours: number;
  strategicImpact: string;
  comments: string;
}

interface UserStoriesResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStories: GeneratedUserStory[];
  pageName: string;
  totalStories: number;
  metadata?: any;
  projectId: string;
  pageId?: string; // ✅ Agregar pageId como prop opcional
}

export default function UserStoriesResultModal({
  isOpen,
  onClose,
  userStories,
  pageName,
  totalStories,
  metadata,
  projectId,
  pageId: propPageId // ✅ Recibir pageId como prop
}: UserStoriesResultModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  // Obtenemos el pageId desde props, metadata, o basedOn
  const pageId = propPageId || metadata?.pageId || metadata?.basedOn?.pageId;
  
  const handleSaveUserStories = async () => {
    if (!pageId) {
      alert('❌ Error: No se pudo obtener el ID de la página');
      return;
    }
    
    setIsSaving(true);
    try {
      await projectService.saveMultipleUserStories(projectId, pageId, userStories);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving user stories:', error);
      alert('❌ Error al guardar las historias de usuario');
    } finally {
      setIsSaving(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'core': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'high-impact': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'nice-to-have': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'competitive-risk': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">
                Historias de Usuario Generadas
              </h2>
              <p className="text-sm text-gray-400">
                {totalStories} historia{totalStories !== 1 ? 's' : ''} generada{totalStories !== 1 ? 's' : ''} para la página "{pageName}"
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Botón de Guardar */}
            <button
              onClick={handleSaveUserStories}
              disabled={isSaving || saveSuccess}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                saveSuccess
                  ? 'bg-green-600 text-white'
                  : isSaving
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Guardando...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Guardado</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Guardar User Stories</span>
                </>
              )}
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* Metadata */}
            {metadata && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Información de Generación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-400">
                  <div>
                    <span className="font-medium">Modelo IA:</span> {metadata.aiModel || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Generado:</span> {metadata.generatedAt ? new Date(metadata.generatedAt).toLocaleString() : 'N/A'}
                  </div>
                  {metadata.basedOn && (
                    <>
                      <div>
                        <span className="font-medium">Impacto Estratégico:</span> {metadata.basedOn.strategicImpact || 'N/A'}
                      </div>
                      <div>
                        <span className="font-medium">Cantidad Solicitada:</span> {metadata.basedOn.storyCount || 'N/A'}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* User Stories List */}
            <div className="space-y-4">
              {userStories.map((story, index) => (
                <div key={story.id} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-5 hover:bg-slate-800/50 transition-all duration-200">
                  {/* Story Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-400">#{index + 1}</span>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(story.priority)}`}>
                          {story.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getImpactColor(story.strategicImpact)}`}>
                          {story.strategicImpact}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">{story.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{story.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 ml-4">
                      <Clock className="h-4 w-4" />
                      <span>{story.estimatedHours}h</span>
                    </div>
                  </div>

                  {/* Components to Create */}
                  {story.componentsModules.create.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Componentes a Crear
                      </h5>
                      <div className="space-y-2">
                        {story.componentsModules.create.map((component, idx) => (
                          <div key={idx} className="bg-slate-700/30 border border-slate-600/30 rounded p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-blue-300">{component.name}</span>
                              <span className="text-xs text-gray-400 bg-slate-600/50 px-2 py-0.5 rounded">
                                {component.type}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400">{component.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Affected Files */}
                  {story.affectedFiles.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-300 mb-2">Archivos Afectados</h5>
                      <div className="flex flex-wrap gap-2">
                        {story.affectedFiles.map((file, idx) => (
                          <span key={idx} className="text-xs bg-slate-700/50 text-gray-300 px-2 py-1 rounded border border-slate-600/30">
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Styling Info */}
                  {story.styling && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Información de Estilo
                      </h5>
                      <div className="bg-slate-700/30 border border-slate-600/30 rounded p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="font-medium text-gray-300">Framework:</span>
                            <span className="text-gray-400 ml-2">{story.styling.framework}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-300">Clases:</span>
                            <span className="text-gray-400 ml-2 font-mono">{story.styling.classes}</span>
                          </div>
                        </div>
                        {story.styling.colorCoding && (
                          <div className="mt-2">
                            <span className="font-medium text-gray-300 text-xs">Colores:</span>
                            <p className="text-gray-400 text-xs mt-1">{story.styling.colorCoding}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Acceptance Criteria */}
                  {story.acceptanceCriteria.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Criterios de Aceptación
                      </h5>
                      <ul className="space-y-1">
                        {story.acceptanceCriteria.map((criteria, idx) => (
                          <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* AI Editor Task */}
                  {story.aiEditorTask && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-300 mb-2">Tarea para Editor IA</h5>
                      <div className="bg-slate-700/30 border border-slate-600/30 rounded p-3">
                        <p className="text-xs text-gray-400">{story.aiEditorTask}</p>
                      </div>
                    </div>
                  )}

                  {/* Additional Suggestions */}
                  {story.additionalSuggestions.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-300 mb-2">Sugerencias Adicionales</h5>
                      <ul className="space-y-1">
                        {story.additionalSuggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700/50 p-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">
              {saveSuccess 
                ? '✅ Las historias se han guardado exitosamente en el proyecto'
                : 'Usa el botón "Guardar User Stories" para agregar estas historias al proyecto'
              }
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}