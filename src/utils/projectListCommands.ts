// Comandos específicos para ProjectList
export interface ProjectListCommand {
  id: string;
  name: string;
  description: string;
  icon: string;
  action: () => void;
  shortcut?: string;
}

export class ProjectListCommands {
  private dispatch: any;
  private openModal: () => void;

  constructor(dispatch: any, openModal: () => void) {
    this.dispatch = dispatch;
    this.openModal = openModal;
  }

  // Comando para crear nuevo proyecto
  createNewProject = (): ProjectListCommand => ({
    id: 'create-project',
    name: 'Crear Nuevo Proyecto',
    description: 'Abre el modal para crear un nuevo proyecto',
    icon: '➕',
    action: () => this.dispatch({ type: 'SET_MODAL_OPEN', payload: true }),
    shortcut: 'Ctrl+N'
  });

  // Comando para cambiar vista
  toggleViewMode = (): ProjectListCommand => ({
    id: 'toggle-view',
    name: 'Cambiar Vista',
    description: 'Alterna entre vista de grilla y lista',
    icon: '🔄',
    action: () => {
      this.dispatch({ 
        type: 'SET_VIEW_MODE', 
        payload: this.getCurrentViewMode() === 'grid' ? 'list' : 'grid' 
      });
    },
    shortcut: 'Ctrl+Shift+V'
  });

  // Comando para limpiar filtros
  clearFilters = (): ProjectListCommand => ({
    id: 'clear-filters',
    name: 'Limpiar Filtros',
    description: 'Resetea todos los filtros aplicados',
    icon: '🧹',
    action: () => {
      this.dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
      this.dispatch({ type: 'SET_STATUS_FILTER', payload: 'all' });
      this.dispatch({ type: 'SET_SORT_OPTION', payload: 'date-asc' });
    },
    shortcut: 'Ctrl+R'
  });

  // Comando para buscar proyectos
  focusSearch = (): ProjectListCommand => ({
    id: 'focus-search',
    name: 'Buscar Proyectos',
    description: 'Enfoca el campo de búsqueda',
    icon: '🔍',
    action: () => {
      const searchInput = document.querySelector('input[placeholder*="Buscar"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    },
    shortcut: 'Ctrl+F'
  });

  // Comando para ordenar por nombre
  sortByName = (): ProjectListCommand => ({
    id: 'sort-name',
    name: 'Ordenar por Nombre',
    description: 'Ordena los proyectos alfabéticamente',
    icon: '🔤',
    action: () => this.dispatch({ type: 'SET_SORT_OPTION', payload: 'name-asc' }),
    shortcut: 'Ctrl+Shift+N'
  });

  // Comando para ordenar por fecha
  sortByDate = (): ProjectListCommand => ({
    id: 'sort-date',
    name: 'Ordenar por Fecha',
    description: 'Ordena los proyectos por fecha de creación',
    icon: '📅',
    action: () => this.dispatch({ type: 'SET_SORT_OPTION', payload: 'date-asc' }),
    shortcut: 'Ctrl+Shift+D'
  });

  // Comando para filtrar por estado
  filterByStatus = (status: string): ProjectListCommand => ({
    id: `filter-${status}`,
    name: `Filtrar por ${status}`,
    description: `Muestra solo proyectos en estado ${status}`,
    icon: '🏷️',
    action: () => this.dispatch({ type: 'SET_STATUS_FILTER', payload: status })
  });

  // Obtener todos los comandos disponibles
  getAllCommands = (): ProjectListCommand[] => [
    this.createNewProject(),
    this.toggleViewMode(),
    this.clearFilters(),
    this.focusSearch(),
    this.sortByName(),
    this.sortByDate(),
    this.filterByStatus('planning'),
    this.filterByStatus('development'),
    this.filterByStatus('testing'),
    this.filterByStatus('deployed')
  ];

  private getCurrentViewMode = () => {
    // Esta función debería obtener el modo de vista actual
    // Por ahora retorna 'grid' como default
    return 'grid';
  };
}

// Función helper para crear instancia de comandos
export const createProjectListCommands = (dispatch: any, openModal: () => void) => {
  return new ProjectListCommands(dispatch, openModal);
};