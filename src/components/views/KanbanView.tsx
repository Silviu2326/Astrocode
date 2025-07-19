import React, { useState, useEffect, useRef } from 'react';
import { Plus, AlertTriangle, RefreshCw, Edit3, BookOpen, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { AppPage, UserStory } from '../../types';
import UserStoryCard from '../UserStoryCard';
import './KanbanView.css';

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
    <div className="kanban-container" ref={containerRef}>
      {/* Modern Header with Glassmorphism */}
      <div 
        ref={headerRef}
        className="kanban-header"
      >
        {/* Animated Background Elements */}
        <div className="kanban-header-bg"></div>
        <div className="kanban-header-orb-1"></div>
        <div className="kanban-header-orb-2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="kanban-icon-container">
                <Sparkles className="h-8 w-8 kanban-icon" />
              </div>
              <div>
                <h3 className="kanban-title">
                  Kanban Board
                </h3>
                <p className="kanban-subtitle">
                  <span>Gestiona todas las historias de usuario</span>
                  <span className="kanban-badge">
                    {totalStories} historias
                  </span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="kanban-btn-expand"
              >
                <ChevronDown className={`h-6 w-6 kanban-text-secondary transition-transform duration-300 group-hover:text-white ${
                  isExpanded ? 'rotate-180' : ''
                }`} />
              </button>
              
              {currentProject.pages.length > 0 && (
                <>
                  <button
                    onClick={() => openUserStoryModal(currentProject.pages[0].id)}
                    className="kanban-btn-primary"
                  >
                    <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
                    <span className="font-semibold">Nueva Historia</span>
                  </button>
                  
                  {currentProject.githubUrl && (
                    <button
                      onClick={() => handleOpenIaGenerateModal(currentProject.pages[0].id)}
                      className="kanban-btn-secondary"
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
                  className="kanban-column"
                >
                  {/* Column Container with Modern Design */}
                  <div className="kanban-column-container kanban-shadow-3xl">
                    {/* Column Header */}
                    <div className="kanban-column-header">
                      <div className="flex items-center justify-between">
                        <h4 className="kanban-column-title">{column.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="kanban-column-count">
                            {columnStories.length}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Column Content */}
                    <div 
                      className="kanban-column-content"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, column.id)}
                    >
                      {/* Animated Background Pattern */}
                      <div className="kanban-column-bg-pattern">
                        <div className="kanban-column-orb-1"></div>
                        <div className="kanban-column-orb-2"></div>
                      </div>
                      
                      {columnStories.map((userStory, storyIndex) => {
                        const pageId = findPageIdForUserStory(currentProject, userStory.id);
                        
                        return (
                          <div
                            key={userStory.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, userStory.id, 'userStory', pageId || '')}
                            className="kanban-story-card kanban-fade-in-up"
                            style={{
                              animationDelay: `${storyIndex * 0.1}s`
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
                        <div className="kanban-empty-column">
                          <div className="kanban-empty-container">
                            <BookOpen className="h-20 w-20 mx-auto mb-6 opacity-40 kanban-icon-secondary" />
                            <p className="font-medium text-lg mb-2 kanban-text-primary">Arrastra historias aquí</p>
                            <p className="text-sm kanban-text-muted">o crea una nueva historia</p>
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
          <div className="kanban-empty-state">
            <div className="relative">
              <div className="kanban-empty-bg"></div>
              <div className="relative z-10 p-8">
                <BookOpen className="h-24 w-24 mx-auto kanban-text-muted mb-8" />
                <h3 className="kanban-empty-title">
                  No hay historias de usuario
                </h3>
                <p className="kanban-empty-text">
                  {currentProject.pages.length === 0 
                    ? 'Comienza creando tu primera página para organizar las historias de usuario'
                    : 'Comienza creando historias de usuario para gestionar las tareas del proyecto'
                  }
                </p>
                
                {currentProject.pages.length === 0 ? (
                  <button
                    onClick={() => setIsPageModalOpen(true)}
                    className="kanban-empty-btn"
                  >
                    <span className="font-semibold text-lg">Crear Primera Página</span>
                    <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    onClick={() => openUserStoryModal(currentProject.pages[0].id)}
                    className="kanban-empty-btn-alt"
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
    </div>
  );
}