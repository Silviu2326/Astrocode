
import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { projectService } from '../services/api';

interface GeneracionCompletaPopupProps {
  onClose: () => void;
}

const GeneracionCompletaPopup: React.FC<GeneracionCompletaPopupProps> = ({ onClose }) => {
  const { currentProject } = useProject();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generationResult, setGenerationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleGeneratePages = async () => {
    if (!currentProject?.id) {
      setError('No hay un proyecto seleccionado');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      let result;
      
      if (generationResult && generationResult.generatedPages && generationResult.generatedPages.length > 0) {
        // Si ya hay páginas generadas, usar la función de páginas adicionales
        const existingPages = generationResult.generatedPages.map((page: any) => ({
          name: page.name,
          route: page.route,
          description: page.description,
          isEssential: page.isEssential,
          priority: page.priority
        }));
        
        result = await projectService.generateAdditionalPages(currentProject.id, existingPages);
        
        // Agregar las nuevas páginas a la lista existente
        setGenerationResult({
          ...result,
          generatedPages: [...generationResult.generatedPages, ...result.generatedPages],
          totalPages: generationResult.generatedPages.length + result.totalNewPages,
          totalNewPages: result.totalNewPages,
          existingPagesCount: result.existingPagesCount
        });
      } else {
        // Primera generación, usar la función original
        result = await projectService.generatePages(currentProject.id);
        setGenerationResult(result);
      }
      
      console.log('Páginas generadas exitosamente:', result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar páginas');
      console.error('Error al generar páginas:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeletePage = (pageId: string) => {
    if (generationResult) {
      const updatedPages = generationResult.generatedPages.filter((page: any) => page.id !== pageId);
      setGenerationResult({
        ...generationResult,
        generatedPages: updatedPages,
        totalPages: updatedPages.length
      });
    }
  };

  const handleSaveAllPages = async () => {
    if (!currentProject?.id || !generationResult?.generatedPages) {
      setError('No hay páginas para guardar');
      return;
    }

    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      const pagesToSave = generationResult.generatedPages.map((page: any) => ({
        name: page.name,
        description: page.description,
        route: page.route,
        priority: page.priority,
        isEssential: page.isEssential
      }));

      await projectService.addMultiplePages(currentProject.id, pagesToSave);
      setSaveSuccess(true);
      console.log('Páginas guardadas exitosamente');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar páginas');
      console.error('Error al guardar páginas:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="p-8 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" style={{ backgroundColor: '#101829' }}>
        <h2 className="text-2xl font-bold mb-4 text-white">Generar Estructura Completa</h2>
        
        {!generationResult && (
          <>
            <p className="text-gray-300 mb-6">Genera automáticamente la estructura de páginas y user stories para tu proyecto usando IA.</p>
            
            {currentProject && (
              <div className="mb-4 p-3 bg-gray-800 rounded">
                <p className="text-sm text-gray-400">Proyecto actual:</p>
                <p className="text-white font-semibold">{currentProject.name}</p>
                <p className="text-gray-300 text-sm">{currentProject.description}</p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleGeneratePages}
                disabled={isGenerating || !currentProject}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Generando...
                  </>
                ) : (
                  'Generar Páginas'
                )}
              </button>
              
              <button
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </>
        )}

        {generationResult && (
          <>
            <div className="mb-4 p-3 bg-green-900 border border-green-700 rounded">
              <p className="text-green-300 font-semibold">{generationResult.message}</p>
              {generationResult.existingPagesCount && (
                <p className="text-green-200 text-sm mt-1">
                  Se generaron {generationResult.totalNewPages || generationResult.totalPages} páginas nuevas 
                  {generationResult.existingPagesCount > 0 && `basándose en ${generationResult.existingPagesCount} páginas existentes`}
                </p>
              )}
            </div>

            {saveSuccess && (
              <div className="mb-4 p-3 bg-green-900 border border-green-700 rounded">
                <p className="text-green-300 font-semibold">¡Páginas guardadas exitosamente en el proyecto!</p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Páginas Generadas ({generationResult.totalPages})</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveAllPages}
                    disabled={isSaving || !generationResult.generatedPages?.length}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded flex items-center gap-2 text-sm"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Guardar Todas
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleGeneratePages}
                    disabled={isGenerating}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded flex items-center gap-2 text-sm"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                        Generando...
                      </>
                    ) : (
                      'Generar Más Páginas'
                    )}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {generationResult.generatedPages?.map((page: any) => (
                  <div key={page.id} className="p-3 bg-gray-800 rounded border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-white">{page.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                          Prioridad: {page.priority}
                        </span>
                        <button
                          onClick={() => handleDeletePage(page.id)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded flex items-center gap-1"
                          title="Eliminar página"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-1">{page.description}</p>
                    <p className="text-gray-400 text-xs">Ruta: {page.route}</p>
                    {page.isEssential && (
                      <span className="inline-block mt-1 text-xs bg-yellow-600 text-white px-2 py-1 rounded">
                        Esencial
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {generationResult.metadata && (
              <div className="mb-4 p-3 bg-gray-800 rounded">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Información de Generación</h4>
                <p className="text-xs text-gray-400">Modelo IA: {generationResult.metadata.aiModel}</p>
                <p className="text-xs text-gray-400">Generado: {new Date(generationResult.metadata.generatedAt).toLocaleString()}</p>
                {generationResult.metadata.basedOn?.existingPages && (
                  <p className="text-xs text-gray-400">Basado en: {generationResult.metadata.basedOn.existingPages} páginas existentes</p>
                )}
              </div>
            )}

            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GeneracionCompletaPopup;
