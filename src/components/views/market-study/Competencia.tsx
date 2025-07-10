import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Project } from '../../../types';

interface CompetenciaProps {
  project: Project;
  data?: any;
  onGenerate: () => void;
  isLoading?: boolean;
}

const Competencia: React.FC<CompetenciaProps> = ({ 
  project, 
  data, 
  onGenerate, 
  isLoading = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="bg-indigo-500 p-3 rounded-lg">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            6. Competencia
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            Quiénes son, cuota, diferenciadores
          </p>
          
          <div className="space-y-3">
            {data ? (
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="space-y-4">
                  {data.competidores && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-3">Competidores Principales:</h4>
                      <div className="space-y-3">
                        {data.competidores.map((competidor: any, index: number) => (
                          <div key={index} className="bg-slate-600/30 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-slate-200">{competidor.nombre}</h5>
                              <div className="flex items-center gap-2">
                                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">
                                  {competidor.cuotaMercado}% cuota
                                </span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  competidor.amenaza === 'alta' ? 'bg-red-500/20 text-red-300' :
                                  competidor.amenaza === 'media' ? 'bg-yellow-500/20 text-yellow-300' :
                                  'bg-green-500/20 text-green-300'
                                }`}>
                                  {competidor.amenaza} amenaza
                                </span>
                              </div>
                            </div>
                            <p className="text-slate-400 text-sm mb-2">{competidor.descripcion}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-slate-500">Fortalezas:</span>
                                <ul className="text-slate-400 mt-1">
                                  {competidor.fortalezas?.map((fortaleza: string, i: number) => (
                                    <li key={i}>• {fortaleza}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <span className="text-slate-500">Debilidades:</span>
                                <ul className="text-slate-400 mt-1">
                                  {competidor.debilidades?.map((debilidad: string, i: number) => (
                                    <li key={i}>• {debilidad}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            {competidor.precio && (
                              <div className="mt-2 text-xs">
                                <span className="text-slate-500">Precio:</span>
                                <span className="text-slate-300 ml-1">{competidor.precio}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.matrizCompetitiva && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Matriz Competitiva (Precio vs Valor):</h4>
                      <div className="bg-slate-600/30 rounded p-3">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <div className="font-medium text-slate-300 mb-1">Alto Valor - Bajo Precio:</div>
                            <div className="text-green-400">{data.matrizCompetitiva.altoValorBajoPrecio?.join(', ') || 'Ninguno'}</div>
                          </div>
                          <div>
                            <div className="font-medium text-slate-300 mb-1">Alto Valor - Alto Precio:</div>
                            <div className="text-blue-400">{data.matrizCompetitiva.altoValorAltoPrecio?.join(', ') || 'Ninguno'}</div>
                          </div>
                          <div>
                            <div className="font-medium text-slate-300 mb-1">Bajo Valor - Bajo Precio:</div>
                            <div className="text-yellow-400">{data.matrizCompetitiva.bajoValorBajoPrecio?.join(', ') || 'Ninguno'}</div>
                          </div>
                          <div>
                            <div className="font-medium text-slate-300 mb-1">Bajo Valor - Alto Precio:</div>
                            <div className="text-red-400">{data.matrizCompetitiva.bajoValorAltoPrecio?.join(', ') || 'Ninguno'}</div>
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
              <p className="text-slate-400 mt-1">Scraping o APIs de bases empresariales, Benchmarks financieros</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Fuentes:</span>
              <p className="text-slate-400 mt-1">SABI/Orbis, Crunchbase, web scraping</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Formato:</span>
              <p className="text-slate-400 mt-1">Matriz comparativa (precio–valor)</p>
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

export default Competencia;