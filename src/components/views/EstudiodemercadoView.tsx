import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText } from 'lucide-react';
import { Project } from '../../types';

// Importar todos los componentes de bloques
import ResumenEjecutivo from './market-study/ResumenEjecutivo';
import DefinicionMercado from './market-study/DefinicionMercado';
import SegmentacionPersonas from './market-study/SegmentacionPersonas';
import TamanoMercado from './market-study/TamanoMercado';
import TendenciasCrecimiento from './market-study/TendenciasCrecimiento';
import Competencia from './market-study/Competencia';
import PricingDisposicion from './market-study/PricingDisposicion';
import CanalesDistribucion from './market-study/CanalesDistribucion';
import RegulacionBarreras from './market-study/RegulacionBarreras';
import AnalisisPestle from './market-study/AnalisisPestle';
import PorterSwot from './market-study/PorterSwot';
import ProyeccionDemanda from './market-study/ProyeccionDemanda';
import RiesgosOportunidades from './market-study/RiesgosOportunidades';
import ConclusionesRecomendaciones from './market-study/ConclusionesRecomendaciones';

interface EstudiodemercadoViewProps {
  currentProject: Project | null;
}

interface MarketData {
  content?: string;
  generatedAt?: string;
  [key: string]: unknown;
}

const EstudiodemercadoView: React.FC<EstudiodemercadoViewProps> = ({ currentProject }) => {
  const [marketData, setMarketData] = useState<Record<string, MarketData>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<string>('resumen-ejecutivo');

  // Configuración de todos los tabs/bloques
  const tabs = [
    { id: 'resumen-ejecutivo', name: 'Resumen Ejecutivo', component: ResumenEjecutivo },
    { id: 'definicion-mercado', name: 'Definición de Mercado', component: DefinicionMercado },
    { id: 'segmentacion-personas', name: 'Segmentación y Personas', component: SegmentacionPersonas },
    { id: 'tamano-mercado', name: 'Tamaño de Mercado', component: TamanoMercado },
    { id: 'tendencias-crecimiento', name: 'Tendencias y Crecimiento', component: TendenciasCrecimiento },
    { id: 'competencia', name: 'Competencia', component: Competencia },
    { id: 'pricing-disposicion', name: 'Pricing y Disposición', component: PricingDisposicion },
    { id: 'canales-distribucion', name: 'Canales de Distribución', component: CanalesDistribucion },
    { id: 'regulacion-barreras', name: 'Regulación y Barreras', component: RegulacionBarreras },
    { id: 'analisis-pestle', name: 'Análisis PESTLE', component: AnalisisPestle },
    { id: 'porter-swot', name: 'Porter y SWOT', component: PorterSwot },
    { id: 'proyeccion-demanda', name: 'Proyección de Demanda', component: ProyeccionDemanda },
    { id: 'riesgos-oportunidades', name: 'Riesgos y Oportunidades', component: RiesgosOportunidades },
    { id: 'conclusiones-recomendaciones', name: 'Conclusiones y Recomendaciones', component: ConclusionesRecomendaciones }
  ];

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400">No hay proyecto seleccionado</p>
      </div>
    );
  }

  const handleGenerateSection = async (sectionId: string) => {
    setLoadingStates(prev => ({ ...prev, [sectionId]: true }));
    
    try {
      // Aquí iría la lógica para generar cada sección
      // Por ahora simulamos con un timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular datos generados
      setMarketData(prev => ({
        ...prev,
        [sectionId]: {
          content: `Contenido generado para ${sectionId}`,
          generatedAt: new Date().toISOString()
        }
      }));
    } catch (error) {
      console.error('Error generando sección:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [sectionId]: false }));
    }
  };

  const completedSections = Object.keys(marketData).length;
  const totalSections = tabs.length;
  const progressPercentage = (completedSections / totalSections) * 100;

  // Encontrar el componente activo
  const activeTabConfig = tabs.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabConfig?.component;

  return (
    <div className="space-y-6">
      {/* Header con métricas */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="h-8 w-8 text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">Estudio de Mercado Completo</h2>
            <p className="text-slate-400">Análisis integral del mercado para {currentProject.name}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{progressPercentage.toFixed(0)}%</div>
            <div className="text-sm text-slate-400">Progreso del estudio</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{totalSections}</div>
            <div className="text-sm text-slate-400">Bloques totales</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400">{completedSections}</div>
            <div className="text-sm text-slate-400">Bloques completados</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-400">{totalSections - completedSections}</div>
            <div className="text-sm text-slate-400">Pendientes</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Progreso general</span>
            <span>{completedSections}/{totalSections} bloques</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navegación de tabs */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <div className="overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {tabs.map((tab) => {
              const isCompleted = marketData[tab.id];
              const isActive = activeTab === tab.id;
              const isLoading = loadingStates[tab.id];
              
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap
                    ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : isCompleted
                        ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                        : isLoading
                        ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    {isLoading && (
                      <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {isCompleted && !isLoading && (
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                    <span>{tab.name}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenido del tab activo */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        {ActiveComponent && (
          <ActiveComponent
            project={currentProject}
            data={marketData[activeTab]}
            onGenerate={() => handleGenerateSection(activeTab)}
            isLoading={loadingStates[activeTab] || false}
          />
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex flex-wrap gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          onClick={() => {
            // Generar todos los bloques secuencialmente
            const sections = tabs.map(tab => tab.id);
            sections.forEach((section, index) => {
              setTimeout(() => handleGenerateSection(section), index * 1000);
            });
          }}
        >
          <BarChart3 className="h-5 w-5" />
          Generar Estudio Completo
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <FileText className="h-5 w-5" />
          Exportar Resultados
        </motion.button>
      </div>
    </div>
  );
};

export default EstudiodemercadoView;