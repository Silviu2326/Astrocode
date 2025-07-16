import { 
  Cpu,
  Database,
  FileText,
  Link,
  Smartphone,
  Brain,
  Cloud,
  Heart
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

export const techFocusedModes: GenerationMode[] = [
  /* 1. Tech-First --------------------------------------------------------- */
  {
    id: 'tech-first',
    name: 'Tech-First',
    description: 'Parte de una tecnología/tendencia concreta',
    icon: Cpu,
    color: 'from-cyan-500 to-blue-600',
    fields: [
      { name: 'tecnologia', label: 'Tecnología', type: 'select', options: ['LLMs/IA', 'Computer Vision', 'Blockchain', 'IoT', 'AR/VR', 'Edge Computing', 'Quantum Computing', 'Web3'] },
      { name: 'nicho', label: 'Nicho de Aplicación', type: 'text', placeholder: 'Ej: educación, salud, retail...' },
      { name: 'casoUso', label: 'Caso de Uso', type: 'text', placeholder: 'Ej: automatización, análisis, personalización...' }
    ],
    examples: [
      {
        input: {
          tecnologia: 'LLMs/IA',
          nicho: 'Legal',
          casoUso: 'Automatización de contratos'
        },
        output: {
          projectName: 'LegalGPT Draft',
          description: 'Plataforma SaaS que genera borradores de contratos y cláusulas legales mediante LLMs entrenados con jurisprudencia local.',
          features: [
            'Plantillas inteligentes ajustadas a cada jurisdicción',
            'Chat de aclaraciones legales en lenguaje natural',
            'Control de versiones y firmas electrónicas',
            'Detección automática de cláusulas de riesgo',
            'API para integrarse con CRMs de despachos'
          ]
        }
      }
    ]
  },

  /* 2. Datos Internos ------------------------------------------------------ */
  {
    id: 'datos-internos',
    name: 'Datos Internos',
    description: 'Explota feedback o bases de datos propias',
    icon: Database,
    color: 'from-yellow-500 to-orange-600',
    fields: [
      { name: 'tipoFeedback', label: 'Tipo de Datos', type: 'select', options: ['Tickets de soporte', 'Encuestas NPS', 'Reviews de usuarios', 'Analytics de uso', 'Logs de sistema', 'Datos de ventas'] },
      { name: 'volumenDatos', label: 'Volumen de Datos', type: 'text', placeholder: 'Ej: 1000 tickets, 500 encuestas...' },
      { name: 'periodo', label: 'Período', type: 'text', placeholder: 'Ej: últimos 6 meses, último año...' }
    ],
    examples: [
      {
        input: {
          tipoFeedback: 'Tickets de soporte',
          volumenDatos: '3 000 tickets',
          periodo: 'Últimos 6 meses'
        },
        output: {
          projectName: 'SupportInsights AI',
          description: 'Herramienta que analiza tickets de soporte y detecta oportunidades de mejora de producto y FAQ automáticas.',
          features: [
            'Modelo NLP para agrupar incidencias por tema',
            'Dashboard de “pains” con impacto económico estimado',
            'Generador de artículos de ayuda con IA',
            'Alertas de picos de soporte inusuales',
            'Integración con Zendesk y Intercom'
          ]
        }
      }
    ]
  },

  /* 3. Content Leverage ---------------------------------------------------- */
  {
    id: 'content-leverage',
    name: 'Content Leverage',
    description: 'Reutiliza librerías de contenido existentes',
    icon: FileText,
    color: 'from-teal-500 to-green-600',
    fields: [
      { name: 'tipoContenido', label: 'Tipo de Contenido', type: 'select', options: ['Artículos/Blog', 'Videos', 'Podcasts', 'Cursos', 'Documentación', 'Webinars', 'Ebooks'] },
      { name: 'volumen', label: 'Volumen', type: 'text', placeholder: 'Ej: 500 artículos, 100 videos...' },
      { name: 'tematica', label: 'Temática Principal', type: 'text', placeholder: 'Ej: marketing digital, programación...' }
    ],
    examples: [
      {
        input: {
          tipoContenido: 'Videos',
          volumen: '200 videos',
          tematica: 'Marketing digital'
        },
        output: {
          projectName: 'VideoCourse Composer',
          description: 'SaaS que convierte librerías de video en cursos interactivos con quizzes y certificados.',
          features: [
            'Transcripción automática multi-idioma',
            'Generador de quizzes con IA',
            'Certificados con blockchain',
            'Panel de progreso de estudiantes',
            'Marketplace interno para monetizar cursos'
          ]
        }
      }
    ]
  },

  /* 4. API Mash-Up --------------------------------------------------------- */
  {
    id: 'api-mashup',
    name: 'API Mash-Up',
    description: 'Combina varias APIs para crear valor nuevo',
    icon: Link,
    color: 'from-violet-500 to-purple-600',
    fields: [
      { name: 'api1', label: 'Primera API', type: 'select', options: ['Slack', 'Shopify', 'Stripe', 'Google Workspace', 'Salesforce', 'HubSpot', 'Notion', 'Airtable', 'Trello'] },
      { name: 'api2', label: 'Segunda API', type: 'select', options: ['Slack', 'Shopify', 'Stripe', 'Google Workspace', 'Salesforce', 'HubSpot', 'Notion', 'Airtable', 'Trello'] },
      { name: 'casoUso', label: 'Caso de Uso', type: 'text', placeholder: 'Ej: sincronizar datos, automatizar workflows...' }
    ],
    examples: [
      {
        input: {
          api1: 'Slack',
          api2: 'Notion',
          casoUso: 'Automatizar standups'
        },
        output: {
          projectName: 'StandupSync Bot',
          description: 'Bot que recoge actualizaciones diarias en Slack y las publica ordenadas en una base de Notion.',
          features: [
            'Encuestas programadas en Slack',
            'Parser de respuestas con IA para detectar bloqueos',
            'Base de datos Notion con filtros por sprint',
            'Recordatorios automáticos a quien no reporta',
            'Gráfica de actividad del equipo'
          ]
        }
      }
    ]
  },

  /* 5. Data Treasure ------------------------------------------------------- */
  {
    id: 'data-treasure',
    name: 'Data Treasure',
    description: 'Monetiza datos infrautilizados',
    icon: Database,
    color: 'from-amber-500 to-yellow-600',
    fields: [
      { name: 'tipoDatos', label: 'Tipo de Datos', type: 'select', options: ['Datos de comportamiento', 'Datos geográficos', 'Datos de mercado', 'Datos de rendimiento', 'Datos demográficos'] },
      { name: 'fuenteDatos', label: 'Fuente de Datos', type: 'text', placeholder: 'Ej: app móvil, website, sensores IoT...' },
      { name: 'valorPotencial', label: 'Valor Potencial', type: 'textarea', placeholder: 'Cómo se puede monetizar esta información...' }
    ],
    examples: [
      {
        input: {
          tipoDatos: 'Datos de comportamiento',
          fuenteDatos: 'App móvil fitness',
          valorPotencial: 'Venta a marcas deportivas para segmentación'
        },
        output: {
          projectName: 'FitData Marketplace',
          description: 'Plataforma que anonimiza y vende datos de uso de apps fitness a fabricantes de ropa deportiva.',
          features: [
            'Anonymization engine compliant con GDPR',
            'Panel de segmentación por hábitos y región',
            'API para compradores de datos',
            'Revenue-share automático con la app fuente',
            'Modelo de precios por suscripción y por lote'
          ]
        }
      }
    ]
  },

  /* 6. Device-First IoT Bridge -------------------------------------------- */
  {
    id: 'device-first-iot-bridge',
    name: 'Device-First IoT Bridge',
    description: 'Arranca de un hardware/sensor disponible',
    icon: Smartphone,
    color: 'from-blue-500 to-purple-600',
    fields: [
      { name: 'tipoDispositivo', label: 'Tipo de Dispositivo', type: 'select', options: ['Sensores ambientales', 'Wearables', 'Cámaras inteligentes', 'Sensores industriales', 'Dispositivos médicos'] },
      { name: 'datosCapturados', label: 'Datos Capturados', type: 'text', placeholder: 'Ej: temperatura, movimiento, imágenes...' },
      { name: 'aplicacion', label: 'Aplicación Objetivo', type: 'text', placeholder: 'Ej: monitoreo de cultivos, seguridad...' }
    ],
    examples: [
      {
        input: {
          tipoDispositivo: 'Sensores ambientales',
          datosCapturados: 'Temperatura y humedad',
          aplicacion: 'Monitoreo de invernaderos'
        },
        output: {
          projectName: 'GreenhouseGuard',
          description: 'Plataforma IoT que optimiza el clima de invernaderos con sensores y alertas inteligentes.',
          features: [
            'Dashboards en tiempo real',
            'Alertas de condiciones críticas por SMS/WhatsApp',
            'IA que ajusta sistemas de riego y ventilación',
            'Histórico de datos con analítica predictiva',
            'Integración con controladores existentes (Modbus, LoRa)'
          ]
        }
      }
    ]
  },

  /* 7. AI Performance Booster --------------------------------------------- */
  {
    id: 'ai-performance-booster',
    name: 'AI Performance Booster',
    description: 'Mejora el rendimiento de modelos ML actuales',
    icon: Brain,
    color: 'from-pink-500 to-red-600',
    fields: [
      { name: 'tipoModelo', label: 'Tipo de Modelo', type: 'select', options: ['NLP/LLM', 'Computer Vision', 'Predicción', 'Clasificación', 'Recomendación', 'Detección de anomalías'] },
      { name: 'metricaObjetivo', label: 'Métrica a Mejorar', type: 'select', options: ['Precisión', 'Velocidad', 'Eficiencia energética', 'Costo computacional', 'Interpretabilidad'] },
      { name: 'dominioAplicacion', label: 'Dominio de Aplicación', type: 'text', placeholder: 'Ej: diagnóstico médico, trading...' }
    ],
    examples: [
      {
        input: {
          tipoModelo: 'NLP/LLM',
          metricaObjetivo: 'Velocidad',
          dominioAplicacion: 'Chatbots e-commerce'
        },
        output: {
          projectName: 'FastChat Optimizer',
          description: 'SDK que reduce la latencia de LLMs en chatbots de ecommerce mediante distillation y caching inteligente.',
          features: [
            'Distillation pipeline automatizado',
            'Vector cache con embeddings locales',
            'Monitoreo de latencia en tiempo real',
            'AB testing de versiones del modelo',
            'Compatibilidad con OpenAI y HuggingFace'
          ]
        }
      }
    ]
  },

  /* 8. Legacy-to-Cloud ----------------------------------------------------- */
  {
    id: 'legacy-to-cloud',
    name: 'Legacy-to-Cloud',
    description: 'Moderniza software on-prem obsoleto',
    icon: Cloud,
    color: 'from-gray-500 to-blue-600',
    fields: [
      { name: 'sistemaLegacy', label: 'Sistema Legacy', type: 'text', placeholder: 'Ej: ERP de los 90, sistema contable...' },
      { name: 'problemasActuales', label: 'Problemas Actuales', type: 'textarea', placeholder: 'Limitaciones del sistema actual...' },
      { name: 'industria', label: 'Industria', type: 'text', placeholder: 'Ej: manufactura, retail, servicios...' }
    ],
    examples: [
      {
        input: {
          sistemaLegacy: 'ERP AS/400',
          problemasActuales: 'No escalable y sin APIs',
          industria: 'Manufactura'
        },
        output: {
          projectName: 'CloudERP Modernizer',
          description: 'Herramienta low-code que migra flujos de un ERP AS/400 a microservicios en la nube sin interrumpir operaciones.',
          features: [
            'Mapeo automático de tablas a PostgreSQL',
            'Generador de APIs REST y GraphQL',
            'Migración por fases con data-sync',
            'Dashboard de progreso y riesgos',
            'Plantillas de UI responsive en React'
          ]
        }
      }
    ]
  },

  /* 9. Emotion-AI Enhancer ------------------------------------------------- */
  {
    id: 'emotion-ai-enhancer',
    name: 'Emotion-AI Enhancer',
    description: 'Añade análisis emocional en tiempo real',
    icon: Heart,
    color: 'from-rose-500 to-pink-600',
    fields: [
      { name: 'aplicacionBase', label: 'Aplicación Base', type: 'select', options: ['Videoconferencias', 'E-learning', 'Customer service', 'Retail', 'Healthcare', 'Gaming'] },
      { name: 'emocionesObjetivo', label: 'Emociones a Detectar', type: 'text', placeholder: 'Ej: satisfacción, estrés, engagement...' },
      { name: 'accionesRespuesta', label: 'Acciones de Respuesta', type: 'textarea', placeholder: 'Qué hacer cuando se detecta cada emoción...' }
    ],
    examples: [
      {
        input: {
          aplicacionBase: 'Videoconferencias',
          emocionesObjetivo: 'Satisfacción y estrés',
          accionesRespuesta: 'Ajustar layout, alertar al moderador'
        },
        output: {
          projectName: 'EmotionLive SDK',
          description: 'SDK que detecta emociones en videollamadas y dispara acciones en tiempo real para mejorar la experiencia del usuario.',
          features: [
            'Detección facial y análisis de voz',
            'Webhooks para disparar eventos en la app',
            'Panel de métricas de engagement',
            'Modo privacidad compliant con GDPR',
            'Modelos entrenables con datos propios'
          ]
        }
      }
    ]
  }
];
