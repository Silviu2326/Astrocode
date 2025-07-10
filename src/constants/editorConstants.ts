import { List, FileText, TrendingUp, Users, AlertCircle, Zap, Sparkles, Brain } from 'lucide-react';
import { SlashCommand, AITemplate } from '../types/WordEditorTypes';

export const FONT_SIZES = ['10', '12', '14', '16', '18', '20', '24', '28', '32', '36'];
export const FONT_FAMILIES = ['Arial', 'Times New Roman', 'Helvetica', 'Georgia', 'Verdana', 'Courier New'];

export const SLASH_COMMANDS: SlashCommand[] = [
  { 
    command: '/esquema', 
    description: 'Generar índice detallado del documento', 
    icon: <List className="h-4 w-4" />,
    prompt: 'Escribe un índice detallado para un documento sobre: {tema}. Incluye secciones principales, subsecciones y puntos clave.'
  },
  // ... resto de comandos
];

export const AI_TEMPLATES: AITemplate[] = [
  {
    id: 'market-brief',
    name: 'Brief de Mercado',
    category: 'Negocio',
    description: 'Análisis completo del mercado objetivo',
    prompt: 'Genera un brief de mercado para {producto} en el segmento {segmento}',
    fields: [
      { name: 'producto', placeholder: 'Nombre del producto', required: true },
      { name: 'segmento', placeholder: 'Segmento de mercado', required: true }
    ]
  },
  // ... resto de plantillas
];