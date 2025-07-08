import React, { useState } from 'react';
import { X, Plus, BookOpen, FileText, Code, Palette, CheckSquare, Lightbulb, Bot, Sparkles, Trash2, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { UserStory, ComponentModule, ImportModule } from '../types';
import { projectService } from '../services/api';

interface NewUserStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userStory: Omit<UserStory, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialUserStory?: UserStory;
  projectId: string;
  pageId: string;
}

export default function NewUserStoryModal({ isOpen, onClose, onSubmit, initialUserStory, projectId, pageId }: NewUserStoryModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUserStories, setGeneratedUserStories] = useState<any[]>([]);
  const [showGeneratedStories, setShowGeneratedStories] = useState(false);
  const [expandedStories, setExpandedStories] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState({
    title: initialUserStory?.title || '',
    description: initialUserStory?.description || '',
    pageContext: initialUserStory?.pageContext || '',
    affectedFiles: initialUserStory?.affectedFiles || [''],
    componentsModules: {
      create: initialUserStory?.componentsModules?.create || [{ name: '', type: 'component' as const }],
      import: initialUserStory?.componentsModules?.import || [{ name: '', from: '' }]
    },
    logicData: initialUserStory?.logicData || '',
    styling: {
      framework: initialUserStory?.styling?.framework || 'tailwind',
      classes: initialUserStory?.styling?.classes || '',
      colorCoding: initialUserStory?.styling?.colorCoding || ''
    },
    acceptanceCriteria: initialUserStory?.acceptanceCriteria?.length > 0 ? initialUserStory.acceptanceCriteria : [''],
    additionalSuggestions: initialUserStory?.additionalSuggestions || [''],
    aiEditorTask: initialUserStory?.aiEditorTask || '',
    priority: initialUserStory?.priority || 'medium' as const,
    estimatedHours: initialUserStory?.estimatedHours || 0,
    status: initialUserStory?.status || 'pending' as const, // Cambiado de 'todo' a 'pending'
  });

  React.useEffect(() => {
    if (initialUserStory) {
      setFormData({
        title: initialUserStory.title,
        description: initialUserStory.description,
        pageContext: initialUserStory.pageContext || '',
        affectedFiles: initialUserStory.affectedFiles?.length > 0 ? initialUserStory.affectedFiles : [''],
        componentsModules: {
          create: initialUserStory.componentsModules?.create?.length > 0 ? initialUserStory.componentsModules.create : [{ name: '', type: 'component' }],
          import: initialUserStory.componentsModules?.import?.length > 0 ? initialUserStory.componentsModules.import : [{ name: '', from: '' }]
        },
        logicData: initialUserStory.logicData || '',
        styling: {
          framework: initialUserStory.styling?.framework || 'tailwind',
          classes: initialUserStory.styling?.classes || '',
          colorCoding: initialUserStory.styling?.colorCoding || ''
        },
        acceptanceCriteria: initialUserStory.acceptanceCriteria?.length > 0 ? initialUserStory.acceptanceCriteria : [''],
        additionalSuggestions: initialUserStory.additionalSuggestions?.length > 0 ? initialUserStory.additionalSuggestions : [''],
        aiEditorTask: initialUserStory.aiEditorTask || '',
        priority: initialUserStory.priority,
        estimatedHours: initialUserStory.estimatedHours || 0,
        status: initialUserStory.status,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        pageContext: '',
        affectedFiles: [''],
        componentsModules: {
          create: [{ name: '', type: 'component' }],
          import: [{ name: '', from: '' }]
        },
        logicData: '',
        styling: {
          framework: 'tailwind',
          classes: '',
          colorCoding: ''
        },
        acceptanceCriteria: [''],
        additionalSuggestions: [''],
        aiEditorTask: '',
        priority: 'medium',
        estimatedHours: 0,
        status: 'pending', // Cambiado de 'todo' a 'pending'
      });
    }
  }, [initialUserStory]);

  // ... existing code ...
  const handleGenerateWithAI = async () => {
    try {
      setIsGenerating(true);
      const response = await projectService.generateUserStories(projectId, pageId);
      
      if (response && response.generatedUserStories && Array.isArray(response.generatedUserStories)) {
        setGeneratedUserStories(response.generatedUserStories);
        setShowGeneratedStories(true);
        setExpandedStories(new Set(response.generatedUserStories.map((_, index) => index)));
      }
    } catch (error) {
      console.error('Error generando historias de usuario con IA:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteStory = (index: number) => {
    setGeneratedUserStories(prev => prev.filter((_, i) => i !== index));
    setExpandedStories(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      const adjustedSet = new Set();
      Array.from(newSet).forEach(idx => {
        if (idx < index) {
          adjustedSet.add(idx);
        } else if (idx > index) {
          adjustedSet.add(idx - 1);
        }
      });
      return adjustedSet;
    });
  };

  const toggleStoryExpansion = (index: number) => {
    setExpandedStories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAllStories = async () => {
    try {
      setIsSaving(true);
      await projectService.saveMultipleUserStories(projectId, pageId, generatedUserStories);
      
      generatedUserStories.forEach(story => {
        onSubmit({
          title: story.title,
          description: story.description,
          pageContext: story.pageContext,
          affectedFiles: story.affectedFiles,
          componentsModules: story.componentsModules,
          logicData: story.logicData,
          styling: story.styling,
          acceptanceCriteria: story.acceptanceCriteria,
          additionalSuggestions: story.additionalSuggestions,
          aiEditorTask: story.aiEditorTask,
          priority: story.priority,
          estimatedHours: story.estimatedHours,
          status: story.status || 'pending', // Cambiado de 'todo' a 'pending'
        });
      });
      
      onClose();
    } catch (error) {
      console.error('Error guardando historias de usuario:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackToForm = () => {
    setShowGeneratedStories(false);
    setGeneratedUserStories([]);
    setExpandedStories(new Set());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit({
        ...formData,
        affectedFiles: formData.affectedFiles.filter(file => file.trim() !== ''),
        componentsModules: {
          create: formData.componentsModules.create.filter(comp => comp.name.trim() !== ''),
          import: formData.componentsModules.import.filter(imp => imp.name.trim() !== '')
        },
        acceptanceCriteria: formData.acceptanceCriteria.filter(criteria => criteria.trim() !== ''),
        additionalSuggestions: formData.additionalSuggestions.filter(suggestion => suggestion.trim() !== ''),
      });
      onClose();
    }
  };

  // Helper functions for dynamic arrays
  const addArrayItem = (field: string, defaultValue: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev as any)[field], defaultValue]
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev as any)[field].filter((_: any, i: number) => i !== index)
    }));
  };

  const updateArrayItem = (field: string, index: number, value: any) => {
    setFormData(prev => {
      const newArray = [...(prev as any)[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              {showGeneratedStories 
                ? `Historias Generadas (${generatedUserStories.length})`
                : initialUserStory ? 'Editar Historia de Usuario' : 'Nueva Historia de Usuario'
              }
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            {showGeneratedStories && (
              <button
                onClick={handleBackToForm}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Crear Manual</span>
              </button>
            )}
            {!showGeneratedStories && (
              <button
                onClick={handleGenerateWithAI}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg backdrop-blur-sm transition-all duration-200 shadow-lg text-sm font-medium"
              >
                <Sparkles className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Generando...' : 'Generar con IA'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {showGeneratedStories ? (
          // Vista de historias generadas con información completa
          <div className="p-6">
            <div className="space-y-6 mb-6">
              {generatedUserStories.map((story, index) => {
                const isExpanded = expandedStories.has(index);
                return (
                  <div key={index} className="bg-white/5 border border-gray-600/50 rounded-lg overflow-hidden">
                    {/* Header de la historia */}
                    <div className="p-4 border-b border-gray-600/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{story.title}</h3>
                            <button
                              onClick={() => toggleStoryExpansion(index)}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                            >
                              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </button>
                          </div>
                          <p className="text-gray-300 text-sm mb-3">{story.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div>
                              <span className="text-gray-400">Prioridad:</span>
                              <span className={`ml-1 px-2 py-1 rounded ${
                                story.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                                story.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-green-500/20 text-green-300'
                              }`}>
                                {story.priority === 'high' ? 'Alta' : story.priority === 'medium' ? 'Media' : 'Baja'}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">Horas:</span>
                              <span className="ml-1 text-white">{story.estimatedHours}h</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Página:</span>
                              <span className="ml-1 text-white">{story.pageContext}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Estado:</span>
                              <span className="ml-1 text-white">{story.status || 'pending'}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteStory(index)}
                          className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                          title="Eliminar historia"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Contenido expandible con toda la información */}
                    {isExpanded && (
                      <div className="p-4 space-y-4">
                        {/* Archivos Afectados */}
                        {story.affectedFiles && story.affectedFiles.length > 0 && (
                          <div>
                            <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                              <FileText className="h-4 w-4" />
                              <span>Archivos Afectados</span>
                            </h4>
                            <div className="bg-gray-800/50 rounded-lg p-3">
                              <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                                {story.affectedFiles.map((file: string, idx: number) => (
                                  <li key={idx} className="font-mono">{file}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* Componentes/Módulos */}
                        {(story.componentsModules?.create?.length > 0 || story.componentsModules?.import?.length > 0) && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Crear */}
                            {story.componentsModules?.create?.length > 0 && (
                              <div>
                                <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                                  <Code className="h-4 w-4" />
                                  <span>Componentes a Crear</span>
                                </h4>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                  <ul className="space-y-2">
                                    {story.componentsModules.create.map((comp: any, idx: number) => (
                                      <li key={idx} className="flex items-center justify-between text-xs">
                                        <span className="text-white font-mono">{comp.name}</span>
                                        <span className="text-gray-400 bg-gray-700 px-2 py-1 rounded">{comp.type}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}

                            {/* Importar */}
                            {story.componentsModules?.import?.length > 0 && (
                              <div>
                                <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                                  <Code className="h-4 w-4" />
                                  <span>Componentes a Importar</span>
                                </h4>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                  <ul className="space-y-2">
                                    {story.componentsModules.import.map((imp: any, idx: number) => (
                                      <li key={idx} className="text-xs">
                                        <div className="text-white font-mono">{imp.name}</div>
                                        <div className="text-gray-400 text-xs">desde: {imp.from}</div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Lógica/Datos */}
                        {story.logicData && (
                          <div>
                            <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                              <Code className="h-4 w-4" />
                              <span>Lógica/Datos</span>
                            </h4>
                            <div className="bg-gray-800/50 rounded-lg p-3">
                              <p className="text-xs text-gray-300">{story.logicData}</p>
                            </div>
                          </div>
                        )}

                        {/* Styling */}
                        {story.styling && (story.styling.classes || story.styling.colorCoding) && (
                          <div>
                            <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                              <Palette className="h-4 w-4" />
                              <span>Estilos</span>
                            </h4>
                            <div className="bg-gray-800/50 rounded-lg p-3 space-y-2">
                              {story.styling.framework && (
                                <div>
                                  <span className="text-gray-400 text-xs">Framework:</span>
                                  <span className="ml-2 text-white text-xs">{story.styling.framework}</span>
                                </div>
                              )}
                              {story.styling.classes && (
                                <div>
                                  <span className="text-gray-400 text-xs">Clases:</span>
                                  <div className="mt-1 text-xs text-gray-300 font-mono bg-gray-900/50 p-2 rounded">
                                    {story.styling.classes}
                                  </div>
                                </div>
                              )}
                              {story.styling.colorCoding && (
                                <div>
                                  <span className="text-gray-400 text-xs">Esquema de colores:</span>
                                  <div className="mt-1 text-xs text-gray-300">{story.styling.colorCoding}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Criterios de Aceptación */}
                        {story.acceptanceCriteria && story.acceptanceCriteria.length > 0 && (
                          <div>
                            <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                              <CheckSquare className="h-4 w-4" />
                              <span>Criterios de Aceptación</span>
                            </h4>
                            <div className="bg-gray-800/50 rounded-lg p-3">
                              <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                                {story.acceptanceCriteria.map((criteria: string, idx: number) => (
                                  <li key={idx}>{criteria}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* Sugerencias Adicionales */}
                        {story.additionalSuggestions && story.additionalSuggestions.length > 0 && (
                          <div>
                            <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                              <Lightbulb className="h-4 w-4" />
                              <span>Sugerencias Adicionales</span>
                            </h4>
                            <div className="bg-gray-800/50 rounded-lg p-3">
                              <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                                {story.additionalSuggestions.map((suggestion: string, idx: number) => (
                                  <li key={idx}>{suggestion}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* Tarea del Editor IA */}
                        {story.aiEditorTask && (
                          <div>
                            <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                              <Bot className="h-4 w-4" />
                              <span>Tarea del Editor IA</span>
                            </h4>
                            <div className="bg-gray-800/50 rounded-lg p-3">
                              <p className="text-xs text-gray-300">{story.aiEditorTask}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {generatedUserStories.length > 0 && (
              <div className="flex space-x-3 pt-4 border-t border-gray-700/50">
                <button
                  onClick={handleBackToForm}
                  className="flex-1 px-4 py-2 text-gray-300 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-200"
                >
                  Volver al Formulario
                </button>
                <button
                  onClick={handleSaveAllStories}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200 font-medium"
                >
                  <Save className={`h-5 w-5 ${isSaving ? 'animate-spin' : ''}`} />
                  <span>{isSaving ? 'Guardando...' : 'Guardar Todas'}</span>
                </button>
              </div>
            )}
            
            {generatedUserStories.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No hay historias generadas para mostrar.</p>
                <button
                  onClick={handleBackToForm}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-all duration-200"
                >
                  Crear Historia Manual
                </button>
              </div>
            )}
          </div>
        ) : (
          // Formulario completo actualizado
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Título y Descripción */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título de la Historia (Formato: Implementar US-X: Como usuario...)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  placeholder="Implementar US-1: Como usuario quiero ver tarjetas KPI..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
                  placeholder="Describe en detalle la funcionalidad requerida..."
                  required
                />
              </div>
            </div>

            {/* Contexto de Página */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contexto de Página
              </label>
              <input
                type="text"
                value={formData.pageContext}
                onChange={(e) => setFormData({ ...formData, pageContext: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Ej: Dashboard principal, Página de login, etc."
              />
            </div>

            {/* Archivos Afectados */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <FileText className="h-4 w-4" />
                <span>Archivos Afectados</span>
              </label>
              {formData.affectedFiles.map((file, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={file}
                    onChange={(e) => updateArrayItem('affectedFiles', index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    placeholder="src/components/Dashboard.tsx"
                  />
                  {formData.affectedFiles.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('affectedFiles', index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('affectedFiles', '')}
                className="flex items-center space-x-2 px-3 py-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Agregar Archivo</span>
              </button>
            </div>

            {/* Componentes/Módulos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Componentes a Crear */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                  <Code className="h-4 w-4" />
                  <span>Componentes a Crear</span>
                </label>
                {formData.componentsModules.create.map((comp, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={comp.name}
                      onChange={(e) => {
                        const newCreate = [...formData.componentsModules.create];
                        newCreate[index] = { ...newCreate[index], name: e.target.value };
                        setFormData({ ...formData, componentsModules: { ...formData.componentsModules, create: newCreate } });
                      }}
                      className="flex-1 px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      placeholder="NombreComponente"
                    />
                    <select
                      value={comp.type}
                      onChange={(e) => {
                        const newCreate = [...formData.componentsModules.create];
                        newCreate[index] = { ...newCreate[index], type: e.target.value as any };
                        setFormData({ ...formData, componentsModules: { ...formData.componentsModules, create: newCreate } });
                      }}
                      className="px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    >
                      <option value="component">Component</option>
                      <option value="hook">Hook</option>
                      <option value="service">Service</option>
                      <option value="util">Util</option>
                      <option value="module">Module</option>
                    </select>
                    {formData.componentsModules.create.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newCreate = formData.componentsModules.create.filter((_, i) => i !== index);
                          setFormData({ ...formData, componentsModules: { ...formData.componentsModules, create: newCreate } });
                        }}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newCreate = [...formData.componentsModules.create, { name: '', type: 'component' as const }];
                    setFormData({ ...formData, componentsModules: { ...formData.componentsModules, create: newCreate } });
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
                >
                  <Plus className="h-4 w-4" />
                  <span>Agregar Componente</span>
                </button>
              </div>

              {/* Componentes a Importar */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                  <Code className="h-4 w-4" />
                  <span>Componentes a Importar</span>
                </label>
                {formData.componentsModules.import.map((imp, index) => (
                  <div key={index} className="space-y-2 mb-3 p-3 bg-white/5 rounded-lg">
                    <input
                      type="text"
                      value={imp.name}
                      onChange={(e) => {
                        const newImport = [...formData.componentsModules.import];
                        newImport[index] = { ...newImport[index], name: e.target.value };
                        setFormData({ ...formData, componentsModules: { ...formData.componentsModules, import: newImport } });
                      }}
                      className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      placeholder="NombreComponente"
                    />
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={imp.from}
                        onChange={(e) => {
                          const newImport = [...formData.componentsModules.import];
                          newImport[index] = { ...newImport[index], from: e.target.value };
                          setFormData({ ...formData, componentsModules: { ...formData.componentsModules, import: newImport } });
                        }}
                        className="flex-1 px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                        placeholder="./components/Button"
                      />
                      {formData.componentsModules.import.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newImport = formData.componentsModules.import.filter((_, i) => i !== index);
                            setFormData({ ...formData, componentsModules: { ...formData.componentsModules, import: newImport } });
                          }}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newImport = [...formData.componentsModules.import, { name: '', from: '' }];
                    setFormData({ ...formData, componentsModules: { ...formData.componentsModules, import: newImport } });
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
                >
                  <Plus className="h-4 w-4" />
                  <span>Agregar Import</span>
                </button>
              </div>
            </div>

            {/* Lógica/Datos */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <Code className="h-4 w-4" />
                <span>Lógica/Datos</span>
              </label>
              <textarea
                value={formData.logicData}
                onChange={(e) => setFormData({ ...formData, logicData: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
                placeholder="Describe la lógica de negocio, estados, efectos, etc."
              />
            </div>

            {/* Styling */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <Palette className="h-4 w-4" />
                <span>Estilos</span>
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Framework</label>
                  <select
                    value={formData.styling.framework}
                    onChange={(e) => setFormData({ ...formData, styling: { ...formData.styling, framework: e.target.value } })}
                    className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  >
                    <option value="tailwind">Tailwind CSS</option>
                    <option value="css">CSS</option>
                    <option value="scss">SCSS</option>
                    <option value="styled-components">Styled Components</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Clases CSS</label>
                  <textarea
                    value={formData.styling.classes}
                    onChange={(e) => setFormData({ ...formData, styling: { ...formData.styling, classes: e.target.value } })}
                    rows={3}
                    className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
                    placeholder="bg-blue-500 text-white p-4 rounded-lg..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Esquema de Colores</label>
                  <input
                    type="text"
                    value={formData.styling.colorCoding}
                    onChange={(e) => setFormData({ ...formData, styling: { ...formData.styling, colorCoding: e.target.value } })}
                    className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    placeholder="Primario: #3B82F6, Secundario: #10B981..."
                  />
                </div>
              </div>
            </div>

            {/* Criterios de Aceptación */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <CheckSquare className="h-4 w-4" />
                <span>Criterios de Aceptación</span>
              </label>
              {formData.acceptanceCriteria.map((criteria, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={criteria}
                    onChange={(e) => updateArrayItem('acceptanceCriteria', index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    placeholder="El usuario debe poder..."
                  />
                  {formData.acceptanceCriteria.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('acceptanceCriteria', index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('acceptanceCriteria', '')}
                className="flex items-center space-x-2 px-3 py-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Agregar Criterio</span>
              </button>
            </div>

            {/* Sugerencias Adicionales */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <Lightbulb className="h-4 w-4" />
                <span>Sugerencias Adicionales</span>
              </label>
              {formData.additionalSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={suggestion}
                    onChange={(e) => updateArrayItem('additionalSuggestions', index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    placeholder="Considera agregar..."
                  />
                  {formData.additionalSuggestions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('additionalSuggestions', index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('additionalSuggestions', '')}
                className="flex items-center space-x-2 px-3 py-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Agregar Sugerencia</span>
              </button>
            </div>

            {/* Tarea del Editor IA */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <Bot className="h-4 w-4" />
                <span>Tarea del Editor IA</span>
              </label>
              <textarea
                value={formData.aiEditorTask}
                onChange={(e) => setFormData({ ...formData, aiEditorTask: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
                placeholder="Instrucciones específicas para el editor IA..."
              />
            </div>

            {/* Configuración */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Prioridad
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estado
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                >
                  <option value="pending">Pendiente</option>
                  <option value="in-progress">En Progreso</option>
                  <option value="completed">Completado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Horas Estimadas
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.estimatedHours}
                  onChange={(e) => setFormData({ ...formData, estimatedHours: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4 border-t border-gray-700/50">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-300 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 rounded-lg backdrop-blur-sm transition-all duration-200 shadow-lg"
              >
                {initialUserStory ? 'Actualizar' : 'Crear'} Historia
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}