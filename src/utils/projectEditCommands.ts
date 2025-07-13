// Comandos específicos para ProjectEdit
export interface ProjectEditCommand {
  id: string;
  name: string;
  description: string;
  icon: string;
  action: () => void;
  shortcut?: string;
  category: 'page' | 'story' | 'file' | 'view' | 'project' | 'ai';
}

export class ProjectEditCommands {
  private setters: any;
  private currentProject: any;
  private viewMode: string;

  constructor(setters: any, currentProject: any, viewMode: string) {
    this.setters = setters;
    this.currentProject = currentProject;
    this.viewMode = viewMode;
  }

  // Comandos para páginas
  createNewPage = (): ProjectEditCommand => ({
    id: 'create-page',
    name: 'Nueva Página',
    description: 'Crear una nueva página en el proyecto',
    icon: '📄',
    action: () => this.setters.setIsPageModalOpen(true),
    shortcut: 'Ctrl+Shift+P',
    category: 'page'
  });

  // Comandos para user stories
  createNewUserStory = (): ProjectEditCommand => ({
    id: 'create-story',
    name: 'Nueva Historia de Usuario',
    description: 'Crear una nueva historia de usuario',
    icon: '📝',
    action: () => this.setters.setIsUserStoryModalOpen(true),
    shortcut: 'Ctrl+Shift+U',
    category: 'story'
  });

  // Comandos para archivos
  createNewFile = (): ProjectEditCommand => ({
    id: 'create-file',
    name: 'Nuevo Archivo',
    description: 'Crear un nuevo archivo en la estructura',
    icon: '📁',
    action: () => this.setters.setIsFileModalOpen(true),
    shortcut: 'Ctrl+Shift+F',
    category: 'file'
  });

  // Comandos para vistas
  switchToKanban = (): ProjectEditCommand => ({
    id: 'view-kanban',
    name: 'Vista Kanban',
    description: 'Cambiar a vista de tablero Kanban',
    icon: '📋',
    action: () => this.setters.setViewMode('kanban'),
    shortcut: 'Ctrl+1',
    category: 'view'
  });

  switchToPages = (): ProjectEditCommand => ({
    id: 'view-pages',
    name: 'Vista Páginas',
    description: 'Cambiar a vista de páginas',
    icon: '📄',
    action: () => this.setters.setViewMode('pages'),
    shortcut: 'Ctrl+2',
    category: 'view'
  });

  switchToStructure = (): ProjectEditCommand => ({
    id: 'view-structure',
    name: 'Vista Estructura',
    description: 'Cambiar a vista de estructura de archivos',
    icon: '🌳',
    action: () => this.setters.setViewMode('structure'),
    shortcut: 'Ctrl+3',
    category: 'view'
  });

  switchToTimeline = (): ProjectEditCommand => ({
    id: 'view-timeline',
    name: 'Vista Timeline',
    description: 'Cambiar a vista de línea de tiempo',
    icon: '⏰',
    action: () => this.setters.setViewMode('timeline'),
    shortcut: 'Ctrl+4',
    category: 'view'
  });

  // Comandos de IA
  openAIGeneration = (): ProjectEditCommand => ({
    id: 'ai-generate',
    name: 'Generación IA',
    description: 'Abrir panel de generación con IA',
    icon: '🤖',
    action: () => this.setters.setIsIaGenerateModalOpen(true),
    shortcut: 'Ctrl+Shift+A',
    category: 'ai'
  });

  generateCompleteProject = (): ProjectEditCommand => ({
    id: 'ai-complete',
    name: 'Generación Completa',
    description: 'Generar proyecto completo con IA',
    icon: '⚡',
    action: () => this.setters.setIsGeneracionCompletaPopupOpen(true),
    shortcut: 'Ctrl+Shift+G',
    category: 'ai'
  });

  // Comandos de proyecto
  editProject = (): ProjectEditCommand => ({
    id: 'edit-project',
    name: 'Editar Proyecto',
    description: 'Editar información del proyecto',
    icon: '✏️',
    action: () => {
      if (this.currentProject) {
        this.setters.setEditingProjectData({
          name: this.currentProject.name,
          description: this.currentProject.description,
          color: this.currentProject.color || '',
          techStack: this.currentProject.techStack || []
        });
        this.setters.setIsEditingProject(true);
      }
    },
    shortcut: 'Ctrl+E',
    category: 'project'
  });

  openAuthModal = (): ProjectEditCommand => ({
    id: 'auth-config',
    name: 'Configurar Autenticación',
    description: 'Configurar sistema de autenticación',
    icon: '🔐',
    action: () => this.setters.setIsAuthModalOpen(true),
    category: 'project'
  });

  openColorsModal = (): ProjectEditCommand => ({
    id: 'colors-config',
    name: 'Configurar Colores',
    description: 'Configurar paleta de colores del proyecto',
    icon: '🎨',
    action: () => this.setters.setIsColorsModalOpen(true),
    category: 'project'
  });

  openComponentsModal = (): ProjectEditCommand => ({
    id: 'components-config',
    name: 'Configurar Componentes',
    description: 'Configurar componentes del proyecto',
    icon: '🧩',
    action: () => this.setters.setIsComponentsModalOpen(true),
    category: 'project'
  });

  // Obtener comandos por categoría
  getCommandsByCategory = (category: string): ProjectEditCommand[] => {
    return this.getAllCommands().filter(cmd => cmd.category === category);
  };

  // Obtener todos los comandos disponibles
  getAllCommands = (): ProjectEditCommand[] => [
    this.createNewPage(),
    this.createNewUserStory(),
    this.createNewFile(),
    this.switchToKanban(),
    this.switchToPages(),
    this.switchToStructure(),
    this.switchToTimeline(),
    this.openAIGeneration(),
    this.generateCompleteProject(),
    this.editProject(),
    this.openAuthModal(),
    this.openColorsModal(),
    this.openComponentsModal()
  ];

  // Buscar comandos por nombre o descripción
  searchCommands = (query: string): ProjectEditCommand[] => {
    const lowercaseQuery = query.toLowerCase();
    return this.getAllCommands().filter(cmd => 
      cmd.name.toLowerCase().includes(lowercaseQuery) ||
      cmd.description.toLowerCase().includes(lowercaseQuery)
    );
  };
}

// Función helper para crear instancia de comandos
export const createProjectEditCommands = (setters: any, currentProject: any, viewMode: string) => {
  return new ProjectEditCommands(setters, currentProject, viewMode);
};

// Tipos para los setters del ProjectEdit
export interface ProjectEditSetters {
  setIsPageModalOpen: (open: boolean) => void;
  setIsUserStoryModalOpen: (open: boolean) => void;
  setIsFileModalOpen: (open: boolean) => void;
  setViewMode: (mode: string) => void;
  setIsIaGenerateModalOpen: (open: boolean) => void;
  setIsGeneracionCompletaPopupOpen: (open: boolean) => void;
  setIsEditingProject: (editing: boolean) => void;
  setEditingProjectData: (data: any) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsColorsModalOpen: (open: boolean) => void;
  setIsComponentsModalOpen: (open: boolean) => void;
}