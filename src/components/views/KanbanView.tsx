import React, { useState, useEffect, useRef } from 'react';
import { Plus, AlertTriangle, RefreshCw, Edit3, BookOpen, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { AppPage, UserStory } from '../../types';
import UserStoryCard from '../UserStoryCard';

interface KanbanViewProps {
  currentProject: any;
  userStoryColumns: Array<{
    id: string;
    title: string;
    color: string;
  }>;
  getUserStoriesByStatus: (pageId: string, status: UserStory['status']) => UserStory[];
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, newStatus: string) => void;
  handleDragStart: (e: React.DragEvent, itemId: string, itemType: 'page' | 'userStory', pageId?: string) => void;
  openUserStoryModal: (pageId: string) => void;
  handleOpenIaGenerateModal: (pageId: string) => void;
  handleOpenEditPageDescriptionModal: (page: AppPage) => void;
  handleEditUserStory: (pageId: string, userStory: UserStory) => void;
  handleDeleteUserStory: (pageId: string, userStoryId: string) => void;
  handleToggleUserStoryComplete: (pageId: string, userStoryId: string, completed: boolean) => void;
  setIsPageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Helper function to get all user stories by status across all pages
const getAllUserStoriesByStatus = (project: any, status: UserStory['status']): UserStory[] => {
  return project.pages.flatMap((page: AppPage) => 
    (page.userStories || []).filter((story: UserStory) => story.status === status)
  );
};

// Helper function to find the page ID for a user story
const findPageIdForUserStory = (project: any, userStoryId: string): string | null => {
  for (const page of project.pages) {
    if (page.userStories?.some((story: UserStory) => story.id === userStoryId)) {
      return page.id;
    }
  }
  return null;
};

export default function KanbanView({
  currentProject,
  userStoryColumns,
  getUserStoriesByStatus,
  handleDragOver,
  handleDrop,
  handleDragStart,
  openUserStoryModal,
  handleOpenIaGenerateModal,
  handleOpenEditPageDescriptionModal,
  handleEditUserStory,
  handleDeleteUserStory,
  handleToggleUserStoryComplete,
  setIsPageModalOpen
}: KanbanViewProps) {
  const [completedStories, setCompletedStories] = useState<Set<string>>(new Set());
  const [isExpanded, setIsExpanded] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const kanbanBoardRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);

  // GSAP Animations
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { y: -50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (kanbanBoardRef.current && columnsRef.current.length > 0) {
      gsap.fromTo(columnsRef.current, 
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, [currentProject]);

  useEffect(() => {
    if (kanbanBoardRef.current) {
      gsap.to(kanbanBoardRef.current, {
        height: isExpanded ? 'auto' : 0,
        opacity: isExpanded ? 1 : 0,
        duration: 0.5,
        ease: 'power3.inOut'
      });
    }
  }, [isExpanded]);

  const handleToggleComplete = (pageId: string, userStoryId: string, completed: boolean) => {
    setCompletedStories(prev => {
      const newSet = new Set(prev);
      if (completed) {
        newSet.add(userStoryId);
      } else {
        newSet.delete(userStoryId);
      }
      return newSet;
    });
    
    if (handleToggleUserStoryComplete) {
      handleToggleUserStoryComplete(pageId, userStoryId, completed);
    }
  };

  // Get all user stories across all pages
  const allUserStories = currentProject.pages.flatMap((page: AppPage) => page.userStories || []);
  const totalStories = allUserStories.length;

  return (
    <div className="pb-8 text-white font-sans" ref={containerRef}>
      {/* Modern Header with Glassmorphism */}
      <div 
        ref={headerRef}
        className="bg-gradient-to-br from-gray-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl mb-8 p-8 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/20 to-orange-500/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl border border-indigo-400/30">
                <Sparkles className="h-8 w-8 text-indigo-300" />
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Kanban Board
                </h3>
                <p className="text-slate-400 text-sm mt-1 flex items-center space-x-2">
                  <span>Gestiona todas las historias de usuario</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs font-medium border border-slate-600">
                    {totalStories} historias
                  </span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="group p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronDown className={`h-6 w-6 text-slate-400 transition-transform duration-300 group-hover:text-white ${
                  isExpanded ? 'rotate-180' : ''
                }`} />
              </button>
              
              {currentProject.pages.length > 0 && (
                <>
                  <button
                    onClick={() => openUserStoryModal(currentProject.pages[0].id)}
                    className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 border border-indigo-500/50 rounded-2xl hover:from-indigo-500/90 hover:to-purple-500/90 transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
                  >
                    <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
                    <span className="font-semibold">Nueva Historia</span>
                  </button>
                  
                  {currentProject.githubUrl && (
                    <button
                      onClick={() => handleOpenIaGenerateModal(currentProject.pages[0].id)}
                      className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 border border-blue-500/50 rounded-2xl hover:from-blue-500/90 hover:to-cyan-500/90 transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
                      title="Generar historias con IA"
                    >
                      <RefreshCw className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
                      <span className="font-semibold">Generar con IA</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board with Enhanced Animations */}
      <div ref={kanbanBoardRef} className="overflow-hidden">
        {totalStories > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {userStoryColumns.map((column, index) => {
              const columnStories = getAllUserStoriesByStatus(currentProject, column.id as UserStory['status']);
              
              return (
                <div 
                  key={column.id}
                  ref={el => columnsRef.current[index] = el!}
                  className="group relative"
                >
                  {/* Column Container with Modern Design */}
                  <div className="bg-gradient-to-br from-slate-900/60 to-gray-900/60 backdrop-blur-xl border border-slate-800/50 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                    {/* Column Header */}
                    <div className="p-6 border-b border-slate-800/50 bg-gradient-to-r from-slate-900/80 to-gray-900/80 backdrop-blur-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xl tracking-wide text-white">{column.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="bg-gradient-to-r from-slate-700/80 to-slate-600/80 text-slate-200 text-sm font-bold px-4 py-2 rounded-full border border-slate-600/50 backdrop-blur-sm">
                            {columnStories.length}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Column Content */}
                    <div 
                      className="p-6 space-y-4 min-h-[600px] relative"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, column.id)}
                    >
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tr from-pink-500 to-orange-500 rounded-full blur-lg"></div>
                      </div>
                      
                      {columnStories.map((userStory, storyIndex) => {
                        const pageId = findPageIdForUserStory(currentProject, userStory.id);
                        
                        return (
                          <div
                            key={userStory.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, userStory.id, 'userStory', pageId || '')}
                            className="cursor-grab active:cursor-grabbing transform hover:scale-105 transition-all duration-300 relative z-10"
                            style={{
                              animation: `fadeInUp 0.5s ${storyIndex * 0.1}s ease-out forwards`,
                              opacity: 0
                            }}
                          >
                            <UserStoryCard 
                              userStory={userStory} 
                              onEdit={(story) => handleEditUserStory(pageId || '', story)}
                              onDelete={(storyId) => handleDeleteUserStory(pageId || '', storyId)}
                              onToggleComplete={(storyId, completed) => handleToggleComplete(pageId || '', storyId, completed)}
                              isCompleted={completedStories.has(userStory.id)}
                              showPageInfo={true}
                              pageTitle={currentProject.pages.find((p: AppPage) => p.id === pageId)?.title || 'Página desconocida'}
                            />
                          </div>
                        );
                      })}
                      
                      {columnStories.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center py-16 text-slate-500 relative z-10">
                          <div className="p-6 bg-gradient-to-br from-slate-800/30 to-gray-800/30 rounded-3xl border border-slate-700/30 backdrop-blur-sm">
                            <BookOpen className="h-20 w-20 mx-auto mb-6 opacity-40" />
                            <p className="font-medium text-lg mb-2">Arrastra historias aquí</p>
                            <p className="text-sm text-slate-600">o crea una nueva historia</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-gradient-to-br from-slate-900/50 to-gray-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl"></div>
              <div className="relative z-10 p-8">
                <BookOpen className="h-24 w-24 mx-auto text-slate-600 mb-8" />
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  No hay historias de usuario
                </h3>
                <p className="text-slate-400 mb-10 max-w-md mx-auto text-lg">
                  {currentProject.pages.length === 0 
                    ? 'Comienza creando tu primera página para organizar las historias de usuario'
                    : 'Comienza creando historias de usuario para gestionar las tareas del proyecto'
                  }
                </p>
                
                {currentProject.pages.length === 0 ? (
                  <button
                    onClick={() => setIsPageModalOpen(true)}
                    className="group flex items-center space-x-3 mx-auto bg-gradient-to-r from-blue-600/80 to-cyan-600/80 px-8 py-4 rounded-2xl hover:from-blue-500/90 hover:to-cyan-500/90 transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm border border-blue-500/50"
                  >
                    <span className="font-semibold text-lg">Crear Primera Página</span>
                    <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    onClick={() => openUserStoryModal(currentProject.pages[0].id)}
                    className="group flex items-center space-x-3 mx-auto bg-gradient-to-r from-indigo-600/80 to-purple-600/80 px-8 py-4 rounded-2xl hover:from-indigo-500/90 hover:to-purple-500/90 transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm border border-indigo-500/50"
                  >
                    <span className="font-semibold text-lg">Crear Primera Historia</span>
                    <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hover\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}