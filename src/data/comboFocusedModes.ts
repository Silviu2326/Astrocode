import {
  Target,
  TrendingUp,
  Database,
  Eye,
  Smartphone,
  Heart,
  BarChart3,
  Cpu,
  FileText,
  Shield,
  Building,
  Brain,
  Table,
  Leaf,
  Globe,
  Cloud,
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
  fusedMethods: string;
  whyItWorks: string;
  examples: GenerationModeExample[];
}

export const comboFocusedModes: GenerationMode[] = [
  /* 1. Pain‑KPI Match ---------------------------------------------------- */
  {
    id: 'pain-kpi-match',
    name: 'Pain-KPI Match',
    description: 'Ataca un dolor REAL y lo liga a un indicador que la empresa mide a diario',
    icon: Target,
    color: 'from-red-500 to-orange-600',
    fusedMethods: '🎯 Dolores → Proyectos + 🚀 KPI Booster',
    whyItWorks: 'Ataca un dolor REAL y lo liga a un indicador que la empresa mide a diario.',
    fields: [
      { name: 'nicho', label: 'Nicho de Mercado', type: 'text', placeholder: 'Ej: startups SaaS, e-commerce, consultorías...' },
      { name: 'dolor', label: 'Dolor Principal', type: 'textarea', placeholder: 'Describe el problema específico que enfrentan...' },
      { name: 'kpi', label: 'KPI a Mejorar', type: 'select', options: ['Churn Rate', 'CAC', 'NPS', 'LTV', 'Conversión', 'Retención', 'ARPU', 'Time to Value'] },
      { name: 'valorActual', label: 'Valor Actual del KPI', type: 'text', placeholder: 'Ej: 15%, $50, 7.2...' },
      { name: 'objetivo', label: 'Objetivo Deseado', type: 'text', placeholder: 'Ej: 8%, $30, 8.5...' }
    ],
    examples: [
      {
        input: {
          nicho: 'Startups SaaS',
          dolor: 'Alto churn debido a onboarding confuso',
          kpi: 'Churn Rate',
          valorActual: '12%',
          objetivo: '5%'
        },
        output: {
          projectName: 'OnboardFlow',
          description: 'Módulo de onboarding guiado con IA que personaliza los pasos iniciales según el rol del usuario para reducir churn.',
          features: [
            'Guías interactivas contextuales',
            'Segmentación automática de usuarios',
            'A/B testing de flujos',
            'Alertas proactivas a CS cuando un usuario se atasca',
            'Dashboard de impacto en churn y TTV'
          ]
        }
      }
    ]
  },

  /* 2. Tech‑Gap Radar ---------------------------------------------------- */
  {
    id: 'tech-gap-radar',
    name: 'Tech-Gap Radar',
    description: 'Usa la última tecnología exactamente donde el competidor flojea',
    icon: Cpu,
    color: 'from-blue-500 to-purple-600',
    fusedMethods: '💡 Tech-First + 📈 Benchmark Gap',
    whyItWorks: 'Usa la última tecnología exactamente donde el competidor flojea.',
    fields: [
      { name: 'tecnologia', label: 'Tendencia Tecnológica', type: 'select', options: ['LLMs/IA', 'Computer Vision', 'Blockchain', 'IoT', 'AR/VR', 'Edge Computing', 'Quantum Computing', 'Web3'] },
      { name: 'competidorUrl', label: 'URL del Competidor', type: 'url', placeholder: 'https://competidor.com' },
      { name: 'sector', label: 'Sector', type: 'text', placeholder: 'Ej: fintech, edtech, healthtech...' },
      { name: 'prioridadCruce', label: 'Prioridad del Cruce Tech⇄Brecha', type: 'select', options: ['Alta innovación', 'Ventaja competitiva', 'Reducción de costos', 'Mejora UX', 'Escalabilidad'] }
    ],
    examples: [
      {
        input: {
          tecnologia: 'LLMs/IA',
          competidorUrl: 'https://legacybank.com',
          sector: 'Fintech',
          prioridadCruce: 'Mejora UX'
        },
        output: {
          projectName: 'SmartBank Chat',
          description: 'Widget conversacional con LLMs que ofrece asesoría financiera personalizada, cerrando la brecha de UX frente al competidor.',
          features: [
            'Chat 24/7 entrenado con normativa bancaria',
            'Análisis de gastos en tiempo real',
            'Recomendaciones de ahorro automatizadas',
            'Integración con apps móviles existentes',
            'Panel de insights para gestores humanos'
          ]
        }
      }
    ]
  },

  /* 3. Trend‑Compliance Duo -------------------------------------------- */
  {
    id: 'trend-compliance-duo',
    name: 'Trend-Compliance Duo',
    description: 'Encuentra tendencias que además están obligadas por ley — mercado cautivo',
    icon: Shield,
    color: 'from-green-500 to-teal-600',
    fusedMethods: '📈 Tendencias-2024 + 📈 Regulación-Driven',
    whyItWorks: 'Encuentra tendencias que además están obligadas por ley — mercado cautivo.',
    fields: [
      { name: 'sector', label: 'Sector', type: 'select', options: ['Finanzas', 'Salud', 'Educación', 'Energía', 'Alimentación', 'Transporte', 'Construcción', 'Retail'] },
      { name: 'normativaFutura', label: 'Normativa Futura', type: 'textarea', placeholder: 'Describe las regulaciones que entrarán en vigor...' },
      { name: 'region', label: 'Región/País', type: 'text', placeholder: 'Ej: España, UE, LATAM...' },
      { name: 'tiempoImplementacion', label: 'Tiempo de Implementación', type: 'select', options: ['6 meses', '1 año', '2 años', '3+ años'] }
    ],
    examples: [
      {
        input: {
          sector: 'Salud',
          normativaFutura: 'Reglamento IA Act para dispositivos médicos',
          region: 'UE',
          tiempoImplementacion: '2 años'
        },
        output: {
          projectName: 'MedAI Compliance Suite',
          description: 'Herramienta que certifica algoritmos médicos según el AI Act y monitoriza su ciclo de vida.',
          features: [
            'Checklist por nivel de riesgo',
            'Generación automática de documentación técnica',
            'Monitoreo de drifting de modelos',
            'Repositorio de auditorías',
            'API para fabricantes y clínicas'
          ]
        }
      }
    ]
  },

  /* 4. Data‑Content Forge ---------------------------------------------- */
  {
    id: 'data-content-forge',
    name: 'Data-Content Forge',
    description: 'Convierte datos propios en contenido valioso y viceversa',
    icon: Database,
    color: 'from-yellow-500 to-orange-600',
    fusedMethods: '💡 Datos Internos + 💡 Content Leverage',
    whyItWorks: 'Convierte datos propios en contenido valioso y viceversa.',
    fields: [
      { name: 'tipoDatos', label: 'Tipo de Datos Disponibles', type: 'select', options: ['Analytics de uso', 'Datos de ventas', 'Feedback de usuarios', 'Logs de sistema', 'Datos de comportamiento'] },
      { name: 'volumenDatos', label: 'Volumen de Datos', type: 'text', placeholder: 'Ej: 10k usuarios, 1M eventos/mes...' },
      { name: 'tipoContenido', label: 'Biblioteca de Contenido', type: 'select', options: ['Artículos/Blog', 'Videos', 'Podcasts', 'Cursos', 'Documentación', 'Webinars'] },
      { name: 'objetivoConversion', label: 'Objetivo de Conversión', type: 'text', placeholder: 'Qué acción quieres que tomen los usuarios...' }
    ],
    examples: [
      {
        input: {
          tipoDatos: 'Feedback de usuarios',
          volumenDatos: '5k reviews',
          tipoContenido: 'Artículos/Blog',
          objetivoConversion: 'Suscripción premium'
        },
        output: {
          projectName: 'Review2Story',
          description: 'Motor que transforma reseñas de usuarios en posts SEO y ebooks que impulsan la conversión.',
          features: [
            'Clasificación de feedback con NLP',
            'Generador de outlines y contenidos',
            'Inserción automática de CTA',
            'Programación en CMS',
            'Análisis de impacto en conversiones'
          ]
        }
      }
    ]
  },

  /* 5. Vision‑Exit Path -------------------------------------------------- */
  {
    id: 'vision-exit-path',
    name: 'Vision-Exit Path',
    description: 'Planifica el futuro… pensando en quién te comprará',
    icon: Eye,
    color: 'from-purple-500 to-pink-600',
    fusedMethods: '🚀 Visión → Back-cast + 🚀 Exit-Ready (M&A)',
    whyItWorks: 'Planifica el futuro… pensando en quién te comprará.',
    fields: [
      { name: 'vision5anos', label: 'Visión a 5 Años', type: 'textarea', placeholder: 'Describe tu visión ambiciosa...' },
      { name: 'compradorObjetivo', label: 'Comprador Objetivo', type: 'text', placeholder: 'Ej: Microsoft, Salesforce, Adobe...' },
      { name: 'valorEstrategico', label: 'Valor Estratégico para el Comprador', type: 'textarea', placeholder: 'Por qué les interesaría adquirir tu empresa...' },
      { name: 'horizonteExit', label: 'Horizonte de Exit', type: 'select', options: ['2-3 años', '3-5 años', '5-7 años', '7+ años'] },
      { name: 'metricaEstrella', label: 'Métrica Estrella', type: 'select', options: ['MRR', 'Usuarios activos', 'Transacciones', 'Revenue', 'Market share'] }
    ],
    examples: [
      {
        input: {
          vision5anos: 'Ser la referencia en CX para e-commerce en LATAM',
          compradorObjetivo: 'Shopify',
          valorEstrategico: 'Extiende su ecosistema con analítica avanzada de clientes',
          horizonteExit: '3-5 años',
          metricaEstrella: 'MRR'
        },
        output: {
          projectName: 'LatAm CX Suite',
          description: 'Plataforma de experiencia de cliente para e-commerce latinoamericano orientada a exit con Shopify.',
          features: [
            'Customer 360 con IA',
            'Módulo de personalización en tiempo real',
            'Integración plug‑and‑play con Shopify Plus',
            'Reportes ESG para e‑retailers',
            'Panel de métricas norteadas a MRR'
          ]
        }
      }
    ]
  },

  /* 6. IoT‑Emotion Loop -------------------------------------------------- */
  {
    id: 'iot-emotion-loop',
    name: 'IoT-Emotion Loop',
    description: 'Sensores físicos + análisis emocional para productos hiper-reactivos',
    icon: Heart,
    color: 'from-pink-500 to-red-600',
    fusedMethods: '💡 Device-First IoT Bridge + 💡 Emotion-AI Enhancer',
    whyItWorks: 'Sensores físicos + análisis emocional para productos hiper-reactivos.',
    fields: [
      { name: 'tipoHardware', label: 'Tipo de Hardware/Sensor', type: 'select', options: ['Sensores ambientales', 'Wearables', 'Cámaras inteligentes', 'Sensores industriales', 'Dispositivos médicos'] },
      { name: 'contextoUso', label: 'Contexto de Uso', type: 'text', placeholder: 'Ej: oficina, hogar, gimnasio, hospital...' },
      { name: 'datosCapturados', label: 'Datos Capturados por IoT', type: 'text', placeholder: 'Ej: temperatura, movimiento, sonido, luz...' },
      { name: 'emocionesObjetivo', label: 'Emociones a Detectar', type: 'text', placeholder: 'Ej: estrés, felicidad, concentración, fatiga...' },
      { name: 'accionesRespuesta', label: 'Acciones de Respuesta', type: 'textarea', placeholder: 'Qué hacer cuando se detecta cada combinación IoT+emoción...' }
    ],
    examples: [
      {
        input: {
          tipoHardware: 'Wearables',
          contextoUso: 'Gimnasio',
          datosCapturados: 'Frecuencia cardíaca y movimiento',
          emocionesObjetivo: 'Fatiga',
          accionesRespuesta: 'Ajustar intensidad del entrenamiento y mandar feedback por auriculares'
        },
        output: {
          projectName: 'FitMood Coach',
          description: 'Plataforma que adapta rutinas en tiempo real según la fatiga detectada por un wearable.',
          features: [
            'Modelo ML para detectar fatiga',
            'API para apps de fitness',
            'Recomendaciones sonoras en tiempo real',
            'Historial de rendimiento y emociones',
            'Gamificación de objetivos diarios'
          ]
        }
      }
    ]
  },

  /* 7. Ops‑Sheet Modernizer --------------------------------------------- */
  {
    id: 'ops-sheet-modernizer',
    name: 'Ops-Sheet Modernizer',
    description: 'Las hojas de cálculo suelen ser justo el cuello de botella que más duele en los procesos internos',
    icon: Table,
    color: 'from-indigo-500 to-blue-600',
    fusedMethods: '🎯 Spreadsheet → SaaS + 🎯 In-House Ops Doctor',
    whyItWorks: 'Las hojas de cálculo suelen ser justo el cuello de botella que más duele en los procesos internos.',
    fields: [
      { name: 'spreadsheetsCriticos', label: 'Spreadsheets Críticos', type: 'textarea', placeholder: 'Describe las hojas de cálculo más importantes...' },
      { name: 'cuellosBottella', label: 'Cuellos de Botella', type: 'textarea', placeholder: 'Qué procesos se ralentizan por estas hojas...' },
      { name: 'impactoEconomico', label: 'Impacto Económico', type: 'text', placeholder: 'Ej: 20h/semana perdidas, $5k/mes en errores...' },
      { name: 'frecuenciaUso', label: 'Frecuencia de Uso', type: 'select', options: ['Diario', 'Semanal', 'Mensual', 'Trimestral'] },
      { name: 'usuariosConcurrentes', label: 'Usuarios Concurrentes', type: 'text', placeholder: 'Cuántas personas usan estas hojas...' }
    ],
    examples: [
      {
        input: {
          spreadsheetsCriticos: 'Hoja de inventario en Excel 2007',
          cuellosBottella: 'Actualización manual y errores de fórmulas',
          impactoEconomico: '$8k/mes en roturas de stock',
          frecuenciaUso: 'Diario',
          usuariosConcurrentes: '15'
        },
        output: {
          projectName: 'InvSmart SaaS',
          description: 'Web‑app que reemplaza hojas de inventario con control multiusuario y alertas automáticas.',
          features: [
            'Base de datos en nube con historial',
            'QR/barcode scanner móvil',
            'Alertas de stock mínimo',
            'Roles y permisos granulares',
            'Exportación a ERP'
          ]
        }
      }
    ]
  },

  /* 8. Green‑Tender Hunter ---------------------------------------------- */
  {
    id: 'green-tender-hunter',
    name: 'Green-Tender Hunter',
    description: 'La contratación pública está empujando proyectos de sostenibilidad; unir ambos flujos garantiza demanda y financiación',
    icon: Leaf,
    color: 'from-green-500 to-emerald-600',
    fusedMethods: '📈 Eco-Impact (Green SaaS) + 📈 Gov Tender Radar',
    whyItWorks: 'La contratación pública está empujando proyectos de sostenibilidad; unir ambos flujos garantiza demanda y financiación.',
    fields: [
      { name: 'sector', label: 'Sector', type: 'select', options: ['Energía renovable', 'Gestión de residuos', 'Transporte sostenible', 'Construcción verde', 'Agricultura sostenible', 'Agua y saneamiento'] },
      { name: 'odsPrioritarios', label: 'ODS Prioritarios', type: 'select', options: ['ODS 6: Agua limpia', 'ODS 7: Energía asequible', 'ODS 11: Ciudades sostenibles', 'ODS 12: Consumo responsable', 'ODS 13: Acción climática', 'ODS 15: Vida terrestre'] },
      { name: 'region', label: 'Región/País', type: 'text', placeholder: 'Ej: España, UE, LATAM...' },
      { name: 'importeMinimo', label: 'Importe Mínimo', type: 'text', placeholder: 'Ej: €50k, €200k...' },
      { name: 'plazoMaximo', label: 'Plazo Máximo', type: 'select', options: ['6 meses', '1 año', '2 años', '3+ años'] }
    ],
    examples: [
      {
        input: {
          sector: 'Gestión de residuos',
          odsPrioritarios: 'ODS 12: Consumo responsable',
          region: 'España',
          importeMinimo: '€100k',
          plazoMaximo: '1 año'
        },
        output: {
          projectName: 'WasteZero Platform',
          description: 'Plataforma SaaS para ayuntamientos que digitaliza la gestión de residuos y optimiza rutas de recogida.',
          features: [
            'Dashboard ambiental en tiempo real',
            'IA para rutas de camiones',
            'Sensores IoT en contenedores',
            'Módulo de participación ciudadana',
            'Reportes para licitaciones'
          ]
        }
      }
    ]
  },

  /* 9. Locale‑Plugin Finder --------------------------------------------- */
  {
    id: 'locale-plugin-finder',
    name: 'Locale-Plugin Finder',
    description: 'Muchos plugins populares no están localizados en idiomas/regiones nicho: oportunidad clara y rápida',
    icon: Globe,
    color: 'from-cyan-500 to-blue-600',
    fusedMethods: '📈 Localization Edge + 📈 Marketplace-Plugin Hunter',
    whyItWorks: 'Muchos plugins populares no están localizados en idiomas/regiones nicho: oportunidad clara y rápida.',
    fields: [
      { name: 'marketplace', label: 'Marketplace', type: 'select', options: ['Shopify App Store', 'Figma Plugins', 'Chrome Extensions', 'WordPress Plugins', 'Slack Apps', 'Notion Templates', 'Zapier Apps'] },
      { name: 'idiomaRegion', label: 'Idioma/Región Infra-servida', type: 'text', placeholder: 'Ej: Catalán, Portugués Brasil, Árabe...' },
      { name: 'categoriaPlugin', label: 'Categoría de Plugin', type: 'text', placeholder: 'Ej: productividad, e-commerce, diseño...' },
      { name: 'nivelDemanda', label: 'Nivel de Demanda', type: 'select', options: ['Alta demanda', 'Demanda media', 'Nicho específico', 'Mercado emergente'] }
    ],
    examples: [
      {
        input: {
          marketplace: 'Shopify App Store',
          idiomaRegion: 'Catalán',
          categoriaPlugin: 'Email marketing',
          nivelDemanda: 'Demanda media'
        },
        output: {
          projectName: 'CatEmail Booster',
          description: 'Plugin de email marketing para tiendas Shopify en catalán con plantillas localizadas.',
          features: [
            'Plantillas responsive en catalán',
            'Automatización de carritos abandonados',
            'Segmentación por región',
            'Dashboard de métricas integrado',
            'Soporte multilingüe'
          ]
        }
      }
    ]
  },

  /* 10. Legacy‑Data Goldmine ------------------------------------------- */
  {
    id: 'legacy-data-goldmine',
    name: 'Legacy-Data Goldmine',
    description: 'Migrar un sistema obsoleto y, de paso, monetizar los datos históricos que contiene',
    icon: Cloud,
    color: 'from-gray-500 to-slate-600',
    fusedMethods: '💡 Legacy-to-Cloud + 💡 Data Treasure',
    whyItWorks: 'Migrar un sistema obsoleto y, de paso, monetizar los datos históricos que contiene.',
    fields: [
      { name: 'stackLegacy', label: 'Stack Legacy', type: 'textarea', placeholder: 'Describe el sistema obsoleto (tecnologías, versiones...)' },
      { name: 'baseDatosValiosa', label: 'Base de Datos Valiosa', type: 'textarea', placeholder: 'Qué datos históricos contiene que podrían ser valiosos...' },
      { name: 'industria', label: 'Industria', type: 'text', placeholder: 'Ej: manufactura, retail, servicios financieros...' },
      { name: 'volumenDatos', label: 'Volumen de Datos', type: 'text', placeholder: 'Ej: 10 años de transacciones, 1M registros...' },
      { name: 'compradorPotencial', label: 'Comprador Potencial de Datos', type: 'text', placeholder: 'Quién pagaría por estos datos...' }
    ],
    examples: [
      {
        input: {
          stackLegacy: 'ERP on‑premise Oracle 11g',
          baseDatosValiosa: 'Histórico de ventas de 15 años',
          industria: 'Retail',
          volumenDatos: '3M registros',
          compradorPotencial: 'Empresas de estudios de mercado'
        },
        output: {
          projectName: 'RetailData Cloud',
          description: 'Servicio que migra el ERP a la nube y crea un marketplace de datos anonimizados para investigación de mercado.',
          features: [
            'Migración lift‑and‑shift a PostgreSQL',
            'Anonimización GDPR‑compliant',
            'API de datos por suscripción',
            'Panel de ingresos por dataset',
            'Canal de ventas a agencias'
          ]
        }
      }
    ]
  },

  /* 11. Hook‑Nudge Accelerator ----------------------------------------- */
  {
    id: 'hook-nudge-accelerator',
    name: 'Hook-Nudge Accelerator',
    description: 'Combina activación rápida con estímulos conductuales sostenidos: maximiza adopción y retención',
    icon: Zap,
    color: 'from-yellow-500 to-amber-600',
    fusedMethods: '🚀 Freemium → Hook + 🚀 Nudge-Economy Optimizer',
    whyItWorks: 'Combina activación rápida con estímulos conductuales sostenidos: maximiza adopción y retención.',
    fields: [
      { name: 'segmentoUsuario', label: 'Segmento de Usuario', type: 'text', placeholder: 'Ej: freelancers, startups, empresas medianas...' },
      { name: 'timeToValue', label: 'Time-to-Value Deseado', type: 'select', options: ['< 1 minuto', '1-5 minutos', '5-15 minutos', '15-30 minutos'] },
      { name: 'comportamientoObjetivo', label: 'Comportamiento Objetivo', type: 'text', placeholder: 'Ej: completar onboarding, usar feature clave...' },
      { name: 'wowMoment', label: 'Wow-Moment', type: 'textarea', placeholder: 'Qué momento genera el "aha!" en el usuario...' },
      { name: 'nudgeStrategy', label: 'Estrategia de Nudge', type: 'select', options: ['Gamificación', 'Prueba social', 'Escasez', 'Progreso visual', 'Recordatorios inteligentes'] }
    ],
    examples: [
      {
        input: {
          segmentoUsuario: 'Startups',
          timeToValue: '5-15 minutos',
          comportamientoObjetivo: 'Integrar API',
          wowMoment: 'Primera llamada exitosa y visualización de datos',
          nudgeStrategy: 'Progreso visual'
        },
        output: {
          projectName: 'APIQuickStart',
          description: 'Kit freemium más barra de progreso gamificada que guía a los usuarios hasta su primer éxito con la API.',
          features: [
            'SDKs en 5 lenguajes',
            'Progress bar que desbloquea badges',
            'Emails inteligentes según etapa',
            'Canal Slack para soporte instantáneo',
            'Dashboard de cohortes de activación'
          ]
        }
      }
    ]
  },

  /* 12. AI‑Driven KPI Turbo -------------------------------------------- */
  {
    id: 'ai-driven-kpi-turbo',
    name: 'AI-Driven KPI Turbo',
    description: 'Mejorar el pipeline ML para mover un KPI de negocio concreto — une ciencia de datos y objetivos ejecutivos',
    icon: Brain,
    color: 'from-purple-500 to-violet-600',
    fusedMethods: '💡 AI Performance Booster + 🚀 KPI Booster',
    whyItWorks: 'Mejorar el pipeline ML para mover un KPI de negocio concreto — une ciencia de datos y objetivos ejecutivos.',
    fields: [
      { name: 'modeloExistente', label: 'Modelo ML Existente', type: 'textarea', placeholder: 'Describe el modelo actual (tipo, métricas, rendimiento...)' },
      { name: 'kpiObjetivo', label: 'KPI de Negocio a Mejorar', type: 'select', options: ['Churn Rate', 'NPS', 'Conversión', 'LTV', 'CAC', 'Revenue per User', 'Time to Value'] },
      { name: 'metricasActuales', label: 'Métricas Actuales del Modelo', type: 'text', placeholder: 'Ej: 85% accuracy, 0.7 F1-score...' },
      { name: 'impactoEsperado', label: 'Impacto Esperado en KPI', type: 'text', placeholder: 'Ej: reducir churn del 15% al 10%...' },
      { name: 'recursosDisponibles', label: 'Recursos Disponibles', type: 'select', options: ['Equipo ML interno', 'Consultores externos', 'Plataforma cloud', 'Datos adicionales', 'Presupuesto limitado'] }
    ],
    examples: [
      {
        input: {
          modeloExistente: 'Modelo de recomendación v2',
          kpiObjetivo: 'ARPU',
          metricasActuales: 'CTR 6%',
          impactoEsperado: 'Elevar ARPU 15%',
          recursosDisponibles: 'Equipo ML interno'
        },
        output: {
          projectName: 'RecSys Booster',
          description: 'Framework que aplica técnicas de distillation y re-ranking para subir CTR y ARPU.',
          features: [
            'Optimización de embeddings',
            'A/B testing continuo',
            'Feature store unificado',
            'Monitor de deriva de datos',
            'Panel de impacto en ARPU en tiempo real'
          ]
        }
      }
    ]
  }
];
