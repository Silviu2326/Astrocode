import React from 'react';
import { Shield, AlertTriangle, FileText, ExternalLink } from 'lucide-react';

interface RegulacionBarrerasProps {
  data?: {
    regulaciones: Array<{
      tipo: string;
      descripcion: string;
      impacto: 'Alto' | 'Medio' | 'Bajo';
      cumplimiento: string;
    }>;
    barreras: Array<{
      tipo: string;
      descripcion: string;
      dificultad: 'Alta' | 'Media' | 'Baja';
      solucion: string;
    }>;
    licencias: Array<{
      nombre: string;
      entidad: string;
      tiempo: string;
      costo: string;
    }>;
  };
  isLoading?: boolean;
  onGenerate?: () => void;
}

const RegulacionBarreras: React.FC<RegulacionBarrerasProps> = ({
  data,
  isLoading = false,
  onGenerate
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Regulación y Barreras de Entrada
          </h3>
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 text-sm"
        >
          {isLoading ? 'Generando...' : 'Generar'}
        </button>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p><strong>Qué responde:</strong> ¿Qué regulaciones y barreras legales/técnicas existen?</p>
        <p><strong>Fuentes típicas:</strong> Organismos reguladores, cámaras de comercio, consultores legales</p>
        <p><strong>Formato sugerido:</strong> Matriz de regulaciones, checklist de cumplimiento</p>
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
          {/* Regulaciones */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Regulaciones Aplicables
            </h4>
            <div className="space-y-2">
              {data.regulaciones?.map((reg, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900">{reg.tipo}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      reg.impacto === 'Alto' ? 'bg-red-100 text-red-800' :
                      reg.impacto === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      Impacto {reg.impacto}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{reg.descripcion}</p>
                  <p className="text-gray-500 text-xs">
                    <strong>Cumplimiento:</strong> {reg.cumplimiento}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Barreras de Entrada */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Barreras de Entrada
            </h4>
            <div className="space-y-2">
              {data.barreras?.map((barrera, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900">{barrera.tipo}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      barrera.dificultad === 'Alta' ? 'bg-red-100 text-red-800' :
                      barrera.dificultad === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      Dificultad {barrera.dificultad}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{barrera.descripcion}</p>
                  <p className="text-gray-500 text-xs">
                    <strong>Solución:</strong> {barrera.solucion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Licencias y Permisos */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Licencias y Permisos Requeridos</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Licencia</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Entidad</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tiempo</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Costo</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.licencias?.map((licencia, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 text-sm text-gray-900">{licencia.nombre}</td>
                      <td className="px-3 py-2 text-sm text-gray-600">{licencia.entidad}</td>
                      <td className="px-3 py-2 text-sm text-gray-600">{licencia.tiempo}</td>
                      <td className="px-3 py-2 text-sm text-gray-600">{licencia.costo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Haz clic en "Generar" para analizar las regulaciones y barreras de entrada</p>
        </div>
      )}
    </div>
  );
};

export default RegulacionBarreras;