import { 
  Eye, BarChart3, Lightbulb, Zap, Target, Brain
} from 'lucide-react';

export interface GenerationModeField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'url';
  placeholder?: string;
  options?: string[];
}

export interface GenerationMode {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  fields: GenerationModeField[];
}

export const visionFocusedModes: GenerationMode[] = [
  {
    id: 'vision-backcast',
    name: 'Visión → Back-cast',
    description: 'Retro-planifica desde la meta a 5 años',
    icon: Eye,
    color: 'from-pink-500 to-rose-600',
    fields: [
      { name: 'vision', label: 'Visión a 5 años', type: 'textarea', placeholder: 'Describe tu visión ambiciosa...' },
      { name: 'metricaEstrella', label: 'Métrica Estrella', type: 'select', options: ['MRR', 'Usuarios activos', 'Transacciones', 'Revenue', 'Market share'] },
      { name: 'valorObjetivo', label: 'Valor Objetivo', type: 'text', placeholder: 'Ej: $100k MRR, 1M usuarios...' }
    ]
  },
  {
    id: 'kpi-booster',
    name: 'KPI Booster',
    description: 'Proyectos ligados a un indicador clave',
    icon: BarChart3,
    color: 'from-green-500 to-emerald-600',
    fields: [
      { name: 'kpi', label: 'KPI a Mejorar', type: 'select', options: ['Churn Rate', 'CAC', 'NPS', 'LTV', 'Conversión', 'Retención', 'ARPU', 'Time to Value'] },
      { name: 'valorActual', label: 'Valor Actual', type: 'text', placeholder: 'Ej: 15%, $50, 7.2...' },
      { name: 'objetivo', label: 'Objetivo Deseado', type: 'text', placeholder: 'Ej: 8%, $30, 8.5...' }
    ]
  },
  {
    id: 'killer-feature-first',
    name: 'Killer-Feature First',
    description: 'Construye alrededor de la "feature soñada"',
    icon: Lightbulb,
    color: 'from-amber-500 to-yellow-600',
    fields: [
      { name: 'feature', label: 'Feature Soñada', type: 'textarea', placeholder: 'Describe la funcionalidad innovadora...' },
      { name: 'publico', label: 'Público Objetivo', type: 'text', placeholder: 'Ej: desarrolladores, marketers, CEOs...' },
      { name: 'problema', label: 'Problema que Resuelve', type: 'textarea', placeholder: 'Qué dolor específico alivia...' }
    ]
  },
  {
    id: 'freemium-hook',
    name: 'Freemium → Hook',
    description: 'Optimiza el time-to-value y activación',
    icon: Zap,
    color: 'from-blue-500 to-cyan-600',
    fields: [
      { name: 'valorInicial', label: 'Valor Inicial Gratuito', type: 'textarea', placeholder: 'Qué valor obtiene el usuario inmediatamente...' },
      { name: 'tiempoActivacion', label: 'Tiempo de Activación', type: 'select', options: ['< 1 minuto', '1-5 minutos', '5-15 minutos', '15-30 minutos'] },
      { name: 'gatilloUpgrade', label: 'Gatillo de Upgrade', type: 'text', placeholder: 'Qué los motiva a pagar...' }
    ]
  },
  {
    id: 'exit-ready-ma-lens',
    name: 'Exit-Ready (M&A Lens)',
    description: 'Diseña proyectos atractivos para ser adquiridos',
    icon: Target,
    color: 'from-purple-500 to-indigo-600',
    fields: [
      { name: 'compradorPotencial', label: 'Comprador Potencial', type: 'text', placeholder: 'Ej: Microsoft, Salesforce, Adobe...' },
      { name: 'sinergiaEstrategica', label: 'Sinergia Estratégica', type: 'textarea', placeholder: 'Por qué les interesaría adquirir esto...' },
      { name: 'horizonteExit', label: 'Horizonte de Exit', type: 'select', options: ['2-3 años', '3-5 años', '5-7 años', '7+ años'] }
    ]
  },
  {
    id: 'nudge-economy-optimizer',
    name: 'Nudge-Economy Optimizer',
    description: 'Introduce nudges conductuales alineados al producto',
    icon: Brain,
    color: 'from-teal-500 to-blue-600',
    fields: [
      { name: 'comportamientoObjetivo', label: 'Comportamiento Objetivo', type: 'text', placeholder: 'Ej: completar perfil, usar feature clave...' },
      { name: 'sesgoCognitivo', label: 'Sesgo Cognitivo a Usar', type: 'select', options: ['Aversión a la pérdida', 'Prueba social', 'Escasez', 'Reciprocidad', 'Compromiso', 'Anclaje'] },
      { name: 'metricaComportamental', label: 'Métrica Comportamental', type: 'text', placeholder: 'Cómo medir el éxito del nudge...' }
    ]
  }
];