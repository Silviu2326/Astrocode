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

export const marketFocusedModes: GenerationMode[] = [
  /* 1. Benchmark Gap ------------------------------------------------------ */
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
    ],
    examples: [
      {
        input: {
          competidorUrl: 'https://contoso.com',
          paisObjetivo: 'España',
          segmento: 'pymes'
        },
        output: {
          projectName: 'Competitive Gap Analyzer',
          description: 'Dashboard SaaS que compara características y precios de competidores para identificar huecos de producto en el mercado español de pymes.',
          features: [
            'Scraping automático de funcionalidades',
            'Comparativas de pricing en tiempo real',
            'Alertas de oportunidades de diferenciación',
            'Mapa de posicionamiento competitivo',
            'Exportación de reportes PDF'
          ]
        }
      }
    ]
  },

  /* 2. Tendencias 2024+ ---------------------------------------------------- */
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
    ],
    examples: [
      {
        input: {
          sector: 'Healthtech',
          horizonte: 'Medio plazo (1-2 años)',
          region: 'LATAM'
        },
        output: {
          projectName: 'TrendPulse Healthtech',
          description: 'Plataforma de inteligencia que monitoriza micro-tendencias healthtech en LATAM y predice nuevas oportunidades de SaaS.',
          features: [
            'Análisis de datos de inversión y patentes',
            'Panel de menciones en prensa y redes',
            'Modelo de predicción de demanda',
            'Alertas personalizadas',
            'Repositorio de casos de uso emergentes'
          ]
        }
      }
    ]
  },

  /* 3. Regulación-Driven --------------------------------------------------- */
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
    ],
    examples: [
      {
        input: {
          normativa: 'AI Act',
          region: 'UE',
          industria: 'manufactura'
        },
        output: {
          projectName: 'AICheck Compliance',
          description: 'Suite que ayuda a fabricantes europeos a cumplir el AI Act con auditorías automáticas y generación de documentación.',
          features: [
            'Checklist dinámico por nivel de riesgo',
            'Generación automática de reportes',
            'Seguimiento de cumplimiento en tiempo real',
            'Biblioteca de mejores prácticas',
            'Integración con sistemas MLOps'
          ]
        }
      }
    ]
  },

  /* 4. Market-Size Filter -------------------------------------------------- */
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
    ],
    examples: [
      {
        input: {
          tamanoMercado: 'Mediano ($100M-1B)',
          nicho: 'Dentistas en España',
          rentabilidad: 'Alta (>30%)'
        },
        output: {
          projectName: 'DentalBiz Metrics',
          description: 'Herramienta que calcula TAM, SAM, SOM y proyecta márgenes para nichos odontológicos en España.',
          features: [
            'Bases de datos de clínicas',
            'Modelos financieros automáticos',
            'Mapa de competencia',
            'Simulación de escenarios de precios',
            'Exportación a Excel/Slides'
          ]
        }
      }
    ]
  },

  /* 5. Eco-Impact (Green SaaS) -------------------------------------------- */
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
    ],
    examples: [
      {
        input: {
          ods: 'Energía limpia',
          impactoAmbiental: 'Reducción de emisiones en pymes',
          mercadoObjetivo: 'Pequeñas empresas industriales'
        },
        output: {
          projectName: 'CarbonCut SME',
          description: 'Plataforma que cuantifica la huella de carbono y sugiere acciones de reducción para pymes industriales.',
          features: [
            'Calculadora de huella de carbono automatizada',
            'Sugerencias de ahorro energético',
            'Certificados digitales de reducción',
            'Panel de cumplimiento de ODS',
            'Integración con sensores IoT'
          ]
        }
      }
    ]
  },

  /* 6. Gov Tender Radar ---------------------------------------------------- */
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
    ],
    examples: [
      {
        input: {
          tipoLicitacion: 'Digitalización',
          nivelGobierno: 'Nacional',
          presupuestoTipico: '200k-1M'
        },
        output: {
          projectName: 'TenderScope',
          description: 'Sistema que monitoriza licitaciones públicas de digitalización y ayuda a proveedores a calificar oportunidades rápidamente.',
          features: [
            'Scraping diario de portales de contratación',
            'Filtro por presupuesto y sector',
            'Alertas de nuevas licitaciones',
            'Generador de checklist de requisitos',
            'Estimación automática de probabilidad de adjudicación'
          ]
        }
      }
    ]
  },

  /* 7. Localization Edge --------------------------------------------------- */
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
    ],
    examples: [
      {
        input: {
          idioma: 'Euskera',
          aspectoCultural: 'Formalidad y confianza en negocios B2B',
          competenciaLocal: 'Baja'
        },
        output: {
          projectName: 'EuskaDocs CRM',
          description: 'CRM verticalizado que ofrece plantillas y flujos comerciales adaptados lingüística y culturalmente al mercado B2B vasco.',
          features: [
            'Interfaz completa en euskera',
            'Plantillas de correo con tono formal',
            'Integración con ERPs locales',
            'Base de datos de empresas vascas',
            'Cumplimiento de normativa fiscal regional'
          ]
        }
      }
    ]
  },

  /* 8. Suite-Unbundler ----------------------------------------------------- */
  {
    id: 'suite-unbundler',
    name: 'Suite-Unbundler',
    description: '“Despieza” suites gigantes para un vertical',
    icon: Package,
    color: 'from-violet-500 to-purple-600',
    fields: [
      { name: 'suiteGigante', label: 'Suite a Despiezar', type: 'select', options: ['Microsoft 365', 'Google Workspace', 'Salesforce', 'Adobe Creative', 'Atlassian', 'HubSpot'] },
      { name: 'funcionalidadEspecifica', label: 'Funcionalidad Específica', type: 'text', placeholder: 'Ej: solo CRM para inmobiliarias...' },
      { name: 'vertical', label: 'Vertical Objetivo', type: 'text', placeholder: 'Ej: clínicas dentales, bufetes...' }
    ],
    examples: [
      {
        input: {
          suiteGigante: 'Salesforce',
          funcionalidadEspecifica: 'Pipeline visual',
          vertical: 'Clínicas dentales'
        },
        output: {
          projectName: 'DentalPipeline CRM',
          description: 'Aplicación ligera que replica la funcionalidad de pipeline de Salesforce adaptada al flujo de captación y seguimiento de pacientes en clínicas dentales.',
          features: [
            'Pipeline visual personalizable',
            'Recordatorios automáticos de citas',
            'Integración con software de radiografías',
            'Dashboards de ocupación de sillones',
            'Módulo de consentimientos informados digitales'
          ]
        }
      }
    ]
  },

  /* 9. Marketplace-Plugin Hunter ------------------------------------------ */
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
    ],
    examples: [
      {
        input: {
          marketplace: 'Shopify App Store',
          categoriaFaltante: 'Gestión de garantías de producto',
          demandaEstimada: '1k búsquedas mensuales'
        },
        output: {
          projectName: 'WarrantyPro App',
          description: 'Plugin para Shopify que automatiza el registro y seguimiento de garantías de productos, reduciendo devoluciones y mejorando la satisfacción del cliente.',
          features: [
            'Registro automático tras la compra',
            'Portal de reclamaciones para clientes',
            'Alertas de vencimiento de garantía',
            'Dashboard de incidencias',
            'Integración con servicios de soporte'
          ]
        }
      }
    ]
  }
];
