import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, Settings, Save, Palette } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

interface EditarProjectoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  project?: {
    id: string;
    name: string;
    description: string;
    status: string;
    color: string;
    githubUrl?: string;
  } | null;
}

const colors = [
  '#3B82F6', '#10B981', '#F97316', '#EF4444', '#8B5CF6', 
  '#06B6D4', '#84CC16', '#F59E0B', '#EC4899', '#6366F1'
];

const statusOptions = [
  { value: 'planning', label: 'Planificación' },
  { value: 'development', label: 'Desarrollo' },
  { value: 'testing', label: 'Pruebas' },
  { value: 'deployed', label: 'Desplegado' },
];

export default function EditarProjectoPopup({ isOpen, onClose, project }: EditarProjectoPopupProps) {
  const { updateProject } = useProject();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'planning',
    color: colors[0],
    githubUrl: '',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        status: project.status || 'planning',
        color: project.color || colors[0],
        githubUrl: project.githubUrl || '',
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name.trim() && formData.description.trim().length >= 10 && project) {
      const updatedProjectData = {
        ...project,
        ...formData,
      };
      
      await updateProject(project.id, updatedProjectData);
      onClose();
    }
  };

  const handleReset = () => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        status: project.status || 'planning',
        color: project.color || colors[0],
        githubUrl: project.githubUrl || '',
      });
    }
  };

  if (!isOpen || !project) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-2">
            <Settings className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Editar Configuración</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
              Estado del Proyecto
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Color del Proyecto</span>
              </div>
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
              onClick={handleReset}
              className="flex-1 px-4 py-2 text-gray-300 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-200"
            >
              Restablecer
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-300 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 rounded-lg backdrop-blur-sm transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Guardar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}