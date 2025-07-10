import React from 'react';
import { Globe, TrendingUp, Users, Gavel, Leaf, Cpu } from 'lucide-react';

interface AnalisisPestleProps {
  data?: {
    politico: Array<{
      factor: string;
      impacto: 'Alto' | 'Medio' | 'Bajo';
      descripcion: string;
    }>;
    economico: Array<{
      factor: string;
      impacto: 'Alto' | 'Medio' | 'Bajo';
      descripcion: string;
    }>;
    social: Array<{
      factor: string;
      impacto: 'Alto' | 'Medio' | 'Bajo';
      descripcion: string;
    }>;
    tecnologico: Array<{
      factor: string;
      impacto: 'Alto' | 'Medio' | 'Bajo';
      descripcion: string;
    }>;
    legal: Array<{
      factor: string;
      impacto: 'Alto' | 'Medio' | 'Bajo';
      descripcion: string;
    }>;
    ambiental: Array<{
      factor: string;
      impacto: 'Alto' | 'Medio' | 'Bajo';
      descripcion: string;
    }>;
  };
  isLoading?: boolean;
  onGenerate?: () => void;
}

const AnalisisPestle: React.FC<AnalisisPestleProps> = ({
  data,
  isLoading = false,
  onGenerate
}) => {
  const factorCategories = [
    { key: 'politico', label: 'Político', icon: Gavel, color: 'blue' },
    { key: 'economico', label: 'Económico', icon: TrendingUp, color: 'green' },
    { key: 'social', label: 'Social', icon: Users, color: 'purple' },
    { key: 'tecnologico', label: 'Tecnológico', icon: Cpu, color: 'indigo' },
    { key: 'legal', label: 'Legal', icon: Gavel, color: 'red' },
    { key: 'ambiental', label: 'Ambiental', icon: Leaf, color: 'emerald' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Análisis PESTLE
          </h3>
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 text-sm"
        >
          {isLoading ? 'Generando...' : 'Generar'}
        </button>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p><strong>Qué responde:</strong> ¿Qué factores externos macro afectan al mercado?</p>
        <p><strong>Fuentes típicas:</strong> Informes gubernamentales, estudios económicos, análisis de tendencias</p>
        <p><strong>Formato sugerido:</strong> Matriz PESTLE, análisis de impacto</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {factorCategories.map((category) => {
            const Icon = category.icon;
            const factors = data[category.key as keyof typeof data] as Array<{
              factor: string;
              impacto: 'Alto' | 'Medio' | 'Bajo';
              descripcion: string;
            }>;

            return (
              <div key={category.key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Icon className={`h-5 w-5 mr-2 text-${category.color}-600`} />
                  <h4 className="font-medium text-gray-900">{category.label}</h4>
                </div>
                <div className="space-y-3">
                  {factors?.map((factor, index) => (
                    <div key={index} className="border-l-4 border-gray-200 pl-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm text-gray-900">{factor.factor}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          factor.impacto === 'Alto' ? 'bg-red-100 text-red-800' :
                          factor.impacto === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {factor.impacto}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{factor.descripcion}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Globe className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Haz clic en "Generar" para realizar el análisis PESTLE</p>
        </div>
      )}
    </div>
  );
};

export default AnalisisPestle;