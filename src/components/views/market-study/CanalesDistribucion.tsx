import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { Project } from '../../../types';

interface CanalesDistribucionProps {
  project: Project;
  data?: any;
  onGenerate: () => void;
  isLoading?: boolean;
}

const CanalesDistribucion: React.FC<CanalesDistribucionProps> = ({ 
  project, 
  data, 
  onGenerate, 
  isLoading = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="bg-teal-500 p-3 rounded-lg">
          <Globe className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            8. Canales de Distribución
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            Dónde y cómo se vende actualmente
          </p>
          
          <div className="space-y-3">
            {data ? (
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="space-y-4">
                  {data.canales && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-3">Canales Principales:</h4>
                      <div className="space-y-3">
                        {data.canales.map((canal: any, index: number) => (
                          <div key={index} className="bg-slate-600/30 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-slate-200">{canal.nombre}</h5>
                              <div className="flex items-center gap-2">
                                <span className="text-xs bg-teal-500/20 text-teal-300 px-2 py-1 rounded">
                                  {canal.relevancia}% relevancia
                                </span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  canal.crecimiento > 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                                }`}>
                                  {canal.crecimiento > 0 ? '+' : ''}{canal.crecimiento}% crecimiento
                                </span>
                              </div>
                            </div>
                            <p className="text-slate-400 text-sm mb-2">{canal.descripcion}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-slate-500">Ventajas:</span>
                                <ul className="text-slate-400 mt-1">
                                  {canal.ventajas?.map((ventaja: string, i: number) => (
                                    <li key={i}>• {ventaja}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <span className="text-slate-500">Desventajas:</span>
                                <ul className="text-slate-400 mt-1">
                                  {canal.desventajas?.map((desventaja: string, i: number) => (
                                    <li key={i}>• {desventaja}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            {canal.costoAdquisicion && (
                              <div className="mt-2 text-xs">
                                <span className="text-slate-500">Costo de Adquisición:</span>
                                <span className="text-slate-300 ml-1">{canal.costoAdquisicion}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.mapaCanales && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Mapa de Canales por Efectividad:</h4>
                      <div className="bg-slate-600/30 rounded p-3">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <div className="font-medium text-slate-300 mb-1">Alta Efectividad:</div>
                            <div className="text-green-400">{data.mapaCanales.altaEfectividad?.join(', ') || 'Ninguno'}</div>
                          </div>
                          <div>
                            <div className="font-medium text-slate-300 mb-1">Media Efectividad:</div>
                            <div className="text-yellow-400">{data.mapaCanales.mediaEfectividad?.join(', ') || 'Ninguno'}</div>
                          </div>
                          <div>
                            <div className="font-medium text-slate-300 mb-1">Baja Efectividad:</div>
                            <div className="text-red-400">{data.mapaCanales.bajaEfectividad?.join(', ') || 'Ninguno'}</div>
                          </div>
                          <div>
                            <div className="font-medium text-slate-300 mb-1">Emergentes:</div>
                            <div className="text-blue-400">{data.mapaCanales.emergentes?.join(', ') || 'Ninguno'}</div>
                          </div>
                        </div>
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
              <p className="text-slate-400 mt-1">Marketplace/API ecommerce, Datos de tráfico y ads</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Fuentes:</span>
              <p className="text-slate-400 mt-1">Amazon/SP-API, SimilarWeb, SEMrush</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Formato:</span>
              <p className="text-slate-400 mt-1">Mapa de canales + % relevancia</p>
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

export default CanalesDistribucion;