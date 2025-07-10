import React, { useState, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  NodeProps,
  ReactFlowProvider,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, RefreshCw, Edit3, BookOpen, CheckCircle, Clock, AlertCircle, User, Filter, Eye, EyeOff, Sparkles, Zap } from 'lucide-react';
import { AppPage, UserStory, Project } from '../../types';

interface VistaNodosViewProps {
  currentProject: Project;
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
}

interface PageHandlers {
  getUserStoriesByStatus: (pageId: string, status: UserStory['status']) => UserStory[];
  openUserStoryModal: (pageId: string) => void;
  handleOpenIaGenerateModal?: (pageId: string) => void;
  handleEditPage?: (page: AppPage) => void;
}

// Custom Project Central Node Component
const ProjectCentralNode = ({ data }: NodeProps) => {
  const { project } = data as { project: Project };
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900
        border-2 border-transparent bg-clip-border
        rounded-3xl shadow-2xl
        min-w-[420px] max-w-[480px]
        transform transition-all duration-500 ease-out
        hover:scale-105 hover:shadow-purple-500/25
        before:absolute before:inset-0 before:rounded-3xl
        before:bg-gradient-to-r before:from-blue-500/20 before:via-purple-500/20 before:to-pink-500/20
        before:blur-xl before:opacity-0 hover:before:opacity-100
        before:transition-opacity before:duration-500
        ${isHovered ? 'shadow-purple-500/30' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-sm animate-pulse" />
      <div className="absolute inset-[2px] rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
      
      {/* Handles with glow effect */}
      <Handle type="source" position={Position.Top} className="w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white/30 shadow-lg shadow-blue-400/50" />
      <Handle type="source" position={Position.Bottom} className="w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white/30 shadow-lg shadow-blue-400/50" />
      <Handle type="source" position={Position.Left} className="w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white/30 shadow-lg shadow-blue-400/50" />
      <Handle type="source" position={Position.Right} className="w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white/30 shadow-lg shadow-blue-400/50" />
      
      <div className="relative z-10 p-8 text-center">
        {/* Header with enhanced styling */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <div 
              className="w-12 h-12 rounded-2xl shadow-lg transform transition-transform duration-300 hover:rotate-12" 
              style={{ 
                backgroundColor: project.color, 
                boxShadow: `0 0 30px ${project.color}80, 0 0 60px ${project.color}40` 
              }}
            />
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 tracking-tight">
              {project.name}
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mt-2 opacity-60" />
          </div>
        </div>
        
        <p className="text-blue-100/90 text-base mb-6 line-clamp-2 leading-relaxed font-medium">
          {project.description}
        </p>
        
        {/* Enhanced stats grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="text-white font-black text-2xl mb-1">{project.pages?.length || 0}</div>
              <div className="text-xs text-blue-200/80 font-semibold uppercase tracking-wider">Páginas</div>
            </div>
          </div>
          <div className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="text-white font-black text-2xl mb-1">
                {project.pages?.reduce((total: number, page: AppPage) => total + (page.userStories?.length || 0), 0) || 0}
              </div>
              <div className="text-xs text-purple-200/80 font-semibold uppercase tracking-wider">Historias</div>
            </div>
          </div>
        </div>
        
        {/* Enhanced tech stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-blue-200/90 font-semibold uppercase tracking-wider">Stack Tecnológico</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {project.techStack.slice(0, 4).map((tech: string, index: number) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-sm border border-white/20 text-blue-100 text-xs font-semibold rounded-full hover:from-blue-500/40 hover:to-purple-500/40 transition-all duration-300 transform hover:scale-105"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-500/30 to-pink-500/30 backdrop-blur-sm border border-white/20 text-indigo-100 text-xs font-semibold rounded-full hover:from-indigo-500/40 hover:to-pink-500/40 transition-all duration-300 transform hover:scale-105">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PageNode = ({ data }: NodeProps) => {
  const { page, ...handlers } = data as { page: AppPage } & PageHandlers;
  const [isHovered, setIsHovered] = useState(false);
  const totalStories = page.userStories?.length || 0;
  const completedStories = page.userStories?.filter((story: UserStory) => story.status === 'done').length || 0;
  const progressPercentage = totalStories > 0 ? (completedStories / totalStories) * 100 : 0;

  const getStatusIcon = () => {
    if (progressPercentage === 100) return <CheckCircle className="h-6 w-6 text-emerald-400 drop-shadow-lg" />;
    if (progressPercentage > 0) return <Clock className="h-6 w-6 text-amber-400 drop-shadow-lg" />;
    return <AlertCircle className="h-6 w-6 text-slate-400 drop-shadow-lg" />;
  };

  const getProgressColor = () => {
    if (progressPercentage === 100) return 'from-emerald-500 to-green-500';
    if (progressPercentage > 50) return 'from-blue-500 to-emerald-500';
    if (progressPercentage > 0) return 'from-amber-500 to-blue-500';
    return 'from-slate-500 to-slate-600';
  };

  return (
    <div 
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-800/95
        backdrop-blur-xl border border-slate-600/50
        rounded-2xl shadow-2xl
        min-w-[300px] max-w-[340px]
        transform transition-all duration-500 ease-out
        hover:scale-105 hover:shadow-slate-500/25
        ${isHovered ? 'border-blue-400/50 shadow-blue-500/20' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Enhanced handles */}
      <Handle type="target" position={Position.Top} className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white/30 shadow-lg" />
      <Handle type="source" position={Position.Bottom} className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-400 border-2 border-white/30 shadow-lg" />
      
      <div className="relative z-10 p-5">
        {/* Enhanced header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="transform transition-transform duration-300 hover:scale-110">
            {getStatusIcon()}
          </div>
          <h3 className="text-xl font-bold text-white truncate flex-1 tracking-tight">{page.title}</h3>
        </div>
        
        <p className="text-slate-300/90 text-sm mb-5 line-clamp-2 leading-relaxed">{page.description}</p>
        
        {/* Enhanced Progress Bar */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>Progreso</span>
            <span className="font-bold">{completedStories}/{totalStories}</span>
          </div>
          <div className="relative w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600/30 to-slate-700/30 rounded-full" />
            <div 
              className={`bg-gradient-to-r ${getProgressColor()} h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="group bg-slate-700/30 backdrop-blur-sm border border-slate-600/30 rounded-xl p-3 text-center hover:bg-slate-600/40 transition-all duration-300">
            <div className="text-blue-400 font-bold text-lg group-hover:scale-110 transition-transform duration-300">
              {handlers.getUserStoriesByStatus(page.id, 'todo').length}
            </div>
            <div className="text-xs text-slate-400 font-medium">Por hacer</div>
          </div>
          <div className="group bg-slate-700/30 backdrop-blur-sm border border-slate-600/30 rounded-xl p-3 text-center hover:bg-slate-600/40 transition-all duration-300">
            <div className="text-amber-400 font-bold text-lg group-hover:scale-110 transition-transform duration-300">
              {page.userStories?.filter((story: UserStory) => story.status === 'in-progress').length || 0}
            </div>
            <div className="text-xs text-slate-400 font-medium">En progreso</div>
          </div>
          <div className="group bg-slate-700/30 backdrop-blur-sm border border-slate-600/30 rounded-xl p-3 text-center hover:bg-slate-600/40 transition-all duration-300">
            <div className="text-emerald-400 font-bold text-lg group-hover:scale-110 transition-transform duration-300">
              {completedStories}
            </div>
            <div className="text-xs text-slate-400 font-medium">Completadas</div>
          </div>
        </div>
        
        {/* Enhanced Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handlers.openUserStoryModal(page.id)}
            className="group flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 backdrop-blur-sm border border-indigo-500/50 rounded-lg text-sm font-medium text-white hover:from-indigo-600/70 hover:to-purple-600/70 hover:border-indigo-400/70 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
            Nueva
          </button>
          
          {handlers.handleOpenIaGenerateModal && (
            <button 
              onClick={() => handlers.handleOpenIaGenerateModal!(page.id)}
              className="group flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600/50 to-cyan-600/50 backdrop-blur-sm border border-blue-500/50 rounded-lg text-sm font-medium text-white hover:from-blue-600/70 hover:to-cyan-600/70 hover:border-blue-400/70 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
              IA
            </button>
          )}
          
          {handlers.handleEditPage && (
            <button 
              onClick={() => handlers.handleEditPage!(page)}
              className="group flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600/50 to-pink-600/50 backdrop-blur-sm border border-purple-500/50 rounded-lg text-sm font-medium text-white hover:from-purple-600/70 hover:to-pink-600/70 hover:border-purple-400/70 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <Edit3 className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced User Story Node Component
const UserStoryNode = ({ data }: NodeProps) => {
  const { userStory, pageTitle } = data as { userStory: UserStory; pageTitle: string };
  const [isHovered, setIsHovered] = useState(false);
  
  const getStatusColor = () => {
    switch (userStory.status) {
      case 'done': return 'from-emerald-600 via-green-600 to-emerald-700 border-emerald-400/50';
      case 'in-progress': return 'from-amber-600 via-yellow-600 to-amber-700 border-amber-400/50';
      case 'todo': return 'from-blue-600 via-indigo-600 to-blue-700 border-blue-400/50';
      default: return 'from-slate-600 via-slate-700 to-slate-800 border-slate-400/50';
    }
  };

  const getStatusIcon = () => {
    switch (userStory.status) {
      case 'done': return <CheckCircle className="h-4 w-4 text-emerald-300 drop-shadow-sm" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-amber-300 drop-shadow-sm" />;
      case 'todo': return <AlertCircle className="h-4 w-4 text-blue-300 drop-shadow-sm" />;
      default: return <User className="h-4 w-4 text-slate-300 drop-shadow-sm" />;
    }
  };

  const getPriorityEmoji = () => {
    switch (userStory.priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div 
      className={`
        relative overflow-hidden
        bg-gradient-to-br ${getStatusColor()}
        backdrop-blur-sm border-2 rounded-xl shadow-xl
        min-w-[220px] max-w-[260px]
        transform transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-2xl
        ${isHovered ? 'shadow-lg' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle glow effect */}
      <div className={`absolute inset-0 bg-white/10 rounded-xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white/80 border border-white/50 shadow-sm" />
      
      <div className="relative z-10 p-4">
        {/* Enhanced header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="transform transition-transform duration-300 hover:scale-110">
            {getStatusIcon()}
          </div>
          <span className="text-xs text-white/90 font-semibold truncate flex-1 tracking-wide">
            {pageTitle}
          </span>
          <span className="text-sm transform transition-transform duration-300 hover:scale-125">
            {getPriorityEmoji()}
          </span>
        </div>
        
        <h4 className="text-sm font-bold text-white mb-3 line-clamp-2 leading-tight">
          {userStory.title}
        </h4>
        
        {userStory.description && (
          <p className="text-xs text-white/80 mb-4 line-clamp-3 leading-relaxed">
            {userStory.description}
          </p>
        )}
        
        {/* Enhanced status badge */}
        <div className="flex items-center justify-center">
          <span className={`
            px-3 py-1.5 rounded-full text-xs font-semibold
            backdrop-blur-sm border border-white/30
            transition-all duration-300 transform hover:scale-105
            ${
              userStory.status === 'done' ? 'bg-emerald-500/40 text-emerald-100' :
              userStory.status === 'in-progress' ? 'bg-amber-500/40 text-amber-100' :
              'bg-blue-500/40 text-blue-100'
            }
          `}>
            {userStory.status === 'done' ? '✅ Completada' :
             userStory.status === 'in-progress' ? '⏳ En progreso' : '📋 Por hacer'}
          </span>
        </div>
      </div>
    </div>
  );
};

// Enhanced Filter Panel Component
const FilterPanel = ({ 
  pages, 
  visiblePages, 
  onTogglePage, 
  onShowAll, 
  onHideAll 
}: {
  pages: AppPage[];
  visiblePages: Set<string>;
  onTogglePage: (pageId: string) => void;
  onShowAll: () => void;
  onHideAll: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="absolute top-6 left-6 z-20 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-4">
        {/* Enhanced header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
            <Filter className="h-5 w-5 text-blue-400" />
          </div>
          <span className="text-white font-bold text-base tracking-tight">Filtros de Páginas</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-auto p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 transform hover:scale-110"
          >
            <span className="text-lg font-bold">{isExpanded ? '−' : '+'}</span>
          </button>
        </div>
        
        {isExpanded && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
            {/* Enhanced control buttons */}
            <div className="flex gap-3">
              <button
                onClick={onShowAll}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-emerald-600/50 to-green-600/50 backdrop-blur-sm border border-emerald-500/50 rounded-xl text-sm font-semibold text-white hover:from-emerald-600/70 hover:to-green-600/70 transition-all duration-300 transform hover:scale-105"
              >
                👁️ Mostrar Todas
              </button>
              <button
                onClick={onHideAll}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-red-600/50 to-pink-600/50 backdrop-blur-sm border border-red-500/50 rounded-xl text-sm font-semibold text-white hover:from-red-600/70 hover:to-pink-600/70 transition-all duration-300 transform hover:scale-105"
              >
                🙈 Ocultar Todas
              </button>
            </div>
            
            {/* Enhanced page list */}
            <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
              {pages.map((page) => {
                const isVisible = visiblePages.has(page.id);
                const totalStories = page.userStories?.length || 0;
                const completedStories = page.userStories?.filter(story => story.status === 'done').length || 0;
                const progressPercentage = totalStories > 0 ? (completedStories / totalStories) * 100 : 0;
                
                return (
                  <div key={page.id} className="group flex items-center gap-3 p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300">
                    <button
                      onClick={() => onTogglePage(page.id)}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold
                        transition-all duration-300 transform hover:scale-105
                        ${
                          isVisible 
                            ? 'bg-gradient-to-r from-blue-600/60 to-indigo-600/60 border border-blue-500/50 text-white hover:from-blue-600/80 hover:to-indigo-600/80'
                            : 'bg-gradient-to-r from-slate-600/60 to-slate-700/60 border border-slate-500/50 text-slate-300 hover:from-slate-600/80 hover:to-slate-700/80'
                        }
                      `}
                    >
                      {isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {isVisible ? 'Visible' : 'Oculta'}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-semibold truncate mb-1">{page.title}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-slate-400 text-xs">
                          {completedStories}/{totalStories} historias
                        </div>
                        <div className="flex-1 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-300">{Math.round(progressPercentage)}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const VistaNodosFlow = ({
  currentProject,
  getUserStoriesByStatus,
  openUserStoryModal,
  handleOpenIaGenerateModal,
  handleEditPage,
  setIsPageModalOpen
}: VistaNodosViewProps) => {
  console.log('VistaNodosView - Props recibidas:', {
    currentProject,
    pagesCount: currentProject?.pages?.length || 0
  });

  // State for page visibility filter
  const [visiblePages, setVisiblePages] = useState<Set<string>>(new Set());

  // Initialize visible pages when project changes
  useEffect(() => {
    if (currentProject?.pages) {
      setVisiblePages(new Set(currentProject.pages.map(page => page.id)));
    }
  }, [currentProject]);

  // Define custom node types
  const nodeTypes = useMemo(() => ({
    pageNode: PageNode,
    projectNode: ProjectCentralNode,
    userStoryNode: UserStoryNode
  }), []);

  // Generate nodes and edges
  const { initialNodes, initialEdges } = useMemo(() => {
    if (!currentProject?.pages) {
      return { initialNodes: [], initialEdges: [] };
    }

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    
    // Hierarchical layout configuration
    const LEVEL_HEIGHT = 400; // Distance between hierarchy levels
    const NODE_SPACING = 350; // Horizontal spacing between nodes
    
    // Level 1: Project node at the top center
    const projectX = 0;
    const projectY = -LEVEL_HEIGHT; // Top level
    
    nodes.push({
      id: 'project-central',
      type: 'projectNode',
      position: { x: projectX - 240, y: projectY }, // Center the project node
      data: {
        project: currentProject
      }
    });
    
    // Filter pages based on visibility
    const filteredPages = currentProject.pages.filter(page => visiblePages.has(page.id));
    
    if (filteredPages.length === 0) {
      return { initialNodes: nodes, initialEdges: edges };
    }
    
    // Level 2: Page nodes in the middle level
    const pagesStartX = -(filteredPages.length - 1) * NODE_SPACING / 2; // Center the pages horizontally
    const pagesY = 0; // Middle level
    
    filteredPages.forEach((page, pageIndex) => {
      const pageX = pagesStartX + pageIndex * NODE_SPACING;
      
      // Add page node
      nodes.push({
        id: `page-${page.id}`,
        type: 'pageNode',
        position: { x: pageX - 170, y: pagesY - 150 },
        data: {
          page,
          getUserStoriesByStatus,
          openUserStoryModal,
          handleOpenIaGenerateModal,
          handleEditPage
        }
      });
      
      // Enhanced edge from project node to page node
      edges.push({
        id: `edge-project-to-${page.id}`,
        source: 'project-central',
        target: `page-${page.id}`,
        type: 'smoothstep',
        style: {
          stroke: '#3b82f6',
          strokeWidth: 3,
          filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))'
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
          width: 20,
          height: 20
        },
      });
      
      // Level 3: User story nodes at the bottom level
      if (page.userStories && page.userStories.length > 0) {
        const storiesStartX = pageX - (page.userStories.length - 1) * (NODE_SPACING * 0.6) / 2; // Center stories under each page
        const storiesY = LEVEL_HEIGHT; // Bottom level
        
        page.userStories.forEach((userStory, storyIndex) => {
          const storyX = storiesStartX + storyIndex * (NODE_SPACING * 0.6); // Slightly closer spacing for stories
          
          // Add user story node
          nodes.push({
            id: `story-${page.id}-${userStory.id}`,
            type: 'userStoryNode',
            position: { x: storyX - 130, y: storiesY - 75 },
            data: {
              userStory,
              pageTitle: page.title
            }
          });
          
          // Enhanced edge from page node to user story node
          const edgeColor = userStory.status === 'done' ? '#10b981' :
                           userStory.status === 'in-progress' ? '#f59e0b' : '#6366f1';
          
          edges.push({
            id: `edge-page-${page.id}-to-story-${userStory.id}`,
            source: `page-${page.id}`,
            target: `story-${page.id}-${userStory.id}`,
            type: 'smoothstep',
            style: {
              stroke: edgeColor,
              strokeWidth: 2,
              filter: `drop-shadow(0 0 4px ${edgeColor}80)`
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: edgeColor,
              width: 16,
              height: 16
            },
          });
        });
      }
    });

    console.log('Generated nodes:', nodes.length, 'edges:', edges.length);
    return { initialNodes: nodes, initialEdges: edges };
  }, [currentProject, visiblePages, getUserStoriesByStatus, openUserStoryModal, handleOpenIaGenerateModal, handleEditPage]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when project data or visibility changes
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Filter handlers
  const handleTogglePage = (pageId: string) => {
    setVisiblePages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pageId)) {
        newSet.delete(pageId);
      } else {
        newSet.add(pageId);
      }
      return newSet;
    });
  };

  const handleShowAll = () => {
    if (currentProject?.pages) {
      setVisiblePages(new Set(currentProject.pages.map(page => page.id)));
    }
  };

  const handleHideAll = () => {
    setVisiblePages(new Set());
  };

  if (!currentProject?.pages || currentProject.pages.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900/20 to-purple-900/20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 text-center py-20 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl px-12 shadow-2xl">
          <div className="relative mb-8">
            <BookOpen className="h-24 w-24 mx-auto text-slate-600 mb-2" />
            <Sparkles className="absolute top-0 right-1/3 w-6 h-6 text-blue-400 animate-pulse" />
            <Sparkles className="absolute bottom-2 left-1/3 w-4 h-4 text-purple-400 animate-pulse delay-500" />
          </div>
          <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 mb-4 tracking-tight">
            No hay páginas aún
          </h3>
          <p className="text-slate-400 mb-10 text-lg leading-relaxed max-w-md mx-auto">
            Crea una página para comenzar a visualizar el flujo de trabajo de tu proyecto.
          </p>
          <button 
            onClick={() => setIsPageModalOpen(true)}
            className="group bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-4 rounded-2xl hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 transition-all duration-500 text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="flex items-center gap-3">
              <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              Crear Primera Página
              <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900/10 to-purple-900/10 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-pink-500/3 rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }} />
      </div>
      
      {/* Filter Panel */}
      <FilterPanel
        pages={currentProject.pages}
        visiblePages={visiblePages}
        onTogglePage={handleTogglePage}
        onShowAll={handleShowAll}
        onHideAll={handleHideAll}
      />
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      >
        <Background 
          color="#334155" 
          gap={24} 
          size={1.5} 
          className="opacity-30"
        />
        <Controls 
          className="bg-slate-900/90 backdrop-blur-xl border-slate-700/50 rounded-xl shadow-2xl" 
          showInteractive={false}
        />
        <MiniMap 
          className="bg-slate-900/90 backdrop-blur-xl border-slate-700/50 rounded-xl shadow-2xl overflow-hidden"
          nodeColor={(node) => {
            if (node.type === 'projectNode') return '#3b82f6';
            if (node.type === 'pageNode') return '#64748b';
            return '#8b5cf6'; // user story nodes
          }}
          maskColor="rgba(15, 23, 42, 0.8)"
        />
      </ReactFlow>
      
      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

// Main component wrapped with ReactFlowProvider
export default function VistaNodosView(props: VistaNodosViewProps) {
  return (
    <ReactFlowProvider>
      <VistaNodosFlow {...props} />
    </ReactFlowProvider>
  );
}