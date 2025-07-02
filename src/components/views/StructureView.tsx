import React, { useState } from 'react';
import { FolderTree, Folder, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { FileNode } from '../../types';

interface StructureViewProps {
  currentProject: any;
  fileStats: { files: number; folders: number; completed: number; pending: number; };
  handleEditFile: (file: FileNode) => void;
  handleDeleteFile: (fileId: string) => void;
  handleAddChildFile: (parentNode: FileNode) => void;
  setIsFileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TreeNode {
  name: string;
  path: string;
  type: 'folder' | 'file';
  children: TreeNode[];
  description?: string;
  _id?: string;
}

export default function StructureView({
  currentProject,
  fileStats,
  handleEditFile,
  handleDeleteFile,
  handleAddChildFile,
  setIsFileModalOpen
}: StructureViewProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  // Console logs para debug
  console.log('=== StructureView Debug ===');
  console.log('currentProject:', currentProject);
  console.log('currentProject.fileStructure:', currentProject?.fileStructure);
  console.log('fileStats:', fileStats);
  console.log('========================');

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const buildTreeStructure = (folders: any[], files: any[]): TreeNode[] => {
    const tree: TreeNode[] = [];
    const pathMap = new Map<string, TreeNode>();

    // Crear nodos para todas las carpetas
    folders.forEach((folder: any) => {
      const node: TreeNode = {
        name: folder.name,
        path: folder.path,
        type: 'folder',
        children: [],
        _id: folder._id
      };
      pathMap.set(folder.path, node);
    });

    // Crear nodos para todos los archivos
    files.forEach((file: any) => {
      const node: TreeNode = {
        name: file.name,
        path: file.path,
        type: 'file',
        children: [],
        description: file.description,
        _id: file._id
      };
      pathMap.set(file.path, node);
    });

    // Organizar en estructura de árbol
    pathMap.forEach((node, path) => {
      const parentPath = path.substring(0, path.lastIndexOf('/'));
      if (parentPath && pathMap.has(parentPath)) {
        pathMap.get(parentPath)!.children.push(node);
      } else {
        // Es un nodo raíz
        tree.push(node);
      }
    });

    // Ordenar: carpetas primero, luego archivos
    const sortNodes = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.sort((a, b) => {
        if (a.type === 'folder' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'folder') return 1;
        return a.name.localeCompare(b.name);
      }).map(node => ({
        ...node,
        children: sortNodes(node.children)
      }));
    };

    return sortNodes(tree);
  };

  const renderTreeNode = (node: TreeNode, depth: number = 0): React.ReactNode => {
    const isExpanded = expandedFolders.has(node.path);
    const hasChildren = node.children.length > 0;
    const indentStyle = { paddingLeft: `${depth * 20 + 8}px` };

    return (
      <div key={node._id || node.path}>
        <div 
          className="flex items-center gap-2 p-2 hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer"
          style={indentStyle}
          onClick={() => node.type === 'folder' && hasChildren && toggleFolder(node.path)}
        >
          {node.type === 'folder' && hasChildren && (
            <button className="p-0.5 hover:bg-slate-600 rounded">
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 text-slate-400" />
              ) : (
                <ChevronRight className="h-3 w-3 text-slate-400" />
              )}
            </button>
          )}
          {node.type === 'folder' && !hasChildren && (
            <div className="w-4 h-4" /> // Espaciador para carpetas vacías
          )}
          {node.type === 'file' && (
            <div className="w-4 h-4" /> // Espaciador para archivos
          )}
          
          {node.type === 'folder' ? (
            <Folder className="h-4 w-4 text-blue-400 flex-shrink-0" />
          ) : (
            <FileText className="h-4 w-4 text-green-400 flex-shrink-0" />
          )}
          
          <span className="text-slate-300 flex-grow">{node.name}</span>
          
          {node.description && (
            <span className="text-xs text-slate-400 truncate max-w-xs">
              {node.description}
            </span>
          )}
          
          <span className="text-xs text-slate-500 ml-2">
            {node.path.split('/').pop()}
          </span>
        </div>
        
        {node.type === 'folder' && hasChildren && isExpanded && (
          <div>
            {node.children.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderFileStructure = () => {
    const fileStructure = currentProject.fileStructure;
    console.log('renderFileStructure - fileStructure:', fileStructure);
    
    if (!fileStructure || (!fileStructure.folders && !fileStructure.files)) {
      console.log('No hay fileStructure o está vacío');
      return (
        <div className="text-center py-16">
          <FolderTree className="h-16 w-16 mx-auto text-slate-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">No hay archivos</h3>
          <p className="text-slate-400 mb-6">Crea la estructura de archivos de tu proyecto.</p>
          <button onClick={() => setIsFileModalOpen(true)} className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors">
            Crear Archivo
          </button>
        </div>
      );
    }

    const folders = fileStructure.folders || [];
    const files = fileStructure.files || [];
    
    console.log('fileStructure.folders:', folders);
    console.log('fileStructure.files:', files);

    const treeStructure = buildTreeStructure(folders, files);
    console.log('treeStructure:', treeStructure);

    return (
      <div className="space-y-1">
        {treeStructure.map(node => renderTreeNode(node))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-8 text-white">
      <div className="lg:col-span-3 bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-semibold">Estructura del Proyecto</h3>
          <p className="text-slate-400 text-sm">Organización jerárquica de archivos y carpetas.</p>
        </div>
        <div className="p-6">
          {renderFileStructure()}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-semibold mb-4">Estadísticas</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span>Archivos</span><span className="font-semibold">{fileStats.files}</span></div>
            <div className="flex justify-between"><span>Carpetas</span><span className="font-semibold">{fileStats.folders}</span></div>
            <div className="flex justify-between text-green-400"><span>Completados</span><span className="font-semibold">{fileStats.completed}</span></div>
            <div className="flex justify-between text-yellow-400"><span>Pendientes</span><span className="font-semibold">{fileStats.pending}</span></div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-semibold mb-4">Acciones Rápidas</h4>
          <button onClick={() => setIsFileModalOpen(true)} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/50 border border-blue-500 rounded-lg hover:bg-blue-600/70 transition-colors">
            <FolderTree className="h-4 w-4" />
            <span>Nuevo Archivo/Carpeta</span>
          </button>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-semibold mb-4">Progreso</h4>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Completado</span>
              <span>{fileStats.files > 0 ? Math.round((fileStats.completed / fileStats.files) * 100) : 0}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${fileStats.files > 0 ? (fileStats.completed / fileStats.files) * 100 : 0}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
