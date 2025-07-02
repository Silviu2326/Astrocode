import React, { useState } from 'react';
import { X, Plus, FileText, Sparkles, Loader2, Lightbulb, Bot } from 'lucide-react';
import { AppPage } from '../types';

interface PageSuggestion {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
}

interface NewPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (page: Omit<AppPage, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialPage?: AppPage;
  projectId?: string;
}

export default function NewPageModal({ isOpen, onClose, onSubmit, initialPage, projectId }: NewPageModalProps) {
  const [formData, setFormData] = useState({
    title: initialPage?.title || '',
    description: initialPage?.description || '',
    status: initialPage?.status || 'todo' as const,
    priority: initialPage?.priority || 'medium' as const,
  });

  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<PageSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  React.useEffect(() => {
    if (initialPage) {
      setFormData({
        title: initialPage.title,
        description: initialPage.description,
        status: initialPage.status,
        priority: initialPage.priority,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
      });
    }
    // Reset suggestions when modal opens/closes
    setSuggestions([]);
    setShowSuggestions(false);
    setError(null);
  }, [initialPage, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      setFormData({ title: '', description: '', status: 'todo', priority: 'medium' });
      setSuggestions([]);
      setShowSuggestions(false);
      onClose();
    }
  };

  const handleAISuggestions = async () => {
    console.log('🚀 [FRONTEND] Iniciando handleAISuggestions (actualizarPagina)');
    console.log('📋 [FRONTEND] ProjectId:', projectId);
    console.log('📄 [FRONTEND] Datos de página:', { title: formData.title, description: formData.description });
    
    if (!projectId) {
      console.error('❌ [FRONTEND] Error: ID de proyecto no disponible');
      setError('ID de proyecto no disponible');
      return;
    }

    if (!formData.title.trim()) {
      console.error('❌ [FRONTEND] Error: Título de página requerido');
      setError('Por favor, ingresa un título para la página antes de obtener mejoras');
      return;
    }

    setIsLoadingSuggestions(true);
    setError(null);
    console.log('⏳ [FRONTEND] Estado loading activado');
    
    try {
      const token = localStorage.getItem('token');
      console.log('🔑 [FRONTEND] Token obtenido:', token ? 'Sí' : 'No');
      
      if (!token) {
        console.error('❌ [FRONTEND] Error: No hay token de autenticación');
        throw new Error('No hay token de autenticación');
      }

      const url = `https://web-production-d430.up.railway.app/api/projects/${projectId}/actualizarPagina`;
      console.log('🌐 [FRONTEND] Realizando petición a:', url);
      
      const requestBody = {
        pageId: initialPage?.id || null,
        pageName: formData.title,
        pageDescription: formData.description
      };
      
      console.log('📦 [FRONTEND] Body de la petición:', requestBody);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📡 [FRONTEND] Respuesta recibida - Status:', response.status);
      console.log('📡 [FRONTEND] Respuesta OK:', response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ [FRONTEND] Error en respuesta:', errorData);
        throw new Error(errorData.message || 'Error obteniendo mejoras de IA');
      }

      const data = await response.json();
      console.log('📦 [FRONTEND] Datos recibidos:', data);
      
      // Mapear las mejoras del backend al formato de sugerencias
      const improvements = data.improvements || [];
      const suggestions: PageSuggestion[] = improvements.map((improvement: any) => ({
        title: improvement.title,
        description: improvement.description,
        priority: improvement.priority,
        status: 'todo' as const
      }));
      
      console.log('✨ [FRONTEND] Mejoras procesadas:', suggestions);
      console.log('📊 [FRONTEND] Número de mejoras:', suggestions.length);
      
      setSuggestions(suggestions);
      setShowSuggestions(true);
      
      console.log('✅ [FRONTEND] Mejoras obtenidas exitosamente');
      console.log('🎯 [FRONTEND] Mostrando panel de mejoras');
      
    } catch (error) {
      console.error('❌ [FRONTEND] Error en handleAISuggestions:', error);
      console.error('❌ [FRONTEND] Tipo de error:', typeof error);
      console.error('❌ [FRONTEND] Stack trace:', error instanceof Error ? error.stack : 'No stack available');
      
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('❌ [FRONTEND] Mensaje de error final:', errorMessage);
      
      setError('Error al obtener mejoras de IA: ' + errorMessage);
    } finally {
      console.log('🏁 [FRONTEND] Finalizando handleAISuggestions - loading: false');
      setIsLoadingSuggestions(false);
    }
  };

  const handleGenerateDescriptionWithAI = async () => {
    if (!formData.title.trim()) {
      setError('Por favor, ingresa un título antes de generar la descripción.');
      return;
    }

    if (!projectId && !initialPage) {
      setError('No se puede generar descripción sin contexto del proyecto.');
      return;
    }

    setIsGeneratingDescription(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      // Si estamos editando una página existente, usar su ID
      // Si es una página nueva, usar el projectId y el título como contexto
      let endpoint;
      let body = {};
      
      if (initialPage) {
        // Editando página existente
        endpoint = `https://web-production-d430.up.railway.app/api/projects/${projectId}/pages/${initialPage.id}/generate-description`;
      } else {
        // Nueva página - necesitamos crear un endpoint que genere descripción basada en título
        endpoint = `https://web-production-d430.up.railway.app/api/projects/${projectId}/generate-page-description`;
        body = { title: formData.title };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error generando descripción con IA');
      }

      const data = await response.json();
      
      // Actualizar el campo de descripción con la descripción generada
      setFormData(prev => ({
        ...prev,
        description: data.description
      }));
      
      console.log('✅ Descripción generada exitosamente:', data.description);
      
    } catch (error) {
      console.error('Error generando descripción con IA:', error);
      setError('Error generando descripción con IA: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const applySuggestion = (suggestion: PageSuggestion) => {
    setFormData({
      title: suggestion.title,
      description: suggestion.description,
      status: suggestion.status,
      priority: suggestion.priority,
    });
    setShowSuggestions(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              {initialPage ? '' : 'Nueva Página'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Botón de Sugerir con IA */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={handleAISuggestions}
              disabled={isLoadingSuggestions}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 rounded-lg backdrop-blur-sm transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingSuggestions ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              <span>{isLoadingSuggestions ? 'Generando...' : 'Mejorar con IA'}</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Mejoras de IA */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-medium text-purple-300">Mejoras Sugeridas</h3>
              </div>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => applySuggestion(suggestion)}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-gray-600/30 hover:border-purple-400/50 rounded-lg cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-white text-sm">{suggestion.title}</h4>
                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">{suggestion.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            suggestion.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                            suggestion.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {suggestion.priority === 'high' ? 'Alta' : 
                             suggestion.priority === 'medium' ? 'Media' : 'Baja'}
                          </span>
                        </div>
                      </div>
                      <Plus className="h-4 w-4 text-purple-400 ml-2 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Título de la Página
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              placeholder="Ej: Página de inicio"
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
              placeholder="Describe la funcionalidad de esta página..."
            />
            {/* Botón Generar con IA debajo del campo descripción */}
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleGenerateDescriptionWithAI}
                disabled={isGeneratingDescription || !formData.title?.trim()}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-md shadow-sm hover:bg-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isGeneratingDescription ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
                <span>{isGeneratingDescription ? 'Generando...' : 'Generar con IA'}</span>
              </button>
            </div>
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
              <option value="todo">Por Hacer</option>
              <option value="in-progress">En Progreso</option>
              <option value="done">Completado</option>
            </select>
          </div>

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
              {initialPage ? 'Actualizar' : 'Crear'} Página
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}