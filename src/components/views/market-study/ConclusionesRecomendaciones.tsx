import React from 'react';
import { CheckCircle, ArrowRight, Lightbulb, Target } from 'lucide-react';

interface ConclusionesRecomendacionesProps {
  data?: {
    conclusiones: Array<{
      categoria: string;
      conclusion: string;
      evidencia: string[];
    }>;
    recomendaciones: Array<{
      tipo: string;
      recomendacion: string;
      prioridad: 'Alta' | 'Media' | 'Baja';
      plazo: 'Corto' | 'Medio' | 'Largo';
      recursos: string;
    }>;
    siguientesPasos: Array<{
      paso: string;
      descripcion: string;
      responsable: string;
      fecha: string;
    }>;
    kpis: Array<{
      metrica: string;
      objetivo: string;
      frecuencia: string;
    }>;
  };
  isLoading?: boolean;
  onGenerate?: () => void;
}

const ConclusionesRecomendaciones: React.FC<ConclusionesRecomendacionesProps> = ({
  data,
  isLoading = false,
  onGenerate
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Conclusiones y Recomendaciones
          </h3>
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm"
        >
          {isLoading ? 'Generando...' : 'Generar'}
        </button>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p><strong>Qué responde:</strong> ¿Cuáles son las conclusiones clave y recomendaciones estratégicas?</p>
        <p><strong>Fuentes típicas:</strong> Síntesis de todos los análisis anteriores</p>
        <p><strong>Formato sugerido:</strong> Resumen ejecutivo, plan de acción, roadmap</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* Conclusiones Clave */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-600" />
              Conclusiones Clave
            </h4>
            <div className="space-y-3">
              {data.conclusiones?.map((conclusion, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">{conclusion.categoria}</h5>
                  <p className="text-gray-700 text-sm mb-3">{conclusion.conclusion}</p>
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-xs text-gray-600 font-medium mb-1">Evidencia:</p>
                    <ul className="space-y-1">
                      {conclusion.evidencia?.map((evidencia, idx) => (
                        <li key={idx} className="text-xs text-gray-600">• {evidencia}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendaciones Estratégicas */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Target className="h-4 w-4 mr-2 text-blue-600" />
              Recomendaciones Estratégicas
            </h4>
            <div className="space-y-3">
              {data.recomendaciones?.map((rec, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900">{rec.tipo}</h5>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        rec.prioridad === 'Alta' ? 'bg-red-100 text-red-800' :
                        rec.prioridad === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.prioridad}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {rec.plazo} plazo
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{rec.recomendacion}</p>
                  <p className="text-xs text-gray-600">
                    <strong>Recursos necesarios:</strong> {rec.recursos}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Siguientes Pasos */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-purple-600" />
              Plan de Acción - Siguientes Pasos
            </h4>
            <div className="space-y-2">
              {data.siguientesPasos?.map((paso, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 text-sm">{paso.paso}</h5>
                    <p className="text-gray-600 text-xs">{paso.descripcion}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">{paso.responsable}</p>
                    <p className="text-xs text-gray-500">{paso.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KPIs de Seguimiento */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">KPIs de Seguimiento</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Métrica</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Objetivo</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Frecuencia</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.kpis?.map((kpi, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 text-sm text-gray-900">{kpi.metrica}</td>
                      <td className="px-3 py-2 text-sm text-gray-600">{kpi.objetivo}</td>
                      <td className="px-3 py-2 text-sm text-gray-600">{kpi.frecuencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Haz clic en "Generar" para obtener conclusiones y recomendaciones</p>
        </div>
      )}
    </div>
  );
};

export default ConclusionesRecomendaciones;