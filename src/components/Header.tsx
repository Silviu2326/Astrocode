import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { ChevronDown, Bell, Settings, User, LogOut, CheckCircle, AlertTriangle, Clock, Menu, X } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  const { currentProject } = useProject();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [selectedEnvironment, setSelectedEnvironment] = useState('development');
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Función para manejar el clic en configuración
  const handleConfigurationClick = () => {
    navigate('/configuracion');
    setIsUserMenuOpen(false); // Cerrar el menú después de navegar
  };

  // Función para manejar el clic en perfil
  const handleProfileClick = () => {
    navigate('/perfil');
    setIsUserMenuOpen(false); // Cerrar el menú después de navegar
  };

  // Función mejorada para calcular el progreso basado en user stories
  const calculateProgress = () => {
    if (!currentProject || !currentProject.pages) {
      return { percentage: 0, completed: 0, total: 0 };
    }

    // Obtener todas las user stories de todas las páginas
    const allUserStories = currentProject.pages.flatMap(page => page.userStories || []);
    
    if (allUserStories.length === 0) {
      return { percentage: 0, completed: 0, total: 0 };
    }

    // Contar user stories completadas (status: 'done' en lugar de 'completed')
    const completedStories = allUserStories.filter(story => story.status === 'done');
    const inProgressStories = allUserStories.filter(story => story.status === 'in-progress');
    const todoStories = allUserStories.filter(story => story.status === 'todo');
    
    const total = allUserStories.length;
    const completed = completedStories.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      percentage,
      completed,
      total,
      inProgress: inProgressStories.length,
      todo: todoStories.length
    };
  };

  const getIssuesCount = () => {
    if (!currentProject) return { critical: 0, warning: 0, info: 0 };
    
    // Simular conteo de issues basado en el progreso real
    const progress = calculateProgress();
    return {
      critical: Math.floor((progress.todo || 0) * 0.1), // 10% de tareas pendientes como críticas
      warning: Math.floor((progress.inProgress || 0) * 0.3), // 30% de tareas en progreso como advertencias
      info: Math.floor(progress.completed * 0.05) // 5% de tareas completadas como info
    };
  };

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const progress = calculateProgress();
  const issues = getIssuesCount();

  return (
    <header className="header-container header-brain-pulse">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 flex-1 min-w-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 header-text-muted header-hover-text transition-colors header-glass header-border rounded-lg header-hover-bg header-shadow-cyan"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Project info and progress */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-semibold header-text-strong truncate header-flow-lines">
                {currentProject?.name || 'Sin proyecto'}
              </h1>
              {/* Stats - Hidden on mobile, shown on tablet+ */}
              <div className="hidden sm:flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1 text-xs sm:text-sm header-text-muted">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 header-accent-success" />
                  <span className="hidden md:inline">{progress.completed} completadas</span>
                  <span className="md:hidden">{progress.completed}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs sm:text-sm header-text-muted">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 header-neon-cyan" />
                  <span className="hidden md:inline">{progress.inProgress} en progreso</span>
                  <span className="md:hidden">{progress.inProgress}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs sm:text-sm header-text-muted">
                  <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 header-accent-warning" />
                  <span className="hidden md:inline">{progress.todo} pendientes</span>
                  <span className="md:hidden">{progress.todo}</span>
                </div>
              </div>
            </div>
            
            {/* Progress bar - Hidden on mobile */}
            <div className="hidden md:flex flex-col items-center">
              <div className="w-24 lg:w-32 header-bg-1 rounded-full h-2 border header-border header-shadow-cyan">
                <div 
                  className="header-bg-primary h-2 rounded-full transition-all duration-300 header-brain-pulse"
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
              <span className="text-xs header-text-muted mt-1">
                {progress.percentage}% ({progress.completed}/{progress.total})
              </span>
            </div>
          </div>

          {/* Branch/Environment selector - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-2">
            <select 
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="text-sm header-glass header-border rounded-lg px-3 py-2 header-text-strong header-focus transition-colors header-shadow-cyan"
            >
              <option value="main">main</option>
              <option value="develop">develop</option>
              <option value="feature/new-ui">feature/new-ui</option>
            </select>
            
            <select 
              value={selectedEnvironment}
              onChange={(e) => setSelectedEnvironment(e.target.value)}
              className="text-sm header-glass header-border rounded-lg px-3 py-2 header-text-strong header-focus transition-colors header-shadow-cyan"
            >
              <option value="development">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
          {/* Issues counter - Simplified on mobile */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-3 header-glass header-border rounded-lg px-2 lg:px-3 py-2 header-shadow-magenta">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 header-accent-danger rounded-full header-brain-pulse"></div>
              <span className="text-xs lg:text-sm header-text-muted">{issues.critical}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full header-brain-pulse"></div>
              <span className="text-xs lg:text-sm header-text-muted">{issues.warning}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 header-accent-primary rounded-full header-brain-pulse"></div>
              <span className="text-xs lg:text-sm header-text-muted">{issues.info}</span>
            </div>
          </div>

          {/* Sync button */}
          <button className="px-3 lg:px-4 py-2 text-xs lg:text-sm header-accent-primary header-text-strong rounded-lg header-hover-accent transition-colors header-shadow-cyan header-flow-lines">
            <span className="hidden sm:inline">Sync</span>
            <span className="sm:hidden">S</span>
          </button>

          {/* Notifications - Hidden on mobile */}
          <button className="hidden sm:block p-2 header-text-muted header-hover-text transition-colors header-glass header-border rounded-lg header-hover-bg header-shadow-magenta">
            <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-1 sm:space-x-2 p-2 header-text-soft header-hover-text transition-colors header-glass header-border rounded-lg header-hover-bg header-shadow-cyan"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 header-bg-primary rounded-full flex items-center justify-center header-brain-pulse">
                <span className="header-text-strong text-xs sm:text-sm font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 hidden sm:block" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 header-border rounded-lg header-shadow-magenta py-1 z-50 header-glass">
                <div className="px-4 py-2 border-b header-border">
                  <p className="text-sm font-medium header-text-strong truncate">{user?.name}</p>
                  <p className="text-sm header-text-muted truncate">{user?.email}</p>
                </div>
                <button 
                  onClick={handleProfileClick}
                  className="flex items-center w-full px-4 py-2 text-sm header-text-soft header-hover-bg header-hover-text transition-colors"
                >
                  <User className="h-4 w-4 mr-2" />
                  Perfil
                </button>
                <button 
                  onClick={handleConfigurationClick}
                  className="flex items-center w-full px-4 py-2 text-sm header-text-soft header-hover-bg header-hover-text transition-colors"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </button>
                <button 
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 text-sm header-text-soft header-hover-bg header-hover-text transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 border-t header-border pt-4">
          <div className="space-y-4">
            {/* Mobile progress info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-sm header-text-muted">
                  <CheckCircle className="h-4 w-4 header-accent-success" />
                  <span>{progress.completed}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm header-text-muted">
                  <Clock className="h-4 w-4 header-neon-cyan" />
                  <span>{progress.inProgress}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm header-text-muted">
                  <AlertTriangle className="h-4 w-4 header-accent-warning" />
                  <span>{progress.todo}</span>
                </div>
              </div>
              <div className="text-sm header-text-muted">
                {progress.percentage}%
              </div>
            </div>

            {/* Mobile progress bar */}
            <div className="w-full header-bg-1 rounded-full h-2 border header-border header-shadow-cyan">
              <div 
                className="header-bg-primary h-2 rounded-full transition-all duration-300 header-brain-pulse"
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>

            {/* Mobile selectors */}
            <div className="space-y-3">
              <select 
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full text-sm header-glass header-border rounded-lg px-3 py-2 header-text-strong header-focus transition-colors"
              >
                <option value="main">Branch: main</option>
                <option value="develop">Branch: develop</option>
                <option value="feature/new-ui">Branch: feature/new-ui</option>
              </select>
              
              <select 
                value={selectedEnvironment}
                onChange={(e) => setSelectedEnvironment(e.target.value)}
                className="w-full text-sm header-glass header-border rounded-lg px-3 py-2 header-text-strong header-focus transition-colors"
              >
                <option value="development">Environment: Development</option>
                <option value="staging">Environment: Staging</option>
                <option value="production">Environment: Production</option>
              </select>
            </div>

            {/* Mobile issues */}
            <div className="flex items-center justify-between header-glass header-border rounded-lg px-3 py-2 header-shadow-magenta">
              <span className="text-sm header-text-muted">Issues:</span>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 header-accent-danger rounded-full header-brain-pulse"></div>
                  <span className="text-sm header-text-muted">{issues.critical}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full header-brain-pulse"></div>
                  <span className="text-sm header-text-muted">{issues.warning}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 header-accent-primary rounded-full header-brain-pulse"></div>
                  <span className="text-sm header-text-muted">{issues.info}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;