import React from 'react';
import { Edit, Trash2, Clock, Flag, CheckCircle, Circle, PlayCircle } from 'lucide-react';
import { UserStory } from '../types';

interface UserStoryCardProps {
  userStory: UserStory;
  onEdit: (userStory: UserStory) => void;
  onDelete: (userStoryId: string) => void;
  onToggleComplete?: (userStoryId: string, completed: boolean) => void;
  showPageInfo?: boolean;
  pageTitle?: string;
  isCompleted?: boolean;
}

const priorityConfig = {
  low: { color: 'text-green-400', bg: 'bg-green-900/50 border-green-700', label: 'Baja' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-900/50 border-yellow-700', label: 'Media' },
  high: { color: 'text-red-400', bg: 'bg-red-900/50 border-red-700', label: 'Alta' },
};

const statusConfig = {
  pending: { icon: Circle, color: 'text-slate-400', bg: 'bg-slate-700/50 border-slate-600', label: 'Por hacer' },
  'in-progress': { icon: PlayCircle, color: 'text-blue-400', bg: 'bg-blue-900/50 border-blue-700', label: 'En progreso' },
  completed: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-900/50 border-green-700', label: 'Completado' },
};

export default function UserStoryCard({ userStory, onEdit, onDelete, onToggleComplete, showPageInfo = false, pageTitle, isCompleted = false }: UserStoryCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Eliminar esta historia de usuario?')) onDelete(userStory.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(userStory);
  };

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete?.(userStory.id, !isCompleted);
  };

  const StatusIcon = statusConfig[userStory.status].icon;

  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition-all group cursor-pointer shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <input type="checkbox" checked={isCompleted} onChange={handleToggleComplete} onClick={(e) => e.stopPropagation()} className="w-4 h-4 mt-0.5 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-600" />
          <h5 className={`font-medium text-sm flex-1 pr-2 ${isCompleted ? 'text-slate-500 line-through' : 'text-white'}`}>{userStory.title}</h5>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleEdit} className="p-1 text-slate-400 hover:text-blue-400 hover:bg-blue-900/50 rounded" title="Editar"><Edit className="h-3 w-3" /></button>
          <button onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-900/50 rounded" title="Eliminar"><Trash2 className="h-3 w-3" /></button>
        </div>
      </div>
      <p className="text-slate-400 text-xs mb-3 line-clamp-2">{userStory.description}</p>
      {showPageInfo && pageTitle && (
        <div className="mb-2 px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300 border border-slate-600">
          <span className="font-medium text-white">Página:</span> {pageTitle}
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${priorityConfig[userStory.priority].bg}`}>
            <Flag className={`h-3 w-3 ${priorityConfig[userStory.priority].color}`} />
            <span className={priorityConfig[userStory.priority].color}>{priorityConfig[userStory.priority].label}</span>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${statusConfig[userStory.status].bg}`}>
            <StatusIcon className={`h-3 w-3 ${statusConfig[userStory.status].color}`} />
            <span className={statusConfig[userStory.status].color}>{statusConfig[userStory.status].label}</span>
          </div>
        </div>
        {userStory.estimatedHours && (
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="h-3 w-3" />
            <span>{userStory.estimatedHours}h</span>
          </div>
        )}
      </div>
      {userStory.acceptanceCriteria?.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-medium text-slate-300 mb-1">Criterios de aceptación:</p>
          <ul className="text-xs text-slate-400 space-y-1">
            {userStory.acceptanceCriteria.slice(0, 2).map((criteria, index) => (
              <li key={index} className="flex items-start gap-1.5"><span className="mt-0.5">•</span><span className="line-clamp-1">{criteria.text}</span></li>
            ))}
            {userStory.acceptanceCriteria.length > 2 && <li className="text-slate-500 text-xs">+{userStory.acceptanceCriteria.length - 2} más...</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
