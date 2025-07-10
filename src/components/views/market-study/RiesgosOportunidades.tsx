import React from 'react';
import { AlertTriangle, TrendingUp, Target, Clock } from 'lucide-react';

interface RiesgosOportunidadesProps {
  data?: {
    riesgos: Array<{
      tipo: string;
      descripcion: string;
      probabilidad: 'Alta' | 'Media' | 'Baja';
      impacto: 'Alto' | 'Medio' | 'Bajo';
      mitigacion: string;
    }>;
    oportunidades: Array<{
      tipo: string;
      descripcion: string;
      potencial: 'Alto' | 'Medio' | 'Bajo';
      timeframe: string;
      accion: string;
    }>;
    factoresClave: Array<{
      factor: string;
      importancia: 'Crítico' | 'Alto' | 'Medio';
      descripcion: string;
    }>;
  };
  isLoading?: boolean;
  onGenerate?: () => void;
}

const RiesgosOportunidades: React.FC<RiesgosOportunidadesProps> = ({
  data,
  isLoading = false,
  onGenerate
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Riesgos y Oportunidades
          </h3>
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="px-3 py-1 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 text-sm"
        >
          {isLoading ? 'Generando...' : 'Generar'}
        </button>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p><strong>Qué responde:</strong> ¿Cuáles son los principales riesgos y oportunidades del mercado?</p>
        <p><strong>Fuentes típicas:</strong> Análisis de escenarios, estudios de riesgo, proyecciones de mercado</p>
        <p><strong>Formato sugerido:</strong> Matriz de riesgos, roadmap de oportunidades</p>
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
          {/* Riesgos */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
              Análisis de Riesgos
            </h4>
            <div className="space-y-3">
              {data.riesgos?.map((riesgo, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900">{riesgo.tipo}</h5>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        riesgo.probabilidad === 'Alta' ? 'bg-red-100 text-red-800' :
                        riesgo.probabilidad === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        P: {riesgo.probabilidad}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        riesgo.impacto === 'Alto' ? 'bg-red-100 text-red-800' :
                        riesgo.impacto === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        I: {riesgo.impacto}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{riesgo.descripcion}</p>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-700">
                      <strong>Mitigación:</strong> {riesgo.mitigacion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Oportunidades */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
              Oportunidades de Mercado
            </h4>
            <div className="space-y-3">
              {data.oportunidades?.map((oportunidad, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900">{oportunidad.tipo}</h5>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        oportunidad.potencial === 'Alto' ? 'bg-green-100 text-green-800' :
                        oportunidad.potencial === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {oportunidad.potencial}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {oportunidad.timeframe}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{oportunidad.descripcion}</p>
                  <div className="bg-green-50 rounded p-2">
                    <p className="text-xs text-green-700">
                      <strong>Acción recomendada:</strong> {oportunidad.accion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Factores Clave de Éxito */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Factores Clave de Éxito</h4>
            <div className="space-y-2">
              {data.factoresClave?.map((factor, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    factor.importancia === 'Crítico' ? 'bg-red-100 text-red-800' :
                    factor.importancia === 'Alto' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {factor.importancia}
                  </span>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 text-sm">{factor.factor}</h5>
                    <p className="text-gray-600 text-xs mt-1">{factor.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Haz clic en "Generar" para analizar riesgos y oportunidades</p>
        </div>
      )}
    </div>
  );
};

export default RiesgosOportunidades;