import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Upload, Search, Calendar, Eye, Edit, Trash2, FolderOpen, Plus } from 'lucide-react';
import { Project } from '../../types';
import WordEditor from '../WordEditor';

interface VistaDocumentosViewProps {
  currentProject: Project | null;
}

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'txt' | 'md' | 'xlsx' | 'pptx';
  size: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  tags: string[];
  category: string;
  description?: string;
}

const VistaDocumentosView: React.FC<VistaDocumentosViewProps> = ({ currentProject }) => {
  const [activeSection, setActiveSection] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isWordEditorOpen, setIsWordEditorOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Especificaciones Técnicas.pdf',
      type: 'pdf',
      size: '2.5 MB',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      author: 'Juan Pérez',
      tags: ['especificaciones', 'técnico', 'backend'],
      category: 'Técnico',
      description: 'Documento con las especificaciones técnicas del proyecto'
    },
    {
      id: '2',
      name: 'Manual de Usuario.docx',
      type: 'doc',
      size: '1.8 MB',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18'),
      author: 'María García',
      tags: ['manual', 'usuario', 'guía'],
      category: 'Documentación',
      description: 'Manual completo para usuarios finales'
    },
    {
      id: '3',
      name: 'README.md',
      type: 'md',
      size: '15 KB',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-25'),
      author: 'Carlos López',
      tags: ['readme', 'instalación', 'setup'],
      category: 'Desarrollo',
      description: 'Instrucciones de instalación y configuración'
    },
    {
      id: '4',
      name: 'Análisis de Requisitos.xlsx',
      type: 'xlsx',
      size: '890 KB',
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-22'),
      author: 'Ana Martín',
      tags: ['requisitos', 'análisis', 'funcional'],
      category: 'Análisis',
      description: 'Análisis detallado de requisitos funcionales y no funcionales'
    }
  ]);

  const sections = [
    { id: 'all', name: 'Todos los Documentos', icon: FileText },
    { id: 'recent', name: 'Recientes', icon: Calendar },
    { id: 'categories', name: 'Por Categorías', icon: FolderOpen },
    { id: 'upload', name: 'Subir Documento', icon: Upload }
  ];

  const categories = ['Todos', 'Técnico', 'Documentación', 'Desarrollo', 'Análisis', 'Legal', 'Marketing'];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'doc': case 'docx': return '📝';
      case 'txt': return '📃';
      case 'md': return '📋';
      case 'xlsx': return '📊';
      case 'pptx': return '📈';
      default: return '📄';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || selectedCategory === 'Todos' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveDocument = (content: string, title: string) => {
    const newDocument: Document = {
      id: Date.now().toString(),
      name: `${title}.docx`,
      type: 'doc',
      size: `${Math.round(content.length / 1024)}KB`,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: 'Usuario Actual',
      tags: ['documento', 'word'],
      category: 'Documentación',
      description: `Documento creado: ${title}`
    };
    
    setDocuments(prev => [newDocument, ...prev]);
    console.log('Documento guardado:', { title, content });
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'all':
      case 'recent':
        return (
          <div className="space-y-6">
            {/* Filtros y búsqueda */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar documentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <button
                  onClick={() => setIsWordEditorOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Nuevo Documento
                </button>
              </div>
            </div>

            {/* Lista de documentos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getFileIcon(doc.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{doc.name}</h3>
                      <p className="text-sm text-slate-400 mt-1">{doc.size}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">{doc.category}</span>
                        <span className="text-xs text-slate-500">{doc.author}</span>
                      </div>
                      {doc.description && (
                        <p className="text-sm text-slate-400 mt-2 line-clamp-2">{doc.description}</p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {doc.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700">
                    <span className="text-xs text-slate-500">
                      {doc.updatedAt.toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                        <Eye className="h-4 w-4 text-slate-400" />
                      </button>
                      <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                        <Download className="h-4 w-4 text-slate-400" />
                      </button>
                      <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                        <Edit className="h-4 w-4 text-slate-400" />
                      </button>
                      <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No se encontraron documentos</p>
              </div>
            )}
          </div>
        );

      case 'categories':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.slice(1).map((category) => {
                const categoryDocs = documents.filter(doc => doc.category === category);
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(category);
                      setActiveSection('all');
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <FolderOpen className="h-6 w-6 text-blue-400" />
                      <h3 className="text-white font-medium">{category}</h3>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">{categoryDocs.length}</p>
                    <p className="text-sm text-slate-400">documentos</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case 'upload':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Subir Nuevo Documento</h3>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-400 mb-2">Arrastra y suelta archivos aquí o</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Seleccionar Archivos
                </button>
                <p className="text-xs text-slate-500 mt-2">Formatos soportados: PDF, DOC, DOCX, TXT, MD, XLSX, PPTX</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">{sections.find(s => s.id === activeSection)?.name}</h3>
            <p className="text-slate-400">Contenido en desarrollo para esta sección.</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Vista Documentos</h2>
              <p className="text-slate-400">Gestión y organización de documentos del proyecto</p>
            </div>
          </div>
          <button
            onClick={() => setIsWordEditorOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5" />
            Nuevo Documento
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-green-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span className="text-sm font-medium">{section.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderSectionContent()}
      </motion.div>

      {/* Word Editor Modal */}
      <WordEditor
        isOpen={isWordEditorOpen}
        onClose={() => setIsWordEditorOpen(false)}
        onSave={handleSaveDocument}
      />
    </motion.div>
  );
};

export default VistaDocumentosView;