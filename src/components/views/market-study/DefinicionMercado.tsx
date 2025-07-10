import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { Project } from '../../../types';

interface DefinicionMercadoProps {
  project: Project;
  data?: any;
  onGenerate: () => void;
  isLoading?: boolean;
}

const DefinicionMercado: React.FC<DefinicionMercadoProps> = ({ 
  project, 
  data, 
  onGenerate, 
  isLoading = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="bg-green-500 p-3 rounded-lg">
          <Target className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            2. Definición del Mercado
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            Qué problema se resuelve, a quién y en qué geografía/sector
          </p>
          
          {/* Contenido del bloque */}
          <div className="space-y-3">
            {data ? (
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="space-y-3">
                  {data.problema && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-1">Problema que resuelve:</h4>
                      <p className="text-slate-400 text-sm">{data.problema}</p>
                    </div>
                  )}
                  {data.audiencia && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-1">Audiencia objetivo:</h4>
                      <p className="text-slate-400 text-sm">{data.audiencia}</p>
                    </div>
                  )}
                  {data.geografia && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-1">Geografía/Sector:</h4>
                      <p className="text-slate-400 text-sm">{data.geografia}</p>
                    </div>
                  )}
                  {data.keywords && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-1">Palabras clave:</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {data.keywords.map((keyword: string, index: number) => (
                          <span key={index} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                            {keyword}
                          </span>
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
          
          {/* Metadatos */}
          <div className="mt-4 space-y-2 text-xs">
            <div>
              <span className="text-slate-500 font-medium">Datos:</span>
              <p className="text-slate-400 mt-1">Nombre + descripción → NLP para extraer palabras clave, NAICS/NACE, países</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Fuentes:</span>
              <p className="text-slate-400 mt-1">Bases NACE/NAICS, descriptors GPT</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Formato:</span>
              <p className="text-slate-400 mt-1">Párrafo + lista de keywords</p>
            </div>
          </div>
          
          {/* Acciones */}
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

export default DefinicionMercado;