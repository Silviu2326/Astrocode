import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Code, Image, FileText, Settings, Database, Globe, Edit, Trash2, Plus } from 'lucide-react';
import { FileNode } from '../types';

interface FileTreeNodeProps {
  node: FileNode;
  level: number;
  onEdit?: (node: FileNode) => void;
  onDelete?: (nodeId: string) => void;
  onAddChild?: (parentNode: FileNode) => void;
}

const getFileIcon = (node: FileNode, isExpanded: boolean) => {
  if (node.type === 'folder') return isExpanded ? FolderOpen : Folder;
  const extension = node.extension?.toLowerCase();
  switch (extension) {
    case 'js': case 'jsx': case 'ts': case 'tsx': case 'vue': case 'py': case 'java': return Code;
    case 'png': case 'jpg': case 'jpeg': case 'gif': case 'svg': case 'webp': return Image;
    case 'md': case 'txt': case 'doc': case 'docx': return FileText;
    case 'json': case 'xml': case 'yml': case 'yaml': return Settings;
    case 'sql': case 'db': return Database;
    case 'html': case 'css': case 'scss': return Globe;
    default: return File;
  }
};

const getFileColor = (node: FileNode) => {
  if (node.type === 'folder') return 'text-blue-400';
  const extension = node.extension?.toLowerCase();
  switch (extension) {
    case 'js': case 'jsx': return 'text-yellow-400';
    case 'ts': case 'tsx': return 'text-blue-400';
    case 'vue': return 'text-green-400';
    case 'py': return 'text-green-500';
    case 'html': return 'text-orange-400';
    case 'css': case 'scss': return 'text-pink-400';
    case 'json': return 'text-yellow-300';
    case 'md': return 'text-slate-400';
    default: return 'text-slate-500';
  }
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'completed': return 'bg-green-900/50 text-green-300';
    case 'modified': return 'bg-blue-900/50 text-blue-300';
    case 'pending': return 'bg-yellow-900/50 text-yellow-300';
    case 'created': return 'bg-purple-900/50 text-purple-300';
    default: return 'bg-slate-700 text-slate-300';
  }
};

export default function FileTreeNode({ node, level, onEdit, onDelete, onAddChild }: FileTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const [showActions, setShowActions] = useState(false);

  const hasChildren = node.children && node.children.length > 0;
  const IconComponent = getFileIcon(node, isExpanded);
  const iconColor = getFileColor(node);

  const handleToggle = () => node.type === 'folder' && setIsExpanded(!isExpanded);
  const handleEdit = (e: React.MouseEvent) => { e.stopPropagation(); onEdit?.(node); };
  const handleDelete = (e: React.MouseEvent) => { e.stopPropagation(); if (window.confirm(`¿Eliminar "${node.name}"?`)) onDelete?.(node.id); };
  const handleAddChild = (e: React.MouseEvent) => { e.stopPropagation(); onAddChild?.(node); };

  return (
    <div className="select-none text-white">
      <div
        className="flex items-center py-1.5 px-2 hover:bg-slate-700/50 rounded-md cursor-pointer group transition-colors"
        style={{ paddingLeft: `${level * 24 + 8}px` }}
        onClick={handleToggle}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex items-center flex-1 min-w-0">
          {node.type === 'folder' && (
            <div className="mr-1.5 flex-shrink-0 w-4 h-4">
              {hasChildren && (isExpanded ? <ChevronDown className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />)}
            </div>
          )}
          <IconComponent className={`h-4 w-4 mr-2 flex-shrink-0 ${iconColor}`} />
          <span className="text-sm truncate flex-1">{node.name}</span>
          {node.status && <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getStatusColor(node.status)}`}>{node.status}</span>}
          {node.size && <span className="ml-2 text-xs text-slate-500">{node.size < 1024 ? `${node.size}B` : `${Math.round(node.size / 1024)}KB`}</span>}
        </div>
        {showActions && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {node.type === 'folder' && <button onClick={handleAddChild} className="p-1 text-slate-400 hover:text-green-400 hover:bg-green-900/50 rounded" title="Agregar"><Plus className="h-3 w-3" /></button>}
            <button onClick={handleEdit} className="p-1 text-slate-400 hover:text-blue-400 hover:bg-blue-900/50 rounded" title="Editar"><Edit className="h-3 w-3" /></button>
            <button onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-900/50 rounded" title="Eliminar"><Trash2 className="h-3 w-3" /></button>
          </div>
        )}
      </div>
      {node.description && <div className="text-xs text-slate-500 italic ml-2 mb-1" style={{ paddingLeft: `${level * 24 + 36}px` }}>{node.description}</div>}
      {node.type === 'folder' && isExpanded && hasChildren && (
        <div>
          {node.children!.map((child) => <FileTreeNode key={child.id} node={child} level={level + 1} onEdit={onEdit} onDelete={onDelete} onAddChild={onAddChild} />)}
        </div>
      )}
    </div>
  );
}
