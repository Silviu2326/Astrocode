import {
  Eye,
  BarChart3,
  Lightbulb,
  Zap,
  Target,
  Brain
} from 'lucide-react';

export interface GenerationModeField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'url';
  placeholder?: string;
  options?: string[];
}

export interface GenerationModeExample {
  input: Record<string, string>;
  output: {
    projectName: string;
    description: string;
    features: string[];
  };
}

export interface GenerationMode {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  fields: GenerationModeField[];
  examples: GenerationModeExample[];
}

export const visionFocusedModes: GenerationMode[] = [
  /* 1. Visión → Back-cast ------------------------------------------------ */
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
    ],
    examples: [
      {
        input: {
          vision: 'Ser la plataforma líder de analítica de huella de carbono para pymes europeas',
          metricaEstrella: 'MRR',
          valorObjetivo: '$200k MRR'
        },
        output: {
          projectName: 'CarbonInsight 360',
          description: 'Suite SaaS que ayuda a pymes europeas a medir, reportar y reducir su huella de carbono con dashboards y recomendaciones automáticas.',
          features: [
            'Integración con ERPs y plataformas de ecommerce',
            'Cálculo de huella en tiempo real',
            'Recomendaciones de reducción basadas en IA',
            'Informes ESG listos para auditoría',
            'Marketplace de proveedores verdes'
          ]
        }
      }
    ]
  },

  /* 2. KPI Booster ------------------------------------------------------- */
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
    ],
    examples: [
      {
        input: {
          kpi: 'Churn Rate',
          valorActual: '15%',
          objetivo: '8%'
        },
        output: {
          projectName: 'RetentionX',
          description: 'Plataforma que detecta señales tempranas de deserción y despliega campañas automáticas de retención.',
          features: [
            'Modelo predictivo de churn',
            'Segmentación dinámica de usuarios en riesgo',
            'Workflows de email y push integrados',
            'Panel de impacto en tiempo real',
            'A/B testing de ofertas de retención'
          ]
        }
      }
    ]
  },

  /* 3. Killer-Feature First --------------------------------------------- */
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
    ],
    examples: [
      {
        input: {
          feature: 'Dashboard con IA que responde preguntas de datos en lenguaje natural',
          publico: 'Product managers',
          problema: 'Difícil obtener insights sin saber SQL'
        },
        output: {
          projectName: 'AskData PM',
          description: 'Herramienta que convierte consultas en lenguaje natural en visualizaciones y métricas accionables.',
          features: [
            'Chatbot de datos con LLMs',
            'Generación automática de gráficos',
            'Slice & dice guiado por IA',
            'Compartir insights con un clic',
            'Plug‑in para Jira y Slack'
          ]
        }
      }
    ]
  },

  /* 4. Freemium → Hook --------------------------------------------------- */
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
    ],
    examples: [
      {
        input: {
          valorInicial: 'Auditoría SEO on‑page gratuita con tips inmediatos',
          tiempoActivacion: '1-5 minutos',
          gatilloUpgrade: 'Comparativa con competidores y keywords premium'
        },
        output: {
          projectName: 'SEOQuick Audit',
          description: 'Herramienta freemium que entrega un informe SEO en 2 minutos y desbloquea análisis competitivo en el plan Pro.',
          features: [
            'Scan de 50 páginas gratis',
            'Tip generator con IA',
            'Ranking de issues priorizados',
            'Benchmark competitivo en plan Pro',
            'Integración con Google Search Console'
          ]
        }
      }
    ]
  },

  /* 5. Exit‑Ready (M&A Lens) -------------------------------------------- */
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
    ],
    examples: [
      {
        input: {
          compradorPotencial: 'Salesforce',
          sinergiaEstrategica: 'Amplía su oferta vertical en salud con un EMR ligero',
          horizonteExit: '3-5 años'
        },
        output: {
          projectName: 'HealthCloud Lite',
          description: 'EMR SaaS enfocado en clínicas medianas diseñado para integrarse nativamente con la plataforma Salesforce.',
          features: [
            'Integración un‑click con Sales & Service Cloud',
            'Modelo de datos compatible HL7/FHIR',
            'App móvil para médicos',
            'Marketplace de apps y add‑ons',
            'Módulo de analítica de pacientes'
          ]
        }
      }
    ]
  },

  /* 6. Nudge‑Economy Optimizer ------------------------------------------ */
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
    ],
    examples: [
      {
        input: {
          comportamientoObjetivo: 'Completar perfil',
          sesgoCognitivo: 'Prueba social',
          metricaComportamental: 'Porcentaje de perfiles completos'
        },
        output: {
          projectName: 'SocialProof Nudger',
          description: 'Widget que muestra cuántos usuarios similares han completado su perfil, impulsando la acción por prueba social.',
          features: [
            'Banner dinámico de usuarios completados',
            'Segmentación por cohortes',
            'Experimentos A/B integrados',
            'Medición de uplift en tiempo real',
            'SDK para React y Vue'
          ]
        }
      }
    ]
  }
];
