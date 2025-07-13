import React, { useState, useEffect, useRef } from 'react';
import { Plus, RefreshCw, Edit3, BookOpen, ChevronDown, Zap, Sparkles, CheckSquare, Square, Play } from 'lucide-react';
import { gsap } from 'gsap';
import { AppPage, UserStory } from '../../types';
import UserStoryCard from '../UserStoryCard';
import PopupUserStoriesIA from '../PopupUserStoriesIA';
import { projectService } from '../../services/api';
import UserStoriesResultModal from '../UserStoriesResultModal';
import PopupExecutePrompts from '../PopupExecutePrompts';
interface PagesViewProps {
  currentProject: any;
  userStoryColumns: Array<{ id: string; title: string; color: string; }>;
  getUserStoriesByStatus: (pageId: string, status: UserStory['status']) => UserStory[];
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, newStatus: string) => void;
  handleDragStart: (e: React.DragEvent, itemId: string, itemType: 'page' | 'userStory', pageId?: string) => void;
  openUserStoryModal: (pageId: string) => void;
  handleOpenIaGenerateModal: (pageId: string) => void;
  handleEditUserStory: (pageId: string, userStory: UserStory) => void;
  handleDeleteUserStory: (pageId: string, userStoryId: string) => void;
  handleToggleUserStoryComplete: (pageId: string, userStoryId: string, completed: boolean) => void;
  onExecuteCompletedStories?: (pageId: string, selectedStoryIds?: string[]) => void;
  setIsPageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditPage?: (page: AppPage) => void;
  // ✅ Nuevas props para PopupExecutePrompts
  onExecuteAllProjectStories?: () => void;
}

const PageCard = ({
  page,
  children,
  ...props
}: { page: AppPage, children: React.ReactNode } & Omit<PagesViewProps, 'currentProject' | 'getUserStoriesByStatus' | 'setIsPageModalOpen'>) => {
  const [isExpanded, setIsExpanded] = useState(false); // Cambiar de true a false
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(contentRef.current, { height: isExpanded ? 'auto' : 0 }); // Ajustar la altura inicial
    if (isExpanded) {
      gsap.from(contentRef.current, { height: 0, duration: 0.5, ease: 'power3.inOut' });
    }
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    gsap.to(contentRef.current, {
      height: isExpanded ? 0 : 'auto',
      duration: 0.5,
      ease: 'power3.inOut'
    });
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg backdrop-blur-md overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer" onClick={toggleExpand}>
        <div className="flex-1 min-w-0">
          <h4 className="text-lg sm:text-xl font-bold tracking-tight truncate">{page.name}</h4>
          <p className="text-slate-400 text-sm mt-1 line-clamp-2 sm:line-clamp-1">{page.description}</p>
          <p className="text-slate-500 text-xs mt-1 truncate">Route: {page.route}</p>
        </div>
        <div className="flex items-center gap-3 mt-3 sm:mt-0 justify-end">
          <ChevronDown className={`h-6 w-6 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>
      <div ref={contentRef} className="overflow-hidden">
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function PagesView({
  currentProject,
  userStoryColumns,
  getUserStoriesByStatus,
  handleDragOver,
  handleDrop,
  handleDragStart,
  openUserStoryModal,
  handleOpenIaGenerateModal,
  handleEditUserStory,
  handleDeleteUserStory,
  handleToggleUserStoryComplete,
  onExecuteCompletedStories,
  setIsPageModalOpen,
  handleEditPage,
  onExecuteAllProjectStories
}: PagesViewProps) {
  const [completedStories, setCompletedStories] = useState<Set<string>>(new Set());
  const [isGeneratingProjectStories, setIsGeneratingProjectStories] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPageForPopup, setSelectedPageForPopup] = useState<{ id: string; name: string } | null>(null);
  
  // Nuevos estados para el modal de resultados
  const [showResultModal, setShowResultModal] = useState(false);
  const [generatedStoriesResult, setGeneratedStoriesResult] = useState<any>(null);
  
  // ✅ Estados para PopupExecutePrompts global
  const [isExecutePromptsOpen, setIsExecutePromptsOpen] = useState(false);
  const [allProjectUserStories, setAllProjectUserStories] = useState<UserStory[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [currentProject]);

    // ✅ Función para abrir PopupExecutePrompts con todas las user stories
  // ✅ Función modificada para ejecutar solo las user stories marcadas
  const handleExecuteAllProjectStories = () => {
    if (!currentProject?.pages) return;
    
    // Recopilar solo las user stories marcadas de todas las páginas
    const markedStories: UserStory[] = []; // ✅ Cambiar nombre para evitar conflicto
    currentProject.pages.forEach((page: AppPage) => {
      if (page.userStories && page.userStories.length > 0) {
        // Filtrar solo las historias marcadas como completadas
        const completedInPage = page.userStories.filter((story: UserStory) => 
          completedStories.has(story.id) // ✅ Usar el Set del estado, no el array local
        );
        
        if (completedInPage.length > 0) {
          // Agregar contexto de página a cada user story marcada
          const storiesWithContext = completedInPage.map((story: UserStory) => ({
            ...story,
            pageContext: page.name // Agregar el nombre de la página como contexto
          }));
          markedStories.push(...storiesWithContext); // ✅ Usar el nuevo nombre
        }
      }
    });
    
    if (markedStories.length === 0) { // ✅ Usar el nuevo nombre
      alert('No hay user stories marcadas en el proyecto para ejecutar.');
      return;
    }
    
    setAllProjectUserStories(markedStories); // ✅ Usar el nuevo nombre
    setIsExecutePromptsOpen(true);
    
    console.log(`Abriendo popup de ejecución global con ${markedStories.length} user stories marcadas de ${currentProject.pages.length} páginas`); // ✅ Usar el nuevo nombre
  };
  
  // ✅ Función para cerrar PopupExecutePrompts
  const handleCloseExecutePrompts = () => {
    setIsExecutePromptsOpen(false);
    setAllProjectUserStories([]);
  };
  
  // ✅ Función para ejecutar una user story específica
  const handleExecuteStory = (storyId: string) => {
    console.log(`Ejecutando user story: ${storyId}`);
    // Aquí puedes agregar la lógica para ejecutar una historia específica
  };
  
  // ✅ Función para ejecutar todas las user stories
  const handleExecuteAllStories = () => {
    console.log(`Ejecutando todas las ${allProjectUserStories.length} user stories del proyecto`);
    // Aquí puedes agregar la lógica para ejecutar todas las historias
    if (onExecuteAllProjectStories) {
      onExecuteAllProjectStories();
    }
  };

  const handleToggleComplete = (pageId: string, userStoryId: string, completed: boolean) => {
    setCompletedStories(prev => {
      const newSet = new Set(prev);
      if (completed) newSet.add(userStoryId);
      else newSet.delete(userStoryId);
      return newSet;
    });
    if (handleToggleUserStoryComplete) {
      handleToggleUserStoryComplete(pageId, userStoryId, completed);
    }
  };

  // ✅ Mover esta función DENTRO del componente
  const handleToggleAllStories = (pageId: string) => {
    const page = currentProject.pages.find((p: AppPage) => p.id === pageId);
    if (!page || !page.userStories) return;
    
    const pageStoryIds = page.userStories.map((story: UserStory) => story.id);
    const allCompleted = pageStoryIds.every(id => completedStories.has(id));
    
    setCompletedStories(prev => {
      const newSet = new Set(prev);
      if (allCompleted) {
        // Si todas están marcadas, desmarcar todas
        pageStoryIds.forEach(id => newSet.delete(id));
      } else {
        // Si no todas están marcadas, marcar todas
        pageStoryIds.forEach(id => newSet.add(id));
      }
      return newSet;
    });
    
    // Actualizar el estado de cada historia individualmente
    if (handleToggleUserStoryComplete) {
      pageStoryIds.forEach(storyId => {
        handleToggleUserStoryComplete(pageId, storyId, !allCompleted);
      });
    }
  };

  const executeCompletedStories = (pageId: string) => {
    const page = currentProject.pages.find((p: AppPage) => p.id === pageId);
    if (!page) return;
    const completedInPage = (page.userStories || []).filter((s: UserStory) => completedStories.has(s.id));
    if (completedInPage.length === 0) {
      alert('No completed stories on this page.');
      return;
    }
    if (window.confirm(`Execute ${completedInPage.length} completed story(s)?`) && onExecuteCompletedStories) {
      onExecuteCompletedStories(pageId, completedInPage.map(story => story.id));
      alert(`Executed ${completedInPage.length} story(s).`);
    }
  };

  const handleGenerateProjectStories = async () => {
    if (!currentProject?.id) return;
    
    if (!window.confirm('¿Generar 6 historias de usuario para cada página del proyecto? Esto puede tomar unos minutos.')) {
      return;
    }

    setIsGeneratingProjectStories(true);
    try {
      const response = await projectService.generateUserStoriesForProject(currentProject.id);
      
      if (response.success || response.message) {
        alert(`✅ ${response.message || 'Historias de usuario generadas exitosamente'}`);
        // Recargar la página para mostrar las nuevas historias
        window.location.reload();
      } else {
        throw new Error('Respuesta inesperada del servidor');
      }
    } catch (error) {
      console.error('Error generando historias de usuario:', error);
      alert(`❌ Error al generar historias de usuario: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsGeneratingProjectStories(false);
    }
  };

  const handleOpenPopupUserStoriesIA = (pageId: string, pageName: string) => {
    setSelectedPageForPopup({ id: pageId, name: pageName });
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPageForPopup(null);
  };

  const handleGenerateUserStoriesIA = async (pageId: string, options: any) => {
    try {
      // Llamar al nuevo servicio personalizado
      const response = await projectService.generateUserStoriesPersonal(
        currentProject.id, 
        pageId, 
        options
      );
      
      if (response.success || response.message) {
        // En lugar de mostrar alert, mostrar el modal con los resultados
        setGeneratedStoriesResult({
          userStories: response.generatedUserStories || [],
          pageName: response.page?.name || selectedPageForPopup?.name || 'Página',
          totalStories: response.totalUserStories || 0,
          metadata: response.metadata,
          pageId: pageId // ✅ Agregar el pageId aquí
        });
        setShowResultModal(true);
        
        // Cerrar el popup de configuración
        setIsPopupOpen(false);
        setSelectedPageForPopup(null);
      } else {
        throw new Error('Respuesta inesperada del servidor');
      }
    } catch (error) {
      console.error('Error generating user stories:', error);
      alert(`❌ Error al generar historias de usuario: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    setGeneratedStoriesResult(null);
    // Opcional: recargar solo cuando el usuario cierre el modal
    // window.location.reload();
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 pb-8 text-white font-sans px-4 sm:px-0" ref={containerRef}>
        {/* ✅ Nuevo botón global para ejecutar todas las user stories */}
        {currentProject.pages.length > 0 && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg backdrop-blur-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Ejecutar User Stories Marcadas</h3>
                <p className="text-slate-400 text-sm">Ejecuta solo las user stories marcadas como completadas del proyecto en un solo popup con prompts generados automáticamente</p>
              </div>
              <button
                onClick={handleExecuteAllProjectStories}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200 text-white font-medium text-sm whitespace-nowrap"
              >
                <Play className="h-4 w-4" />
                <span>Ejecutar User Stories Marcadas</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Botón para generar historias de usuario para todo el proyecto */}
        {currentProject.pages.length > 0 && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg backdrop-blur-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Generar Historias de Usuario</h3>
                <p className="text-slate-400 text-sm">Genera automáticamente 6 historias de usuario para cada página del proyecto usando IA</p>
              </div>
              <button
                onClick={handleGenerateProjectStories}
                disabled={isGeneratingProjectStories}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg transition-all duration-200 text-white font-medium text-sm whitespace-nowrap"
              >
                {isGeneratingProjectStories ? (
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
        )}
        
        {currentProject.pages.map((page: AppPage) => (
          <PageCard key={page.id} page={page} {...{ openUserStoryModal, handleOpenIaGenerateModal, handleEditPage, onExecuteCompletedStories, handleDragOver, handleDrop, handleDragStart, handleEditUserStory, handleDeleteUserStory, handleToggleUserStoryComplete, setIsPageModalOpen }}>
            <div className="flex flex-wrap justify-start gap-2 mb-4">
              <button onClick={() => openUserStoryModal(page.id)} className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-indigo-600/50 border border-indigo-500 rounded-md hover:bg-indigo-600/70 text-xs whitespace-nowrap">
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">New Story</span>
                <span className="sm:hidden">New</span>
              </button>
              
              {/* Nuevo botón para marcar/desmarcar todas las user stories */}
              {(page.userStories?.length || 0) > 0 && (
                <button 
                  onClick={() => handleToggleAllStories(page.id)} 
                  className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-orange-600/50 border border-orange-500 rounded-md hover:bg-orange-600/70 text-xs whitespace-nowrap"
                  title={`${page.userStories?.every((story: UserStory) => completedStories.has(story.id)) ? 'Desmarcar' : 'Marcar'} todas las historias`}
                >
                  {page.userStories?.every((story: UserStory) => completedStories.has(story.id)) ? (
                    <Square className="h-3.5 w-3.5" />
                  ) : (
                    <CheckSquare className="h-3.5 w-3.5" />
                  )}
                  <span className="hidden sm:inline">
                    {page.userStories?.every((story: UserStory) => completedStories.has(story.id)) ? 'Desmarcar Todas' : 'Marcar Todas'}
                  </span>
                  <span className="sm:hidden">
                    {page.userStories?.every((story: UserStory) => completedStories.has(story.id)) ? 'Desmarcar' : 'Marcar'}
                  </span>
                </button>
              )}
              
              {/* Nuevo botón para conjunto de user stories */}
              <button 
                onClick={() => handleOpenPopupUserStoriesIA(page.id, page.name)} 
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-gradient-to-r from-pink-600/50 to-purple-600/50 border border-pink-500 rounded-md hover:from-pink-600/70 hover:to-purple-600/70 text-xs whitespace-nowrap" 
                title="Nuevo conjunto de user stories con IA"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Nuevo Conjunto</span>
                <span className="sm:hidden">Conjunto</span>
              </button>
              
              {currentProject.githubUrl && (
                <button onClick={() => handleOpenIaGenerateModal(page.id)} className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-blue-600/50 border border-blue-500 rounded-md hover:bg-blue-600/70 text-xs whitespace-nowrap" title="Generate stories with AI">
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Generate with AI</span>
                  <span className="sm:hidden">AI</span>
                </button>
              )}
              {handleEditPage && (
                <button onClick={() => handleEditPage(page)} className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-purple-600/50 border border-purple-500 rounded-md hover:bg-purple-600/70 text-xs whitespace-nowrap" title="Edit page">
                  <Edit3 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Edit Page</span>
                  <span className="sm:hidden">Edit</span>
                </button>
              )}
              <button onClick={() => executeCompletedStories(page.id)} className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-green-600/50 border border-green-500 rounded-md hover:bg-green-600/70 text-xs whitespace-nowrap" title="Execute completed">
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Execute</span>
                <span className="sm:hidden">Exec</span>
              </button>
            </div>
            {(page.userStories?.length || 0) === 0 && <p className="text-sm text-slate-400 mb-4">No user stories for this page.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {userStoryColumns.map((column) => {
                const columnStories = getUserStoriesByStatus(page.id, column.id as UserStory['status']);
                return (
                  <div key={column.id} className="bg-slate-800/50 border border-slate-700 rounded-xl min-h-[300px] sm:min-h-[400px]">
                    <div className="p-3 border-b border-slate-700 bg-slate-900/50 rounded-t-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm truncate">{column.title}</h4>
                        <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full flex-shrink-0">{columnStories.length}</span>
                      </div>
                    </div>
                    <div className="p-3 space-y-3 min-h-[250px] sm:min-h-[300px]" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, column.id)}>
                      {columnStories.map((userStory) => (
                        <div key={userStory.id} draggable onDragStart={(e) => handleDragStart(e, userStory.id, 'userStory', page.id)} className="cursor-grab active:cursor-grabbing">
                          <UserStoryCard 
                            userStory={userStory} 
                            onEdit={(story) => handleEditUserStory(page.id, story)}
                            onDelete={(storyId) => handleDeleteUserStory(page.id, storyId)}
                            onToggleComplete={(storyId, completed) => handleToggleComplete(page.id, storyId, completed)}
                            isCompleted={completedStories.has(userStory.id)}
                          />
                        </div>
                      ))}
                      {columnStories.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center py-8 text-slate-500">
                          <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-3 opacity-40" />
                          <p className="text-xs font-medium">Drag stories here</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </PageCard>
        ))}
        {currentProject.pages.length === 0 && (
          <div className="text-center py-12 sm:py-20 bg-slate-900/50 border border-slate-800 rounded-2xl mx-4 sm:mx-0">
            <BookOpen className="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-slate-600 mb-6" />
            <h3 className="text-xl sm:text-2xl font-bold mb-3">No Pages Yet</h3>
            <p className="text-slate-400 mb-6 sm:mb-8 px-4">Create a page to start organizing your stories.</p>
            <button onClick={() => setIsPageModalOpen(true)} className="bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-500 transition-colors text-sm sm:text-base">
              Create First Page
            </button>
          </div>
        )}
      </div>
      
      {/* Popup para generar conjunto de user stories */}
      {selectedPageForPopup && (
        <PopupUserStoriesIA
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          pageId={selectedPageForPopup.id}
          pageName={selectedPageForPopup.name}
          onGenerate={handleGenerateUserStoriesIA}
        />
      )}
      
      {/* Modal para mostrar resultados */}
      {showResultModal && generatedStoriesResult && (
        <UserStoriesResultModal
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          userStories={generatedStoriesResult.userStories}
          pageName={generatedStoriesResult.pageName}
          totalStories={generatedStoriesResult.totalStories}
          metadata={generatedStoriesResult.metadata}
          projectId={currentProject.id}
          pageId={generatedStoriesResult.pageId}
        />
      )}
      
      {/* ✅ PopupExecutePrompts global */}
      <PopupExecutePrompts
        isOpen={isExecutePromptsOpen}
        onClose={handleCloseExecutePrompts}
        page={{
          id: 'all-project',
          title: `Proyecto: ${currentProject.name}`,
          name: `Proyecto: ${currentProject.name}`,
          description: `Todas las user stories del proyecto ${currentProject.name}`,
          route: '/project'
        } as AppPage}
        userStories={allProjectUserStories}
        selectedUserStoryIds={[]} // Sin selección específica, mostrar todas
        onExecuteStory={handleExecuteStory}
        onExecuteAll={handleExecuteAllStories}
      />
    </>
  );
}

// ❌ ELIMINAR esta función que está fuera del componente
// const handleToggleAllStories = (pageId: string) => {
//   ...
// };