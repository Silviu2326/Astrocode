import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Code, Shield, Globe, Terminal, Package, Settings, Activity, FileCode } from 'lucide-react';
import { Project } from '../../types';

interface VistaBackendViewProps {
  currentProject: Project | null;
}

const VistaBackendView: React.FC<VistaBackendViewProps> = ({ currentProject }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const sections = [
    { id: 'overview', name: 'Resumen General', icon: Activity },
    { id: 'architecture', name: 'Arquitectura', icon: Server },
    { id: 'database', name: 'Base de Datos', icon: Database },
    { id: 'apis', name: 'APIs y Endpoints', icon: Code },
    { id: 'security', name: 'Seguridad', icon: Shield },
    { id: 'deployment', name: 'Despliegue', icon: Globe },
    { id: 'monitoring', name: 'Monitoreo', icon: Terminal },
    { id: 'dependencies', name: 'Dependencias', icon: Package },
    { id: 'configuration', name: 'Configuración', icon: Settings },
    { id: 'documentation', name: 'Documentación', icon: FileCode }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Estado del Backend</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-lg">
                      <Server className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-green-400 font-medium">Servidor</p>
                      <p className="text-sm text-slate-400">Activo</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <Database className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-blue-400 font-medium">Base de Datos</p>
                      <p className="text-sm text-slate-400">Conectada</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500 p-2 rounded-lg">
                      <Code className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-purple-400 font-medium">APIs</p>
                      <p className="text-sm text-slate-400">15 Endpoints</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'architecture':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Arquitectura del Sistema</h3>
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">Patrón de Arquitectura</h4>
                  <p className="text-slate-300">MVC (Model-View-Controller)</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">Tecnologías</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject?.techStack?.map((tech, index) => (
                      <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'database':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Esquema de Base de Datos</h3>
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">Tablas Principales</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• users - Gestión de usuarios</li>
                    <li>• projects - Proyectos del sistema</li>
                    <li>• pages - Páginas de los proyectos</li>
                    <li>• user_stories - Historias de usuario</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'apis':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Endpoints de la API</h3>
              <div className="space-y-3">
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-mono">GET</span>
                    <span className="text-white font-mono">/api/projects</span>
                    <span className="text-slate-400">- Obtener todos los proyectos</span>
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-mono">POST</span>
                    <span className="text-white font-mono">/api/projects</span>
                    <span className="text-slate-400">- Crear nuevo proyecto</span>
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-mono">PUT</span>
                    <span className="text-white font-mono">/api/projects/:id</span>
                    <span className="text-slate-400">- Actualizar proyecto</span>
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-mono">DELETE</span>
                    <span className="text-white font-mono">/api/projects/:id</span>
                    <span className="text-slate-400">- Eliminar proyecto</span>
                  </div>
                </div>
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
        <div className="flex items-center gap-4">
          <div className="bg-orange-500 p-3 rounded-lg">
            <Server className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Vista Backend</h2>
            <p className="text-slate-400">Gestión y monitoreo del backend del proyecto</p>
          </div>
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
                    ? 'bg-orange-600 text-white'
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
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        {renderSectionContent()}
      </motion.div>
    </motion.div>
  );
};

export default VistaBackendView;