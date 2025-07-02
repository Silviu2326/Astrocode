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
  const totalSections = 13;
  const progressPercentage = (completedSections / totalSections) * 100;

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

      {/* Componentes de bloques individuales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <ResumenEjecutivo 
          data={marketData['resumen-ejecutivo']}
          onGenerate={() => handleGenerateSection('resumen-ejecutivo')}
          isLoading={loadingStates['resumen-ejecutivo']}
        />
        
        <DefinicionMercado 
          data={marketData['definicion-mercado']}
          onGenerate={() => handleGenerateSection('definicion-mercado')}
          isLoading={loadingStates['definicion-mercado']}
        />
        
        <SegmentacionPersonas 
          data={marketData['segmentacion-personas']}
          onGenerate={() => handleGenerateSection('segmentacion-personas')}
          isLoading={loadingStates['segmentacion-personas']}
        />
        
        <TamanoMercado 
          data={marketData['tamano-mercado']}
          onGenerate={() => handleGenerateSection('tamano-mercado')}
          isLoading={loadingStates['tamano-mercado']}
        />
        
        <TendenciasCrecimiento 
          data={marketData['tendencias-crecimiento']}
          onGenerate={() => handleGenerateSection('tendencias-crecimiento')}
          isLoading={loadingStates['tendencias-crecimiento']}
        />
        
        <Competencia 
          data={marketData['competencia']}
          onGenerate={() => handleGenerateSection('competencia')}
          isLoading={loadingStates['competencia']}
        />
        
        <PricingDisposicion 
          data={marketData['pricing-disposicion']}
          onGenerate={() => handleGenerateSection('pricing-disposicion')}
          isLoading={loadingStates['pricing-disposicion']}
        />
        
        <CanalesDistribucion 
          data={marketData['canales-distribucion']}
          onGenerate={() => handleGenerateSection('canales-distribucion')}
          isLoading={loadingStates['canales-distribucion']}
        />
        
        <RegulacionBarreras 
          data={marketData['regulacion-barreras']}
          onGenerate={() => handleGenerateSection('regulacion-barreras')}
          isLoading={loadingStates['regulacion-barreras']}
        />
        
        <AnalisisPestle 
          data={marketData['analisis-pestle']}
          onGenerate={() => handleGenerateSection('analisis-pestle')}
          isLoading={loadingStates['analisis-pestle']}
        />
        
        <PorterSwot 
          data={marketData['porter-swot']}
          onGenerate={() => handleGenerateSection('porter-swot')}
          isLoading={loadingStates['porter-swot']}
        />
        
        <ProyeccionDemanda 
          data={marketData['proyeccion-demanda']}
          onGenerate={() => handleGenerateSection('proyeccion-demanda')}
          isLoading={loadingStates['proyeccion-demanda']}
        />
        
        <RiesgosOportunidades 
          data={marketData['riesgos-oportunidades']}
          onGenerate={() => handleGenerateSection('riesgos-oportunidades')}
          isLoading={loadingStates['riesgos-oportunidades']}
        />
        
        <ConclusionesRecomendaciones 
          data={marketData['conclusiones-recomendaciones']}
          onGenerate={() => handleGenerateSection('conclusiones-recomendaciones')}
          isLoading={loadingStates['conclusiones-recomendaciones']}
        />
      </div>

      {/* Botones de acción */}
      <div className="flex flex-wrap gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          onClick={() => {
            // Generar todos los bloques secuencialmente
            const sections = [
              'resumen-ejecutivo', 'definicion-mercado', 'segmentacion-personas',
              'tamano-mercado', 'tendencias-crecimiento', 'competencia',
              'pricing-disposicion', 'canales-distribucion', 'regulacion-barreras',
              'analisis-pestle', 'porter-swot', 'proyeccion-demanda',
              'riesgos-oportunidades', 'conclusiones-recomendaciones'
            ];
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