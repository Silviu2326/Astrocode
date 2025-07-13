import React, { useState } from 'react';
import { 
  X, Sparkles, Target, Users, Cpu, TrendingUp, BarChart3, Eye, Lightbulb, FileText, Shield, Link, ArrowLeft,
  // Iconos faltantes que se usan en el código
  Workflow, MessageSquare, Stethoscope, Table, Filter, Leaf, Building, Globe, Package, 
  Database, Smartphone, Brain, Cloud, Heart, Zap
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import apiRequest from '../services/api';
import { problemFocusedModes } from '../data/problemFocusedModes';
import { marketFocusedModes } from '../data/marketFocusedModes';
import { techFocusedModes } from '../data/techFocusedModes';
import { visionFocusedModes } from '../data/visionFocusedModes';
import { comboFocusedModes } from '../data/comboFocusedModes';

interface AIProjectGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GeneratedSoftware {
  id: string;
  name: string;
  description: string;
  targetClient: string;
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

const colors = [
  '#3B82F6', '#10B981', '#F97316', '#EF4444', '#8B5CF6', 
  '#06B6D4', '#84CC16', '#F59E0B', '#EC4899', '#6366F1'
];

// Definición de los 12 modos de generación
// Reemplaza la sección problemFocused en aiGenerationModes:
const aiGenerationModes = {
  problemFocused: problemFocusedModes,
  marketFocused: marketFocusedModes,
  techFocused: techFocusedModes,
  visionFocused: visionFocusedModes,
  comboFocused: comboFocusedModes
};

export default function AIProjectGenerator({ isOpen, onClose }: AIProjectGeneratorProps) {
  const { addProject } = useProject();
  const [aiStep, setAiStep] = useState<'modes' | 'form' | 'results'>('modes');
  const [selectedMode, setSelectedMode] = useState<any>(null);
  const [aiFormData, setAiFormData] = useState<any>({});
  const [generatedProjects, setGeneratedProjects] = useState<GeneratedSoftware[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateProjects = async () => {
    if (!selectedMode || Object.keys(aiFormData).length === 0) {
      alert('Por favor, completa todos los campos');
      return;
    }

    setIsGenerating(true);
    try {
      const requestData = {
        mode: selectedMode.id,
        inputs: aiFormData
      };
      
      console.log('Enviando datos:', requestData);
      const response = await apiRequest('/projects/generar-proyecto-ia-avanzado', {
        method: 'POST',
        body: JSON.stringify(requestData)
      });
      
      console.log('Respuesta recibida:', response);
      setGeneratedProjects(response.generatedSoftwares || []);
      setAiStep('results');
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
        mode: selectedMode.id,
        formData: aiFormData,
        targetClient: project.targetClient,
        financialReport: project.financialReport
      }
    };
    
    await addProject(projectData);
    
    // Reset states
    resetAIState();
    onClose();
  };

  const resetAIState = () => {
    setAiStep('modes');
    setSelectedMode(null);
    setAiFormData({});
    setGeneratedProjects([]);
  };

  const handleModeSelect = (mode: any) => {
    setSelectedMode(mode);
    setAiFormData({});
    setAiStep('form');
  };

  const renderAIModeSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">
          Elige tu método de generación de proyectos
        </h3>
        <p className="text-gray-400">30 métodos diferentes organizados en 4 enfoques estratégicos</p>
      </div>

      {Object.entries(aiGenerationModes).map(([category, modes]) => {
        const categoryNames = {
          problemFocused: '🎯 Enfoque en Problemas/Usuario',
          marketFocused: '📈 Enfoque en Mercado',
          techFocused: '💡 Enfoque en Tecnología/Activos',
          visionFocused: '🚀 Enfoque en Visión del Producto',
          comboFocused: '🔥 Métodos Combinados (Híbridos)'
        };

        return (
          <div key={category} className="space-y-3">
            <h4 className="text-md font-medium text-gray-300 border-b border-gray-700/50 pb-2">
              {categoryNames[category as keyof typeof categoryNames]}
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {modes.map((mode) => {
                const IconComponent = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => handleModeSelect(mode)}
                    className={`p-4 rounded-lg border-2 border-gray-600/50 bg-white/5 text-gray-300 hover:border-gray-500 hover:bg-white/10 transition-all duration-200 text-left group`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${mode.color} group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white group-hover:text-gray-100">{mode.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{mode.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderAIForm = () => {
    if (!selectedMode) return null;

    const IconComponent = selectedMode.icon;

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={() => setAiStep('modes')}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedMode.color}`}>
            <IconComponent className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{selectedMode.name}</h3>
            <p className="text-sm text-gray-400">{selectedMode.description}</p>
          </div>
        </div>

        {selectedMode.fields.map((field: any) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                value={aiFormData[field.name] || ''}
                onChange={(e) => setAiFormData({ ...aiFormData, [field.name]: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              >
                <option value="" className="bg-gray-800 text-gray-300">Selecciona una opción</option>
                {field.options.map((option: string) => (
                  <option key={option} value={option} className="bg-gray-800 text-white hover:bg-gray-700">{option}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                value={aiFormData[field.name] || ''}
                onChange={(e) => setAiFormData({ ...aiFormData, [field.name]: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
                placeholder={field.placeholder}
              />
            ) : (
              <input
                type={field.type}
                value={aiFormData[field.name] || ''}
                onChange={(e) => setAiFormData({ ...aiFormData, [field.name]: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}

        <button
          onClick={handleGenerateProjects}
          disabled={isGenerating || selectedMode.fields.some((field: any) => !aiFormData[field.name])}
          className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
        >
          {isGenerating ? 'Generando...' : 'Generar Proyectos'}
        </button>
      </div>
    );
  };

  const renderAIResults = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-6">
        <button
          onClick={() => setAiStep('form')}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Proyectos generados con: <span className="text-pink-400">{selectedMode?.name}</span>
          </h3>
          <p className="text-gray-400">Selecciona un proyecto para crearlo</p>
        </div>
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
                {selectedMode?.name}
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
          onClick={() => setAiStep('form')}
          className="flex-1 px-4 py-2 text-gray-300 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-200"
        >
          Generar Nuevos
        </button>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-pink-400" />
            <h2 className="text-xl font-semibold text-white">Generar Proyectos con IA Avanzada</h2>
            <span className="text-sm bg-pink-500/20 text-pink-300 px-2 py-1 rounded">30 Métodos</span>
          </div>
          <button
            onClick={() => {
              resetAIState();
              onClose();
            }}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {aiStep === 'modes' && renderAIModeSelection()}
          {aiStep === 'form' && renderAIForm()}
          {aiStep === 'results' && renderAIResults()}
        </div>
      </div>
    </div>
  );
}