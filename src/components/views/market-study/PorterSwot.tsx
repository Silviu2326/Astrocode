import React from 'react';
import { Shield, Zap, AlertTriangle, Target } from 'lucide-react';

interface PorterSwotProps {
  data?: {
    porter: {
      amenazaNuevos: {
        nivel: 'Alto' | 'Medio' | 'Bajo';
        factores: string[];
      };
      poderProveedores: {
        nivel: 'Alto' | 'Medio' | 'Bajo';
        factores: string[];
      };
      poderCompradores: {
        nivel: 'Alto' | 'Medio' | 'Bajo';
        factores: string[];
      };
      amenazaSustitutos: {
        nivel: 'Alto' | 'Medio' | 'Bajo';
        factores: string[];
      };
      rivalidad: {
        nivel: 'Alto' | 'Medio' | 'Bajo';
        factores: string[];
      };
    };
    swot: {
      fortalezas: string[];
      oportunidades: string[];
      debilidades: string[];
      amenazas: string[];
    };
  };
  isLoading?: boolean;
  onGenerate?: () => void;
}

const PorterSwot: React.FC<PorterSwotProps> = ({
  data,
  isLoading = false,
  onGenerate
}) => {
  const porterForces = [
    { key: 'amenazaNuevos', label: 'Amenaza de Nuevos Entrantes' },
    { key: 'poderProveedores', label: 'Poder de Proveedores' },
    { key: 'poderCompradores', label: 'Poder de Compradores' },
    { key: 'amenazaSustitutos', label: 'Amenaza de Sustitutos' },
    { key: 'rivalidad', label: 'Rivalidad Competitiva' }
  ];

  const swotCategories = [
    { key: 'fortalezas', label: 'Fortalezas', icon: Zap, color: 'green' },
    { key: 'oportunidades', label: 'Oportunidades', icon: Target, color: 'blue' },
    { key: 'debilidades', label: 'Debilidades', icon: AlertTriangle, color: 'yellow' },
    { key: 'amenazas', label: 'Amenazas', icon: Shield, color: 'red' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Análisis Porter & SWOT
          </h3>
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 text-sm"
        >
          {isLoading ? 'Generando...' : 'Generar'}
        </button>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p><strong>Qué responde:</strong> ¿Cuál es la estructura competitiva y posición estratégica?</p>
        <p><strong>Fuentes típicas:</strong> Análisis competitivo, estudios de mercado, evaluación interna</p>
        <p><strong>Formato sugerido:</strong> Diagramas Porter y SWOT, matrices estratégicas</p>
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
          {/* Análisis de Porter */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">5 Fuerzas de Porter</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {porterForces.map((force) => {
                const forceData = data.porter[force.key as keyof typeof data.porter] as {
                  nivel: 'Alto' | 'Medio' | 'Bajo';
                  factores: string[];
                };

                return (
                  <div key={force.key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-medium text-sm text-gray-900">{force.label}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        forceData?.nivel === 'Alto' ? 'bg-red-100 text-red-800' :
                        forceData?.nivel === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {forceData?.nivel}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {forceData?.factores?.map((factor, index) => (
                        <li key={index} className="text-xs text-gray-600">• {factor}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Análisis SWOT */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Análisis SWOT</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {swotCategories.map((category) => {
                const Icon = category.icon;
                const items = data.swot[category.key as keyof typeof data.swot] as string[];

                return (
                  <div key={category.key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <Icon className={`h-5 w-5 mr-2 text-${category.color}-600`} />
                      <h5 className="font-medium text-gray-900">{category.label}</h5>
                    </div>
                    <ul className="space-y-2">
                      {items?.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Haz clic en "Generar" para realizar el análisis Porter & SWOT</p>
        </div>
      )}
    </div>
  );
};

export default PorterSwot;