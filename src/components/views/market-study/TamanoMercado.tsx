import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Project } from '../../../types';

interface TamanoMercadoProps {
  project: Project;
  data?: any;
  onGenerate: () => void;
  isLoading?: boolean;
}

const TamanoMercado: React.FC<TamanoMercadoProps> = ({ 
  project, 
  data, 
  onGenerate, 
  isLoading = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="bg-red-500 p-3 rounded-lg">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            4. Tamaño de Mercado (TAM · SAM · SOM)
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            Volumen total, accesible y objetivo
          </p>
          
          <div className="space-y-3">
            {data ? (
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="space-y-4">
                  {data.tam && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{data.tam.valor}</div>
                          <div className="text-xs text-blue-300">TAM (Total Addressable Market)</div>
                          <div className="text-xs text-slate-400 mt-1">{data.tam.descripcion}</div>
                        </div>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{data.sam.valor}</div>
                          <div className="text-xs text-green-300">SAM (Serviceable Addressable Market)</div>
                          <div className="text-xs text-slate-400 mt-1">{data.sam.descripcion}</div>
                        </div>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">{data.som.valor}</div>
                          <div className="text-xs text-purple-300">SOM (Serviceable Obtainable Market)</div>
                          <div className="text-xs text-slate-400 mt-1">{data.som.descripcion}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {data.serieHistorica && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Serie Histórica:</h4>
                      <div className="bg-slate-600/30 rounded p-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          {data.serieHistorica.map((año: any, index: number) => (
                            <div key={index} className="text-center">
                              <div className="font-medium text-slate-200">{año.año}</div>
                              <div className="text-slate-400">{año.valor}</div>
                            </div>
                          ))}
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
              <p className="text-slate-400 mt-1">Censos, reportes de consultoras, Series de ventas históricas</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Fuentes:</span>
              <p className="text-slate-400 mt-1">OECD, IBISWorld, Statista, INE</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Formato:</span>
              <p className="text-slate-400 mt-1">Serie temporal + cifra anual actual</p>
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

export default TamanoMercado;