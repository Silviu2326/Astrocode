import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Project } from '../../../types';

interface ResumenEjecutivoProps {
  project: Project;
  data?: any;
  onGenerate: () => void;
  isLoading?: boolean;
}

const ResumenEjecutivo: React.FC<ResumenEjecutivoProps> = ({ 
  project, 
  data, 
  onGenerate, 
  isLoading = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="bg-blue-500 p-3 rounded-lg">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            1. Resumen Ejecutivo
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            Visión de alto nivel para directivos: tamaño de mercado, brecha que cubre el proyecto, oportunidad
          </p>
          
          {/* Contenido del bloque */}
          <div className="space-y-3">
            {data ? (
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="prose prose-invert prose-sm max-w-none">
                  {data.content || 'Contenido generado aparecerá aquí...'}
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
              <p className="text-slate-400 mt-1">Auto-generado a partir de los puntos clave de los demás bloques</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Formato:</span>
              <p className="text-slate-400 mt-1">½ página en texto plano</p>
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

export default ResumenEjecutivo;