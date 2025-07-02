import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { Project } from '../../../types';

interface SegmentacionPersonasProps {
  project: Project;
  data?: any;
  onGenerate: () => void;
  isLoading?: boolean;
}

const SegmentacionPersonas: React.FC<SegmentacionPersonasProps> = ({ 
  project, 
  data, 
  onGenerate, 
  isLoading = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="bg-purple-500 p-3 rounded-lg">
          <Users className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            3. Segmentación & Buyer Personas
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            Cómo se divide la demanda y perfiles tipo
          </p>
          
          <div className="space-y-3">
            {data ? (
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="space-y-3">
                  {data.segmentos && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Segmentos identificados:</h4>
                      <div className="space-y-2">
                        {data.segmentos.map((segmento: any, index: number) => (
                          <div key={index} className="bg-slate-600/30 rounded p-3">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-slate-200">{segmento.nombre}</h5>
                              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                                {segmento.porcentaje}%
                              </span>
                            </div>
                            <p className="text-slate-400 text-sm mb-2">{segmento.descripcion}</p>
                            {segmento.tam && (
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div>
                                  <span className="text-slate-500">TAM:</span>
                                  <span className="text-slate-300 ml-1">{segmento.tam}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500">SAM:</span>
                                  <span className="text-slate-300 ml-1">{segmento.sam}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500">SOM:</span>
                                  <span className="text-slate-300 ml-1">{segmento.som}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.personas && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Buyer Personas:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {data.personas.map((persona: any, index: number) => (
                          <div key={index} className="bg-slate-600/30 rounded p-3">
                            <h5 className="font-medium text-slate-200 mb-1">{persona.nombre}</h5>
                            <p className="text-slate-400 text-xs mb-2">{persona.descripcion}</p>
                            <div className="space-y-1 text-xs">
                              <div><span className="text-slate-500">Edad:</span> <span className="text-slate-300">{persona.edad}</span></div>
                              <div><span className="text-slate-500">Ingresos:</span> <span className="text-slate-300">{persona.ingresos}</span></div>
                              <div><span className="text-slate-500">Motivaciones:</span> <span className="text-slate-300">{persona.motivaciones}</span></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-700/20 rounded-lg p-4 border-2 border-dashed border-slate-600">
                <p className="text-slate-500 text-center">No hay datos generados aún</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 space-y-2 text-xs">
            <div>
              <span className="text-slate-500 font-medium">Datos:</span>
              <p className="text-slate-400 mt-1">Datos demográficos/firmográficos públicos, Clasificación SIC/NAICS, Social listening stats</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Fuentes:</span>
              <p className="text-slate-400 mt-1">INE/Eurostat, Crunchbase, LinkedIn Ads API</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Formato:</span>
              <p className="text-slate-400 mt-1">Tabla de segmentos con TAM/SAM/SOM</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className={`text-xs px-2 py-1 rounded ${
              data ? 'text-green-400 bg-green-400/10' : 'text-slate-500 bg-slate-700/50'
            }`}>
              {data ? 'Completado' : 'No iniciado'}
            </span>
            <button 
              onClick={onGenerate}
              disabled={isLoading}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Generando...' : 'Generar →'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SegmentacionPersonas;