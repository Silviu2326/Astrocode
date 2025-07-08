import React, { useState } from 'react';
import { X, Zap, RefreshCw } from 'lucide-react';

interface PopupUserStoriesIAProps {
  isOpen: boolean;
  onClose: () => void;
  pageId: string;
  pageName: string;
  onGenerate: (pageId: string, options: GenerationOptions) => void;
}

interface GenerationOptions {
  storyCount: number;
  strategicImpact: 'core' | 'high-impact' | 'nice-to-have' | 'competitive-risk';
  comments: string;
}

export default function PopupUserStoriesIA({ 
  isOpen, 
  onClose, 
  pageId, 
  pageName, 
  onGenerate 
}: PopupUserStoriesIAProps) {
  const [storyCount, setStoryCount] = useState(6);
  const [strategicImpact, setStrategicImpact] = useState<'core' | 'high-impact' | 'nice-to-have' | 'competitive-risk'>('high-impact');
  const [comments, setComments] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await onGenerate(pageId, {
        storyCount,
        strategicImpact,
        comments
      });
      onClose();
    } catch (error) {
      console.error('Error generating user stories:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-white">Nuevo Conjunto de User Stories</h2>
            <p className="text-slate-400 text-sm mt-1">Página: {pageName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Número de historias */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Número de historias de usuario
            </label>
            <input
              type="number"
              value={storyCount}
              onChange={(e) => setStoryCount(Number(e.target.value))}
              min="1"
              max="50"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 6"
            />
          </div>

          {/* Impacto estratégico */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Impacto estratégico
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'core', label: 'Core', description: 'crítico para que el sistema funcione' },
                { value: 'high-impact', label: 'High Impact', description: 'aumenta retención, ingresos o satisfacción' },
                { value: 'nice-to-have', label: 'Nice to Have', description: 'mejora la experiencia, pero no es esencial' },
                { value: 'competitive-risk', label: 'Riesgo competitivo', description: 'necesario para no quedarse atrás' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setStrategicImpact(option.value as any)}
                  className={`p-3 rounded-lg text-xs font-medium transition-colors text-left ${
                    strategicImpact === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title={option.description}
                >
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-xs opacity-75 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Comentarios a tener en cuenta */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Comentarios a tener en cuenta (opcional)
            </label>
            <input
              type="text"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="ej: considerar accesibilidad, integración con API externa..."
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg transition-all duration-200 text-white font-medium"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Generando...</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                <span>Generar Historias IA</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}