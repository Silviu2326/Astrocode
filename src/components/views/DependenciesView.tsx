import React from 'react';
import { GitBranch, AlertTriangle, CheckCircle, Clock, Database, Code, Globe } from 'lucide-react';
import { AppPage } from '../../types';

interface DependenciesViewProps {
  dependencyData: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    hasBackend: boolean;
    hasComponents: boolean;
    endpoints: number;
    orphaned: boolean;
  }>;
}

export default function DependenciesView({ dependencyData }: DependenciesViewProps) {
  const completedPages = dependencyData.filter(d => d.status === 'done').length;
  const inProgressPages = dependencyData.filter(d => d.status === 'in-progress').length;
  const orphanedRoutes = dependencyData.filter(d => d.orphaned).length;
  const totalEndpoints = dependencyData.reduce((acc, curr) => acc + curr.endpoints, 0);

  // This is a simplified connection logic. A real implementation would need a more robust graph algorithm.
  const pageConnections = dependencyData.map((page, index, arr) => {
    if (index === 0) return null;
    return {
      from: arr[index - 1].name,
      to: page.name,
      type: ['navigation', 'api', 'component'][index % 3] as 'navigation' | 'api' | 'component',
    };
  }).filter(Boolean);

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case 'navigation': return <Globe className="h-4 w-4" />;
      case 'api': return <Database className="h-4 w-4" />;
      case 'component': return <Code className="h-4 w-4" />;
      default: return <GitBranch className="h-4 w-4" />;
    }
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'navigation': return 'text-blue-400 bg-blue-900/50 border-blue-700';
      case 'api': return 'text-green-400 bg-green-900/50 border-green-700';
      case 'component': return 'text-purple-400 bg-purple-900/50 border-purple-700';
      default: return 'text-slate-400 bg-slate-800/50 border-slate-700';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8 text-white">
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: CheckCircle, color: 'text-green-400', value: completedPages, label: 'Completadas' },
          { icon: Clock, color: 'text-yellow-400', value: inProgressPages, label: 'En Progreso' },
          { icon: AlertTriangle, color: 'text-red-400', value: orphanedRoutes, label: 'Rutas Huérfanas' },
          { icon: Database, color: 'text-blue-400', value: totalEndpoints, label: 'Total Endpoints' },
        ].map(({ icon: Icon, color, value, label }, index) => (
          <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <Icon className={`h-8 w-8 ${color}`} />
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm text-slate-400">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-semibold">Grafo de Dependencias</h3>
          <p className="text-slate-400 text-sm">Relaciones entre páginas, APIs y componentes</p>
        </div>
        <div className="p-6">
          {pageConnections.length > 0 ? (
            <div className="space-y-4">
              {pageConnections.map((connection, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="flex-1 flex items-center gap-2">
                    <span className="font-medium text-sm">{connection.from}</span>
                    <GitBranch className="h-4 w-4 text-slate-500" />
                    <span className="font-medium text-sm">{connection.to}</span>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getConnectionColor(connection.type)}`}>
                    {getConnectionIcon(connection.type)}
                    <span className="capitalize">{connection.type}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <GitBranch className="h-16 w-16 mx-auto text-slate-500 mb-4" />
              <h3 className="text-xl font-medium">No hay dependencias</h3>
              <p className="text-slate-400">Las dependencias se mostrarán aquí.</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg">
          <div className="p-6 border-b border-slate-700">
            <h4 className="text-lg font-semibold flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-400" /><span>Rutas Huérfanas</span></h4>
            <p className="text-slate-400 text-sm">Rutas sin páginas asociadas</p>
          </div>
          <div className="p-6">
            {orphanedRoutes > 0 ? (
              <div className="space-y-2">
                {dependencyData.filter(d => d.orphaned).map((route, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-red-900/30 rounded-lg border border-red-700/50">
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span className="text-red-300 text-sm font-mono">{`/products/orphan/${index}`}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-8 w-8 mx-auto text-green-400 mb-2" />
                <p className="text-sm text-green-300">No hay rutas huérfanas</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg">
          <div className="p-6 border-b border-slate-700">
            <h4 className="text-lg font-semibold">Tipos de Conexión</h4>
          </div>
          <div className="p-6 space-y-3">
            {[
              { icon: Globe, label: 'Navigation', desc: 'Navegación entre páginas', style: 'bg-blue-900/50 text-blue-400 border-blue-700' },
              { icon: Database, label: 'API', desc: 'Llamadas a APIs', style: 'bg-green-900/50 text-green-400 border-green-700' },
              { icon: Code, label: 'Component', desc: 'Componentes compartidos', style: 'bg-purple-900/50 text-purple-400 border-purple-700' },
            ].map(({ icon: Icon, label, desc, style }, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${style}`}>
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </div>
                <span className="text-sm text-slate-400">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg">
          <div className="p-6 border-b border-slate-700">
            <h4 className="text-lg font-semibold">Salud del Proyecto</h4>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Progreso General</span>
                <span className="font-semibold">{dependencyData.length > 0 ? Math.round((completedPages / dependencyData.length) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${dependencyData.length > 0 ? (completedPages / dependencyData.length) * 100 : 0}%` }}></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{dependencyData.length}</p>
                <p className="text-xs text-slate-400">Total Páginas</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{pageConnections.length}</p>
                <p className="text-xs text-slate-400">Conexiones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
