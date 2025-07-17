import React, { useState, useMemo, useRef, useReducer, useEffect } from 'react';
import { Plus, Search, LayoutGrid, List, Settings, ChevronDown, Brain, Zap } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import ProjectCard from '../components/ProjectCard';
import NewProjectModal from '../components/NewProjectModal';
import EditarProjectoPopup from '../components/EditarProjectoPopup';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import IAPanel from '../components/IAPanel';
import { useNeuroNova } from '../hooks/useNeuroNova';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos', color: 'cyan' },
  { value: 'planning', label: 'Planificación', color: 'lime' },
  { value: 'development', label: 'Desarrollo', color: 'cyan' },
  { value: 'testing', label: 'Pruebas', color: 'magenta' },
  { value: 'deployed', label: 'Desplegado', color: 'lime' },
];

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Nombre (A-Z)' },
  { value: 'name-desc', label: 'Nombre (Z-A)' },
  { value: 'date-asc', label: 'Fecha Creación (Nuevos)' },
  { value: 'date-desc', label: 'Fecha Creación (Antiguos)' },
];

// Reducer para manejar el estado complejo del componente
const initialState = {
  isModalOpen: false,
  isEditModalOpen: false,
  selectedProject: null,
  searchTerm: '',
  statusFilter: 'all',
  viewMode: 'grid',
  sortOption: 'date-asc',
};

function projectListReducer(state, action) {
  switch (action.type) {
    case 'SET_MODAL_OPEN':
      return { ...state, isModalOpen: action.payload };
    case 'SET_EDIT_MODAL_OPEN':
      return { ...state, isEditModalOpen: action.payload.isOpen, selectedProject: action.payload.project };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'SET_SORT_OPTION':
      return { ...state, sortOption: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Componentes de UI reutilizables con tema Neuro-Nova
const LoadingState = () => {
  const { brainActivity } = useNeuroNova();
  
  return (
    <div className="text-center py-20">
      <div className="relative mx-auto w-24 h-24 mb-8">
        {/* Cerebro central pulsante */}
        <div className="absolute inset-0 glass rounded-full flex items-center justify-center animate-brain-pulse ring-neon-cyan">
          <Brain className="h-12 w-12 neon-cyan" />
        </div>
        
        {/* Anillos de energía */}
        <div className="absolute inset-0 border-2 border-nn-cyan/30 rounded-full animate-ping" />
        <div className="absolute inset-2 border border-nn-lime/20 rounded-full animate-pulse" />
        
        {/* Partículas flotantes */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-nn-cyan rounded-full animate-bounce" />
        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-nn-lime rounded-full animate-bounce animation-delay-500" />
        <div className="absolute top-1/2 -left-4 w-2 h-2 bg-nn-mag rounded-full animate-bounce animation-delay-1000" />
      </div>
      
      <h3 className="text-2xl font-bold text-nn-text-strong mb-2 tracking-wide">
        🧠 Sincronizando Red Neuronal
      </h3>
      <p className="text-nn-text-soft mb-4">Activando protocolos de gestión avanzada...</p>
      
      {/* Barra de progreso neural */}
      <div className="max-w-xs mx-auto">
        <div className="w-full h-2 bg-nn-glass/30 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-nn-cyan via-nn-lime to-nn-mag animate-flow-lines" />
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ openModal, hasProjects }) => {
  const { triggerBrainWave } = useNeuroNova();
  
  return (
    <div className="text-center py-20">
      <div className="relative mx-auto w-32 h-32 mb-8">
        {/* Panel holográfico vacío */}
        <div className="glass rounded-nn p-8 border border-nn-cyan/20 hover:border-nn-cyan/60 transition-all duration-500 group">
          <div className="relative">
            <Plus className="h-16 w-16 text-nn-text-muted group-hover:text-nn-cyan transition-colors duration-300" />
            
            {/* Efecto de holograma */}
            <div className="absolute inset-0 bg-gradient-to-t from-nn-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Líneas de escaneo */}
            <div className="absolute inset-0 overflow-hidden rounded-nn">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-nn-cyan/50 animate-flow-lines" />
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-nn-lime/50 animate-flow-lines animation-delay-1000" />
            </div>
          </div>
        </div>
        
        {/* Marca neón en esquina */}
        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-nn-cyan shadow-neon-cyan animate-pulse" />
      </div>
      
      <h3 className="text-3xl font-bold text-nn-text-strong mb-3">
        {hasProjects ? (
          <span className="neon-mag">🔍 Sector Neural Vacío</span>
        ) : (
          <span className="neon-cyan">🌌 Iniciando Matriz de Control</span>
        )}
      </h3>
      
      <p className="text-nn-text-soft mb-8 max-w-md mx-auto leading-relaxed">
        {hasProjects
          ? 'Los filtros actuales no detectan proyectos en el espectro. Ajusta los parámetros de búsqueda.'
          : 'Tu centro de comando está listo. Es momento de crear el primer nodo de tu red de proyectos.'}
      </p>
      
      {!hasProjects && (
        <button
          onClick={() => {
            openModal();
            triggerBrainWave();
          }}
          className="group relative px-8 py-4 glass rounded-nn border border-nn-cyan/30 text-nn-text-strong font-semibold hover:border-nn-cyan/80 hover:shadow-neon-cyan transition-all duration-300 overflow-hidden"
        >
          {/* Fondo animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-nn-cyan/10 via-nn-lime/10 to-nn-mag/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Contenido */}
          <div className="relative flex items-center space-x-3">
            <Zap className="h-5 w-5 neon-cyan group-hover:animate-pulse" />
            <span>Inicializar Primer Proyecto</span>
          </div>
          
          {/* Efecto de energía */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-nn-cyan to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </button>
      )}
    </div>
  );
};

export default function ProjectList() {
  const { projects, isLoading } = useProject();
  const [state, dispatch] = useReducer(projectListReducer, initialState);
  const { isModalOpen, isEditModalOpen, selectedProject, searchTerm, statusFilter, viewMode, sortOption } = state;
  const container = useRef(null);
  const { brainActivity, triggerBrainWave } = useNeuroNova();

  useGSAP(
    () => {
      // Animación de entrada más dramática
      gsap.from('.header-title', {
        duration: 1,
        opacity: 0,
        y: -50,
        rotationX: -90,
        ease: 'power3.out',
      });
      
      gsap.from('.header-button', {
        duration: 0.8,
        opacity: 0,
        scale: 0.5,
        rotation: 180,
        ease: 'back.out(1.7)',
        delay: 0.3,
      });
      
      gsap.from('.toolbar', {
        duration: 0.7,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        delay: 0.5,
      });
      
      // Efecto de ondas neuronales
      gsap.to('.neural-wave', {
        duration: 2,
        scale: 1.5,
        opacity: 0,
        ease: 'power2.out',
        repeat: -1,
        stagger: 0.5,
      });
    },
    { scope: container }
  );

  const sortedAndFilteredProjects = useMemo(() => {
    let result = projects
      .filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'date-desc':
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 'date-asc':
          default:
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
    return result;
  }, [projects, searchTerm, statusFilter, sortOption]);

  const handleEditProject = (project) => {
    dispatch({ type: 'SET_EDIT_MODAL_OPEN', payload: { isOpen: true, project } });
    triggerBrainWave();
  };

  const handleCloseEditModal = () => {
    dispatch({ type: 'SET_EDIT_MODAL_OPEN', payload: { isOpen: false, project: null } });
  };

  return (
    <div ref={container} className="min-h-screen bg-nn-bg0 text-nn-text-strong relative overflow-hidden">
      {/* Fondo neural animado */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente base */}
        <div className="absolute inset-0 bg-gradient-to-br from-nn-bg0 via-nn-bg1/50 to-nn-bg0" />
        
        {/* Ondas neuronales */}
        <div className="neural-wave absolute top-1/4 left-1/4 w-96 h-96 border border-nn-cyan/20 rounded-full" />
        <div className="neural-wave absolute top-3/4 right-1/4 w-64 h-64 border border-nn-lime/20 rounded-full" />
        <div className="neural-wave absolute bottom-1/4 left-1/3 w-80 h-80 border border-nn-mag/20 rounded-full" />
        
        {/* Partículas flotantes */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-nn-cyan rounded-full animate-bounce" />
        <div className="absolute top-40 left-32 w-1 h-1 bg-nn-lime rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-40 w-1.5 h-1.5 bg-nn-mag rounded-full animate-bounce animation-delay-1000" />
        
        {/* Grid de conexiones */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(90deg, hsl(var(--nn-accent-cyan)) 1px, transparent 1px),
              linear-gradient(hsl(var(--nn-accent-cyan)) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }} />
        </div>
      </div>
      
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Header 
          openModal={() => {
            dispatch({ type: 'SET_MODAL_OPEN', payload: true });
            triggerBrainWave();
          }} 
          brainActivity={brainActivity}
        />
        <Toolbar state={state} dispatch={dispatch} />

        {isLoading ? (
          <LoadingState />
        ) : sortedAndFilteredProjects.length === 0 ? (
          <EmptyState 
            openModal={() => dispatch({ type: 'SET_MODAL_OPEN', payload: true })} 
            hasProjects={projects.length > 0} 
          />
        ) : (
          <ProjectGrid 
            projects={sortedAndFilteredProjects} 
            viewMode={viewMode} 
            onEdit={handleEditProject} 
          />
        )}
      </main>

      <NewProjectModal 
        isOpen={isModalOpen} 
        onClose={() => dispatch({ type: 'SET_MODAL_OPEN', payload: false })} 
      />
      
      <EditarProjectoPopup
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        project={selectedProject}
      />
      
      {/* Panel IA con tema neural */}
      <IAPanel 
        dispatch={dispatch}
        openModal={() => {
          dispatch({ type: 'SET_MODAL_OPEN', payload: true });
          triggerBrainWave();
        }}
      />
      
      {/* Indicador de actividad cerebral */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="glass rounded-nn p-4 border border-nn-cyan/30">
          <div className="flex items-center space-x-3 mb-2">
            <Brain className="h-5 w-5 neon-cyan animate-pulse" />
            <span className="text-sm text-nn-text-soft font-medium">Neural Activity</span>
          </div>
          <div className="w-32 h-2 bg-nn-glass/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-nn-lime via-nn-cyan to-nn-mag transition-all duration-500 relative"
              style={{ width: `${brainActivity}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-flow-lines" />
            </div>
          </div>
          <div className="text-xs text-nn-text-muted mt-1">
            {brainActivity}% Capacity
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-componentes actualizados con tema Neuro-Nova
const Header = ({ openModal, brainActivity }) => (
  <header className="relative mb-12">
    {/* Panel principal del header */}
    <div className="glass rounded-nn p-8 border border-nn-cyan/20 hover:border-nn-cyan/40 transition-all duration-500">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="header-title flex-1">
          <div className="flex items-center space-x-4 mb-3">
            <div className="relative">
              <Brain className="h-12 w-12 neon-cyan animate-brain-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-nn-lime rounded-full animate-ping" />
            </div>
            <div>
              <h1 className="text-5xl font-black tracking-tight text-nn-text-strong mb-1">
                <span className="neon-cyan">Neural</span>{' '}
                <span className="neon-lime">Command</span>{' '}
                <span className="neon-mag">Center</span>
              </h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-nn-lime rounded-full animate-pulse" />
                <p className="text-nn-text-soft font-medium">El software que gobierna a los demás</p>
              </div>
            </div>
          </div>
          
          {/* Líneas de conexión */}
          <div className="flex space-x-1 mb-4">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className={`h-0.5 w-4 rounded-full ${
                  i % 3 === 0 ? 'bg-nn-cyan' : i % 3 === 1 ? 'bg-nn-lime' : 'bg-nn-mag'
                } opacity-60 animate-pulse`}
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>
        
        <button
          onClick={openModal}
          className="header-button group relative px-8 py-4 glass rounded-nn border border-nn-lime/30 text-nn-text-strong font-bold hover:border-nn-lime/80 hover:shadow-neon-lime transition-all duration-300 overflow-hidden mt-6 lg:mt-0"
        >
          {/* Fondo energético */}
          <div className="absolute inset-0 bg-gradient-to-r from-nn-lime/10 to-nn-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Contenido */}
          <div className="relative flex items-center space-x-3">
            <div className="relative">
              <Plus className="h-6 w-6 neon-lime group-hover:rotate-90 transition-transform duration-300" />
              <div className="absolute inset-0 bg-nn-lime/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
            </div>
            <span>Nuevo Proyecto</span>
          </div>
          
          {/* Línea de energía */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-nn-lime to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </button>
      </div>
    </div>
    
    {/* Marca de esquina */}
    <div className="absolute -top-2 -right-2 w-4 h-4 bg-nn-cyan rounded-full shadow-neon-cyan animate-pulse" />
  </header>
);

const Toolbar = ({ state, dispatch }) => {
  const { searchTerm, statusFilter, viewMode, sortOption } = state;
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="toolbar relative mb-8">
      {/* Panel principal */}
      <div className="glass rounded-nn p-6 border border-nn-glass/30 hover:border-nn-glass/50 transition-all duration-300">
        <div className="flex flex-col xl:flex-row items-center justify-between space-y-4 xl:space-y-0 xl:space-x-6">
          
          {/* Buscador neural */}
          <div className="relative flex-1 w-full xl:w-auto min-w-0">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-nn-cyan">
              <Search className="h-5 w-5 animate-pulse" />
            </div>
            <input
              type="text"
              placeholder="Escanear proyectos en la red neural..."
              value={searchTerm}
              onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
              className="w-full pl-12 pr-4 py-3 bg-nn-glass/20 border border-nn-glass/40 rounded-nn focus:border-nn-cyan/60 focus:ring-neon-cyan focus:outline-none transition-all duration-300 placeholder-nn-text-muted text-nn-text-strong backdrop-blur-nn"
            />
            {/* Líneas de escaneo */}
            <div className="absolute inset-0 pointer-events-none rounded-nn overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-nn-cyan/50 to-transparent animate-flow-lines" />
            </div>
          </div>
          
          {/* Filtros de estado */}
          <div className="flex items-center space-x-1 bg-nn-glass/20 p-1 rounded-nn border border-nn-glass/30">
            {STATUS_OPTIONS.map(option => {
              const isActive = statusFilter === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => dispatch({ type: 'SET_STATUS_FILTER', payload: option.value })}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                    isActive 
                      ? `bg-nn-${option.color}/20 text-nn-${option.color} border border-nn-${option.color}/40 shadow-neon-${option.color}` 
                      : 'text-nn-text-soft hover:bg-nn-glass/20 hover:text-nn-text-strong'
                  }`}
                >
                  {option.label}
                  {isActive && (
                    <div className={`absolute -top-1 -right-1 w-2 h-2 bg-nn-${option.color} rounded-full animate-ping`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Controles de vista y ordenación */}
          <div className="flex items-center space-x-4">
            {/* Selector de ordenación */}
            <div ref={sortRef} className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)} 
                className="flex items-center space-x-2 text-nn-text-soft hover:text-nn-cyan p-3 rounded-nn bg-nn-glass/20 border border-nn-glass/30 hover:border-nn-cyan/40 transition-all duration-300"
              >
                <span className="text-sm font-medium">Ordenar</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isSortOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 glass rounded-nn border border-nn-glass/40 shadow-neon-cyan z-20 overflow-hidden">
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        dispatch({ type: 'SET_SORT_OPTION', payload: option.value });
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 ${
                        sortOption === option.value 
                          ? 'bg-nn-cyan/20 text-nn-cyan border-l-2 border-nn-cyan' 
                          : 'text-nn-text-soft hover:bg-nn-glass/20 hover:text-nn-text-strong'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selector de vista */}
            <div className="flex items-center space-x-1 bg-nn-glass/20 p-1 rounded-nn border border-nn-glass/30">
              <button 
                onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'grid' })} 
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-nn-cyan/20 text-nn-cyan shadow-neon-cyan' 
                    : 'text-nn-text-muted hover:bg-nn-glass/20 hover:text-nn-text-strong'
                }`}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button 
                onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'list' })} 
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-nn-cyan/20 text-nn-cyan shadow-neon-cyan' 
                    : 'text-nn-text-muted hover:bg-nn-glass/20 hover:text-nn-text-strong'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Líneas de conexión */}
      <div className="absolute -bottom-2 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-nn-lime/50 to-transparent" />
    </div>
  );
};

const ProjectGrid = ({ projects, viewMode, onEdit }) => {
  const projectContainerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.project-card', 
      { 
        opacity: 0, 
        y: 50,
        rotationX: -15,
        scale: 0.9
      },
      {
        duration: 0.6,
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  }, { scope: projectContainerRef, dependencies: [projects, viewMode] });

  return (
    <div className="relative">
      {/* Grid de proyectos */}
      <div
        ref={projectContainerRef}
        className={`transition-all duration-500 ${
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'flex flex-col space-y-6'
        }`}
      >
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="project-card group relative"
            onClick={() => onEdit(project)}
          >
            {/* Efecto de conexión neural */}
            <div className="absolute -inset-1 bg-gradient-to-r from-nn-cyan/20 via-nn-lime/20 to-nn-mag/20 rounded-nn opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            
            {/* Card del proyecto */}
            <div className="relative glass rounded-nn border border-nn-glass/30 group-hover:border-nn-cyan/50 transition-all duration-300 overflow-hidden">
              <ProjectCard project={project} viewMode={viewMode} />
              
              {/* Indicador de actividad */}
              <div className="absolute top-3 right-3 w-2 h-2 bg-nn-lime rounded-full animate-pulse" />
              
              {/* Líneas de escaneo en hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-nn-cyan/60 to-transparent animate-flow-lines" />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-nn-lime/60 to-transparent animate-flow-lines animation-delay-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Conexiones neuronales de fondo */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full">
          {projects.map((_, index) => {
            if (index === 0) return null;
            const fromIndex = index - 1;
            const cols = viewMode === 'grid' ? 3 : 1;
            const fromRow = Math.floor(fromIndex / cols);
            const fromCol = fromIndex % cols;
            const toRow = Math.floor(index / cols);
            const toCol = index % cols;
            
            return (
              <line
                key={`connection-${index}`}
                x1={`${(fromCol + 0.5) * (100 / cols)}%`}
                y1={`${(fromRow + 0.5) * 200}px`}
                x2={`${(toCol + 0.5) * (100 / cols)}%`}
                y2={`${(toRow + 0.5) * 200}px`}
                stroke="hsl(var(--nn-accent-cyan))"
                strokeWidth="1"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};