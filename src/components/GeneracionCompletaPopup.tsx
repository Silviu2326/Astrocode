import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { projectService } from '../services/api';
import ERSchemaFlow from './ERSchemaFlow';

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
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editingPage, setEditingPage] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'pages' | 'entities' | 'controllers'>('pages');

  // Console log para ver el proyecto actual
  console.log('🔍 GeneracionCompletaPopup - currentProject:', currentProject);
  console.log('🔍 GeneracionCompletaPopup - generationResult:', generationResult);

  const handleGeneratePages = async () => {
    console.log('🚀 handleGeneratePages - Iniciando generación');
    console.log('🚀 currentProject?.id:', currentProject?.id);
    
    if (!currentProject?.id) {
      console.log('❌ No hay proyecto seleccionado');
      setError('No hay un proyecto seleccionado');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      let result;
      
      console.log('🔍 Verificando si hay páginas existentes:', generationResult?.generatedPages?.length);
      
      if (generationResult && generationResult.generatedPages && generationResult.generatedPages.length > 0) {
        console.log('📄 Generando páginas adicionales...');
        // Si ya hay páginas generadas, usar la función de páginas adicionales
        const existingPages = generationResult.generatedPages.map((page: any) => ({
          name: page.name,
          route: page.route,
          description: page.description,
          isEssential: page.isEssential,
          priority: page.priority
        }));
        
        console.log('📄 existingPages:', existingPages);
        
        result = await projectService.generateAdditionalPages(currentProject.id, existingPages);
        
        console.log('✅ Resultado de páginas adicionales:', result);
        
        // Agregar las nuevas páginas a la lista existente
        const newGenerationResult = {
          ...result,
          generatedPages: [...generationResult.generatedPages, ...result.generatedPages],
          totalPages: generationResult.generatedPages.length + result.totalNewPages,
          totalNewPages: result.totalNewPages,
          existingPagesCount: result.existingPagesCount,
          // Mantener el esquema ER existente si no se genera uno nuevo
          erSchema: result.erSchema || generationResult.erSchema,
          // Mantener controladores existentes
          controllers: result.controllers || generationResult.controllers,
          // Mantener user stories existentes
          userStories: result.userStories || generationResult.userStories
        };
        
        console.log('🔄 Nuevo generationResult combinado:', newGenerationResult);
        setGenerationResult(newGenerationResult);
      } else {
        console.log('🆕 Primera generación de páginas...');
        // Primera generación, usar la función original
        result = await projectService.generatePages(currentProject.id);
        console.log('✅ Resultado de primera generación:', result);
        setGenerationResult(result);
      }
      
      console.log('🎉 Páginas, esquema ER, controladores y user stories generados exitosamente:', result);
    } catch (err) {
      console.error('💥 Error al generar páginas:', err);
      setError(err instanceof Error ? err.message : 'Error al generar páginas');
    } finally {
      setIsGenerating(false);
      console.log('🏁 Generación finalizada');
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

  const handleEditPage = (page: any) => {
    setEditingPageId(page.id);
    setEditingPage({ ...page });
  };

  const handleSaveEdit = () => {
    if (generationResult && editingPage) {
      const updatedPages = generationResult.generatedPages.map((page: any) =>
        page.id === editingPage.id ? editingPage : page
      );
      setGenerationResult({
        ...generationResult,
        generatedPages: updatedPages
      });
      setEditingPageId(null);
      setEditingPage(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingPageId(null);
    setEditingPage(null);
  };

  const handleEditFieldChange = (field: string, value: any) => {
    if (editingPage) {
      setEditingPage({
        ...editingPage,
        [field]: value
      });
    }
  };

  const getRelationshipTypeLabel = (type: string) => {
    switch (type) {
      case 'oneToOne': return 'Uno a Uno';
      case 'oneToMany': return 'Uno a Muchos';
      case 'manyToMany': return 'Muchos a Muchos';
      default: return type;
    }
  };

  const getFieldTypeColor = (type: string) => {
    switch (type) {
      case 'string': return 'bg-blue-600';
      case 'number': return 'bg-green-600';
      case 'boolean': return 'bg-purple-600';
      case 'date': return 'bg-orange-600';
      case 'reference': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="p-8 rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#101829' }}>
        <h2 className="text-2xl font-bold mb-4 text-white">Generar Estructura Completa</h2>
        
        {!generationResult && (
          <>
            <p className="text-gray-300 mb-6">Genera automáticamente la estructura de páginas, esquema entidad-relación, controladores con funciones básicas y user stories para tu proyecto usando IA.</p>
            
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
                  'Generar Estructura Completa'
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
              <div className="text-green-200 text-sm mt-1 space-y-1">
                <p>✅ {generationResult.totalPages} páginas generadas</p>
                {generationResult.erSchema && (
                  <>
                    <p>✅ {generationResult.totalEntities || generationResult.erSchema.entities?.length || 0} entidades generadas</p>
                    <p>✅ {generationResult.totalRelationships || generationResult.erSchema.relationships?.length || 0} relaciones definidas</p>
                  </>
                )}
                {generationResult.controllers && (
                  <p>✅ {generationResult.controllers.length} controladores generados</p>
                )}
                {generationResult.userStories && (
                  <p>✅ {Object.keys(generationResult.userStories).length} páginas con user stories generadas</p>
                )}
              </div>
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

            {/* Tabs */}
            <div className="mb-4">
              <div className="flex border-b border-gray-700">
                <button
                  onClick={() => setActiveTab('pages')}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'pages'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Páginas ({generationResult.totalPages})
                </button>
                {generationResult.erSchema && (
                  <button
                    onClick={() => setActiveTab('entities')}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === 'entities'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Esquema ER ({generationResult.erSchema.entities?.length || 0} entidades)
                  </button>
                )}
                {generationResult.controllers && (
                  <button
                    onClick={() => setActiveTab('controllers')}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === 'controllers'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Controladores ({generationResult.controllers.length})
                  </button>
                )}
              </div>
            </div>

            {/* Contenido de las tabs */}
            {activeTab === 'pages' && (
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
                      {editingPageId === page.id ? (
                        // Modo edición
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Nombre:</label>
                            <input
                              type="text"
                              value={editingPage?.name || ''}
                              onChange={(e) => handleEditFieldChange('name', e.target.value)}
                              className="w-full px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Descripción:</label>
                            <textarea
                              value={editingPage?.description || ''}
                              onChange={(e) => handleEditFieldChange('description', e.target.value)}
                              rows={2}
                              className="w-full px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                            />
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-1">
                              <label className="block text-xs text-gray-400 mb-1">Ruta:</label>
                              <input
                                type="text"
                                value={editingPage?.route || ''}
                                onChange={(e) => handleEditFieldChange('route', e.target.value)}
                                className="w-full px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                            <div className="w-20">
                              <label className="block text-xs text-gray-400 mb-1">Prioridad:</label>
                              <select
                                value={editingPage?.priority || 'Media'}
                                onChange={(e) => handleEditFieldChange('priority', e.target.value)}
                                className="w-full px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                              >
                                <option value="Alta">Alta</option>
                                <option value="Media">Media</option>
                                <option value="Baja">Baja</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`essential-${page.id}`}
                              checked={editingPage?.isEssential || false}
                              onChange={(e) => handleEditFieldChange('isEssential', e.target.checked)}
                              className="w-4 h-4 text-yellow-600 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                            />
                            <label htmlFor={`essential-${page.id}`} className="text-xs text-gray-400">
                              Página esencial
                            </label>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={handleSaveEdit}
                              className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Guardar
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Modo visualización
                        <>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-white">{page.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                                Prioridad: {page.priority}
                              </span>
                              <button
                                onClick={() => handleEditPage(page)}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded flex items-center gap-1"
                                title="Editar página"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Editar
                              </button>
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
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab de Esquema ER */}
            {activeTab === 'entities' && generationResult.erSchema && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Esquema Entidad-Relación ({generationResult.erSchema.entities?.length || 0} entidades)
                </h3>
                
                {/* Vista de diagrama React Flow */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Diagrama Entidad-Relación
                  </h4>
                  <ERSchemaFlow 
                    erSchema={generationResult.erSchema} 
                    className="border border-gray-600 rounded-lg"
                  />
                </div>
                
                {/* Vista detallada existente */}
                {/* Entidades */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Entidades
                  </h4>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {generationResult.erSchema.entities?.map((entity: any) => (
                      <div key={entity.id} className="p-4 bg-gray-800 rounded border-l-4 border-green-500">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-white text-lg">{entity.name}</h5>
                          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                            {entity.fields?.length || 0} campos
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{entity.description}</p>
                        
                        {/* Campos */}
                        <div className="mb-3">
                          <h6 className="text-xs font-semibold text-gray-400 mb-2">CAMPOS:</h6>
                          <div className="grid grid-cols-1 gap-2">
                            {entity.fields?.map((field: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-mono text-sm">{field.name}</span>
                                  <span className={`text-xs px-2 py-1 rounded text-white ${getFieldTypeColor(field.type)}`}>
                                    {field.type}
                                  </span>
                                  {field.required && (
                                    <span className="text-xs bg-red-600 text-white px-1 py-0.5 rounded">
                                      *
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-400 text-xs max-w-xs truncate" title={field.description}>
                                  {field.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Páginas relacionadas */}
                        {entity.relatedPages && entity.relatedPages.length > 0 && (
                          <div>
                            <h6 className="text-xs font-semibold text-gray-400 mb-2">PÁGINAS RELACIONADAS:</h6>
                            <div className="flex flex-wrap gap-1">
                              {entity.relatedPages.map((pageName: string, idx: number) => (
                                <span key={idx} className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                                  {pageName}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Relaciones */}
                {generationResult.erSchema.relationships && generationResult.erSchema.relationships.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-md font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Relaciones ({generationResult.erSchema.relationships.length})
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {generationResult.erSchema.relationships.map((relationship: any) => (
                        <div key={relationship.id} className="p-3 bg-gray-800 rounded border-l-4 border-purple-500">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-semibold">{relationship.from}</span>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                              <span className="text-white font-semibold">{relationship.to}</span>
                            </div>
                            <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                              {getRelationshipTypeLabel(relationship.type)}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">{relationship.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

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

            {/* Tab de Controladores */}
            {activeTab === 'controllers' && generationResult.controllers && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Controladores Generados ({generationResult.controllers.length})
                </h3>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {generationResult.controllers.map((controller: any) => (
                    <div key={controller.id} className="p-4 bg-gray-800 rounded border-l-4 border-orange-500">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-white text-lg">{controller.controllerName}</h4>
                          <p className="text-gray-400 text-sm">Entidad: {controller.entityName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-orange-600 text-white px-2 py-1 rounded">
                            {controller.functions?.length || 0} funciones
                          </span>
                          {controller.generatedByAI && (
                            <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                              IA
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4">{controller.description}</p>
                      
                      {/* Funciones del controlador */}
                      {controller.functions && controller.functions.length > 0 && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            FUNCIONES:
                          </h5>
                          <div className="space-y-2">
                            {controller.functions.map((func: any) => (
                              <div key={func.id} className="p-3 bg-gray-700 rounded">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-white font-mono text-sm font-semibold">{func.name}</span>
                                    <span className={`text-xs px-2 py-1 rounded text-white ${
                                      func.method === 'GET' ? 'bg-green-600' :
                                      func.method === 'POST' ? 'bg-blue-600' :
                                      func.method === 'PUT' ? 'bg-yellow-600' :
                                      func.method === 'DELETE' ? 'bg-red-600' :
                                      'bg-gray-600'
                                    }`}>
                                      {func.method}
                                    </span>
                                  </div>
                                  {func.returnType && (
                                    <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded">
                                      {func.returnType}
                                    </span>
                                  )}
                                </div>
                                
                                <p className="text-gray-300 text-sm mb-2">{func.description}</p>
                                
                                <div className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-400">Ruta:</span>
                                    <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">{func.route}</code>
                                  </div>
                                  
                                  {func.parameters && func.parameters.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      <span className="text-gray-400">Parámetros:</span>
                                      <div className="flex gap-1">
                                        {func.parameters.map((param: string, idx: number) => (
                                          <span key={idx} className="bg-blue-700 text-blue-200 px-1 py-0.5 rounded text-xs">
                                            {param}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Información adicional */}
                      {controller.createdAt && (
                        <div className="mt-3 pt-3 border-t border-gray-600">
                          <p className="text-xs text-gray-400">
                            Generado: {new Date(controller.createdAt).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab de Esquema ER */}
            {activeTab === 'entities' && generationResult.erSchema && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Esquema Entidad-Relación ({generationResult.erSchema.entities?.length || 0} entidades)
                </h3>
                
                {/* Vista de diagrama React Flow */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Diagrama Entidad-Relación
                  </h4>
                  <ERSchemaFlow 
                    erSchema={generationResult.erSchema} 
                    className="border border-gray-600 rounded-lg"
                  />
                </div>
                
                {/* Vista detallada existente */}
                {/* Entidades */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Entidades
                  </h4>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {generationResult.erSchema.entities?.map((entity: any) => (
                      <div key={entity.id} className="p-4 bg-gray-800 rounded border-l-4 border-green-500">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-white text-lg">{entity.name}</h5>
                          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                            {entity.fields?.length || 0} campos
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{entity.description}</p>
                        
                        {/* Campos */}
                        <div className="mb-3">
                          <h6 className="text-xs font-semibold text-gray-400 mb-2">CAMPOS:</h6>
                          <div className="grid grid-cols-1 gap-2">
                            {entity.fields?.map((field: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-mono text-sm">{field.name}</span>
                                  <span className={`text-xs px-2 py-1 rounded text-white ${getFieldTypeColor(field.type)}`}>
                                    {field.type}
                                  </span>
                                  {field.required && (
                                    <span className="text-xs bg-red-600 text-white px-1 py-0.5 rounded">
                                      *
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-400 text-xs max-w-xs truncate" title={field.description}>
                                  {field.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Páginas relacionadas */}
                        {entity.relatedPages && entity.relatedPages.length > 0 && (
                          <div>
                            <h6 className="text-xs font-semibold text-gray-400 mb-2">PÁGINAS RELACIONADAS:</h6>
                            <div className="flex flex-wrap gap-1">
                              {entity.relatedPages.map((pageName: string, idx: number) => (
                                <span key={idx} className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                                  {pageName}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Relaciones */}
                {generationResult.erSchema.relationships && generationResult.erSchema.relationships.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-md font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Relaciones ({generationResult.erSchema.relationships.length})
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {generationResult.erSchema.relationships.map((relationship: any) => (
                        <div key={relationship.id} className="p-3 bg-gray-800 rounded border-l-4 border-purple-500">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-semibold">{relationship.from}</span>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                              <span className="text-white font-semibold">{relationship.to}</span>
                            </div>
                            <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                              {getRelationshipTypeLabel(relationship.type)}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">{relationship.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

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