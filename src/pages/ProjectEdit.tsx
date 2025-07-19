import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, Users, LayoutGrid, FileText, FolderTree, Github, RefreshCw, Edit3, X, Trash2, Clock, GitBranch, Activity, MessageSquare, Code, ChevronLeft, ChevronRight, Bot, Terminal, FileCode, Shield, Palette, Package, Loader, BarChart3, Circle, Server, Sparkles } from 'lucide-react';
import './ProjectEdit.css';
import { useProject } from '../context/ProjectContext';
import { AppPage, UserStory, FileNode } from '../types';
import { projectService } from '../services/api';
import NewPageModal from '../components/NewPageModal';
import NewUserStoryModal from '../components/NewUserStoryModal';
import NewFileModal from '../components/NewFileModal';
import AuthModal from '../components/AuthModal';
import ColorsModal from '../components/ColorsModal';
import ComponentsModal from '../components/ComponentsModal';
import DependenciesModal from '../components/DependenciesModal';
import TemasPopup from '../components/TemasPopup';
import GeneracionCompletaPopup from '../components/GeneracionCompletaPopup';
import PopupExecutePrompts from '../components/PopupExecutePrompts';
import KanbanView from '../components/views/KanbanView';
import PagesView from '../components/views/PagesView';
import StructureView from '../components/views/StructureView';
import TimelineView from '../components/views/TimelineView';
import DependenciesView from '../components/views/DependenciesView';
import EstudiodemercadoView from '../components/views/EstudiodemercadoView';
import VistaNodosView from '../components/views/VistaNodosView';
import VistaBackendView from '../components/views/VistaBackendView';
import VistaDocumentosView from '../components/views/VistaDocumentosView';
import IAPanel from '../components/IAPanel';

type ViewMode = 'kanban' | 'pages' | 'structure' | 'timeline' | 'dependencies' | 'estudio-mercado' | 'vistanodos' | 'vista-backend' | 'vista-documentos';

const userStoryColumns = [
  { id: 'pending', title: 'Por Hacer', color: 'bg-slate-800/50 border-slate-700' },
  { id: 'in-progress', title: 'En Progreso', color: 'bg-blue-900/50 border-blue-700' },
  { id: 'completed', title: 'Completado', color: 'bg-green-900/50 border-green-700' },
];

const generateWeeks = () => {
  const weeks = [];
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  
  for (let i = 0; i < 8; i++) {
    const weekStart = new Date(startOfWeek);
    weekStart.setDate(startOfWeek.getDate() + (i * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    weeks.push({
      id: `week-${i}`,
      start: weekStart,
      end: weekEnd,
      label: `Semana ${i + 1}`,
      dateRange: `${weekStart.getDate()}/${weekStart.getMonth() + 1} - ${weekEnd.getDate()}/${weekEnd.getMonth() + 1}`
    });
  }
  
  return weeks;
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalContentVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }
};


export default function ProjectEdit() {
  const { id } = useParams<{ id: string }>();
  const {
    projects,
    setCurrentProject,
    currentProject,
    addPage,
    updatePage,
    deletePage,
    movePage,
    addUserStory,
    updateUserStory,
    deleteUserStory,
    moveUserStory,
    addFileNode,
    updateFileNode,
    deleteFileNode,
    updateProject
  } = useProject();
  
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [isUserStoryModalOpen, setIsUserStoryModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<AppPage | undefined>();
  const [editingUserStory, setEditingUserStory] = useState<UserStory | undefined>();
  const [editingFile, setEditingFile] = useState<FileNode | undefined>();
  const [selectedPageId, setSelectedPageId] = useState<string>('');
  const [selectedParentNode, setSelectedParentNode] = useState<FileNode | undefined>();
  const [isEditingGithubUrl, setIsEditingGithubUrl] = useState(false);
  const [githubUrlInput, setGithubUrlInput] = useState('');
  const [isIaGenerateModalOpen, setIsIaGenerateModalOpen] = useState(false);
  const [numUserStories, setNumUserStories] = useState<number>(5);
  const [userStoryType, setUserStoryType] = useState<string>('');
  const [selectedPageIdForIa, setSelectedPageIdForIa] = useState<string | null>(null);
  const [isEditPageDescriptionModalOpen, setIsEditPageDescriptionModalOpen] = useState(false);
  const [editingPageDescription, setEditingPageDescription] = useState('');
  const [selectedPageForDescriptionEdit, setSelectedPageForDescriptionEdit] = useState<AppPage | null>(null);
  const [draggedPage, setDraggedPage] = useState<AppPage | null>(null);
  const [pageWeekAssignments, setPageWeekAssignments] = useState<{[pageId: string]: string}>({});
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isColorsModalOpen, setIsColorsModalOpen] = useState(false);
  const [isComponentsModalOpen, setIsComponentsModalOpen] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProjectData, setEditingProjectData] = useState({
    name: '',
    description: '',
    color: '',
    techStack: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneracionCompletaPopupOpen, setIsGeneracionCompletaPopupOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [generatedPrompts, setGeneratedPrompts] = useState<{completo: string, minimalista: string} | null>(null);
  const [selectedPromptType, setSelectedPromptType] = useState<'completo' | 'minimalista'>('completo');
  const [isExecutePromptsOpen, setIsExecutePromptsOpen] = useState(false);
  const [selectedPageForExecution, setSelectedPageForExecution] = useState<AppPage | null>(null);
  const [userStoriesForExecution, setUserStoriesForExecution] = useState<UserStory[]>([]);
  const [selectedUserStoryIds, setSelectedUserStoryIds] = useState<string[]>([]);
  const [isDependenciesModalOpen, setIsDependenciesModalOpen] = useState(false);
  const [isTemasPopupOpen, setIsTemasPopupOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      const project = projects.find(p => p.id === id);
      setCurrentProject(project || null);
    }
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id, projects, setCurrentProject]);

  const handleAddPage = async (pageData: Omit<AppPage, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (currentProject) await addPage(currentProject.id, pageData);
  };

  const handleUpdatePage = async (pageData: Omit<AppPage, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (currentProject && editingPage) {
      try {
        await updatePage(currentProject.id, editingPage.id, pageData);
        setEditingPage(undefined);
      } catch (error) {
        console.error('Error updating page:', error);
      }
    }
  };

  const handleAddUserStory = async (userStoryData: Omit<UserStory, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (currentProject && selectedPageId) await addUserStory(currentProject.id, selectedPageId, userStoryData);
  };
const handleGenerarPromptInicial = async () => {
  if (!currentProject) {
    alert('No hay proyecto seleccionado');
    return;
  }

  try {
    console.log('Generando prompt inicial para proyecto:', currentProject.id);
    const response = await projectService.generarPromptInicial(currentProject.id);
    
    // Debug: mostrar la respuesta completa
    console.log('Respuesta completa:', response);

    // La nueva estructura incluye ambos prompts en response.prompts
    if (response.prompts && response.prompts.completo && response.prompts.minimalista) {
      // Guardar ambos prompts y abrir el modal
      setGeneratedPrompts({
        completo: response.prompts.completo,
        minimalista: response.prompts.minimalista
      });
      setSelectedPromptType('completo'); // Seleccionar completo por defecto
      setIsPromptModalOpen(true);
      console.log('Prompts generados exitosamente');
    } else {
      // Si no hay prompts
      alert('Error: No se recibieron los prompts del servidor');
      console.error('Respuesta sin prompts:', response);
    }
  } catch (error) {
    console.error('Error al generar prompt inicial:', error);
    alert('Error al generar el prompt inicial. Por favor, intenta de nuevo.');
  }
};

// Función para copiar el prompt seleccionado al portapapeles
const handleCopyPrompt = async () => {
  try {
    const promptToCopy = generatedPrompts?.[selectedPromptType] || '';
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(promptToCopy);
      alert(`Prompt ${selectedPromptType} copiado al portapapeles!`);
    } else {
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = promptToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert(`Prompt ${selectedPromptType} copiado al portapapeles!`);
    }
  } catch (error) {
    console.error('Error al copiar al portapapeles:', error);
    alert('Error al copiar al portapapeles');
  }
};

  const handleUpdateUserStory = (userStoryData: Omit<UserStory, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (currentProject && editingUserStory && selectedPageId) {
      updateUserStory(currentProject.id, selectedPageId, editingUserStory.id, userStoryData);
      setEditingUserStory(undefined);
    }
  };

  const handleDeleteUserStory = (pageId: string, userStoryId: string) => {
    if (currentProject) deleteUserStory(currentProject.id, pageId, userStoryId);
  };
  const getUserStoriesByStatus = (pageId: string, status: UserStory['status']): UserStory[] => {
    if (!currentProject || !currentProject.pages) return [];
    
    const page = currentProject.pages.find((p: AppPage) => p.id === pageId);
    if (!page || !page.userStories) return [];
    
    return page.userStories.filter((story: UserStory) => story.status === status);
  };


  const handleEditUserStory = (pageId: string, userStory: UserStory) => {
    setSelectedPageId(pageId);
    setEditingUserStory(userStory);
    setIsUserStoryModalOpen(true);
  };

  const handleAddFile = (fileData: Omit<FileNode, 'id'>) => {
    if (currentProject) {
      const parentPath = selectedParentNode?.path || '';
      addFileNode(currentProject.id, parentPath, fileData);
    }
  };

  const handleUpdateFile = (fileData: Omit<FileNode, 'id'>) => {
    if (currentProject && editingFile) {
      updateFileNode(currentProject.id, editingFile.id, fileData);
      setEditingFile(undefined);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    if (currentProject) deleteFileNode(currentProject.id, fileId);
  };

  const handleEditFile = (file: FileNode) => {
    setEditingFile(file);
    setIsFileModalOpen(true);
  };

  const handleAddChildFile = (parentNode: FileNode) => {
    setSelectedParentNode(parentNode);
    setIsFileModalOpen(true);
  };

  const handleClosePageModal = () => {
    setIsPageModalOpen(false);
    setEditingPage(undefined);
  };

  const handleCloseUserStoryModal = () => {
    setIsUserStoryModalOpen(false);
    setEditingUserStory(undefined);
    setSelectedPageId('');
  };

  const handleCloseFileModal = () => {
    setIsFileModalOpen(false);
    setEditingFile(undefined);
    setSelectedParentNode(undefined);
  };

  const handleOpenIaGenerateModal = (pageId: string) => {
    setSelectedPageIdForIa(pageId);
    setIsIaGenerateModalOpen(true);
  };

  const handleCloseIaGenerateModal = () => {
    setIsIaGenerateModalOpen(false);
    setSelectedPageIdForIa(null);
    setNumUserStories(5);
    setUserStoryType('');
  };

  const handleGenerateStoriesWithIa = async () => {
    if (!selectedPageIdForIa || !currentProject) return;
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3001/api/projects/${currentProject.id}/pages/${selectedPageIdForIa}/generate-user-stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ numUserStories: parseInt(String(numUserStories)), userStoryType })
      });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      alert(`Se generaron ${data.userStoriesCount} historias de usuario exitosamente`);
      await handleSyncProject();
    } catch (error) {
      console.error('Error al generar historias de usuario:', error);
      alert('Error al generar historias de usuario.');
    } finally {
      handleCloseIaGenerateModal();
    }
  };

  const handleOpenEditPageDescriptionModal = (page: AppPage) => {
    setSelectedPageForDescriptionEdit(page);
    setEditingPageDescription(page.description ?? '');
    setIsEditPageDescriptionModalOpen(true);
  };
  
  const handleCloseEditPageDescriptionModal = () => {
    setIsEditPageDescriptionModalOpen(false);
    setSelectedPageForDescriptionEdit(null);
    setEditingPageDescription('');
  };

  const handleUpdatePageDescription = async () => {
    if (!selectedPageForDescriptionEdit || !currentProject) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${currentProject.id}/pages/${selectedPageForDescriptionEdit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: selectedPageForDescriptionEdit.name, description: editingPageDescription, route: selectedPageForDescriptionEdit.route })
      });
      if (!response.ok) throw new Error(await response.text());
      if (updateProject) {
        const updatedPages = currentProject.pages.map(p => p.id === selectedPageForDescriptionEdit.id ? { ...p, description: editingPageDescription } : p);
        updateProject({ ...currentProject, pages: updatedPages });
      }
      handleCloseEditPageDescriptionModal();
    } catch (error) {
      console.error('Error actualizando descripción de página:', error);
    }
  };

  const handleGeneratePageDescriptionWithAI = async () => {
    if (!selectedPageForDescriptionEdit || !currentProject) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${currentProject.id}/pages/${selectedPageForDescriptionEdit.id}/generate-description`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setEditingPageDescription(data.description);
    } catch (error) {
      console.error('Error generando descripción con IA:', error);
    }
  };

  const handleEditGithubUrl = () => {
    setGithubUrlInput(currentProject?.githubUrl || '');
    setIsEditingGithubUrl(true);
  };

  const handleSaveGithubUrl = async () => {
    if (currentProject) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:3001/api/projects/${currentProject.id}/github`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ githubUrl: githubUrlInput.trim() || null })
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        await updateProject(currentProject.id, { githubUrl: data.project.githubUrl });
        setIsEditingGithubUrl(false);
      } catch (error) {
        console.error('Error actualizando URL de GitHub:', error);
      }
    }
  };

  const handleCancelGithubUrl = () => setIsEditingGithubUrl(false);

  const handleRemoveGithubUrl = async () => {
    if (currentProject?.githubUrl) {
      const token = localStorage.getItem('token');
      try {
        await fetch(`http://localhost:3001/api/projects/${currentProject.id}/github`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ githubUrl: null })
        });
        await updateProject(currentProject.id, { githubUrl: null });
      } catch (error) {
        console.error('Error eliminando URL de GitHub:', error);
      }
    }
  };

  const handleSyncProject = async () => {
    if (currentProject?.githubUrl && window.confirm('¿Sincronizar proyecto? Esto analizará el repo de GitHub y generará historias de usuario con IA.')) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:3001/api/projects/${currentProject.id}/sync`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        alert(`Sincronización completada. Se generaron ${data.userStoriesCount} historias.`);
        window.location.reload();
      } catch (error) {
        console.error('Error sincronizando proyecto:', error);
      }
    } else if (!currentProject?.githubUrl) {
      alert('Agrega una URL de GitHub para sincronizar.');
    }
  };

  const handleEditProject = () => {
    if (currentProject) {
      setEditingProjectData({
        name: currentProject.name,
        description: currentProject.description,
        color: currentProject.color,
        techStack: currentProject.techStack || []
      });
      setIsEditingProject(true);
    }
  };

  const handleSaveProject = async () => {
    if (!currentProject) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:3001/api/projects/${currentProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editingProjectData)
      });
      if (updateProject) await updateProject(currentProject.id, editingProjectData);
      setIsEditingProject(false);
    } catch (error) {
      console.error('Error actualizando proyecto:', error);
    }
  };

  const handleCancelEditProject = () => setIsEditingProject(false);

  const handleAddTechStack = (tech: string) => {
    if (tech.trim() && !editingProjectData.techStack.includes(tech.trim())) {
      setEditingProjectData(prev => ({ ...prev, techStack: [...prev.techStack, tech.trim()] }));
    }
  };

  const handleRemoveTechStack = (index: number) => {
    setEditingProjectData(prev => ({ ...prev, techStack: prev.techStack.filter((_, i) => i !== index) }));
  };

  const handleEditPage = (page: AppPage) => {
    setEditingPage(page);
    setIsPageModalOpen(true);
  };

  const handleDragStart = (e: React.DragEvent, itemId: string, itemType: 'page' | 'userStory', pageId?: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ itemId, itemType, pageId }));
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    if (currentProject) {
      if (data.itemType === 'page') movePage(currentProject.id, data.itemId, newStatus as AppPage['status']);
      else if (data.itemType === 'userStory' && data.pageId) moveUserStory(currentProject.id, data.pageId, data.itemId, newStatus as UserStory['status']);
    }
  };

  const openUserStoryModal = (pageId: string) => {
    setSelectedPageId(pageId);
    setIsUserStoryModalOpen(true);
  };

  const handleToggleUserStoryComplete = (pageId: string, userStoryId: string, completed: boolean) => {
    console.log(`Toggle story ${userStoryId} to ${completed ? 'completed' : 'not completed'}`);
  };

  // Modificar la función para manejar user stories seleccionadas
  const handleExecuteSelectedStories = (pageId: string, selectedStoryIds: string[] = []) => {
    if (!currentProject) return;
    const page = currentProject.pages.find((p: AppPage) => p.id === pageId);
    if (!page) return;
    
    // Obtener todas las user stories de la página
    const allStories = page.userStories || [];
    
    setSelectedPageForExecution(page);
    setUserStoriesForExecution(allStories);
    setSelectedUserStoryIds(selectedStoryIds); // Guardar los IDs seleccionados
    setIsExecutePromptsOpen(true);
    
    console.log(`Abriendo popup de ejecución para la página: ${page.name} con ${selectedStoryIds.length > 0 ? selectedStoryIds.length + ' historias seleccionadas' : allStories.length + ' historias totales'}`);
  };

  // Mantener la función original para compatibilidad
 const handleExecuteCompletedStories = (pageId: string, selectedStoryIds?: string[]) => {
  // Pasar los IDs seleccionados si están disponibles
  handleExecuteSelectedStories(pageId, selectedStoryIds || []);
};
  const handleExecuteStory = (storyId: string) => {
    console.log(`Ejecutando user story: ${storyId}`);
    // Aquí puedes agregar la lógica para ejecutar una historia específica
    // Por ejemplo, llamar a un servicio de IA o abrir un editor
  };

  const handleExecuteAllStories = () => {
    console.log(`Ejecutando todas las ${userStoriesForExecution.length} user stories`);
    // Aquí puedes agregar la lógica para ejecutar todas las historias
    // Por ejemplo, procesarlas en lote
  };

  const handleCloseExecutePrompts = () => {
    setIsExecutePromptsOpen(false);
    setSelectedPageForExecution(null);
    setUserStoriesForExecution([]);
    setSelectedUserStoryIds([]); // Limpiar selección
  };

  const getFileStats = () => {
    if (!currentProject) return { files: 0, folders: 0, completed: 0, pending: 0 };
    
    // Adaptación para la nueva estructura de datos
    const fileStructure = currentProject.fileStructure;
    if (!fileStructure) return { files: 0, folders: 0, completed: 0, pending: 0 };
    
    const stats = { files: 0, folders: 0, completed: 0, pending: 0 };
    
    // Contar folders
    if (fileStructure.folders) {
      stats.folders = fileStructure.folders.length;
    }
    
    // Contar files
    if (fileStructure.files) {
      stats.files = fileStructure.files.length;
      // Contar archivos completados y pendientes basado en el tipo o descripción
      fileStructure.files.forEach(file => {
        // Asumimos que los archivos están pendientes por defecto
        // Puedes ajustar esta lógica según tus necesidades
        if (file.description && file.description.includes('completed')) {
          stats.completed++;
        } else {
          stats.pending++;
        }
      });
    }
    
    return stats;
  };

  const fileStats = getFileStats();
  const weeks = generateWeeks();

  const handleTimelineDragStart = (e: React.DragEvent, page: AppPage) => {
    setDraggedPage(page);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleTimelineDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleTimelineDrop = (e: React.DragEvent, weekId: string) => {
    e.preventDefault();
    if (draggedPage) {
      setPageWeekAssignments(prev => ({ ...prev, [draggedPage.id]: weekId }));
      setDraggedPage(null);
    }
  };

  const analyzeDependencies = () => {
    if (!currentProject) return [];
    return currentProject.pages.map(page => ({
      id: page.id,
      name: page.title,
      type: 'page',
      status: page.status,
      hasBackend: Math.random() > 0.3,
      hasComponents: (page.userStories?.length || 0) > 0,
      endpoints: Math.floor(Math.random() * 5) + 1,
      orphaned: Math.random() > 0.8
    }));
  };

  const dependencyData = analyzeDependencies();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <Loader className="w-12 h-12 text-blue-500" />
        </motion.div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <motion.div
          className="text-center bg-slate-900/50 p-8 rounded-2xl shadow-2xl border border-slate-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Proyecto no encontrado</h2>
          <p className="text-slate-400">El proyecto que buscas no existe o no tienes permisos.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden font-sans">
      <main className="flex-1">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 h-full flex flex-col">
          
          <motion.header className="mb-8" variants={itemVariants}>
            {!isEditingProject ? (
              <AnimatePresence>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="w-10 h-10 rounded-lg" 
                      style={{ backgroundColor: currentProject.color, boxShadow: `0 0 20px ${currentProject.color}` }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">{currentProject.name}</h1>
                  </div>
                  <div className="flex items-center gap-3">
                      <motion.button
                        onClick={handleGenerarPromptInicial}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                <Bot className="w-4 h-4" />
                Generar Prompt Inicial
              </motion.button>

                    <motion.button 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }} 
                      onClick={handleEditProject} 
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 hover:border-blue-500 transition-colors shadow-lg"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Editar</span>
                    </motion.button>
                  </div>
                </div>
                <p className="text-slate-400 mb-4 max-w-3xl">{currentProject.description}</p>
              </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-4 shadow-2xl"
              >
                <h3 className="text-xl font-semibold mb-4">Editar Proyecto</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Nombre</label>
                    <input type="text" value={editingProjectData.name} onChange={(e) => setEditingProjectData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Descripción</label>
                    <textarea value={editingProjectData.description} onChange={(e) => setEditingProjectData(prev => ({ ...prev, description: e.target.value }))} rows={3} className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 transition" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="block text-sm font-medium text-slate-400">Color</label>
                    <input type="color" value={editingProjectData.color} onChange={(e) => setEditingProjectData(prev => ({ ...prev, color: e.target.value }))} className="w-10 h-10 rounded-lg border-none bg-transparent cursor-pointer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Stack Tecnológico</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <AnimatePresence>
                      {editingProjectData.techStack.map((tech, index) => (
                        <motion.span 
                          key={index} 
                          layout
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="flex items-center gap-2 px-3 py-1 bg-blue-900/50 text-blue-300 border border-blue-700 text-sm rounded-full"
                        >
                          {tech}
                          <button onClick={() => handleRemoveTechStack(index)} className="hover:text-red-400"><X className="h-3 w-3" /></button>
                        </motion.span>
                      ))}
                      </AnimatePresence>
                    </div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Agregar tecnología..." className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition" onKeyPress={(e) => { if (e.key === 'Enter') { handleAddTechStack(e.currentTarget.value); e.currentTarget.value = ''; } }} />
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => { const input = e.currentTarget.previousElementSibling as HTMLInputElement; if (input) { handleAddTechStack(input.value); input.value = ''; } }} className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600"><Plus className="h-4 w-4" /></motion.button>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCancelEditProject} className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600">Cancelar</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSaveProject} className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500">Guardar</motion.button>
                  </div>
                </div>
              </motion.div>
            )}
            
            <motion.div variants={itemVariants} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-4 flex items-center justify-between shadow-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Github className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium">Repositorio GitHub</span>
                </div>
                {currentProject.githubUrl && !isEditingGithubUrl ? (
                  <div className="flex items-center gap-3">
                    <code className="text-sm text-slate-300 bg-slate-900/50 px-2 py-1 rounded border border-slate-700">{currentProject.githubUrl}</code>
                    <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">Ver</a>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleEditGithubUrl} className="text-slate-400 hover:text-white"><Edit3 className="h-4 w-4" /></motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleRemoveGithubUrl} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></motion.button>
                  </div>
                ) : isEditingGithubUrl ? (
                  <div className="flex items-center gap-2">
                    <input type="url" value={githubUrlInput} onChange={(e) => setGithubUrlInput(e.target.value)} placeholder="https://github.com/user/repo" className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm" />
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSaveGithubUrl} className="px-3 py-2 bg-green-600 rounded-lg text-sm">Guardar</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCancelGithubUrl} className="px-3 py-2 bg-slate-600 rounded-lg text-sm">Cancelar</motion.button>
                  </div>
                ) : (
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleEditGithubUrl} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm hover:bg-slate-700">
                    <Plus className="h-4 w-4" />
                    <span>Agregar repositorio</span>
                  </motion.button>
                )}
              </div>
              {currentProject.githubUrl && !isEditingGithubUrl && (
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSyncProject} className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-600/20">
                  <RefreshCw className="h-4 w-4" />
                  <span>Sincronizar</span>
                </motion.button>
              )}
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>Creado el {new Date(currentProject.createdAt).toLocaleDateString()}</span></div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4" /><span>{currentProject.pages.length} páginas</span></div>
              {currentProject.techStack?.length > 0 && (
                <div className="flex items-center gap-2">
                  <span>Stack:</span>
                  <div className="flex gap-1">
                    {currentProject.techStack.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-full">{tech}</span>
                    ))}
                    {currentProject.techStack.length > 3 && <span className="text-slate-500 text-xs">+{currentProject.techStack.length - 3}</span>}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.header>

          <motion.div variants={itemVariants} className="mb-6 flex flex-col gap-4">
            {/* Vistas en la parte superior */}
            <div className="flex items-center gap-1 bg-slate-900/50 border border-slate-800 rounded-lg p-1 shadow-lg">
              {[
                { id: 'kanban', label: 'Kanban', icon: LayoutGrid },
                { id: 'pages', label: 'Páginas', icon: FileText },
                { id: 'structure', label: 'Estructura', icon: FolderTree },
                { id: 'timeline', label: 'Timeline', icon: Clock },
                { id: 'dependencies', label: 'Dependencias', icon: GitBranch },
                { id: 'estudio-mercado', label: 'Estudio de Mercado', icon: BarChart3 },
                { id: 'vistanodos', label: 'Vista Nodos', icon: Circle },
                { id: 'vista-backend', label: 'Vista Backend', icon: Server },
                { id: 'vista-documentos', label: 'Documentos', icon: FileText },
              ].map(view => (
                <button key={view.id} onClick={() => setViewMode(view.id as ViewMode)} className={`relative flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${viewMode === view.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                  {viewMode === view.id && <motion.div layoutId="active-view" className="absolute inset-0 bg-blue-600 rounded-md z-0" />}
                  <view.icon className="h-4 w-4 z-10" />
                  <span className="z-10">{view.label}</span>
                </button>
              ))}
            </div>
            
            {/* Botones organizados en dos filas */}
            <div className="flex flex-col gap-3">
              {/* Primera fila de botones */}
              <div className="flex gap-3 flex-wrap">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsAuthModalOpen(true)} className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-800"><Shield className="h-5 w-5 text-blue-400" /><span>Auth</span></motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsColorsModalOpen(true)} className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-800"><Palette className="h-5 w-5 text-purple-400" /><span>Colores</span></motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsComponentsModalOpen(true)} className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-800"><Package className="h-5 w-5 text-green-400" /><span>Componentes</span></motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsDependenciesModalOpen(true)} className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-800"><Server className="h-5 w-5 text-orange-400" /><span>Elección de Dependencias</span></motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsTemasPopupOpen(true)} className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-800"><Sparkles className="h-5 w-5 text-pink-400" /><span>Temas</span></motion.button>
              </div>
              
              {/* Segunda fila de botones */}
              <div className="flex gap-3 flex-wrap">
                {viewMode === 'structure' && <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsFileModalOpen(true)} className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"><Plus className="h-5 w-5" /><span>Archivo</span></motion.button>}
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsPageModalOpen(true)} className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"><Plus className="h-5 w-5" /><span>Página</span></motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsGeneracionCompletaPopupOpen(true)} className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-500"><Plus className="h-5 w-5" /><span>Generar estructura de paginas y de user storys</span></motion.button>
              </div>
            </div>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 min-h-0"
            >
              {viewMode === 'structure' && <StructureView currentProject={currentProject} fileStats={fileStats} handleEditFile={handleEditFile} handleDeleteFile={handleDeleteFile} handleAddChildFile={handleAddChildFile} setIsFileModalOpen={setIsFileModalOpen} />}
              {viewMode === 'kanban' && <KanbanView currentProject={currentProject} userStoryColumns={userStoryColumns} getUserStoriesByStatus={getUserStoriesByStatus} handleDragOver={handleDragOver} handleDrop={handleDrop} handleDragStart={handleDragStart} openUserStoryModal={openUserStoryModal} handleOpenIaGenerateModal={handleOpenIaGenerateModal} handleOpenEditPageDescriptionModal={handleOpenEditPageDescriptionModal} handleEditUserStory={handleEditUserStory} handleDeleteUserStory={handleDeleteUserStory} handleToggleUserStoryComplete={handleToggleUserStoryComplete} setIsPageModalOpen={setIsPageModalOpen} />}
              {viewMode === 'pages' && <PagesView currentProject={currentProject} userStoryColumns={userStoryColumns} getUserStoriesByStatus={getUserStoriesByStatus} handleDragOver={handleDragOver} handleDrop={handleDrop} handleDragStart={handleDragStart} openUserStoryModal={openUserStoryModal} handleOpenIaGenerateModal={handleOpenIaGenerateModal} handleOpenEditPageDescriptionModal={handleOpenEditPageDescriptionModal} handleEditUserStory={handleEditUserStory} handleDeleteUserStory={handleDeleteUserStory} handleToggleUserStoryComplete={handleToggleUserStoryComplete} onExecuteCompletedStories={handleExecuteCompletedStories} setIsPageModalOpen={setIsPageModalOpen} handleEditPage={handleEditPage} onExecuteAllProjectStories={() => {
        // Función para manejar la ejecución global desde ProjectEdit
        console.log('Ejecutando todas las user stories del proyecto desde ProjectEdit');
      }} />}
              {viewMode === 'vistanodos' && <VistaNodosView currentProject={currentProject} userStoryColumns={userStoryColumns} getUserStoriesByStatus={getUserStoriesByStatus} handleDragOver={handleDragOver} handleDrop={handleDrop} handleDragStart={handleDragStart} openUserStoryModal={openUserStoryModal} handleOpenIaGenerateModal={handleOpenIaGenerateModal} handleEditUserStory={handleEditUserStory} handleDeleteUserStory={handleDeleteUserStory} handleToggleUserStoryComplete={handleToggleUserStoryComplete} onExecuteCompletedStories={handleExecuteCompletedStories} setIsPageModalOpen={setIsPageModalOpen} handleEditPage={handleEditPage} />}
              {viewMode === 'timeline' && <TimelineView currentProject={currentProject} weeks={weeks} pageWeekAssignments={pageWeekAssignments} handleTimelineDragOver={handleTimelineDragOver} handleTimelineDrop={handleTimelineDrop} handleTimelineDragStart={handleTimelineDragStart} />}
              {viewMode === 'dependencies' && <DependenciesView dependencyData={dependencyData} />}
              {viewMode === 'estudio-mercado' && <EstudiodemercadoView currentProject={currentProject} />}
              {viewMode === 'vista-backend' && <VistaBackendView currentProject={currentProject} />}
              {viewMode === 'vista-documentos' && <VistaDocumentosView currentProject={currentProject} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <NewPageModal isOpen={isPageModalOpen} onClose={handleClosePageModal} onSubmit={editingPage ? handleUpdatePage : handleAddPage} initialPage={editingPage} projectId={currentProject?.id} />
      <NewUserStoryModal 
        isOpen={isUserStoryModalOpen} 
        onClose={handleCloseUserStoryModal} 
        onSubmit={editingUserStory ? handleUpdateUserStory : handleAddUserStory} 
        initialUserStory={editingUserStory} 
        projectId={currentProject?.id || ''} 
        pageId={selectedPageId || ''} 
      />
      <NewFileModal isOpen={isFileModalOpen} onClose={handleCloseFileModal} onSubmit={editingFile ? handleUpdateFile : handleAddFile} parentNode={selectedParentNode} initialFile={editingFile} />
      <AnimatePresence>
        {isPromptModalOpen && generatedPrompts && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsPromptModalOpen(false)}
          >
            <motion.div
              className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl max-h-[80vh] overflow-hidden"
              variants={modalContentVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bot className="h-6 w-6 text-purple-400" />
                    <h2 className="text-xl font-semibold text-white">Prompts Generados para Bolt.new</h2>
                  </div>
                  <button
                    onClick={() => setIsPromptModalOpen(false)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-slate-400" />
                  </button>
                </div>
                
                {/* Selector de tipo de prompt */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setSelectedPromptType('completo')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedPromptType === 'completo'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Prompt Completo
                  </button>
                  <button
                    onClick={() => setSelectedPromptType('minimalista')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedPromptType === 'minimalista'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Prompt Minimalista
                  </button>
                </div>
                
                {/* Descripción del prompt seleccionado */}
                <div className="mt-3 text-sm text-slate-400">
                  {selectedPromptType === 'completo' 
                    ? 'Genera una aplicación completa con todas las funcionalidades implementadas'
                    : 'Genera solo la estructura básica con archivos mínimos (Sidebar, App.tsx, GEMINI.md)'
                  }
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {generatedPrompts[selectedPromptType]}
                  </pre>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-700 flex gap-3 justify-end">
                <button
                  onClick={() => setIsPromptModalOpen(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleCopyPrompt}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Copiar {selectedPromptType === 'completo' ? 'Completo' : 'Minimalista'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isIaGenerateModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div 
              className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-2xl w-full max-w-md"
              variants={modalContentVariants}
            >
              <h3 className="text-lg font-semibold mb-4">Generar Historias con IA</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="numUserStories" className="block text-sm text-slate-400 mb-1">Número de Historias</label>
                  <input id="numUserStories" type="number" value={numUserStories} onChange={(e) => setNumUserStories(parseInt(e.target.value, 10))} min="1" max="20" className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 transition" />
                </div>
                <div>
                  <label htmlFor="userStoryType" className="block text-sm text-slate-400 mb-1">Tipo (Opcional)</label>
                  <input id="userStoryType" type="text" value={userStoryType} onChange={(e) => setUserStoryType(e.target.value)} placeholder="Ej: para administradores" className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 transition" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCloseIaGenerateModal} className="px-4 py-2 bg-slate-700 rounded-lg">Cancelar</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleGenerateStoriesWithIa} className="px-4 py-2 bg-blue-600 rounded-lg">Generar</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditPageDescriptionModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div 
              className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-2xl w-full max-w-md"
              variants={modalContentVariants}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Editar Descripción</h3>
                <button onClick={handleCloseEditPageDescriptionModal}><X className="h-5 w-5" /></button>
              </div>
              <textarea value={editingPageDescription} onChange={(e) => setEditingPageDescription(e.target.value)} rows={5} className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 mb-4 focus:ring-2 focus:ring-blue-500 transition" placeholder="Descripción de la página..." />
              <div className="flex justify-end gap-3">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleGeneratePageDescriptionWithAI} className="px-4 py-2 bg-purple-600 rounded-lg">Generar con IA</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleUpdatePageDescription} className="px-4 py-2 bg-blue-600 rounded-lg">Actualizar</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PopupExecutePrompts
        isOpen={isExecutePromptsOpen}
        onClose={handleCloseExecutePrompts}
        page={selectedPageForExecution}
        userStories={userStoriesForExecution}
        selectedUserStoryIds={selectedUserStoryIds}
        onExecuteStory={handleExecuteStory}
        onExecuteAll={handleExecuteAllStories}
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        projectPages={currentProject?.pages || []} // ✅ Pasar las páginas del proyecto
      />
      <ColorsModal 
        isOpen={isColorsModalOpen} 
        onClose={() => setIsColorsModalOpen(false)} 
        projectId={currentProject?.id} 
        onSave={async (colorTheme: string[]) => { 
          if (currentProject) await updateProject(currentProject.id, { colorTheme }); 
        }} 
      />
      <ComponentsModal isOpen={isComponentsModalOpen} onClose={() => setIsComponentsModalOpen(false)} />
      <DependenciesModal isOpen={isDependenciesModalOpen} onClose={() => setIsDependenciesModalOpen(false)} />
      <TemasPopup isOpen={isTemasPopupOpen} onClose={() => setIsTemasPopupOpen(false)} />
      {isGeneracionCompletaPopupOpen && <GeneracionCompletaPopup onClose={() => setIsGeneracionCompletaPopupOpen(false)} />}
<IAPanel 
  projectEditSetters={{
    setIsPageModalOpen,
    setIsUserStoryModalOpen,
    setIsFileModalOpen,
    setViewMode,
    setIsIaGenerateModalOpen,
    setIsGeneracionCompletaPopupOpen,
    setIsEditingProject,
    setEditingProjectData,
    setIsAuthModalOpen,
    setIsColorsModalOpen,
    setIsComponentsModalOpen
  }}
  currentProject={currentProject}
  viewMode={viewMode}
/>
    </div>
  );
}

