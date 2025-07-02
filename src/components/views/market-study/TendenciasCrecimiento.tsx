import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Project } from '../../../types';

interface TendenciasCrecimientoProps {
  project: Project;
  data?: any;
  onGenerate: () => void;
  isLoading?: boolean;
}

const TendenciasCrecimiento: React.FC<TendenciasCrecimientoProps> = ({ 
  project, 
  data, 
  onGenerate, 
  isLoading = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="bg-yellow-500 p-3 rounded-lg">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            5. Tendencias & Crecimiento
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            CAGR, drivers y barreras
          </p>
          
          <div className="space-y-3">
            {data ? (
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="space-y-3">
                  {data.cagr && (
                    <div className="text-center bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                      <div className="text-3xl font-bold text-yellow-400">{data.cagr}%</div>
                      <div className="text-sm text-yellow-300">CAGR Proyectado</div>
                      <div className="text-xs text-slate-400 mt-1">{data.periodoCAGR}</div>
                    </div>
                  )}
                  {data.drivers && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Drivers de Crecimiento:</h4>
                      <ul className="space-y-1">
                        {data.drivers.map((driver: string, index: number) => (
                          <li key={index} className="text-slate-400 text-sm flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            {driver}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {data.barreras && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Barreras y Riesgos:</h4>
                      <ul className="space-y-1">
                        {data.barreras.map((barrera: string, index: number) => (
                          <li key={index} className="text-slate-400 text-sm flex items-start gap-2">
                            <span className="text-red-400 mt-1">•</span>
                            {barrera}
                          </li>
                        ))}
                      </ul>
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
              <p className="text-slate-400 mt-1">Time series de ventas, búsquedas, inversión VC, Índices macro (PIB, CPI)</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Fuentes:</span>
              <p className="text-slate-400 mt-1">Google Trends, PitchBook, FMI, BCE</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Formato:</span>
              <p className="text-slate-400 mt-1">Gráfico CAGR + bullet points</p>
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

export default TendenciasCrecimiento;