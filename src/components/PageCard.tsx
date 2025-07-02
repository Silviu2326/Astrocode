import React from 'react';
import { Edit, Trash2, Calendar, Flag, Clock, CheckCircle, AlertTriangle, Bug, FileText, Layers } from 'lucide-react';
import { AppPage } from '../types';

interface PageCardProps {
  page: AppPage;
  onEdit: (page: AppPage) => void;
  onDelete: (pageId: string) => void;
  isWipLimitExceeded?: boolean;
}

const priorityConfig = {
  low: { color: 'text-green-400', bg: 'bg-green-900/50', border: 'border-green-700', label: 'Baja' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-900/50', border: 'border-yellow-700', label: 'Media' },
  high: { color: 'text-red-400', bg: 'bg-red-900/50', border: 'border-red-700', label: 'Alta' },
};

const typeConfig = {
  page: { icon: FileText, color: 'text-blue-400', bg: 'bg-blue-900/50', border: 'border-blue-700', label: 'Página' },
  epic: { icon: Layers, color: 'text-purple-400', bg: 'bg-purple-900/50', border: 'border-purple-700', label: 'Epic' },
  bug: { icon: Bug, color: 'text-red-400', bg: 'bg-red-900/50', border: 'border-red-700', label: 'Bug' },
};

export default function PageCard({ page, onEdit, onDelete, isWipLimitExceeded = false }: PageCardProps) {
  const getDueDateColor = () => {
    if (!page.dueDate) return 'border-slate-700';
    const diffDays = (new Date(page.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays < 0) return 'border-red-500/70 bg-red-900/30';
    if (diffDays <= 4) return 'border-yellow-500/70 bg-yellow-900/30';
    return 'border-green-500/70 bg-green-900/30';
  };

  const acceptanceStats = (() => {
    if (!page.userStories?.length) return { total: 0, completed: 0, ciPassed: 0 };
    let total = 0, completed = 0, ciPassed = 0;
    page.userStories.forEach(story => {
      if (story.acceptanceCriteria) {
        total += story.acceptanceCriteria.length;
        completed += story.acceptanceCriteria.filter(ac => ac.completed).length;
        ciPassed += story.acceptanceCriteria.filter(ac => ac.ciTestPassed).length;
      }
    });
    return { total, completed, ciPassed };
  })();

  const typeInfo = typeConfig[page.type || 'page'];
  const TypeIcon = typeInfo.icon;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Eliminar esta página?')) onDelete(page.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(page);
  };

  return (
    <div className={`bg-slate-800/70 border rounded-lg p-4 hover:bg-slate-800 hover:shadow-lg transition-all group cursor-pointer relative ${isWipLimitExceeded ? 'border-red-500/70 shadow-red-500/20' : getDueDateColor()}`}>
      {isWipLimitExceeded && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 animate-pulse">
          <AlertTriangle className="h-3 w-3" />
        </div>
      )}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-white text-sm">{page.title}</h4>
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${typeInfo.bg} ${typeInfo.border}`}>
              <TypeIcon className={`h-3 w-3 ${typeInfo.color}`} />
              <span className={typeInfo.color}>{typeInfo.label}</span>
            </div>
          </div>
          {page.storyPoints && <div className="text-xs text-slate-400 mb-1">{page.storyPoints} pts</div>}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleEdit} className="p-1 text-slate-400 hover:text-blue-400 hover:bg-blue-900/50 rounded" title="Editar"><Edit className="h-3 w-3" /></button>
          <button onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-900/50 rounded" title="Eliminar"><Trash2 className="h-3 w-3" /></button>
        </div>
      </div>
      <p className="text-slate-300 text-xs mb-3 line-clamp-2">{page.description}</p>
      {acceptanceStats.total > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Criterios Aceptación</span>
            <span>{acceptanceStats.completed}/{acceptanceStats.total}</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-1.5 mb-1">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(acceptanceStats.completed / acceptanceStats.total) * 100}%` }} />
          </div>
          {acceptanceStats.ciPassed > 0 && (
            <div className="flex items-center gap-1 text-xs text-green-400">
              <CheckCircle className="h-3 w-3" />
              <span>{acceptanceStats.ciPassed} tests CI pasados</span>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${priorityConfig[page.priority].bg} ${priorityConfig[page.priority].border}`}>
          <Flag className={`h-3 w-3 ${priorityConfig[page.priority].color}`} />
          <span className={priorityConfig[page.priority].color}>{priorityConfig[page.priority].label}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          {page.dueDate && (
            <div className={`flex items-center gap-1 ${getDueDateColor().includes('red') ? 'text-red-400' : getDueDateColor().includes('yellow') ? 'text-yellow-400' : 'text-green-400'}`}>
              <Clock className="h-3 w-3" />
              <span>{new Date(page.dueDate).toLocaleDateString()}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-slate-400">
            <Calendar className="h-3 w-3" />
            <span>{new Date(page.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
