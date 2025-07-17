import React, { useState } from 'react';

interface UserStory {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  priority: 'Alta' | 'Media' | 'Baja';
  estimatedHours?: number;
  tags?: string[];
}

interface PageUserStories {
  pageName: string;
  userStories: UserStory[];
  totalStories: number;
}

interface UserStoriesDisplayProps {
  userStoriesResults: PageUserStories[];
  totalUserStories: number;
}

const UserStoriesDisplay: React.FC<UserStoriesDisplayProps> = ({ 
  userStoriesResults, 
  totalUserStories 
}) => {
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set());
  const [expandedStories, setExpandedStories] = useState<Set<string>>(new Set());

  const togglePageExpansion = (pageName: string) => {
    const newExpanded = new Set(expandedPages);
    if (newExpanded.has(pageName)) {
      newExpanded.delete(pageName);
    } else {
      newExpanded.add(pageName);
    }
    setExpandedPages(newExpanded);
  };

  const toggleStoryExpansion = (storyId: string) => {
    const newExpanded = new Set(expandedStories);
    if (newExpanded.has(storyId)) {
      newExpanded.delete(storyId);
    } else {
      newExpanded.add(storyId);
    }
    setExpandedStories(newExpanded);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'bg-red-600';
      case 'Media': return 'bg-yellow-600';
      case 'Baja': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'text-red-300';
      case 'Media': return 'text-yellow-300';
      case 'Baja': return 'text-green-300';
      default: return 'text-gray-300';
    }
  };

  if (!userStoriesResults || userStoriesResults.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No hay user stories generadas aún.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          User Stories Generadas ({totalUserStories} total)
        </h3>
        <p className="text-gray-400 text-sm">
          Historias de usuario organizadas por página para guiar el desarrollo.
        </p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {userStoriesResults.map((pageStories, pageIndex) => (
          <div key={pageIndex} className="bg-gray-800 rounded-lg border border-gray-700">
            {/* Header de la página */}
            <div 
              className="p-4 cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={() => togglePageExpansion(pageStories.pageName)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {expandedPages.has(pageStories.pageName) ? (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                    <h4 className="font-semibold text-white">{pageStories.pageName}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                    {pageStories.totalStories} stories
                  </span>
                </div>
              </div>
            </div>

            {/* Contenido expandible */}
            {expandedPages.has(pageStories.pageName) && (
              <div className="px-4 pb-4 space-y-3">
                {pageStories.userStories.map((story, storyIndex) => (
                  <div key={story.id} className="bg-gray-900 rounded border border-gray-600 p-3">
                    {/* Header de la story */}
                    <div 
                      className="cursor-pointer"
                      onClick={() => toggleStoryExpansion(story.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 pr-4">
                          <h5 className="text-sm font-medium text-white mb-1 leading-tight">
                            {story.title}
                          </h5>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(story.priority)} text-white`}>
                            {story.priority}
                          </span>
                          {story.estimatedHours && (
                            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                              {story.estimatedHours}h
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {!expandedStories.has(story.id) && (
                        <p className="text-xs text-gray-400 line-clamp-2">
                          {story.description.substring(0, 120)}...
                        </p>
                      )}
                    </div>

                    {/* Contenido expandible de la story */}
                    {expandedStories.has(story.id) && (
                      <div className="mt-3 space-y-3">
                        <div>
                          <h6 className="text-xs font-medium text-gray-300 mb-1">Descripción:</h6>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {story.description}
                          </p>
                        </div>
                        
                        {story.acceptanceCriteria && story.acceptanceCriteria.length > 0 && (
                          <div>
                            <h6 className="text-xs font-medium text-gray-300 mb-2">Criterios de Aceptación:</h6>
                            <ul className="space-y-1">
                              {story.acceptanceCriteria.map((criteria, criteriaIndex) => (
                                <li key={criteriaIndex} className="text-xs text-gray-400 flex items-start gap-2">
                                  <span className="text-green-400 mt-0.5">✓</span>
                                  <span className="leading-relaxed">{criteria}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {story.tags && story.tags.length > 0 && (
                          <div>
                            <h6 className="text-xs font-medium text-gray-300 mb-1">Tags:</h6>
                            <div className="flex flex-wrap gap-1">
                              {story.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className="text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Total de páginas con stories:</span>
          <span className="text-white font-medium">{userStoriesResults.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-gray-400">Total de user stories:</span>
          <span className="text-white font-medium">{totalUserStories}</span>
        </div>
      </div>
    </div>
  );
};

export default UserStoriesDisplay;