import React, { useState, useMemo, useRef, useReducer, useEffect } from 'react';
import { Plus, Search, LayoutGrid, List, Settings, ChevronDown } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import ProjectCard from '../components/ProjectCard';
import NewProjectModal from '../components/NewProjectModal';
import EditarProjectoPopup from '../components/EditarProjectoPopup';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'planning', label: 'Planificación' },
  { value: 'development', label: 'Desarrollo' },
  { value: 'testing', label: 'Pruebas' },
  { value: 'deployed', label: 'Desplegado' },
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

// Componentes de UI reutilizables
const LoadingState = () => (
  <div className="text-center py-20">
    <div className="mx-auto w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4"></div>
    <h3 className="text-xl font-semibold text-white tracking-wide">Cargando Proyectos</h3>
    <p className="text-gray-400">Estamos preparando todo para ti...</p>
  </div>
);

const EmptyState = ({ openModal, hasProjects }) => (
  <div className="text-center py-20">
    <div className="mx-auto w-24 h-24 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border border-white/10">
      <Plus className="h-12 w-12 text-gray-400" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">
      {hasProjects ? 'No se encontraron proyectos' : 'Tu lienzo está en blanco'}
    </h3>
    <p className="text-gray-300 mb-6 max-w-md mx-auto">
      {hasProjects
        ? 'Prueba con otros términos de búsqueda o ajusta los filtros.'
        : 'Es el momento perfecto para dar vida a una nueva idea. ¡Crea tu primer proyecto!'}
    </p>
    {!hasProjects && (
      <button
        onClick={openModal}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/30"
      >
        Crear Primer Proyecto
      </button>
    )}
  </div>
);

export default function ProjectList() {
  const { projects, isLoading } = useProject();
  const [state, dispatch] = useReducer(projectListReducer, initialState);
  const { isModalOpen, isEditModalOpen, selectedProject, searchTerm, statusFilter, viewMode, sortOption } = state;
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from('.header-title, .header-button, .toolbar', {
        duration: 0.7,
        opacity: 0,
        y: -30,
        ease: 'power3.out',
        stagger: 0.2,
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
  };

  const handleCloseEditModal = () => {
    dispatch({ type: 'SET_EDIT_MODAL_OPEN', payload: { isOpen: false, project: null } });
  };

  return (
    <div ref={container} className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-purple-900/40 to-black"></div>
        <div className="absolute -top-80 -right-80 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Header openModal={() => dispatch({ type: 'SET_MODAL_OPEN', payload: true })} />
        <Toolbar state={state} dispatch={dispatch} />

        {isLoading ? (
          <LoadingState />
        ) : sortedAndFilteredProjects.length === 0 ? (
          <EmptyState openModal={() => dispatch({ type: 'SET_MODAL_OPEN', payload: true })} hasProjects={projects.length > 0} />
        ) : (
          <ProjectGrid projects={sortedAndFilteredProjects} viewMode={viewMode} onEdit={handleEditProject} />
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
    </div>
  );
}

// Sub-componentes para mejorar la legibilidad
const Header = ({ openModal }) => (
  <header className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-white/10">
    <div className="header-title">
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">Panel de Proyectos</h1>
      <p className="text-gray-400">Gestiona, organiza y colabora en todos tus proyectos.</p>
    </div>
    <button
      onClick={openModal}
      className="header-button flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/30 transform hover:scale-105 mt-4 md:mt-0"
    >
      <Plus className="h-5 w-5" />
      <span className="font-semibold">Nuevo Proyecto</span>
    </button>
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
    <div className="toolbar flex flex-col md:flex-row items-center justify-between mb-8 p-4 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 space-y-4 md:space-y-0">
      <div className="relative flex-1 w-full md:w-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Buscar por nombre o descripción..."
          value={searchTerm}
          onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-transparent rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 placeholder-gray-400"
        />
      </div>
      
      <div className="flex items-center space-x-2 bg-black/20 p-1 rounded-lg">
        {STATUS_OPTIONS.map(option => (
          <button
            key={option.value}
            onClick={() => dispatch({ type: 'SET_STATUS_FILTER', payload: option.value })}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              statusFilter === option.value 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <div ref={sortRef} className="relative">
          <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded-lg bg-black/20">
            <span>Ordenar por</span>
            <ChevronDown className={`h-5 w-5 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>
          {isSortOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-white/10 rounded-lg shadow-lg z-20">
              {SORT_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    dispatch({ type: 'SET_SORT_OPTION', payload: option.value });
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${sortOption === option.value ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-purple-700'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 bg-black/20 p-1 rounded-lg">
          <button onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'grid' })} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/10'}`}>
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'list' })} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/10'}`}>
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectGrid = ({ projects, viewMode, onEdit }) => {
  const projectContainerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.project-card', 
      { opacity: 0, y: 50 },
      {
        duration: 0.5,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  }, { scope: projectContainerRef, dependencies: [projects, viewMode] });

  return (
    <div
      ref={projectContainerRef}
      className={`transition-all duration-500 ${
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          : 'flex flex-col space-y-4'
      }`}
    >
      {projects.map((project) => (
        <div key={project.id} className="project-card" onClick={() => onEdit(project)}>
          <ProjectCard project={project} viewMode={viewMode} />
        </div>
      ))}
    </div>
  );
};
