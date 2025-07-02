import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { AppPage } from '../../types';

interface TimelineViewProps {
  currentProject: any;
  weeks: Array<{ start: Date; end: Date; label: string; }>;
  pageWeekAssignments: { [pageId: string]: string };
  handleTimelineDragStart: (e: React.DragEvent, page: AppPage) => void;
  handleTimelineDragOver: (e: React.DragEvent) => void;
  handleTimelineDrop: (e: React.DragEvent, weekId: string) => void;
}

export default function TimelineView({
  currentProject,
  weeks,
  pageWeekAssignments,
  handleTimelineDragStart,
  handleTimelineDragOver,
  handleTimelineDrop,
}: TimelineViewProps) {
  
  const getUnassignedPages = () => {
    return currentProject.pages.filter((page: AppPage) => !Object.keys(pageWeekAssignments).includes(page.id));
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-900/50 text-green-300 border-green-700';
      case 'in-progress': return 'bg-yellow-900/50 text-yellow-300 border-yellow-700';
      default: return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="pb-8 text-white">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-semibold">Timeline del Proyecto</h3>
          <p className="text-slate-400 text-sm">Planifica y organiza las páginas a lo largo del tiempo.</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {weeks.map((week, index) => (
              <div key={index} className="text-center bg-slate-900/50 border border-slate-700 rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-1">{week.label}</h4>
                <p className="text-xs text-slate-400">
                  {week.start.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })} - {week.end.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {weeks.map((week) => {
              const weekPages = currentProject.pages.filter((p: AppPage) => pageWeekAssignments[p.id] === week.id);
              return (
                <div key={week.id} onDragOver={handleTimelineDragOver} onDrop={(e) => handleTimelineDrop(e, week.id)} className="min-h-[300px] bg-slate-900/30 rounded-lg border-2 border-dashed border-slate-700 p-4">
                  <div className="space-y-3">
                    {weekPages.map((page: AppPage) => (
                      <div key={page.id} draggable onDragStart={(e) => handleTimelineDragStart(e, page)} className="bg-slate-800/70 rounded-lg p-3 border border-slate-700 cursor-move hover:bg-slate-700/90 shadow-lg">
                        <h5 className="font-medium text-sm mb-1">{page.name}</h5>
                        <p className="text-xs text-slate-400 mb-2">{page.route}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusClass(page.status)}`}>
                            {page.status === 'done' ? 'Completada' : page.status === 'in-progress' ? 'En Progreso' : 'Pendiente'}
                          </span>
                          <span className="text-xs text-slate-500">{page.userStories?.length || 0} historias</span>
                        </div>
                      </div>
                    ))}
                    {weekPages.length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-xs">Arrastra páginas aquí</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-xl">
            <div className="p-4 border-b border-slate-700">
              <h4 className="font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Páginas Sin Asignar</span>
                <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full">{getUnassignedPages().length}</span>
              </h4>
            </div>
            <div className="p-4">
              {getUnassignedPages().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {getUnassignedPages().map((page: AppPage) => (
                    <div key={page.id} draggable onDragStart={(e) => handleTimelineDragStart(e, page)} className="bg-slate-800/70 rounded-lg p-3 border border-slate-700 cursor-move hover:bg-slate-700/90 shadow-lg">
                      <h5 className="font-medium text-sm mb-1">{page.name}</h5>
                      <p className="text-xs text-slate-400 mb-2">{page.route}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Todas las páginas están asignadas.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
