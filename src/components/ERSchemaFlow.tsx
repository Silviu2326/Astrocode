import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface Field {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}

interface Entity {
  id: string;
  name: string;
  description: string;
  fields: Field[];
  relatedPages?: string[];
}

interface Relationship {
  id: string;
  from: string;
  to: string;
  type: string;
  description: string;
}

interface ERSchema {
  entities: Entity[];
  relationships: Relationship[];
}

interface ERSchemaFlowProps {
  erSchema: ERSchema;
  className?: string;
}

// Componente personalizado para nodos de entidad
const EntityNode = ({ data }: { data: Entity }) => {
  const getFieldTypeColor = (type: string) => {
    switch (type) {
      case 'string': return 'bg-blue-500';
      case 'number': return 'bg-green-500';
      case 'boolean': return 'bg-purple-500';
      case 'date': return 'bg-orange-500';
      case 'reference': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-800 border-2 border-gray-600 rounded-lg shadow-lg min-w-[280px] max-w-[350px]">
      {/* Header de la entidad */}
      <div className="bg-blue-600 text-white p-3 rounded-t-lg">
        <h3 className="font-bold text-lg">{data.name}</h3>
        <p className="text-blue-100 text-sm mt-1">{data.description}</p>
      </div>
      
      {/* Campos */}
      <div className="p-3">
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {data.fields?.map((field, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-gray-700 rounded">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-white font-mono text-sm">{field.name}</span>
                {field.required && (
                  <span className="text-red-400 text-xs">*</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded text-white ${getFieldTypeColor(field.type)}`}>
                  {field.type}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Páginas relacionadas */}
        {data.relatedPages && data.relatedPages.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-600">
            <h4 className="text-xs font-semibold text-gray-400 mb-2">PÁGINAS:</h4>
            <div className="flex flex-wrap gap-1">
              {data.relatedPages.map((pageName, idx) => (
                <span key={idx} className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                  {pageName}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Handles para conexiones */}
      <div className="absolute top-1/2 -left-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white transform -translate-y-1/2" />
      <div className="absolute top-1/2 -right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white transform -translate-y-1/2" />
    </div>
  );
};

const nodeTypes = {
  entity: EntityNode,
};

const ERSchemaFlow: React.FC<ERSchemaFlowProps> = ({ erSchema, className = '' }) => {
  // Generar posiciones automáticas para los nodos
  const generateNodePositions = useCallback((entities: Entity[]) => {
    const positions: { [key: string]: { x: number; y: number } } = {};
    const cols = Math.ceil(Math.sqrt(entities.length));
    const nodeWidth = 350;
    const nodeHeight = 300;
    const spacing = 100;
    
    entities.forEach((entity, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      positions[entity.name] = {
        x: col * (nodeWidth + spacing),
        y: row * (nodeHeight + spacing)
      };
    });
    
    return positions;
  }, []);

  // Crear nodos
  const initialNodes: Node[] = useMemo(() => {
    if (!erSchema?.entities) return [];
    
    const positions = generateNodePositions(erSchema.entities);
    
    return erSchema.entities.map((entity) => ({
      id: entity.name,
      type: 'entity',
      position: positions[entity.name],
      data: entity,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    }));
  }, [erSchema?.entities, generateNodePositions]);

  // Crear edges (relaciones)
  const initialEdges: Edge[] = useMemo(() => {
    if (!erSchema?.relationships) return [];
    
    return erSchema.relationships.map((relationship) => {
      const getEdgeColor = (type: string) => {
        switch (type) {
          case 'oneToOne': return '#10B981'; // green
          case 'oneToMany': return '#F59E0B'; // amber
          case 'manyToMany': return '#8B5CF6'; // violet
          default: return '#6B7280'; // gray
        }
      };
      
      const getRelationshipLabel = (type: string) => {
        switch (type) {
          case 'oneToOne': return '1:1';
          case 'oneToMany': return '1:N';
          case 'manyToMany': return 'N:M';
          default: return type;
        }
      };

      return {
        id: relationship.id,
        source: relationship.from,
        target: relationship.to,
        type: 'smoothstep',
        animated: true,
        style: {
          stroke: getEdgeColor(relationship.type),
          strokeWidth: 2,
        },
        label: getRelationshipLabel(relationship.type),
        labelStyle: {
          fill: getEdgeColor(relationship.type),
          fontWeight: 'bold',
          fontSize: '12px',
        },
        labelBgStyle: {
          fill: '#1F2937',
          fillOpacity: 0.8,
        },
        data: {
          description: relationship.description,
        },
      };
    });
  }, [erSchema?.relationships]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Actualizar nodos y edges cuando cambie el esquema
  React.useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  React.useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  if (!erSchema || !erSchema.entities || erSchema.entities.length === 0) {
    return (
      <div className={`flex items-center justify-center h-96 bg-gray-900 rounded-lg ${className}`}>
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-gray-400 text-lg">No hay esquema ER disponible</p>
          <p className="text-gray-500 text-sm mt-2">Genera un proyecto para ver el diagrama entidad-relación</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-96 bg-gray-900 rounded-lg ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{
          padding: 0.2,
          minZoom: 0.1,
          maxZoom: 1.5,
        }}
        className="bg-gray-900"
      >
        <Background 
          color="#374151" 
          gap={20} 
          size={1}
          variant="dots" as any
        />
        <Controls 
          className="bg-gray-800 border-gray-600"
          style={{
            button: {
              backgroundColor: '#374151',
              color: '#F3F4F6',
              border: '1px solid #4B5563',
            },
          }}
        />
      </ReactFlow>
      
      {/* Leyenda */}
      <div className="absolute bottom-4 left-4 bg-gray-800 p-3 rounded-lg border border-gray-600">
        <h4 className="text-white text-sm font-semibold mb-2">Tipos de Relación</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-green-500"></div>
            <span className="text-gray-300">1:1 - Uno a Uno</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-amber-500"></div>
            <span className="text-gray-300">1:N - Uno a Muchos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-violet-500"></div>
            <span className="text-gray-300">N:M - Muchos a Muchos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERSchemaFlow;