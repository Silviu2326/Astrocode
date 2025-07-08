import React, { useState } from 'react';
import { X, FolderPlus, Zap, ExternalLink, Sparkles } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import apiRequest from '../services/api';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const colors = [
  '#3B82F6', '#10B981', '#F97316', '#EF4444', '#8B5CF6', 
  '#06B6D4', '#84CC16', '#F59E0B', '#EC4899', '#6366F1'
];

interface GeneratedSoftware {
  id: string;
  name: string;
  description: string;
  targetClient: string;
  problemasQueResuelve: string[];
  pages: Array<{
    id: string;
    name: string;
    description: string;
    route: string;
  }>;
  financialReport: {
    estimatedDevelopmentCost: string;
    monthlyRevenuePotential: string;
    breakEvenTime: string;
    marketSize: string;
    competitionLevel: string;
  };
}

export default function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const { addProject } = useProject();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'planning' as const,
    color: colors[0],
    githubUrl: '',
  });
  const [projectType, setProjectType] = useState<'manual' | 'generate' | 'bolt'>('manual');
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [aiFormData, setAiFormData] = useState({
    nicho: '',
    tipo: 'saas' as 'microsaas' | 'macrosaas' | 'saas',
    comentario: ''
  });
  const [generatedProjects, setGeneratedProjects] = useState<GeneratedSoftware[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedProject, setSelectedProject] = useState<GeneratedSoftware | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (projectType === 'bolt') {
      window.open('https://bolt.new', '_blank');
      onClose();
      return;
    }
    
    if (formData.name.trim() && formData.description.trim().length >= 10) {
      const projectData = {
        ...formData,
        pages: [],
        generatedWithAI: projectType === 'generate'
      };
      
      await addProject(projectData);
      setFormData({ name: '', description: '', status: 'planning', color: colors[0], githubUrl: '' });
      setProjectType('manual');
      onClose();
    }
  };

  const handleGenerateProjects = async () => {
    if (!aiFormData.nicho.trim() || !aiFormData.tipo) {
      alert('Por favor, completa todos los campos');
      return;
    }

    setIsGenerating(true);
    try {
      console.log('Enviando datos:', aiFormData);
      const response = await apiRequest('/projects/generar-proyecto-ia', {
        method: 'POST',
        body: JSON.stringify(aiFormData)
      });
      
      console.log('Respuesta recibida:', response);
      // Cambiar de response.proyectos a response.generatedSoftwares
      setGeneratedProjects(response.generatedSoftwares || []);
    } catch (error) {
      console.error('Error generando proyectos:', error);
      alert('Error al generar proyectos. Por favor, intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectProject = async (project: GeneratedSoftware) => {
    const projectData = {
      name: project.name,
      description: project.description,
      status: 'planning' as const,
      color: colors[Math.floor(Math.random() * colors.length)],
      githubUrl: '',
      pages: project.pages.map(page => ({
        id: page.id,
        name: page.name,
        description: page.description,
        route: page.route,
        userStories: [],
        createdAt: new Date(),
        generatedByAI: true
      })),
      generatedWithAI: true,
      aiMetadata: {
        nicho: aiFormData.nicho,
        tipo: aiFormData.tipo,
        targetClient: project.targetClient,
        financialReport: project.financialReport
      }
    };
    
    await addProject(projectData);
    
    // Reset states
    setShowAIPopup(false);
    setGeneratedProjects([]);
    setAiFormData({ nicho: '', tipo: 'saas', comentario: '' });
    setProjectType('manual');
    onClose();
  };

  const handleUseBolt = () => {
    window.open('https://bolt.new', '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-2">
              <FolderPlus className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Nuevo Proyecto</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Tipo de Proyecto */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Tipo de Proyecto
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => setProjectType('manual')}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                    projectType === 'manual'
                      ? 'border-blue-400 bg-blue-500/20 text-white'
                      : 'border-gray-600/50 bg-white/5 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <FolderPlus className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Proyecto Manual</div>
                      <div className="text-xs text-gray-400">Crear proyecto desde cero con configuración manual</div>
                    </div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setProjectType('generate')}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                    projectType === 'generate'
                      ? 'border-purple-400 bg-purple-500/20 text-white'
                      : 'border-gray-600/50 bg-white/5 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Generar Páginas</div>
                      <div className="text-xs text-gray-400">Generar estructura y páginas automáticamente</div>
                    </div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setProjectType('bolt')}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                    projectType === 'bolt'
                      ? 'border-green-400 bg-green-500/20 text-white'
                      : 'border-gray-600/50 bg-white/5 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <ExternalLink className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Usar Bolt.new</div>
                      <div className="text-xs text-gray-400">Abrir bolt.new para desarrollo rápido</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Botón independiente para generar con IA */}
            <div className="border-t border-gray-700/50 pt-4">
              <button
                type="button"
                onClick={() => setShowAIPopup(true)} 
                className="w-full p-3 rounded-lg border-2 border-pink-400/50 bg-gradient-to-r from-pink-500/10 to-purple-600/10 text-white hover:from-pink-500/20 hover:to-purple-600/20 hover:border-pink-400 transition-all duration-200"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Sparkles className="h-5 w-5 text-pink-400" />
                  <div>
                    <div className="font-medium">Generar con IA</div>
                    <div className="text-xs text-gray-400">Generar ideas de proyectos basadas en nicho y tipo</div>
                  </div>
                </div>
              </button>
            </div>

            {/* Campos del formulario */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre del Proyecto
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Ej: Mi aplicación increíble"
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
                placeholder="Describe brevemente tu proyecto... (mínimo 10 caracteres)"
                required
                minLength={10}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                URL del Repositorio GitHub (opcional)
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="https://github.com/usuario/repositorio"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estado Inicial
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              >
                <option value="planning">Planificación</option>
                <option value="development">Desarrollo</option>
                <option value="testing">Pruebas</option>
                <option value="deployed">Desplegado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Color del Proyecto
              </label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      formData.color === color ? 'border-white scale-110 shadow-lg' : 'border-gray-500/50'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
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
                className={`flex-1 px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-200 shadow-lg ${
                  projectType === 'generate'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700'
                    : projectType === 'bolt'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                }`}
              >
                {projectType === 'generate' ? 'Generar Proyecto' : 
                 projectType === 'bolt' ? 'Abrir Bolt.new' : 'Crear Proyecto'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* AI Generation Popup */}
      {showAIPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-pink-400" />
                <h2 className="text-xl font-semibold text-white">Generar Proyectos con IA</h2>
              </div>
              <button
                onClick={() => {
                  setShowAIPopup(false);
                  setGeneratedProjects([]);
                  setAiFormData({ nicho: '', tipo: 'saas', comentario: '' });
                }}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {generatedProjects.length === 0 ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nicho del Proyecto
                    </label>
                    <input
                      type="text"
                      value={aiFormData.nicho}
                      onChange={(e) => setAiFormData({ ...aiFormData, nicho: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      placeholder="Ej: educación online, salud y bienestar, fintech, e-commerce..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tipo de Negocio
                    </label>
                    <select
                      value={aiFormData.tipo}
                      onChange={(e) => setAiFormData({ ...aiFormData, tipo: e.target.value as any })}
                      className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    >
                      <option value="microsaas">MicroSaaS - Solución específica y nicho</option>
                      <option value="saas">SaaS - Software como servicio estándar</option>
                      <option value="macrosaas">MacroSaaS - Plataforma empresarial compleja</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Comentarios Adicionales (opcional)
                    </label>
                    <textarea
                      value={aiFormData.comentario}
                      onChange={(e) => setAiFormData({ ...aiFormData, comentario: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
                      placeholder="Consideraciones especiales, características específicas, restricciones técnicas..."
                    />
                  </div>

                  <button
                    onClick={handleGenerateProjects}
                    disabled={!aiFormData.nicho.trim() || isGenerating}
                    className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                  >
                    {isGenerating ? 'Generando...' : 'Generar Lista de Proyectos'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Proyectos generados para: <span className="text-pink-400">{aiFormData.nicho}</span>
                    </h3>
                    <p className="text-gray-400">Selecciona un proyecto para crearlo</p>
                  </div>

                  <div className="grid gap-4">
                    {generatedProjects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-white/5 border border-gray-700/50 rounded-lg p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                        onClick={() => handleSelectProject(project)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold text-white">{project.name}</h4>
                          <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded">
                            {aiFormData.tipo.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 mb-3">{project.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <h5 className="text-sm font-medium text-gray-400 mb-1">Cliente Objetivo:</h5>
                            <p className="text-sm text-gray-300">{project.targetClient}</p>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-400 mb-1">Páginas Incluidas:</h5>
                            <div className="flex flex-wrap gap-1">
                              {project.pages.slice(0, 3).map((page) => (
                                <span key={page.id} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                                  {page.name}
                                </span>
                              ))}
                              {project.pages.length > 3 && (
                                <span className="text-xs text-gray-400">+{project.pages.length - 3} más</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <h5 className="text-sm font-medium text-gray-400 mb-1">Problemas que Resuelve:</h5>
                          <div className="flex flex-wrap gap-1">
                            {project.problemasQueResuelve?.slice(0, 3).map((problema, index) => (
                              <span key={index} className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">
                                {problema}
                              </span>
                            ))}
                            {project.problemasQueResuelve?.length > 3 && (
                              <span className="text-xs text-gray-400">+{project.problemasQueResuelve.length - 3} más</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="text-gray-400">Costo:</span>
                            <p className="text-green-300">{project.financialReport.estimatedDevelopmentCost}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Ingresos/mes:</span>
                            <p className="text-green-300">{project.financialReport.monthlyRevenuePotential}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Break-even:</span>
                            <p className="text-yellow-300">{project.financialReport.breakEvenTime}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Competencia:</span>
                            <p className={`${
                              project.financialReport.competitionLevel === 'Bajo' ? 'text-green-300' :
                              project.financialReport.competitionLevel === 'Medio' ? 'text-yellow-300' : 'text-red-300'
                            }`}>
                              {project.financialReport.competitionLevel}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-3 pt-4 border-t border-gray-700/50">
                    <button
                      onClick={() => {
                        setGeneratedProjects([]);
                        setAiFormData({ nicho: '', tipo: 'saas' });
                      }}
                      className="flex-1 px-4 py-2 text-gray-300 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-200"
                    >
                      Generar Nuevos
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
