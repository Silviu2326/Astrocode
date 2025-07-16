import {
  Target,
  Users,
  Workflow,
  MessageSquare,
  Stethoscope,
  Table
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

export const problemFocusedModes: GenerationMode[] = [
  {
    id: 'dolores-proyectos',
    name: 'Dolores → Proyectos',
    description: 'Parte de los "pains" más fuertes que sufre un nicho',
    icon: Target,
    color: 'from-red-500 to-orange-600',
    fields: [
      { name: 'sector', label: 'Sector', type: 'text', placeholder: 'Ej: salud, educación, fintech...' },
      { name: 'tipoCliente', label: 'Tipo de Cliente', type: 'text', placeholder: 'Ej: pymes, freelancers, estudiantes...' },
      { name: 'nivelDolor', label: 'Nivel de Dolor', type: 'select', options: ['Alto', 'Medio', 'Bajo'] }
    ],
    examples: [
      {
        input: {
          sector: 'Salud',
          tipoCliente: 'Clínicas pequeñas',
          nivelDolor: 'Alto'
        },
        output: {
          projectName: 'ClinicFlow - Gestión de Pacientes',
          description: 'Plataforma SaaS para clínicas pequeñas que automatiza la gestión de citas, historiales médicos y facturación, eliminando el caos de las agendas en papel.',
          features: [
            'Sistema de citas online con recordatorios automáticos',
            'Historiales médicos digitales seguros',
            'Facturación automática e integración con seguros',
            'Dashboard de métricas de pacientes',
            'Gestión de inventario médico'
          ]
        }
      },
      {
        input: {
          sector: 'Educación',
          tipoCliente: 'Profesores freelance',
          nivelDolor: 'Medio'
        },
        output: {
          projectName: 'TeachHub - Plataforma de Clases Particulares',
          description: 'Marketplace que conecta profesores freelance con estudiantes, incluyendo herramientas de gestión de clases, pagos y seguimiento académico.',
          features: [
            'Perfil de profesor con reseñas y certificaciones',
            'Sistema de reserva y pago de clases',
            'Videoconferencia integrada',
            'Seguimiento del progreso del estudiante',
            'Gestión de materiales didácticos'
          ]
        }
      }
    ]
  },
  {
    id: 'persona-canvas',
    name: 'Persona Canvas',
    description: 'Enfoque en tareas y frustraciones de un perfil concreto',
    icon: Users,
    color: 'from-blue-500 to-cyan-600',
    fields: [
      { name: 'rol', label: 'Rol del Usuario', type: 'text', placeholder: 'Ej: CTO de pymes, diseñador freelance...' },
      { name: 'objetivoPrincipal', label: 'Objetivo Principal', type: 'text', placeholder: 'Ej: reducir costos operativos...' },
      { name: 'barreras', label: 'Principales Barreras', type: 'textarea', placeholder: 'Describe las frustraciones y obstáculos...' }
    ],
    examples: [
      {
        input: {
          rol: 'CTO de startup fintech',
          objetivoPrincipal: 'Acelerar el desarrollo de APIs seguras',
          barreras: 'Falta de tiempo para configurar infraestructura, complejidad de cumplimiento regulatorio, dificultad para encontrar desarrolladores con experiencia en fintech'
        },
        output: {
          projectName: 'FinAPI Builder',
          description: 'Plataforma low-code especializada en APIs financieras que incluye templates pre-configurados con cumplimiento regulatorio y seguridad bancaria.',
          features: [
            'Templates de APIs financieras pre-aprobadas',
            'Cumplimiento automático PCI DSS y PSD2',
            'Generador de documentación API',
            'Testing automatizado de seguridad',
            'Integración con proveedores de KYC/AML'
          ]
        }
      },
      {
        input: {
          rol: 'Diseñador freelance',
          objetivoPrincipal: 'Gestionar mejor los proyectos y clientes',
          barreras: 'Pérdida de tiempo en tareas administrativas, dificultad para hacer seguimiento de pagos, falta de herramientas para presentar propuestas profesionales'
        },
        output: {
          projectName: 'DesignOps Pro',
          description: 'Suite completa para diseñadores freelance que automatiza la gestión de proyectos, propuestas, contratos y facturación.',
          features: [
            'Generador de propuestas con templates',
            'Contratos digitales con firma electrónica',
            'Time tracking automático',
            'Facturación recurrente y recordatorios',
            'Portfolio integrado con métricas de conversión'
          ]
        }
      }
    ]
  },
  {
    id: 'workflow-automation',
    name: 'Workflow Automation',
    description: 'Elimina pasos manuales de un proceso existente',
    icon: Workflow,
    color: 'from-purple-500 to-indigo-600',
    fields: [
      { name: 'procesoActual', label: 'Proceso Actual', type: 'textarea', placeholder: 'Describe el proceso manual actual...' },
      { name: 'pasosRepetitivos', label: 'Pasos Repetitivos', type: 'text', placeholder: 'Ej: envío de emails, generación de reportes...' },
      { name: 'frecuencia', label: 'Frecuencia', type: 'select', options: ['Diaria', 'Semanal', 'Mensual', 'Trimestral'] }
    ],
    examples: [
      {
        input: {
          procesoActual: 'Los equipos de RRHH revisan manualmente CVs, programan entrevistas por email, toman notas en Word y luego las comparten por Slack para tomar decisiones',
          pasosRepetitivos: 'Filtrado de CVs, programación de entrevistas, consolidación de feedback',
          frecuencia: 'Diaria'
        },
        output: {
          projectName: 'HireFlow - ATS Inteligente',
          description: 'Sistema de seguimiento de candidatos que automatiza el filtrado de CVs con IA, programación inteligente de entrevistas y consolidación de feedback del equipo.',
          features: [
            'Filtrado automático de CVs con IA',
            'Programación inteligente de entrevistas',
            'Scorecards digitales colaborativos',
            'Pipeline visual de candidatos',
            'Integración con calendarios y Slack'
          ]
        }
      },
      {
        input: {
          procesoActual: 'El equipo de marketing crea reportes semanales copiando datos de Google Analytics, Facebook Ads, y otras plataformas en Excel, luego los formatea manualmente',
          pasosRepetitivos: 'Extracción de datos, formateo de reportes, envío por email',
          frecuencia: 'Semanal'
        },
        output: {
          projectName: 'MarketingOps Dashboard',
          description: 'Dashboard automatizado que conecta todas las fuentes de datos de marketing y genera reportes personalizados automáticamente.',
          features: [
            'Conectores a 20+ plataformas de marketing',
            'Reportes automáticos personalizables',
            'Alertas de rendimiento en tiempo real',
            'Distribución automática por email/Slack',
            'Análisis predictivo de tendencias'
          ]
        }
      }
    ]
  },
  {
    id: 'community-pulse',
    name: 'Community Pulse',
    description: 'Captura dolores recurrentes en foros/Discord/Reddit',
    icon: MessageSquare,
    color: 'from-green-500 to-teal-600',
    fields: [
      { name: 'comunidad', label: 'Comunidad Objetivo', type: 'text', placeholder: 'Ej: r/webdev, Discord de startups...' },
      { name: 'problemasRecurrentes', label: 'Problemas Recurrentes', type: 'textarea', placeholder: 'Problemas que se mencionan frecuentemente...' },
      { name: 'tamanoComunidad', label: 'Tamaño de Comunidad', type: 'text', placeholder: 'Ej: 50k miembros, 10k activos...' }
    ],
    examples: [
      {
        input: {
          comunidad: 'r/webdev (900k miembros)',
          problemasRecurrentes: 'Desarrolladores se quejan constantemente de la dificultad para hacer deploy de aplicaciones, configurar CI/CD, y manejar diferentes ambientes de desarrollo',
          tamanoComunidad: '900k miembros, 50k activos diarios'
        },
        output: {
          projectName: 'DeployEasy - One-Click Deployment',
          description: 'Plataforma que simplifica el deployment de aplicaciones web con configuración automática de CI/CD y gestión de ambientes.',
          features: [
            'Deploy con un click desde GitHub',
            'CI/CD automático pre-configurado',
            'Gestión visual de ambientes',
            'Rollback instantáneo',
            'Monitoreo y logs centralizados'
          ]
        }
      },
      {
        input: {
          comunidad: 'Discord de Indie Hackers (25k miembros)',
          problemasRecurrentes: 'Creadores de productos digitales luchan con la validación de ideas, encontrar early adopters, y hacer seguimiento de métricas de producto',
          tamanoComunidad: '25k miembros, 3k activos diarios'
        },
        output: {
          projectName: 'ValidateIt - Idea Validation Platform',
          description: 'Plataforma que ayuda a indie hackers a validar ideas de producto, encontrar early adopters y hacer seguimiento de métricas clave.',
          features: [
            'Templates de validación de ideas',
            'Marketplace de early adopters',
            'A/B testing para landing pages',
            'Analytics de comportamiento de usuario',
            'Comunidad de feedback entre makers'
          ]
        }
      }
    ]
  },
  {
    id: 'in-house-ops-doctor',
    name: 'In-House Ops Doctor',
    description: 'Detecta cuellos de botella internos de la empresa',
    icon: Stethoscope,
    color: 'from-red-500 to-pink-600',
    fields: [
      { name: 'departamento', label: 'Departamento', type: 'select', options: ['IT', 'RRHH', 'Ventas', 'Marketing', 'Operaciones', 'Finanzas'] },
      { name: 'cuelloBotella', label: 'Cuello de Botella', type: 'textarea', placeholder: 'Describe el problema operativo...' },
      { name: 'impactoTiempo', label: 'Impacto en Tiempo', type: 'text', placeholder: 'Ej: 2 horas diarias, 1 día semanal...' }
    ],
    examples: [
      {
        input: {
          departamento: 'IT',
          cuelloBotella: 'El equipo de IT pierde mucho tiempo respondiendo tickets repetitivos sobre reseteo de contraseñas, instalación de software básico y problemas de acceso a sistemas',
          impactoTiempo: '3 horas diarias del equipo'
        },
        output: {
          projectName: 'SelfService IT Portal',
          description: 'Portal de autoservicio que permite a los empleados resolver problemas comunes de IT sin necesidad de crear tickets, con chatbot integrado y base de conocimiento.',
          features: [
            'Reseteo automático de contraseñas',
            'Catálogo de software con instalación automática',
            'Chatbot con IA para soporte nivel 1',
            'Base de conocimiento searchable',
            'Escalación automática de tickets complejos'
          ]
        }
      },
      {
        input: {
          departamento: 'Ventas',
          cuelloBotella: 'Los vendedores pierden tiempo creando propuestas personalizadas desde cero, buscando información de productos actualizada y haciendo seguimiento manual de leads',
          impactoTiempo: '4 horas por propuesta'
        },
        output: {
          projectName: 'SalesAccelerator',
          description: 'Plataforma que automatiza la creación de propuestas, centraliza información de productos y automatiza el seguimiento de leads con secuencias inteligentes.',
          features: [
            'Generador de propuestas con templates dinámicos',
            'Catálogo de productos siempre actualizado',
            'Secuencias de follow-up automáticas',
            'Scoring automático de leads',
            'Integración con CRM existente'
          ]
        }
      }
    ]
  },
  {
    id: 'spreadsheet-to-saas',
    name: 'Spreadsheet → SaaS',
    description: 'Sustituye hojas de cálculo que ya duelen al equipo',
    icon: Table,
    color: 'from-yellow-500 to-orange-600',
    fields: [
      { name: 'tipoHoja', label: 'Tipo de Hoja de Cálculo', type: 'select', options: ['Control de inventario', 'Gestión de proyectos', 'CRM básico', 'Contabilidad', 'Planificación', 'Reportes'] },
      { name: 'limitaciones', label: 'Limitaciones Actuales', type: 'textarea', placeholder: 'Qué problemas causa la hoja actual...' },
      { name: 'usuarios', label: 'Número de Usuarios', type: 'text', placeholder: 'Ej: 5-10 personas, todo el equipo...' }
    ],
    examples: [
      {
        input: {
          tipoHoja: 'Control de inventario',
          limitaciones: 'La hoja de Excel se corrompe frecuentemente, no permite acceso simultáneo, es difícil hacer seguimiento de movimientos históricos, y no tiene alertas automáticas de stock bajo',
          usuarios: '8 personas del almacén'
        },
        output: {
          projectName: 'StockMaster - Gestión de Inventario',
          description: 'Sistema web de gestión de inventario con acceso multi-usuario, historial completo de movimientos y alertas automáticas de reposición.',
          features: [
            'Gestión de productos con códigos de barras',
            'Alertas automáticas de stock mínimo',
            'Historial completo de movimientos',
            'Reportes de rotación de inventario',
            'Integración con proveedores para reposición automática'
          ]
        }
      },
      {
        input: {
          tipoHoja: 'Gestión de proyectos',
          limitaciones: 'El Excel con el timeline de proyectos es imposible de mantener actualizado, no se pueden asignar tareas claramente, no hay visibilidad del progreso real, y es difícil colaborar',
          usuarios: '15 personas del equipo de desarrollo'
        },
        output: {
          projectName: 'ProjectFlow - Gestión Ágil',
          description: 'Herramienta de gestión de proyectos diseñada para equipos de desarrollo con tableros Kanban, seguimiento de tiempo y reportes automáticos.',
          features: [
            'Tableros Kanban personalizables',
            'Seguimiento de tiempo automático',
            'Asignación y notificaciones de tareas',
            'Reportes de velocidad del equipo',
            'Integración con Git y herramientas de desarrollo'
          ]
        }
      }
    ]
  }
];