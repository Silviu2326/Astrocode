import React, { useState } from 'react';
import { Search, Plus, Play, Pause, Settings, Zap, Brain, Activity, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import './AutomatizacionesPage.css'; // Agregar esta línea

interface Automatizacion {
  id: string;
  nombre: string;
  descripcion: string;
  estado: 'activa' | 'pausada' | 'error';
  ultimaEjecucion: string;
  proximaEjecucion: string;
  tipo: 'programada' | 'trigger' | 'webhook';
}

const AutomatizacionesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');

  // Datos de ejemplo
  const automatizaciones: Automatizacion[] = [
    {
      id: '1',
      nombre: 'Backup Diario de Base de Datos',
      descripcion: 'Realiza backup automático de la base de datos principal cada día a las 2:00 AM',
      estado: 'activa',
      ultimaEjecucion: '2024-01-15 02:00:00',
      proximaEjecucion: '2024-01-16 02:00:00',
      tipo: 'programada'
    },
    {
      id: '2',
      nombre: 'Notificaciones de Sistema',
      descripcion: 'Envía alertas cuando el uso de CPU supera el 80%',
      estado: 'activa',
      ultimaEjecucion: '2024-01-15 14:30:00',
      proximaEjecucion: 'Continua',
      tipo: 'trigger'
    },
    {
      id: '3',
      nombre: 'Sincronización de Usuarios',
      descripcion: 'Sincroniza usuarios con el sistema externo cada 6 horas',
      estado: 'pausada',
      ultimaEjecucion: '2024-01-14 18:00:00',
      proximaEjecucion: 'Pausada',
      tipo: 'programada'
    },
    {
      id: '4',
      nombre: 'Webhook de Pagos',
      descripcion: 'Procesa notificaciones de pagos desde la pasarela',
      estado: 'error',
      ultimaEjecucion: '2024-01-15 10:15:00',
      proximaEjecucion: 'Error',
      tipo: 'webhook'
    }
  ];

  const automatizacionesFiltradas = automatizaciones.filter(auto => {
    const matchesSearch = auto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auto.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filtroEstado === 'todas' || auto.estado === filtroEstado;
    return matchesSearch && matchesFilter;
  });

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'activa': return <CheckCircle className="w-5 h-5 text-nn-lime" />;
      case 'pausada': return <Pause className="w-5 h-5 text-nn-text-muted" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-nn-mag" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activa': return 'bg-nn-bg1 border-nn-lime/30 shadow-neon-lime';
      case 'pausada': return 'bg-nn-bg1 border-nn-text-muted/30';
      case 'error': return 'bg-nn-bg1 border-nn-mag/30 shadow-neon-mag';
      default: return 'bg-nn-bg1';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'programada': return 'text-nn-cyan';
      case 'trigger': return 'text-nn-lime';
      case 'webhook': return 'text-nn-mag';
      default: return 'text-nn-text-soft';
    }
  };

  return (
    <div className="min-h-screen bg-nn-bg0 text-nn-text-strong">
      {/* Header con efecto neural */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-nn-bg0 via-nn-bg1/20 to-nn-bg0"></div>
        <div className="absolute inset-0 animate-flow-lines opacity-30"></div>
        
        <div className="relative px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 glass rounded-xl animate-brain-pulse">
                  <Brain className="w-8 h-8 text-nn-cyan" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-nn-text-strong">
                    Neural Command Center
                  </h1>
                  <p className="text-nn-text-soft mt-1">
                    El software que gobierna a los demás
                  </p>
                </div>
              </div>
              
              <button className="nn-button flex items-center space-x-2 px-6 py-3 glass border border-nn-cyan/30 rounded-xl hover:shadow-neon-cyan transition-all duration-300">
                <Plus className="w-5 h-5" />
                <span>Nueva Automatización</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controles de filtrado */}
      <div className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-2xl p-6 border border-nn-panel-glass/30">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Búsqueda */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-nn-text-muted" />
                <input
                  type="text"
                  placeholder="Buscar automatizaciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-nn-bg1/50 border border-nn-panel-glass/30 rounded-xl text-nn-text-strong placeholder-nn-text-muted focus:border-nn-cyan/50 focus:ring-neon-cyan transition-all duration-300"
                />
              </div>
              
              {/* Filtro por estado */}
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="px-4 py-3 bg-nn-bg1/50 border border-nn-panel-glass/30 rounded-xl text-nn-text-strong focus:border-nn-cyan/50 focus:ring-neon-cyan transition-all duration-300"
              >
                <option value="todas">Todos los estados</option>
                <option value="activa">Activas</option>
                <option value="pausada">Pausadas</option>
                <option value="error">Con errores</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de automatizaciones */}
      <div className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6">
            {automatizacionesFiltradas.map((auto) => (
              <div
                key={auto.id}
                className={`glass rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] ${getEstadoColor(auto.estado)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {getEstadoIcon(auto.estado)}
                      <h3 className="text-xl font-semibold text-nn-text-strong">
                        {auto.nombre}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-nn-bg0/50 ${getTipoColor(auto.tipo)}`}>
                        {auto.tipo.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-nn-text-soft mb-4">
                      {auto.descripcion}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-nn-text-muted" />
                        <span className="text-nn-text-muted">Última ejecución:</span>
                        <span className="text-nn-text-soft">{auto.ultimaEjecucion}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-nn-text-muted" />
                        <span className="text-nn-text-muted">Próxima ejecución:</span>
                        <span className="text-nn-text-soft">{auto.proximaEjecucion}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-6">
                    {auto.estado === 'activa' ? (
                      <button className="p-2 glass rounded-lg border border-nn-text-muted/30 hover:border-nn-mag/50 hover:shadow-neon-mag transition-all duration-300">
                        <Pause className="w-5 h-5 text-nn-text-soft hover:text-nn-mag" />
                      </button>
                    ) : (
                      <button className="p-2 glass rounded-lg border border-nn-lime/30 hover:shadow-neon-lime transition-all duration-300">
                        <Play className="w-5 h-5 text-nn-lime" />
                      </button>
                    )}
                    
                    <button className="p-2 glass rounded-lg border border-nn-text-muted/30 hover:border-nn-cyan/50 hover:shadow-neon-cyan transition-all duration-300">
                      <Settings className="w-5 h-5 text-nn-text-soft hover:text-nn-cyan" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {automatizacionesFiltradas.length === 0 && (
            <div className="text-center py-12">
              <div className="glass rounded-2xl p-8 border border-nn-panel-glass/30">
                <Brain className="w-16 h-16 text-nn-text-muted mx-auto mb-4 animate-brain-pulse" />
                <h3 className="text-xl font-semibold text-nn-text-strong mb-2">
                  No se encontraron automatizaciones
                </h3>
                <p className="text-nn-text-soft">
                  Ajusta los filtros o crea una nueva automatización
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutomatizacionesPage;