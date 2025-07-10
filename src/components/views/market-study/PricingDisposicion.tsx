import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { Project } from '../../../types';

interface PricingDisposicionProps {
  project: Project;
  data?: any;
  onGenerate: () => void;
  isLoading?: boolean;
}

const PricingDisposicion: React.FC<PricingDisposicionProps> = ({ 
  project, 
  data, 
  onGenerate, 
  isLoading = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="bg-pink-500 p-3 rounded-lg">
          <DollarSign className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            7. Pricing & Disposición a Pagar
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            Rangos de precios, elasticidad
          </p>
          
          <div className="space-y-3">
            {data ? (
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="space-y-4">
                  {data.rangosPrecios && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Rangos de Precios del Mercado:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-green-400">{data.rangosPrecios.bajo}</div>
                          <div className="text-xs text-green-300">Precio Bajo</div>
                          <div className="text-xs text-slate-400 mt-1">{data.rangosPrecios.bajoPorcentaje}% del mercado</div>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-yellow-400">{data.rangosPrecios.medio}</div>
                          <div className="text-xs text-yellow-300">Precio Medio</div>
                          <div className="text-xs text-slate-400 mt-1">{data.rangosPrecios.medioPorcentaje}% del mercado</div>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-red-400">{data.rangosPrecios.alto}</div>
                          <div className="text-xs text-red-300">Precio Alto</div>
                          <div className="text-xs text-slate-400 mt-1">{data.rangosPrecios.altoPorcentaje}% del mercado</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {data.disposicionPagar && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Disposición a Pagar por Segmento:</h4>
                      <div className="space-y-2">
                        {data.disposicionPagar.map((segmento: any, index: number) => (
                          <div key={index} className="bg-slate-600/30 rounded p-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-slate-200 font-medium">{segmento.segmento}</span>
                              <span className="text-pink-400 font-bold">{segmento.precio}</span>
                            </div>
                            <div className="text-xs text-slate-400">
                              <span>Elasticidad: </span>
                              <span className={segmento.elasticidad === 'alta' ? 'text-red-400' : 
                                             segmento.elasticidad === 'media' ? 'text-yellow-400' : 'text-green-400'}>
                                {segmento.elasticidad}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.recomendacionPrecio && (
                    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-pink-300 mb-2">Recomendación de Precio:</h4>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-400">{data.recomendacionPrecio.valor}</div>
                        <div className="text-xs text-pink-300">{data.recomendacionPrecio.estrategia}</div>
                        <div className="text-xs text-slate-400 mt-1">{data.recomendacionPrecio.justificacion}</div>
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
              <p className="text-slate-400 mt-1">Listas de precios online, Encuestas rápidas (Typeform, Pollfish)</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Fuentes:</span>
              <p className="text-slate-400 mt-1">Scrapers, plataformas de encuesta</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Formato:</span>
              <p className="text-slate-400 mt-1">Histograma + recomendación de precio</p>
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

export default PricingDisposicion;