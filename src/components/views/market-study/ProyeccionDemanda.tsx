import React from 'react';
import { TrendingUp, Calendar, BarChart3, Target } from 'lucide-react';

interface ProyeccionDemandaProps {
  data?: {
    proyecciones: Array<{
      periodo: string;
      demandaEstimada: number;
      crecimiento: number;
      factores: string[];
    }>;
    escenarios: Array<{
      tipo: 'Optimista' | 'Realista' | 'Pesimista';
      descripcion: string;
      demandaTotal: number;
      probabilidad: number;
    }>;
    drivers: Array<{
      factor: string;
      impacto: 'Alto' | 'Medio' | 'Bajo';
      tendencia: 'Creciente' | 'Estable' | 'Decreciente';
      descripcion: string;
    }>;
    metodologia: {
      enfoque: string;
      fuentes: string[];
      limitaciones: string[];
    };
  };
  isLoading?: boolean;
  onGenerate?: () => void;
}

const ProyeccionDemanda: React.FC<ProyeccionDemandaProps> = ({
  data,
  isLoading = false,
  onGenerate
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Proyección de Demanda
          </h3>
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          {isLoading ? 'Generando...' : 'Generar'}
        </button>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p><strong>Qué responde:</strong> ¿Cómo evolucionará la demanda en el tiempo?</p>
        <p><strong>Fuentes típicas:</strong> Datos históricos, análisis de tendencias, modelos predictivos</p>
        <p><strong>Formato sugerido:</strong> Gráficos de proyección, análisis de escenarios</p>
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
          {/* Proyecciones Temporales */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Proyecciones por Período
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Período</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Demanda Estimada</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Crecimiento</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Factores Clave</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.proyecciones?.map((proyeccion, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900">{proyeccion.periodo}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{formatNumber(proyeccion.demandaEstimada)}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          proyeccion.crecimiento > 0 ? 'bg-green-100 text-green-800' :
                          proyeccion.crecimiento < 0 ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {formatPercentage(proyeccion.crecimiento)}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        <div className="space-y-1">
                          {proyeccion.factores?.slice(0, 2).map((factor, idx) => (
                            <div key={idx} className="text-xs">• {factor}</div>
                          ))}
                          {proyeccion.factores?.length > 2 && (
                            <div className="text-xs text-gray-400">+{proyeccion.factores.length - 2} más</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Análisis de Escenarios */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Análisis de Escenarios
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.escenarios?.map((escenario, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className={`font-medium text-sm ${
                      escenario.tipo === 'Optimista' ? 'text-green-700' :
                      escenario.tipo === 'Realista' ? 'text-blue-700' :
                      'text-red-700'
                    }`}>
                      {escenario.tipo}
                    </h5>
                    <span className="text-xs text-gray-500">{escenario.probabilidad}%</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{escenario.descripcion}</p>
                  <div className={`text-center p-2 rounded ${
                    escenario.tipo === 'Optimista' ? 'bg-green-50' :
                    escenario.tipo === 'Realista' ? 'bg-blue-50' :
                    'bg-red-50'
                  }`}>
                    <div className="text-lg font-bold text-gray-900">
                      {formatNumber(escenario.demandaTotal)}
                    </div>
                    <div className="text-xs text-gray-600">Demanda Total</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drivers de Demanda */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Drivers de Demanda
            </h4>
            <div className="space-y-3">
              {data.drivers?.map((driver, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900">{driver.factor}</h5>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        driver.impacto === 'Alto' ? 'bg-red-100 text-red-800' :
                        driver.impacto === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {driver.impacto}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        driver.tendencia === 'Creciente' ? 'bg-green-100 text-green-800' :
                        driver.tendencia === 'Estable' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {driver.tendencia}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{driver.descripcion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Metodología */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Metodología y Consideraciones</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 text-sm mb-2">Enfoque</h5>
                  <p className="text-gray-600 text-xs">{data.metodologia?.enfoque}</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 text-sm mb-2">Fuentes de Datos</h5>
                  <ul className="space-y-1">
                    {data.metodologia?.fuentes?.map((fuente, index) => (
                      <li key={index} className="text-gray-600 text-xs">• {fuente}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 text-sm mb-2">Limitaciones</h5>
                  <ul className="space-y-1">
                    {data.metodologia?.limitaciones?.map((limitacion, index) => (
                      <li key={index} className="text-gray-600 text-xs">• {limitacion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Haz clic en "Generar" para crear las proyecciones de demanda</p>
        </div>
      )}
    </div>
  );
};

export default ProyeccionDemanda;