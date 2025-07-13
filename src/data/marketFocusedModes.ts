import {
  Eye,
  TrendingUp,
  Shield,
  Filter,
  Leaf,
  Building,
  Globe,
  Package,
  Zap
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

export const marketFocusedModes: GenerationMode[] = [
  {
    id: 'benchmark-gap',
    name: 'Benchmark Gap',
    description: 'Huecos frente a competidores directos',
    icon: Eye,
    color: 'from-purple-500 to-pink-600',
    fields: [
      { name: 'competidorUrl', label: 'URL del Competidor', type: 'url', placeholder: 'https://competidor.com' },
      { name: 'paisObjetivo', label: 'País Objetivo', type: 'text', placeholder: 'Ej: España, México, Argentina...' },
      { name: 'segmento', label: 'Segmento a Analizar', type: 'text', placeholder: 'Ej: pymes, enterprise, B2C...' }
    ]
  },
  {
    id: 'tendencias-2024',
    name: 'Tendencias 2024+',
    description: 'Macro- y micro-tendencias de sector',
    icon: TrendingUp,
    color: 'from-indigo-500 to-purple-600',
    fields: [
      { name: 'sector', label: 'Sector', type: 'text', placeholder: 'Ej: fintech, healthtech, edtech...' },
      { name: 'horizonte', label: 'Horizonte Temporal', type: 'select', options: ['Corto plazo (6-12 meses)', 'Medio plazo (1-2 años)', 'Largo plazo (3-5 años)'] },
      { name: 'region', label: 'Región', type: 'text', placeholder: 'Ej: LATAM, Europa, Global...' }
    ]
  },
  {
    id: 'regulacion-driven',
    name: 'Regulación-Driven',
    description: 'Oportunidades creadas por nuevas normativas',
    icon: Shield,
    color: 'from-gray-500 to-slate-600',
    fields: [
      { name: 'normativa', label: 'Normativa', type: 'select', options: ['GDPR', 'LOPD', 'PCI DSS', 'SOX', 'HIPAA', 'ISO 27001', 'AI Act', 'DMA'] },
      { name: 'region', label: 'Región', type: 'text', placeholder: 'Ej: UE, España, LATAM...' },
      { name: 'industria', label: 'Industria', type: 'text', placeholder: 'Ej: fintech, salud, e-commerce...' }
    ]
  },
  {
    id: 'market-size-filter',
    name: 'Market-Size Filter',
    description: 'Selección por tamaño/rentabilidad de nicho',
    icon: Filter,
    color: 'from-blue-500 to-indigo-600',
    fields: [
      { name: 'tamanoMercado', label: 'Tamaño de Mercado Objetivo', type: 'select', options: ['Micro ($1M-10M)', 'Pequeño ($10M-100M)', 'Mediano ($100M-1B)', 'Grande ($1B+)'] },
      { name: 'nicho', label: 'Nicho Específico', type: 'text', placeholder: 'Ej: dentistas en España, startups B2B...' },
      { name: 'rentabilidad', label: 'Rentabilidad Esperada', type: 'select', options: ['Alta (>30%)', 'Media (15-30%)', 'Estándar (5-15%)'] }
    ]
  },
  {
    id: 'eco-impact-green-saas',
    name: 'Eco-Impact (Green SaaS)',
    description: 'Demanda vinculada a sostenibilidad y ODS',
    icon: Leaf,
    color: 'from-green-500 to-emerald-600',
    fields: [
      { name: 'ods', label: 'ODS Objetivo', type: 'select', options: ['Energía limpia', 'Consumo responsable', 'Acción climática', 'Ciudades sostenibles', 'Vida submarina', 'Vida terrestre'] },
      { name: 'impactoAmbiental', label: 'Impacto Ambiental', type: 'textarea', placeholder: 'Cómo contribuye a la sostenibilidad...' },
      { name: 'mercadoObjetivo', label: 'Mercado Objetivo', type: 'text', placeholder: 'Ej: empresas con certificación B-Corp...' }
    ]
  },
  {
    id: 'gov-tender-radar',
    name: 'Gov Tender Radar',
    description: 'Demandas repetidas en licitaciones públicas',
    icon: Building,
    color: 'from-blue-600 to-cyan-600',
    fields: [
      { name: 'tipoLicitacion', label: 'Tipo de Licitación', type: 'select', options: ['Digitalización', 'Ciberseguridad', 'Gestión documental', 'Atención ciudadana', 'Transparencia', 'Smart cities'] },
      { name: 'nivelGobierno', label: 'Nivel de Gobierno', type: 'select', options: ['Local', 'Regional', 'Nacional', 'Europeo'] },
      { name: 'presupuestoTipico', label: 'Presupuesto Típico', type: 'text', placeholder: 'Ej: 50k-200k, 200k-1M...' }
    ]
  },
  {
    id: 'localization-edge',
    name: 'Localization Edge',
    description: 'Brechas lingüísticas o culturales sin cubrir',
    icon: Globe,
    color: 'from-orange-500 to-red-600',
    fields: [
      { name: 'idioma', label: 'Idioma/Región', type: 'text', placeholder: 'Ej: catalán, euskera, quechua...' },
      { name: 'aspectoCultural', label: 'Aspecto Cultural', type: 'textarea', placeholder: 'Particularidades culturales a considerar...' },
      { name: 'competenciaLocal', label: 'Competencia Local', type: 'select', options: ['Nula', 'Baja', 'Media', 'Alta'] }
    ]
  },
  {
    id: 'suite-unbundler',
    name: 'Suite-Unbundler',
    description: '"Despieza" suites gigantes para un vertical',
    icon: Package,
    color: 'from-violet-500 to-purple-600',
    fields: [
      { name: 'suiteGigante', label: 'Suite a Despiezar', type: 'select', options: ['Microsoft 365', 'Google Workspace', 'Salesforce', 'Adobe Creative', 'Atlassian', 'HubSpot'] },
      { name: 'funcionalidadEspecifica', label: 'Funcionalidad Específica', type: 'text', placeholder: 'Ej: solo CRM para inmobiliarias...' },
      { name: 'vertical', label: 'Vertical Objetivo', type: 'text', placeholder: 'Ej: clínicas dentales, bufetes...' }
    ]
  },
  {
    id: 'marketplace-plugin-hunter',
    name: 'Marketplace-Plugin Hunter',
    description: 'Gaps en app-stores (Shopify, Slack, etc.)',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    fields: [
      { name: 'marketplace', label: 'Marketplace', type: 'select', options: ['Shopify App Store', 'Slack App Directory', 'Chrome Web Store', 'WordPress Plugins', 'Zapier Apps', 'Notion Integrations'] },
      { name: 'categoriaFaltante', label: 'Categoría Faltante', type: 'text', placeholder: 'Ej: gestión de inventario para restaurantes...' },
      { name: 'demandaEstimada', label: 'Demanda Estimada', type: 'text', placeholder: 'Búsquedas mensuales, solicitudes...' }
    ]
  }
];